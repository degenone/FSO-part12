import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => <Todo
        todo={todo}
        onClickComplete={onClickComplete}
        key={todo._id}
        onClickDelete={onClickDelete}
      />).reduce((acc, cur, i) => [...acc, <hr key={i} />, cur], [])}
    </>
  )
}

export default TodoList
