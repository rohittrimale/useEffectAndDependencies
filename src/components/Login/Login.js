import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Store/auth-context";
import InputData from "../../InputData";

export const emailReducer = (state, action) => {
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
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const collageNameInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isVaild: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isVaild: false,
  });

  const [collageState, dispatchCollage] = useReducer(collageReducer, {
    value: "",
    isVaild: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setFormIsValid(
        emailState.isVaild && passwordState.isVaild && collageState.isVaild
      );
    }, 500);

    return () => {};
  }, [emailState, passwordState, collageState]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isVaild) {
      emailInputRef.current.focus();
    } else if (!collageState.isVaild) {
      collageNameInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
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
          <InputData
            ref={emailInputRef}
            id="email"
            ondispatch={dispatchEmail}
            stateValue={emailState.value}
            stateType={"USER_INPUT"}
            inputType="email"
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collageName">Collage Name</label>
          <InputData
            ref={collageNameInputRef}
            id="collageName"
            ondispatch={dispatchCollage}
            stateValue={collageState.value}
            stateType={"USER_COLLAGE"}
            inputType="text"
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <InputData
            ref={passwordInputRef}
            id="password"
            ondispatch={dispatchPassword}
            stateValue={passwordState.value}
            stateType={"USER_PASS"}
            inputType="password"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
