import { useState } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'

const App = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))
  const handleClick = () => { }
  return (
    <div className="App" data-testid='App'>
      <Board boardArr={boardArr} onClick={handleClick} />
    </div>
  );
}

export default App;
