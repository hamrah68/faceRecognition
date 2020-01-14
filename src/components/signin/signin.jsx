import "./signin.css";
import React, { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const onEmailChange = event => {
    setSigninEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setSigninPassword(event.target.value);
  };

  const onSubmitSignIn = event => {
    event.preventDefault();
    if (signinEmail === "" && signinPassword === "") {
      setLoginErrorMessage("ایمیل و رمز عبور خود را وارد نمایید.");
    } else {
      fetch("https://quiet-dusk-55757.herokuapp.com/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signinEmail,
          password: signinPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            loadUser(user);
            onRouteChange("home");
          } else {
            setLoginErrorMessage("ایمیل یا رمز عبور اشتباه است.");
          }
        });
    }
  };

  return (
    <div>
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form onSubmit={onSubmitSignIn} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0"></legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f3" htmlFor="email-address">
                  ایمیل
                </label>

                <input
                  onChange={onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">
                  رمز عبور
                </label>

                <input
                  onChange={onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                type="submit"
                value="ورود"
                // onClick={onSubmitSignIn}
              />
            </div>

            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f3 link dim black db pointer"
              >
                ثبت نام
              </p>
              <p className="f3 white">{loginErrorMessage}</p>
            </div>
          </form>
        </main>
      </article>
    </div>
  );
};

export default SignIn;
