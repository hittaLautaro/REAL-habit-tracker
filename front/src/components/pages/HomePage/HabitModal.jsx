import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import HabitService from '../../utils/habitService';

function HabitModal() {
  const [show, setShow] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitFrequency, setHabitFrequency] = useState('');
  const [habitDaily, setHabitDaily] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habitName.trim()) {
        setError('Habit name is required');
        return;
      }
      
      if (!habitFrequency || habitFrequency <= 0) {
        setError('Habit frequency must be a positive number');
        return;
      }

    HabitService.save(
        {
            name: habitName, 
            frequency: habitFrequency,
            daily: habitDaily
        })

    handleClose();
  };

  return (
    <>
      <Button variant="btn btn-dark" onClick={handleShow}>
        Add New Habit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName='modal-custom modal-dialog-centered'
      >
        <Modal.Header closeButton>
          <Modal.Title className='display-6'>Add Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="habitName">
              <Form.Label className='h5'>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="habitDescription">
              <Form.Label className='h5'>Frequency </Form.Label>
              <Form.Control
                type="number"
                rows={3}
                placeholder="Frequency"
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="habitDaily">
                <Form.Label className='h5'>Daily or Weekly</Form.Label>
                <Form.Control
                    as="select"
                    value={habitDaily}
                    onChange={(e) => setHabitDaily(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </Form.Control>
            </Form.Group>



            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Habit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HabitModal;
