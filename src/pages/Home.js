import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Link to="/encrypt" className="m-r-50"><b>ENCRYPT</b></Link>
            <Link to="/decrypt"><b>DECRYPT</b></Link>
        </div>
    );
}

export default Home;