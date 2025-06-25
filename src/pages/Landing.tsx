import Feed from "../components/Feed/Feed";
import '../styles/styles.scss';

function Landing() {
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