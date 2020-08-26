import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";


const Signin = () => {
    const [values, setValues] = useState({
        email: "donal@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="form-check form-check__small">
        <form>
            <div className="form-check__group">
                <label>Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-check__control"
                    value={email}
                />
            </div>

            <div className="form-check__group">
                <label>Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-check__control"
                    value={password}
                />
            </div>

            <div className="form-check__group">
            <button type="primary" className="btn" onClick={clickSubmit}>
                Log In
            </button>
            <span className="or">
                Or 
            </span>
            <a href="/signup">Register now!</a>
            </div>
            
        </form>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert__danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert__info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Knockataggle Ltd. Catalogue Website"
            className=""
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
