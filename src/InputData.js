import React, { useRef, useImperativeHandle } from "react";

const InputData = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  const changeHandler = (event) => {
    props.ondispatch({ type: props.stateType, val: event.target.value });
  };

  const validateHandler = () => {
    props.ondispatch({ type: "USER_BLUR" });
  };

  return (
    <input
      ref={inputRef}
      type={props.inputType}
      value={props.stateValue}
      onChange={changeHandler}
      onBlur={validateHandler}
    />
  );
});

export default InputData;
