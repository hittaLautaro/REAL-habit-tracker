import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useHabitsOperations } from "../hooks/useHabits.js";

function UpdateHabitModal({ habit, handleClose }) {
  const { updateHabit } = useHabitsOperations();
  const [habitName, setHabitName] = useState(habit.name);
  const [habitFrequency, setHabitFrequency] = useState(habit.frequency);
  const [selectedDays, setSelectedDays] = useState(habit.activeDayOrders);
  const [err, setError] = useState("");

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

    const payload = {
      name: habitName,
      frequency: habitFrequency,
      activeDayOrders: selectedDays.map((day, index) => ({
        dayOfWeek: day.dayOfWeek,
        position: index,
      })),
    };

    updateHabit(habit.id, payload);

    handleClose();
  };

  return (
    <Modal
      show={true}
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
        <Modal.Title className="display-6">Update Habit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="habitName">
            <Form.Label className="h5">Name</Form.Label>
            <Form.Control
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="habitFrequency">
            <Form.Label className="h5">Frequency </Form.Label>
            <Form.Control
              type="number"
              value={habitFrequency}
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
                  checked={selectedDays.some((d) => d.dayOfWeek === day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDays([
                        ...selectedDays,
                        { dayOfWeek: day, position: 0 },
                      ]);
                    } else {
                      setSelectedDays(
                        selectedDays.filter((d) => d.dayOfWeek !== day)
                      );
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
  );
}

export default UpdateHabitModal;
