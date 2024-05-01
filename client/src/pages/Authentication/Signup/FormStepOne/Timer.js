import { useEffect, useState } from "react";

function Timer({seconds, isTimerVisible, setIsTimerVisible}){
    const [totalSeconds, setTotalSeconds] = useState(seconds);

    useEffect(()=>{
        const interval = setInterval(() => {
            setTotalSeconds((prevtotalSeconds)=>prevtotalSeconds-1);
        }, 1000);

        return ()=>clearInterval(interval);
    }, [])

    useEffect(()=>{
        if(totalSeconds<=0){
            setIsTimerVisible(false);
        }
    }, [totalSeconds])

    const minutesVal = Math.floor(totalSeconds / 60);
    const secondsVal = totalSeconds % 60;
    const timerString = `${String(minutesVal).padStart(2, '0')}:${String(secondsVal).padStart(2, '0')}`;

    return (
        <div className="">
            {timerString}
        </div>
        
    )
}

export default Timer;