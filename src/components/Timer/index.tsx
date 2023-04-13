import React, { useEffect, useState } from 'react'
import { TimerInterface } from '../../global.model'

const Timer: React.FC<TimerInterface> = ({time, timerIsActive, timeIsOver}) => {
    const [timer, setTimer] = useState<number>(time)

    useEffect(() => {
        if (timer > 0 && timerIsActive) {
            const interval = setInterval(() => {
                setTimer(prevState => --prevState)
            }, 1000)
            return () => clearInterval(interval);
        } else if (timer <= 0) {
            // game end
            timeIsOver();
        }
    }, [timer])

    return (
        <div className="timer">
            Time: <b>{timer}</b> sec
        </div>
    )
}

export default Timer