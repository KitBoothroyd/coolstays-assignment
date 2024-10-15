import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Link to="/encrypt">Encrypt</Link>
            <Link to="/decrypt">Decrypt</Link>
        </>
    );
}

export default Home;