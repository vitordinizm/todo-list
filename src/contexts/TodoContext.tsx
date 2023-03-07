import { createContext, ReactNode, useEffect, useState } from 'react'

interface TodoProps {
  id: number
  text: string
  finished: boolean
}

interface TodoContextProps {
  todos: TodoProps[]
  finishedTodos: number
  createNewTodo: (text: string) => void
  markTodoAsFinished: (id: number) => void
  removeTodo: (id: number, finished: boolean) => void
}

interface TodoContextProviderProps {
  children: ReactNode
}

export const TodoContext = createContext({} as TodoContextProps)

export function TodoContextProvider({ children }: TodoContextProviderProps) {
  const [todos, setTodos] = useState<TodoProps[]>([])
  const [finishedTodos, setFinishedTodos] = useState<number>(0)

  const storageKey = '@ignite-todo-list-todo-list-1.0.0'

  const storageTodos = localStorage.getItem(storageKey)

  useEffect(() => {
    if (!todos.length && storageTodos) {
      const storageTodosConverted = JSON.parse(storageTodos)

      setTodos(storageTodosConverted)
    }

    if (!finishedTodos) {
      todos.map((todo) => {
        return todo.finished ? setFinishedTodos((state) => state + 1) : ''
      })
    }

    if (todos.length) {
      localStorage.setItem(storageKey, JSON.stringify(todos))
    }
  }, [finishedTodos, storageTodos, todos])

  function createNewTodo(text: string) {
    const newId = Number(new Date())

    if (text.length) {
      setTodos((state) => [...state, { id: newId, text, finished: false }])
    }
  }

  function markTodoAsFinished(id: number) {
    setTodos((state) =>
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

  function removeTodo(id: number, finished: boolean) {
    const filteredTodos = todos.filter((todo) => todo.id !== id)

    if (todos.length) localStorage.removeItem(storageKey)

    if (finished) setFinishedTodos((state) => state - 1)

    setTodos(filteredTodos)
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        finishedTodos,
        createNewTodo,
        markTodoAsFinished,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
