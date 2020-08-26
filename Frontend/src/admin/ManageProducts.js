import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group__item"
                            >
                                <h3><strong>{p.name}</strong></h3>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="btn__update">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="btn__delete"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
        </Layout>
    );
};

export default ManageProducts;
