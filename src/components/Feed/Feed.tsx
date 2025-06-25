import Tile from "./Tile";
import '../../styles/styles.scss';
// import pastaImage from '../../assets/images/pasta.png'

function Feed() {

    const feedData = [{
        id: 1,
        title: "Delicious Pasta Recipe",
        imageSrc: "../../assets/images/pasta.png",
        description: "A simple and delicious pasta recipe that you can make in under 30 minutes."
    },
    {
        id: 2,
        title: "Delicious Pasta Recipe",
        imageSrc: "../../assets/images/pasta.png",
        description: "A simple and delicious pasta recipe that you can make in under 30 minutes."
    },
    {
        id: 3,
        title: "Delicious Pasta Recipe",
        imageSrc: "../../assets/images/pasta.png",
        description: "A simple and delicious pasta recipe that you can make in under 30 minutes."
    }
    ]

    return (
        <section className="feed">
            {feedData.map(({ title, description, imageSrc }) => {
                return <Tile title={title} imageSrc={imageSrc} description={description} />
            })}
        </section>
    )
}

export default Feed