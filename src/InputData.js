import React from "react";

const InputData = (props) => {
  const changeHandler = (event) => {
    props.ondispatch({ type: props.stateType, val: event.target.value });
  };

  const validateHandler = () => {
    props.ondispatch({ type: "USER_BLUR" });
  };

  return (
    <input
      type={props.inputType}
      value={props.stateValue}
      onChange={changeHandler}
      onBlur={validateHandler}
    />
  );
};

export default InputData;
