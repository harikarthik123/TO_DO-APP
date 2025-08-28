import Todo from '../models/Todo.js';

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            user: req.user.id,
            ...req.body
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateTodo = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(500).send('Server Error');
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Todo.findByIdAndDelete(req.params.id);

        res.json({ message: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(500).send('Server Error');
    }
};

export { getTodos, createTodo, updateTodo, deleteTodo };
