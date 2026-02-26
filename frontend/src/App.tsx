import { useState } from 'react'
import './App.css'
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import GetTokenButton from './views/GetTokenButton'
import ItemList from './components/Items'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

      </div>
      <h1>LangRepo Prototype!!</h1>
      <div className="card">
        <LoginButton />
        <LogoutButton />
        <GetTokenButton />
        <ItemList />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
