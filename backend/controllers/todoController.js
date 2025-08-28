import Todo from "../models/Todo.js";

// Get all todos for a user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const { title, description, startDate, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ msg: 'Please enter a title for the todo' });
  }

  try {
    const newTodo = new Todo({
      user: req.user.id,
      title,
      description,
      startDate,
      deadline,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateTodo = async (req, res) => {
  const { title, description, startDate, deadline, completed } = req.body;

  // Build todo object
  const todoFields = {};
  if (title) todoFields.title = title;
  if (description) todoFields.description = description;
  if (startDate !== undefined) todoFields.startDate = startDate;
  if (deadline !== undefined) todoFields.deadline = deadline;
  if (completed !== undefined) todoFields.completed = completed;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    // Make sure user owns todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
