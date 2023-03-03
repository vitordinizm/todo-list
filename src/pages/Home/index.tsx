import { useEffect, useState } from 'react'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'

import styles from './styles.module.css'
import clipboardIcon from '../../assets/clipboard-icon.svg'

export interface TodoListProps {
  id: number
  text: string
  finished: boolean
}

export function Home() {
  const [todoList, setTodoList] = useState<TodoListProps[]>([])
  const [finishedTodos, setFinishedTodos] = useState<number>(0)

  const storageKey = '@ignite-todo-list'

  const storageTodos = localStorage.getItem(storageKey)

  useEffect(() => {
    if (!todoList.length && storageTodos) {
      const storageTodosConverted = JSON.parse(storageTodos)

      setTodoList(storageTodosConverted)
    }

    if (!finishedTodos) {
      todoList.map((todo) => {
        return todo.finished ? setFinishedTodos((state) => state + 1) : ''
      })
    }

    if (todoList.length) {
      localStorage.setItem(storageKey, JSON.stringify(todoList))
    }
  }, [finishedTodos, storageTodos, todoList])

  const handleSetNewTodo = (text: string) => {
    const newId = Number(new Date())

    if (text.length) {
      setTodoList((state) => [...state, { id: newId, text, finished: false }])
    }
  }

  const markTodoAsFinished = (id: number) => {
    setTodoList((state) =>
      state.map((todo) => {
        switch (todo.id) {
          case id:
            if (!todo.finished) {
              setFinishedTodos(finishedTodos + 1)
              return { ...todo, finished: true }
            } else {
              setFinishedTodos(finishedTodos - 1)
              return { ...todo, finished: false }
            }
          default:
            return todo
        }
      }),
    )
  }

  const removeTodo = (id: number, finished: boolean) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== id)

    if (todoList.length) localStorage.removeItem(storageKey)

    if (finished) setFinishedTodos((state) => state - 1)

    setTodoList(filteredTodos)
  }

  return (
    <main className={styles.home}>
      <TodoForm onSetNewTodo={handleSetNewTodo} />
      <section className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.created}>
            Tarefas criadas{' '}
            <span className={styles.counter}>{todoList.length}</span>
          </div>
          <div className={styles.done}>
            Conclúidas
            <span className={styles.counter}>
              {finishedTodos} {todoList.length ? `de ${todoList.length}` : ''}
            </span>
          </div>
        </div>
        {!todoList.length ? (
          <div className={styles.empty}>
            <img src={clipboardIcon} alt="" />
            <p className={styles.emptyMessage}>
              Você ainda não tem tarefas cadastradas
            </p>
            <span className={styles.emptyMessage}>
              Crie tarefas e organize seus itens a fazer
            </span>
          </div>
        ) : (
          <ul className={styles.list}>
            {todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                finished={todo.finished}
                onMarkTodoAsFinished={markTodoAsFinished}
                onRemoveTodo={removeTodo}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
