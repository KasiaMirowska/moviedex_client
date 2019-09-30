import React from 'react';
import { Link } from 'react-router-dom';
import MovieContext from './MovieContext';

class Form extends React.Component {
    static contextType = MovieContext;
    constructor(props) {
        super(props)
        console.log(props, this.context)
        this.state = {
            choice: null,
            input: null,
        }
    }

    choiceSelection = (value) => {
        console.log(value)
        this.setState({
            choice: value,
        })
    }
    input = (value) => {
        console.log(value)
        this.setState({
            input: value,
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.context.updateLoading(true)
        console.log(this.state.choice, this.state.input, 'AM I HERE????????')
        
        let baseURL = `http://localhost:8000/movies/search?${this.state.choice}=${this.state.input}`
        this.context.updatePath(`/movies/search?${this.state.choice}=${this.state.input}`)
            
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
            .then(data => {
                console.log(data, 'HEREERERERE')
                this.context.updateMovies(data)
                this.context.updateLoading(false) 
            })
                
    }
    render() {
        
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor='search'>Search movies by: </label>
                <select  required id='search' name='search' onChange={(e) => this.choiceSelection(e.target.value)}>
                    <option value=''>Pick one:</option>
                    <option value='genre'>Genre</option>
                    <option value='country'>Country</option>
                    <option value='avg-vote'>Avg vote</option>
                </select>
                <input type="text" name="input"  required onChange={(e) => this.input(e.target.value)}/>
                
                <Link to={`/movies/search?${this.state.choice}=${this.state.input}`}>
                <button type='submit'>Search</button>
                </Link>
                
            </form>
        )
    }
}
export default Form;