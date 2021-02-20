import React from 'react';
import { useEffect, useState } from 'react'

function SearchFilter(props) {

    const [text, setText] = useState('')


    useEffect(() => {
        setText(props.clickedTag)
    }, [props.clickedTag])


    const handleChange = (e) => {
        setText(e.target.value)
        props.tagFuzzySearch(e.target.value)

    }
    return (
        <div className='Search'>
            Search by tag <input onChange={(e) => handleChange(e)} name='tag' value={text} />
        </div>
    );
}

export default SearchFilter;