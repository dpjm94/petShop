import React, {Fragment} from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#000000" };
    }
};


const Menu = ({history}) => (

    <header className="site-header">
        <div className="wrapper wrapper__top">

        <div className="site-header__menu-content">
            <div className="site-header__logo">
                <a className="site-header__link" href="/">
                    <p>Pet Shop</p>
                </a>
            </div>

            <nav className="primary-nav primary-nav--pull-right">
        <ul>
            <li>
                <Link
                    className="primary-nav__link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li>
                <Link
                    className="primary-nav__link"
                    style={isActive(history, "/contact")}
                    to="/contact"
                >
                    Contact
                </Link>
            </li>


            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li>
                    <Link
                        className="primary-nav__link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li>
                    <Link
                        className="primary-nav__link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li>
                        <Link
                            className="primary-nav__link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="primary-nav__link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li>
                    <span
                        className="primary-nav__link"
                        style={{ cursor: "pointer", color: "#000000" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
        </nav>
        
        </div>
        </div>
    </header>
);

export default withRouter(Menu);
