import { useContext } from 'react'
import { TodoContext } from '../../../../contexts/TodoContext'

import styles from './styles.module.css'

export function Counter() {
  const { todos, finishedTodos } = useContext(TodoContext)

  return (
    <div className={styles.info}>
      <div className={styles.created}>
        Tarefas criadas <span className={styles.counter}>{todos.length}</span>
      </div>
      <div className={styles.done}>
        Conclúidas
        <span className={styles.counter}>
          {finishedTodos} {todos.length ? `de ${todos.length}` : ''}
        </span>
      </div>
    </div>
  )
}
