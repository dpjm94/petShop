import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="form-check form-check__small">
        <form>
            <div className="form-check__group">
                <label>Name</label>
                <input onChange={handleChange('name')} type="text" className="form-check__control" value={name} />
            </div>

            <div className="form-check__group">
                <label>Email</label>
                <input onChange={handleChange('email')} type="email" className="form-check__control" value={email} />
            </div>

            <div className="form-check__group">
                <label>Password</label>
                <input onChange={handleChange('password')} type="password" className="form-check__control" value={password} />
            </div>

            <div className="form-check__group">
            <button type="primary" className="btn" onClick={clickSubmit}>
                Submit to sign up
            </button>
            </div>
            
        </form>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Knockataggle Ltd. Catalogue Website"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
