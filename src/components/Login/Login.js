import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { act } from "react-dom/test-utils";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isVaild: action.val.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isVaild: state.value.includes("@") };
  }
  return { value: "", isVaild: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isVaild: action.val.trim().length > 6 };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isVaild: state.value.trim().length > 6 };
  }
  return { value: "", isVaild: false };
};

const collageReducer = (state, action) => {
  if (action.type === "USER_COLLAGE") {
    return {
      value: action.val,
      isVaild: action.val.trim().length > 0,
    };
  }
  if (action.type === "USER_BLUR") {
    return {
      value: state.value,
      isVaild: state.value.trim().length > 0,
    };
  }
  return { value: "", isVaild: "" };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredCollageName, setEnteredCollageName] = useState("");
  // const [collageNameISVaild, setEnteredCollageISVaild] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, despatchEmail] = useReducer(emailReducer, {
    value: "",
    isVaild: false,
  });

  const [passwrodState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isVaild: false,
  });

  const [collageState, dispatchCollage] = useReducer(collageReducer, {
    value: "",
    isVaild: false,
  });

  useEffect(() => {
    setTimeout(() => {
      console.log("Heyy");
      setFormIsValid(
        emailState.isVaild && passwrodState.isVaild && collageState.isVaild
      );
    }, 500);

    return () => {};
  }, [emailState, passwrodState, collageState]);

  const emailChangeHandler = (event) => {
    despatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const collageNameChangeHandler = (event) => {
    dispatchCollage({ type: "USER_COLLAGE", val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: "USER_PASS", val: event.target.value });

    setFormIsValid(
      emailState.isVaild && passwrodState.isVaild && collageState.isVaild
    );
  };

  const validateEmailHandler = () => {
    despatchEmail({ type: "USER_BLUR" });
  };

  const validateCollageNameHandler = () => {
    dispatchCollage({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwrodState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collageName">Collage Name</label>
          <input
            type="text"
            id="collageName"
            value={collageState.value}
            onChange={collageNameChangeHandler}
            onBlur={validateCollageNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwrodState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwrodState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
