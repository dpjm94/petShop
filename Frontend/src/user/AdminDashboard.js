import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card__dashboard">
                <h4 className="card__header_dashboard"><strong>Admin Links</strong></h4>
                <ul className="card__list-group">
                    <li className="card__list-group-item">
                        <Link className="card__link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="card__list-group-item">
                        <Link className="card__link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="card__list-group-item">
                        <Link className="card__link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>

            
        );
    };

    const adminInfo = () => {
        return (
            <div className="card__dashboard">
                <h3 className="card__header_dashboard"><strong>User Information</strong></h3>
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

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row__dashboard">
                <div className="row__dashboard_col-3">{adminLinks()}</div>
                <div className="row__dashboard_col-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
