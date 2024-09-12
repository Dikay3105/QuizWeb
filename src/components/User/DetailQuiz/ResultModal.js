import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ResultModal = ({ isShowModalResult, setIsShowModalResult, dataModalResult }) => {
    const handleClose = () => {
        setIsShowModalResult(false); // Đóng modal
    };

    return (
        <Modal show={isShowModalResult} onHide={handleClose} className="modal-result">
            <Modal.Header closeButton>
                <Modal.Title>Quiz Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Total questions: {dataModalResult.countTotal}</div>
                <div>Total correct answers: {dataModalResult.countCorrect}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResultModal;
