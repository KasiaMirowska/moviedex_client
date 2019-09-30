import React from 'react';
import Movie from './Movie';
import MovieContext from './MovieContext';

export default class MovieList extends React.Component {
    static contextType = MovieContext;
   
    render() {
        
            let movieList = this.context.movies.map((movie, key) => {
            return <Movie
                        key={movie.filmtv_ID}
                        title={movie.film_title}
                        genre={movie.genre}
                        country={movie.country}
                        voted={movie.avg_vote}
                        />
            
        })
            return (
                <div>
                    {movieList}
                </div>
            )
   } 
    
    
} 