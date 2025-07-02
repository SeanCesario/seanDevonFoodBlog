import { useEffect } from "react";
import Feed from "../components/Feed/Feed";
import '../styles/styles.scss';

function Landing() {

    useEffect(() => {
        fetch("https://99zfhqf81f.execute-api.us-east-1.amazonaws.com/media")
            .then((res) => console.log(res))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <section className="landing">
            <div className="filters">
                <button className="filter">All</button>
                <button className="filter">Cheese</button>
                <button className="filter">Recipes</button>
                <button className="filter">Reviews</button>
                <button className="filter">Interviews</button>
                <button className="filter">Italian</button>
            </div>

            <Feed />
        </section>
    );
}

export default Landing;