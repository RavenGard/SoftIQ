import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Nav } from './Components/Nav/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div><Nav/></div>
  )
}

export default App
