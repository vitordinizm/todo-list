import { TodoListProps } from '../..'
import { Circle, CheckCircle, Trash } from 'phosphor-react'

import styles from './styles.module.css'

interface TodoItemProps extends TodoListProps {
  onMarkTodoHasFinished: (id: number) => void
  onRemoveTodo: (id: number, finished: boolean) => void
}

export function TodoItem({
  id,
  text,
  finished,
  onMarkTodoHasFinished,
  onRemoveTodo,
}: TodoItemProps) {
  const handleMarkTodoHasFinished = () => {
    onMarkTodoHasFinished(id)
  }

  const handleRemoveTodo = () => {
    onRemoveTodo(id, finished)
  }

  return (
    <li
      className={`${styles.item} ${finished ? styles.finished : ''}`}
      data-finished={finished}
      key={id}
    >
      <label className={styles.finish} htmlFor={`${id}`}>
        {finished ? <CheckCircle size={18} /> : <Circle size={18} />}
      </label>
      <input
        type="checkbox"
        id={`${id}`}
        data-checked={finished}
        onClick={handleMarkTodoHasFinished}
        hidden
      />
      <span className={styles.text}>{text}</span>
      <button className={styles.trash} onClick={handleRemoveTodo}>
        <Trash size={18} />
      </button>
    </li>
  )
}
