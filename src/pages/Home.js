import { useState } from "react";
import $ from "jquery";
import React from "react";
import Output from "shared/Output";

const Home = () => {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleErrors = () => {
    setErrors({});
    let newErrors = {};

    if (!input) {
      newErrors["input"] = "enter an input";
    }
    if (!key) {
      newErrors["key"] = "enter a key";
    }

    setErrors(newErrors);

    return Boolean(Object.entries(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
    const canProceed = handleErrors();

    e.preventDefault();
    const form = $(e.target);

    canProceed &&
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
          setResult(data);
        },
      });
  };

  return (
    <>
      <form
        action="http://localhost:8000/server.php"
        method="post"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          placeholder="input"
          type="text"
          id="input"
          name="input"
          value={input}
          onChange={(event) => handleInputChange(event)}
          autoFocus
        />
        <br />
        <input
          placeholder="key"
          type="password"
          id="key"
          name="key"
          value={key}
          onChange={(event) => handleKeyChange(event)}
        />
        <br />
        <div className="dropdown-container">
          <select name="type" id="type">
            <option>encrypt</option>
            <option>decrypt</option>
          </select>
          <button type="submit">{">"}</button>
        </div>
      </form>

      <Output errors={errors} result={result} />
    </>
  );
};

export default Home;
