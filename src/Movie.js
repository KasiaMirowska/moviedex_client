import React from 'react';

export default function Movie(props) {
    
    return (
        <div>
            <br />
            {props.title}
            {props.genre}
            {props.country}
            {props.voted}
            <br />
        </div>
    )
}