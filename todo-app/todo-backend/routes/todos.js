const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  try {
    req.todo = await Todo.findById(id)
    if (!req.todo) return res.sendStatus(404)
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {  
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { todo } = req;
  const { text, done } = req.body;
  if (text === undefined && done === undefined) {
    res.status(400).end();
  }
  if (text !== undefined) {
    todo.text = text;
  }
  if (done !== undefined) {
    todo.done = done;
  }
  await todo.save()
  res.status(204).end();
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
