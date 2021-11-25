import { Link } from "react-router-dom";
const images = "https://image.tmdb.org/t/p/w1280";
const alt_IMG = "https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2luZW1hfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";

let Movie = (props) => {
    let { id, title, poster_path, overview, vote_average } = props.movItem;
    let rating = () => {
        if(props.movItem.vote_average >= 7.9) {
            return "green";
        } else if (props.movItem.vote_average >= 6) {
            return "orange";
        } else {
            return "red";
        }
    }

    return (
        <Link to={`/movies/movie/id/${id}`} className="movie-item" onClick={() => props.getMovie(id)}>
            <img src={!poster_path ? alt_IMG : images + poster_path} alt={title} />
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <span className={`movie-rating ${rating()}`} title="rating">{vote_average}</span>
            </div>
            {/* <div className="movie-overview">
                <h4 className="movie-title">{title}</h4>
                <h4>Overview:</h4>
                <p>{overview}</p>
            </div> */}
        </Link>
    )
}

export default Movie;