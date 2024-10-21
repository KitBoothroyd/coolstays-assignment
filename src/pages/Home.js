import { useState } from "react";
import $ from "jquery";
import { useParams } from 'react-router-dom';
import React from "react";

const Home = () => {
    const [input, setInput] = useState("");
    const [key, setKey] = useState("");
    const [output, setOutput] = useState("");
    const [errors, setErrors] = useState([]);

    const handleInputChange = (e) => {   
        setInput(e.target.value);
    };

    const handleKeyChange = (e) => {
        setKey(e.target.value);
    };

    const handleSubmit = (e) => {
        setErrors([]);
        let newErrors = [];

        if (!input) {
            newErrors.push("x Enter an input");
        }
        
        if (!key) {
            newErrors.push("x Enter a key");
        }

        setErrors(newErrors);

        e.preventDefault();
        const form = $(e.target);

        if (!newErrors.length) {
            $.ajax({
                type: "POST",
                url: form.attr("action"),
                data: form.serialize(),
                success(data) {
                    setOutput(data);
                },
            });
        }
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
                    onChange={(event) =>
                        handleInputChange(event)
                    }
                    autoFocus
                />
                <br />
                <input
                    placeholder="key"
                    type="password"
                    id="key"
                    name="key"
                    value={key}
                    onChange={(event) =>
                        handleKeyChange(event)
                    }
                />
                <br />
                <div className="dropdown-container">
                    <select name="type" id="type">
                        <option>encrypt</option>
                        <option>decrypt</option>
                    </select>
                <button type="submit">{">"}</button>
                </div>
                <div>{errors}</div>
            </form>
            <span className="output">{output}</span>
        </>
    );
}

export default Home;
