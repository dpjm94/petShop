import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card__dashboard">
                <h4 className="card__header_dashboard">User Links</h4>
                <ul className="card__list-group">
                    <li className="card__list-group-item">
                        <Link className="card__link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="card__list-group-item">
                        <Link className="card__link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card__dashboard">
                <h3 className="card__header_dashboard">User Information</h3>
                <ul className="card__list-group">
                    <li className="card__list-group-item"> <strong>Name: </strong> &nbsp; {name}</li>
                    <li className="card__list-group-item"> <strong>Email: </strong> &nbsp; {email}</li>
                    <li className="card__list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row__dashboard">
                <div className="row__dashboard_col-3">{userLinks()}</div>
                <div className="row__dashboard_col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
