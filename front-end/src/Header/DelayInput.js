import React from 'react';
import { useState } from 'react'
function DelayInput(props) {

    const [input, setInput] = useState(0)
    const { simulatedDelay } = props

    const handleInput = (e) => {
        setInput(e.target.value)
        simulatedDelay(e.target.value)
    }

    return (
        <div>
            Enter delay in ms<input name='delay' value={input} onChange={(e) => handleInput(e)} />
        </div>
    );
}

export default DelayInput;