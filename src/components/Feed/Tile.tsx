import '../../styles/styles.scss';

type TileProps = {
    imageSrc: string;
    title: string;
    description: string;
}

function Tile({ imageSrc, title, description }: TileProps) {
    return (
        <div className="tile">
            <img src={imageSrc} alt="Tile" />
            <h1 className="title">{title}</h1>
            <br />
            <p className="description">{description}</p>
        </div>
    )
}

export default Tile