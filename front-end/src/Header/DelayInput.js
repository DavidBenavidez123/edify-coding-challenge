import React from 'react';
import { useState, useEffect } from 'react'
import Toggle from 'react-toggle'

function DelayInput(props) {



    const [toggleFlag, setToggleFlag] = useState(false)
    const { simulatedDelay } = props

    useEffect(() => {
        toggleFlag ? simulatedDelay(2000) : simulatedDelay(0)
    }, [toggleFlag])

    const handleInput = (e) => {
        setToggleFlag(e.target.checked)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ display: 'inline-block', margin: '0px', marginRight: '10px' }}>
                2 second network delay
            </p>
            <Toggle
                defaultChecked={toggleFlag}
                name='milkIsReady'
                value={toggleFlag}
                onChange={handleInput}
            />

        </div>
    );
}

export default DelayInput;