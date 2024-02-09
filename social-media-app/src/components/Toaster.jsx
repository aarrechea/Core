/* Imports */
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";



/* Toaster function */
function Toaster(props) {
    /* Constants */
    const {showToast, title, message, onClose, type} = props;



    /* Return */
    return (
        <ToastContainer position="top-center">
            <Toast onClose={onClose} show={showToast} delay={3000} autohide bg={type}>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>

                <Toast.Body>
                    <p className="text-white">{message}</p>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}



/* Exports */
export default Toaster;


