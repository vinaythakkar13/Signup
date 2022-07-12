import React, { useState, useEffect } from "react";
import "./CheckBox.scss";

const CheckBox = (props) => {
  let { labelTitle, id, onCheckedChange, register, name, disabled } =
    props;
  const [checked, setChecked] = useState(!!props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const onChecked = (e) => {
    setChecked(e.target.checked);
    onCheckedChange && onCheckedChange(e.target.checked);
  };

  return (
    <div className="checkboxMain">
      <input
        type="checkbox"
        ref={register}
        disabled={disabled}
        name={name}
        value={labelTitle}
        id={id}
        className="checkbox"
        checked={checked}
        onChange={(e) => {
          onChecked(e);
        }}
      />
      <label className="" id="checkLabel" htmlFor={id}>
        {labelTitle}
        {props.subtitle && <a href={props.link} target={'_blank'} rel="noreferrer">{' '+props.subtitle}</a>}
      </label>
    </div>
  );
};

CheckBox.defaultProps = {
  id: "",
  checked: false,
  labelTitle: "Title",
};

export default CheckBox;
