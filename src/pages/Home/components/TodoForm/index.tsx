import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import styles from './styles.module.css'

interface TodoFormProps {
  onSetNewTodo: (text: string) => void
}

export function TodoForm({ onSetNewTodo }: TodoFormProps) {
  const [taskInput, setTaskInput] = useState<string>('')

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setTaskInput(event.target.value)
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()

    onSetNewTodo(taskInput)
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
