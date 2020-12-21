import { useState } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'


const App: React.FC = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))

  const handleClick = (e: any) => {
    setBoardArr((prev) => {
      prev[e.target.id] = isNext ? 'O' : 'X'
      return prev
    })
    setIsNext(!isNext)
  }
  return (
    <div className="App" data-testid='App'>
      <Board boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
