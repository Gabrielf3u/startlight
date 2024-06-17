import React from "react";
import '../App.css';

interface State {
    time: number;
    seconds: number;
    minutes: number;
    hours: number;
}

interface Props { 
    time: number;
}

const Timer: React.FC<Props> = ({ time }) => {
    const [state, setState] = React.useState<State>({
        time,
        seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
        minutes: Math.floor(((time - Math.floor((time - 1) / 3600) * 3600) - 1) / 60),
        hours: Math.floor((time - 1) / 3600),
    });
    React.useEffect(() => {
        setTimeout(() => {
            if (state.time === 0) {
                return;
            }
            setState({
                time: state.time - 1,
                hours: Math.floor((state.time - 1) / 3600),
                minutes: Math.floor(((state.time - Math.floor((state.time - 1) / 3600) * 3600) - 1) / 60),
                seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
            });
        }, 1000);
    }, [state.time])

    return (
        <div className="timer">
            {
                state.minutes >= 10 ? 
                    `${state.hours}hrs : ${state.minutes}m` /*: ${ state.seconds <= 10 ? 
                        `0${state.seconds}` : state.seconds}`*/ : 
                    `${state.hours}hrs : 0${state.minutes}m` /*: ${ state.seconds <= 10 ? 
                        `0${state.seconds}` : state.seconds}`*/
            }
        </div>
    );
};

export default Timer;