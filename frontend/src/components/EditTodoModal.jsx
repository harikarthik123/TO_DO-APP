import { useState, useEffect } from "react";
import styled from "styled-components";

export default function EditTodoModal({ todo, onClose, onSave }) {
  const [form, setForm] = useState({ title: "", description: "", startDate: "", deadline: "" });

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title,
        description: todo.description,
        startDate: todo.startDate ? todo.startDate.split("T")[0] : "",
        deadline: todo.deadline ? todo.deadline.split("T")[0] : "",
      });
    }
  }, [todo]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForm = {
      ...form,
      startDate: form.startDate || null, // Send null if empty string
      deadline: form.deadline || null,   // Send null if empty string
    };
    onSave(updatedForm);
  };

  if (!todo) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Edit Todo</ModalTitle>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <ModalTextarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <ModalInput
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
          <ModalInput
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
          <ModalActions>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">
              Save
            </SaveButton>
          </ModalActions>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  transform: translateY(-50px);
  animation: scaleIn 0.3s forwards;

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem; /* Larger title */
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #2196f3; /* Highlight on focus */
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #2196f3; /* Highlight on focus */
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.001rem 1.5rem; /* Adjusted padding */
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease; /* All properties for smoother transition */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px; /* Fixed height for buttons */
`;

const CancelButton = styled(ModalButton)`
  background: #e0e0e0;
  color: #555;

  &:hover {
    background: #cccccc;
    transform: translateY(-2px); /* Lift effect on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SaveButton = styled(ModalButton)`
  background: #2196f3;
  color: white;

  &:hover {
    background: #1976d2;
    transform: translateY(-2px); /* Lift effect on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
