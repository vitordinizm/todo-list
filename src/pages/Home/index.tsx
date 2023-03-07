import { useContext } from 'react'
import { Counter } from './components/Counter'
import { Clipboard } from './components/Clipboard'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'
import { TodoContext } from '../../contexts/TodoContext'

import styles from './styles.module.css'

export function Home() {
  const { todos } = useContext(TodoContext)

  return (
    <div className={styles.container}>
      <TodoForm />
      <div className={styles.tasks}>
        <Counter />

        {todos.length ? (
          <ul>
            {todos.map((todo) => {
              return <TodoItem id={todo.id} key={todo.id} />
            })}
          </ul>
        ) : (
          <Clipboard />
        )}
      </div>
    </div>
  )
}
