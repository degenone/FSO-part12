const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require('../redis');
const { Todo } = require('../mongo');

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  let added_todos = await getAsync('added_todos');
  if (added_todos === null) {
    added_todos = await Todo.countDocuments({});
    await setAsync('added_todos', added_todos);
  }
  res.json({ added_todos });
})

module.exports = router;
