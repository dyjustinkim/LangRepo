import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Dropdown} from "react-bootstrap";

interface DocDialogProps {
  onSuccess: (file: File | null, name: string) => void;
}

const DocDialog: React.FC<DocDialogProps> = ({onSuccess}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);


  const handleClose = () => 
    {
        setShow(false);}

  const handleSave = () => {
    {
        if (name){
            onSuccess(file, name);
            setShow(false);}
        }
      }
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>)=> {
    event.preventDefault();

  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }
  
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>
        Add Document
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label">Upload file</Form.Label>
                <input className="form-control" type="file" onChange={handleFile}></input>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter document nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder = {name}
                onChange={(e) => setName(e.target.value)}
                ref={inputRef}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleSave()}>
            Submit Document
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DocDialog;