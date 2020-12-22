import { useState } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'
import Alert from './Alert'

const App: React.FC = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))
  const [gameState, setGameState] = useState('ongoing')

  const checKforWinner = () => {
    //check for draw
    const squaresLeft = boardArr.filter(item => item === '').length - 1
    console.log(squaresLeft);
    if (squaresLeft === 0) {
      setGameState('draw')
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (boardArr[(e.target as any).id] === '') {
      setBoardArr((prev) => {
        prev[(e.target as any).id] = isNext ? 'O' : 'X'
        return prev
      })
      setIsNext(!isNext)
    }
    checKforWinner()
  }
  return (
    <div className="App" data-testid='App'>
      <Alert gameState={gameState} />
      <Board boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
