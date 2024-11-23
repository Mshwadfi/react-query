import React from 'react';
import { useQuery } from 'react-query';

const DependantQueries = ({ id }) => {
    console.log(id);

    const currentUser = useQuery(['user', id], async () => {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        return res.json();
    });

    const storeId = currentUser?.data?.storeId;

    const store = useQuery(
        ['store', storeId],
        async () => {
            const res = await fetch(`http://localhost:4000/stores/${storeId}`);
            return res.json();
        },
        {
            enabled: !!storeId,
        }
    );

    if (store.isLoading) return <div>Loading store data...</div>;
    if (store.error) return <div>Error loading store data</div>;

    return (
        <div className='products'>
            <h1 className="store-title">Store Products</h1>
            <div className="product-grid">
                {store.data?.products?.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src="https://via.placeholder.com/150"
                            alt={product.name}
                            className="product-image"
                        />
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <div className="product-footer">
                            <span className="product-price">${product.price}</span>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DependantQueries;
