import { useContext } from 'react'
import { TodoContext } from '../../../../contexts/TodoContext'
import { TodoItem } from '../TodoItem'

import styles from './styles.module.css'

export function TodoList() {
  const { todos } = useContext(TodoContext)

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => {
        return <TodoItem id={todo.id} key={todo.id} />
      })}
    </ul>
  )
}
