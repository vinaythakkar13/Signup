import React from 'react';
import { Form } from 'react-bootstrap';
import './TextField.scss';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const TextField = (props) => {
    let { errors, placeholder, multiErrorFields, disabled, type, textarea, name, autoFocus, handleFocus, handleBlur, iconClass, maxLength,
        onIconClick, onKeyDown, formMethod, rows, defaultValue, rules, errorIcon, successIcon, readOnly } = props

    let values = formMethod?.getValues()
    let hasError = errors[name] !== undefined;

    return (
        <div className="textField">
            <>
                <Controller
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Form.Control
                                name={name}
                                placeholder={placeholder}
                                autoFocus={autoFocus}
                                disabled={disabled}
                                autoComplete="off"
                                type={type}
                                as={textarea}
                                readOnly={readOnly}
                                rows={rows}
                                onBlur={() => handleBlur}
                                onKeyDown={onKeyDown}
                                maxLength={maxLength}
                                onFocus={(e) => { handleFocus && handleFocus(e) }}
                                onChange={(e) => {
                                    onChange && onChange(e.target.value.trimLeft())
                                    props.onChange && props.onChange(e);
                                }}
                                value={formMethod.watch(name) || value ? value : ''}
                            />
                        </>
                    )}
                    name={name}
                    control={formMethod?.control}
                    rules={rules}
                />
                <div className='iconSection'>
                    <i className={"icon-css " + iconClass} onClick={() => values[name] && values[name] !== '' && onIconClick()}></i>
                </div>
            </>

            {multiErrorFields.length > 0 ?
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ messages }) => {
                        if (messages) {
                            let isMultipleError = Object.keys(messages).every((errKey) => multiErrorFields.filter((m) => m[errKey] !== undefined).length > 0)
                            if (isMultipleError) {
                                let arr = []
                                for (const fieldError of multiErrorFields) {
                                    let key = Object.keys(fieldError)[0]
                                    let success = Object.keys(messages).includes(key)
                                    arr.push(
                                        <div className={success ? 'red' : 'green'} key={key}>
                                            <span key={key}><i className={success ? errorIcon : successIcon} />{fieldError[key]}</span>
                                        </div>
                                    )
                                }
                                return <div className="errorMsg show passwordcustom">{arr}</div>
                            } else {
                                return <div className='errorMsg show'><i className={errorIcon} />{errors[name]?.message}</div>
                            }
                        } else {
                            return <div className='errorMsg'></div>
                        }
                    }}
                /> : hasError ? (
                    <div className='errorMsg show'>
                        <span>
                            <i className={errorIcon} />
                            {errors[name]?.message}
                        </span>
                    </div>
                ) : (
                    <div className='errorMsg'></div>
                )
            }
        </div>
    );
}

TextField.defaultProps = {
    autoFocus: false,
    value: '',
    errors: {},
    multiErrorFields: [],
    noNegative: false,
    errorIcon: 'icon-error_outline',
    successIcon: 'icon-checkmark',
    readOnly: false
}

export default TextField;
