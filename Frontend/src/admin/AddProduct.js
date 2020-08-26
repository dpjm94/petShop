import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
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
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
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
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <div className="form-check">
        <form onSubmit={clickSubmit}>
            <h3 style={{textAlign: "left"}}>Post Photo</h3>
            <div className="form-check__group_product form-check__background">
                <label>
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-check__group_product">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-check__control" value={name} />
            </div>

            <div className="form-check__group_product">
                <label>Description</label>
                <textarea onChange={handleChange('description')} className="form-check__control" value={description} />
            </div>

            <div className="form-check__group_product">
                <label>Price</label>
                <input onChange={handleChange('price')} type="number" className="form-check__control" value={price} />
            </div>

            <div className="form-check__group_product">
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

            <div className="form-check__group_product">
                <label>Shipping</label>
                <select onChange={handleChange('shipping')} className="form-check__control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-check__group_product">
                <label>Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-check__control" value={quantity} />
            </div>

            <button className="btn btn--left">Create Product</button>
        </form>
        </div>
    );

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            <h3 className="alert__danger">{error}</h3>
        </div>
    );


    const showSuccess = () => (
        <div style={{ display: createdProduct ? '' : 'none' }}>
            <h3 className="alert__success">{`${createdProduct}`} is created!</h3>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div>
                <h3 className="alert__success">Loading...</h3>
            </div>
        );

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
        </Layout>
    );
};

export default AddProduct;
