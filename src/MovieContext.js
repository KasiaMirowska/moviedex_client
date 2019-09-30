import React from 'react';

const MovieContext = React.createContext({
    movies: [],
    loading: false,
    updateMovies: () => {},
    updateLoading: () => {},
    updatePath: () => {},
});

export default MovieContext;