import React from "react";
import Menu from "./Menu";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div style={{height:"100%"}}>
    <Menu />
   
    <div className="wrapper">
        <div className="gridbook">
        <div className="layout">
            <div className="layout__text-content">
            <img className="layout__photo" src={require("../assets/images/k-logo.png")}></img>
            <h2 className="layout__title">{title}</h2>
            <p className="layout__lead">{description}</p>
            </div>
        </div>
        <div className={className}>{children}</div>
    </div>
</div>
</div>
);

export default Layout;
