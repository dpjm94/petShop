import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <div class="form-check">
        <form>
            <div className="form-check__group">
                <label>Name</label>
                <input type="text" onChange={handleChange('name')} className="form-check__control" value={name} />
            </div>
            <div className="form-check__group">
                <label>Email</label>
                <input type="email" onChange={handleChange('email')} className="form-check__control" value={email} />
            </div>
            <div className="form-check__group">
                <label>Password</label>
                <input type="password" onChange={handleChange('password')} className="form-check__control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn--left">
                Submit
            </button>
        </form>
        </div>
    );

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2>Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};

export default Profile;
