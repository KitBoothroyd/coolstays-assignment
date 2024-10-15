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
        <div className="App">
            <h1>{type}</h1>
            <form
                action="http://localhost:8000/server.php"
                method="post"
                onSubmit={(event) => handleSubmit(event)}
            >
                <label htmlFor="input">Input: </label>
                <input
                    type="text"
                    id="input"
                    name="input"
                    value={input}
                    onChange={(event) =>
                        handleInputChange(event)
                    }
                />
                <br />
                <label htmlFor="key">Key: </label>
                <input
                    type="text"
                    id="key"
                    name="key"
                    value={key}
                    onChange={(event) =>
                        handleKeyChange(event)
                    }
                />
                <br />
                <button type="submit">{type}</button>
            </form>
            <h1>{output}</h1>
        </div>
    );
}

export default Form;
