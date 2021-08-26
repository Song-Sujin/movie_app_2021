import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => { // axios가 끝날때 까지 기다렸다가 계속해
    const {data: { data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    //console.log(movies);
    this.setState({movies, isLoading: false});  // 다 가지고 오면 false로 바꾸기
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading ? (<div className="loader"><span className="loader__text">Loading...</span></div>) 
        : (
          <div className="movies">
            {movies.map(movie => (
              <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres}/>
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default App;
