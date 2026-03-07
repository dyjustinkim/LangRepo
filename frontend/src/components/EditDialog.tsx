import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Dropdown} from "react-bootstrap";

interface EditDialogProps {
  oldName: string;
  oldId: number | string;
  onSuccess: (oldId: number | string, newName: string) => void;
  children: React.ReactNode;
}

const EditDialog: React.FC<EditDialogProps> = ({ oldName, oldId, onSuccess, children }) => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);


  const handleClose = () => 
    {
        setShow(false);}

  const handleSave = (oldId: number | string) => {
    {
        if (newName){
            onSuccess(oldId, newName);
            setShow(false);}
        }
      }
  const handleSubmit = (oldId: number | string, event: React.SubmitEvent<HTMLFormElement>)=> {
    event.preventDefault();
    handleSave(oldId);

  }
  
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {children}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose} onEntered={() => inputRef.current?.focus()}>
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(oldId, e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter a new name</Form.Label>
              <Form.Control
                type="text"
                placeholder = {oldName}
                onChange={(e) => setNewName(e.target.value)}
                ref={inputRef}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(oldId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditDialog;