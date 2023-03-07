import { PlusCircle } from 'phosphor-react'
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useContext,
  useState,
} from 'react'
import { TodoContext } from '../../../../contexts/TodoContext'

import styles from './styles.module.css'

export function TodoForm() {
  const [taskInput, setTaskInput] = useState<string>('')

  const { createNewTodo } = useContext(TodoContext)

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setTaskInput(event.target.value)
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()

    createNewTodo(taskInput)
    setTaskInput('')
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Preencha o campo corretamente.')
  }

  return (
    <form className={styles.todoForm} onSubmit={handleCreateNewTodo}>
      <input
        type="text"
        placeholder="Adicionar uma nova tarefa"
        value={taskInput}
        onChange={handleNewTodoChange}
        onInvalid={handleNewCommentInvalid}
        required
      />
      <button type="submit">
        Criar <PlusCircle size={18} />
      </button>
    </form>
  )
}
