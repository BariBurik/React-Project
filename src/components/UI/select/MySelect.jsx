import React from 'react';
import classes from './MySelect.module.css'
import {deselectOptions} from "@testing-library/user-event/dist/select-options";

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            className={classes.mySelect}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option value='' disabled>{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;