import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface EditDialogProps {
  onSuccess: (front: string, back: string, flashcard_id?: number) => void;
  label: string;
  show: boolean;
  onHide: () => void
  flashcard_id?: number
  oldFront?: string
  oldBack?: string 
}

const EditDialog: React.FC<EditDialogProps> = ({onSuccess, label, show, onHide, flashcard_id, oldFront="Front...",  oldBack="Back..."}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);



  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>)=> {
    event.preventDefault();
    if (flashcard_id) {
      onSuccess(front, back, flashcard_id);
    }
    else {
      onSuccess(front, back);
    }
  }
  const handleSave = () => {
    {
        if (front && back){
            if (flashcard_id) {
              onSuccess(front, back, flashcard_id);
            }
            else {
              onSuccess(front, back);
            }
            onHide();}
        }
      }

  return (
    <>
      <Modal show={show} onHide={onHide} onEntered={() => inputRef.current?.focus()}>
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Enter the front of the flashcard</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder={oldFront}
                onChange={(e) => setFront(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter the back of the flashcard</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder={oldBack}
                onChange={(e) => setBack(e.target.value)}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Submit flashcard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditDialog;