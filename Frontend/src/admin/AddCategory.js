import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import { Form, Input, Button } from 'antd';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const goBack = () => (
        <div>
            <Link to="/admin/dashboard" className="alert__warning">
                Back to Dashboard
            </Link>
        </div>
    );

    const newCategoryFom = () => (
        
        <div className="form-check form-check__small">
        <form onSubmit={clickSubmit}>
            <div className="form-check__group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-check__control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn--left">Create Category</button>
        </form>
        </div>
        
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="alert__success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="alert__danger">Category should be unique</h3>;
        }
    };

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                    
             
        </Layout>
    );
};

export default AddCategory;
