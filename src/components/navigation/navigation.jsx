import React from "react";
import "./navigation.css";
const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="navigation-component-main">
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim white underline pa3 pointer"
        >
          خروج
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="navigation-component-main">
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim white underline pa3 pointer"
          >
            ورود
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim white underline pa3 pointer"
          >
            ثبت نام
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
