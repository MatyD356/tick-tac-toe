import { useState } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'

const App = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill('x'))
  const handleClick = () => {
    setIsNext(!isNext)
  }
  return (
    <div className="App" data-testid='App'>
      <Board boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
