import { useState } from "react";
import $ from "jquery";
import { useParams } from 'react-router-dom';

const Form = () => {
    const { type } = useParams();
    const [input, setInput] = useState("");
    const [key, setKey] = useState("");
    const [output, setOutput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyChange = (e) => {
        setKey(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setOutput(data);
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
            </form>
            <h2>{output}</h2>
        </>
    );
}

export default Form;
