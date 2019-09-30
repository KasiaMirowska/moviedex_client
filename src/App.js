import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from './MovieList';
import Form from './Form';
import MovieContext from './MovieContext';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: false,
      path: ''
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    let baseURL = 'http://localhost:8000/movies';
    return fetch(baseURL, {
      headers: {
        Authorization: 'Bearer e9f53cae-e122-11e9-81b4-2a2ae2dbcce4',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('server not working');
        }
        return res.json();
      })
      .then(serverData => {
        this.setState({
          movies: serverData,
          loading: false,
        })
      })
  }

  updateMovies = (newData) => {
    this.setState({
      movies: newData,
    })
  }

  updateLoading = (boolean) => {
    this.setState({
      loading: boolean,
    })
  }

  updatePath = (newPath) => {
    this.setState({
      path: newPath,
    })
  }
  render() {
    const contextValue = {
      movies: this.state.movies,
      loading: this.state.loading,
      updateMovies: this.updateMovies,
      updateLoading: this.updateLoading,
      upadatePath: this.updatePath,
    }
    
    return (
      <div className="App">
        <MovieContext.Provider value={contextValue}>
          {this.state.loading ? 'Hello!' :
            <React.Fragment>
              <Route  path='/movies' component={Form} />
              <Route exact path='/movies' component={MovieList} />
            </React.Fragment>
          }
          
          {this.state.loading ? 'Searching!' :
            <Route path={this.state.path} />}
        </MovieContext.Provider>
      </div>
    );
  }

}


