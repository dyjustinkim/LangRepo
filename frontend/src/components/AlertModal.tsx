import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


interface ModalProps {
  text: string;
  show: boolean | undefined
  onHide: () => void;
  
}

const AlertModal: React.FC<ModalProps> = ({ text, show, onHide }) => {
  return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h4>{text}</h4>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                Close
                </Button>
            </Modal.Footer>
            </Modal>
  );
};

export default AlertModal
