import { Header } from './components/Header'
import { TodoContextProvider } from './contexts/TodoContext'
import { Home } from './pages/Home'

import './styles/global.css'

export function App() {
  return (
    <TodoContextProvider>
      <Header />
      <Home />
    </TodoContextProvider>
  )
}
