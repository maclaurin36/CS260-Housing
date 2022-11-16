import { useState, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        setOptions(props.propOptions);
    }, [props]);
    
    useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);

    const changeSelection = (e) => {
        setSelected(e.target.value);
        props.notify(e.target.value);
    };
    
    const getSelected = () => {
        if (selected === null) {
            return "";
        }
        else {
            return selected;
        }
    };

    return (
        <select value={getSelected()} onChange={(e) => changeSelection(e)}>
            <option key="" value=""></option>
            {
                options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))
            }
        </select>
    );
};

export default Dropdown;
