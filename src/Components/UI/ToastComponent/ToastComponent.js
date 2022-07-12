import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import './ToastComponent.scss';

const ToastComponent = (props) => {

    
    const { type, message, show } = props;
    const [showToast, setShowToast] = useState(false);
    console.log('Props : ', props);

    useEffect(() => {
        setShowToast(show)
    }, [show])

    let toastClass;
    if (type === 'success') {
        toastClass = 'success-txt';
    } else if (type === 'error') {
        toastClass = 'error-txt';
    } else if (type === 'warning') {
        toastClass = 'warning-txt';
    } else {
        toastClass = '';
    }
    return (
        message !== '' && <Toast onClose={() => props.hideToast()} className={toastClass} show={showToast} delay={3000} autohide>
            <div className={`tostcenter ${type}`}>
                <p>{message}</p>
            </div>
        </Toast>
    )
}

export default ToastComponent;