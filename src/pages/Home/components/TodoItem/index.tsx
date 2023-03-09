import { Circle, CheckCircle, Trash } from 'phosphor-react'
import { useContext } from 'react'
import { TodoContext } from '../../../../contexts/TodoContext'

import styles from './styles.module.css'

interface TodoItemProps {
  id: number
}

export function TodoItem({ id }: TodoItemProps) {
  const { todos, markTodoAsFinished, removeTodo } = useContext(TodoContext)

  const currentTodoIndex = todos.findIndex((todo) => todo.id === id)

  const todo = todos[currentTodoIndex]

  const handleMarkTodoAsFinished = () => {
    markTodoAsFinished(id)
  }

  const handleRemoveTodo = () => {
    removeTodo(id, todo.finished)
  }

  return (
    <li
      className={
        todo.finished ? `${styles.item} ${styles.finished}` : styles.item
      }
    >
      <label className={styles.finish} htmlFor={String(id)}>
        {todo.finished ? <CheckCircle size={18} /> : <Circle size={18} />}
      </label>
      <input
        type="checkbox"
        id={String(id)}
        onClick={handleMarkTodoAsFinished}
        hidden
      />
      <span className={styles.text}>{todo.text}</span>
      <button className={styles.trash} onClick={handleRemoveTodo}>
        <Trash size={18} />
      </button>
    </li>
  )
}
