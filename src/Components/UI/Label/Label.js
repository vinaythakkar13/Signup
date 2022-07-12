import React from "react";
import './Label.scss';

const Label = (props) => {
    let { title } = props;
    return (
        <p className={'labelTitle ' + props.className}>{title}{props.required && <span className="required">*</span>}</p>
    )
}

Label.defaultProps = {
    className: '',
}
export default Label;