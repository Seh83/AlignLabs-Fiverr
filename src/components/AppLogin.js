import React from "react";
import "../App.css";
import styles from "./AppLogin.module.css";

function AppLogin({ setUserAuthenticated }) {
  let userEmail, userPassword;

  function userAuthenticationCheck(event) {
    if (
      userEmail.value === "joe@mail.com" &&
      userPassword.value === "Test123"
    ) {
      setUserAuthenticated(true);
    }
  }

  return (
    <div className={styles.loginForm}>
      <form>
        <label htmlFor="email">Login Email:</label>
        <br></br>
        <input
          ref={(c) => (userEmail = c)}
          type="email"
          id="email"
          name="email"
        ></input>
        <br></br>
        <label htmlFor="password">Password:</label>
        <br></br>
        <input
          ref={(c) => (userPassword = c)}
          type="password"
          id="password"
          name="password"
        ></input>
        <br></br>
        <button
          style={{
            marginLeft: "30%",
            padding: "4%",
            marginTop: "5%",
          }}
          type="submit"
          value="Submit"
          onClick={userAuthenticationCheck}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AppLogin;
