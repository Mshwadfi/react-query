import React, { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";

const AddQuoteForm = () => {
  const [formData, setFormData] = useState({
    author: "",
    quote: "",
  });

  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const postQuote = async (quote) => {
    const res = await fetch("http://localhost:4000/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    if (!res.ok) {
      throw new Error("Error adding quote");
    }

    return await res.json();
  };

  const { mutate: addQuote } = useMutation(postQuote,{
    // onSuccess: (data)=>{
    //   // queryClient.invalidateQueries('quotes'); 
    //   queryClient.setQueryData('quotes', (oldQuotes)=>{
    //     console.log('dataa', data)
    //     console.log('old', oldQuotes)
    //     return oldQuotes? [...oldQuotes, data] : [data];
    //   })
    // }

    onMutate: async (data)=>{
      await queryClient.cancelQueries('quotes');
      const oldQuotes = queryClient.getQueryData('quotes');
      queryClient.setQueryData('quotes',(oldQuotes)=>{
        return oldQuotes? [...oldQuotes, data] : [data];
      })
      return [oldQuotes];
    },
    onError: (_error, _quote, context)=>{
      console.log('context', context)
      queryClient.setQueryData('quotes', ...context);
    },
    onSettled: ()=>{
      queryClient.invalidateQueries('quotes');
    }
      
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.author || !formData.quote) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");

    const newQuote = {
      id: Date.now(), 
      ...formData,
    };

    addQuote(newQuote);

    setFormData({
      author: "",
      quote: "",
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)} className="toggle-button">
        {isOpen ? "Close Form" : "Add New Quote"}
      </button>

      {isOpen && (
        <section className="form-container" onClick={() => setIsOpen(false)}>
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="add-quote-form"
          >
            <h2 className="form-title">Add New Quote</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author's name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quote">Quote:</label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Enter the quote"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Add Quote
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default AddQuoteForm;
