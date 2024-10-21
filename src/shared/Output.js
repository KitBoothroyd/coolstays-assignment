import React from "react";

const Output = (props) => {
  const errors = Object.values(props.errors);
  const result = props.result;

  return errors.length ? (
    <ul>
      {errors.map((error) => (
        <li>{error}</li>
      ))}
    </ul>
  ) : (
    <span className="output">{result}</span>
  );
};

export default Output;
