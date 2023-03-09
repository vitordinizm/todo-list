import { useContext } from 'react'
import { Counter } from './components/Counter'
import { Clipboard } from './components/Clipboard'
import { TodoForm } from './components/TodoForm'
import { TodoContext } from '../../contexts/TodoContext'
import { TodoList } from './components/TodoList'

import styles from './styles.module.css'

export function Home() {
  const { todos } = useContext(TodoContext)

  return (
    <div className={styles.container}>
      <TodoForm />
      <div className={styles.tasks}>
        <Counter />
        {todos.length ? <TodoList /> : <Clipboard />}
      </div>
    </div>
  )
}
