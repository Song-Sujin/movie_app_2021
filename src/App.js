import React from 'react';
import axios from "axios";
import Movie from "./Movie";

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
      <section class="container">
        {isLoading ? 
        (<div class="loader"><span class="loader__text">Loading...</span></div>) 
        : 
        movies.map(movie => // map()은 return이 반드시 필요. => 는 return이 포함되어 있음. map안에서의 movie는 내가 방금 만든 이름
          <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image}/>
        )}
      </section>
    )
  }
}

export default App;
