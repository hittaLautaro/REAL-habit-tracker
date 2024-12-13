import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { HabitContext } from "../contexts/HabitContext";

function AddHabitModal() {
  const { addHabit } = useContext(HabitContext);

  const [show, setShow] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("");
  const [err, setError] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habitName.trim()) {
      setError("Habit name is required");
      return;
    }

    if (!habitFrequency || habitFrequency <= 0) {
      setError("Habit frequency must be a positive number");
      return;
    }

    addHabit({
      name: habitName,
      frequency: habitFrequency,
      activeDays: selectedDays,
    });

    setHabitName("");
    setHabitFrequency("");
    setSelectedDays([]);

    handleClose();
  };

  return (
    <>
      <button className="mx-3 btn btn-outline-light " onClick={handleShow}>
        <i className="bi bi-plus-lg me-2"></i>
        <span className="custom-font">Add </span>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-custom modal-dialog-centered"
      >
        {err && (
          <div className="alert alert-danger mt-3 mx-3 mb-0" role="alert">
            {err}
          </div>
        )}
        <Modal.Header closeButton>
          <Modal.Title className="display-6">Add Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="habitName">
              <Form.Label className="h5">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Go running"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="habitDescription">
              <Form.Label className="h5">Frequency </Form.Label>
              <Form.Control
                type="number"
                rows={3}
                placeholder="Ex: 3"
                onChange={(e) => setHabitFrequency(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="habitDays">
              <Form.Label className="h5">Days of the week</Form.Label>
              <div>
                {[
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ].map((day) => (
                  <Form.Check
                    key={day}
                    type="checkbox"
                    id={`day-${day}`}
                    label={day}
                    checked={selectedDays.includes(day)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDays([...selectedDays, day]);
                      } else {
                        setSelectedDays(selectedDays.filter((d) => d !== day));
                      }
                    }}
                  />
                ))}
              </div>
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

export default AddHabitModal;
