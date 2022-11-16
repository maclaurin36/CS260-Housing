import './Toggle.css';
import { useState, useEffect } from 'react';

const Toggle = (props) => {
    const [on, setOn] = useState(Boolean);
    let notify = props.notify;
    
    useEffect(() => {
        notify(on);
    }, [on])

    useEffect(() => {
        setOn(props.isChecked);
    }, []);
    
    return (
        <label class="switch">
            <input type="checkbox" defaultChecked={props.isChecked} onClick={(e) => setOn(current => !current)}/>
            <span class="slider round value"></span>
        </label>
    );
};

export default Toggle;
