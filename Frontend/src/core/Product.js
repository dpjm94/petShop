import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product.category && product.category.name}
            className="container-fluid"
        >

             <div className="row--gutters-large">
                <div className="row__product_col-6">
                    <ProductImage item={product} url="product" />
                </div>
                <div className="row__product_col-6">
                    <ProductInfo item={product} />
                </div>
            </div>
            
            <div className="row__related_header">
                <h3> Related Products </h3>
            </div>

            <div className="row__related row--gutters-small"> 
                    {relatedProduct.map((p, i) => (
                        <div key={i}>
                            <Card product={p} />
                        </div>
                    ))}
            </div>
        </Layout>

            
    );
};

export default Product;
