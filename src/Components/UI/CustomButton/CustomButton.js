import React from 'react';
import { Button } from 'react-bootstrap';
import './CustomButton.scss';

const CustomButton = (props) => {
    let { title, children, disabled, type, className } = props

    return (
        <Button
            className={"custombtn " + className}
            type={type} onKeyDown={props.onKeyDown} disabled={disabled} onClick={props.onClick} >
            {title}
            {children}
        </Button>
    )
}

CustomButton.defaultProps = {
    className: '',
    loading: false
}

export default CustomButton;