import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';


const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        // categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <div className="form-check">
        <form onSubmit={clickSubmit}>
            <h3 style={{textAlign: "left"}}>Post Photo</h3>
            <div className="form-check__group">
                <label className="form-check__group_product form-check__background">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-check__group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-check__control" value={name} />
            </div>

            <div className="form-check__group">
                <label>Description</label>
                <textarea onChange={handleChange('description')} className="form-check__control" value={description} />
            </div>

            <div className="form-check__group">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-check__control" value={price} />
            </div>

            <div className="form-check__group">
                <label>Category</label>
                <select onChange={handleChange('category')} className="form-check__control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-check__group">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} className="form-check__control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-check__group">
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-check__control" value={quantity} />
            </div>

            <button className="btn btn--left">Update Product</button>
        </form>
        </div>
    );

    const showError = () => (
        <div className="alert__danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert__success" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert__success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
        </Layout>
    );
};

export default UpdateProduct;
