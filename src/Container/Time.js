import React, { useEffect, useState } from 'react';

function TimerFunc(props) {
    const [timer, setTimer] = useState(new Date())

    useEffect(() => {
        // console.log('MOUNTING');
        const timeI = setInterval(() => {
            setTimer(new Date())
        }, 1000)
        return () => {
            // console.log('UNMOUNTIND');
            clearInterval(timeI)
        }
    }, [timer])

    return (
        <div>
            <p>{timer.toLocaleTimeString()}</p>
        </div>
    );
}

export default TimerFunc;