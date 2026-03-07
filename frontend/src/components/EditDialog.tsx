import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Dropdown} from "react-bootstrap";

interface EditDialogProps {
  oldName: string;
  onSuccess: (oldName: string, newName: string) => void;
  children: React.ReactNode;
}

const EditDialog: React.FC<EditDialogProps> = ({ oldName, onSuccess, children }) => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState('');

  const handleClose = () => 
    {
        setShow(false);}

  const handleSave = (oldName: string) => {
    {
        if (newName){
            onSuccess(oldName, newName);
            setShow(false);}
        }
      }
  const handleSubmit = (oldName: string, event: React.SubmitEvent<HTMLFormElement>)=> {
    event.preventDefault();
    handleSave(oldName);

  }
  
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {children}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(oldName, e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter a new name</Form.Label>
              <Form.Control
                placeholder = {oldName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(oldName)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditDialog;