import { useState, useEffect } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'
import Alert from './Alert'

const App: React.FC = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))
  const [gameState, setGameState] = useState('ongoing')

  useEffect(() => {
    checkForWin()
    checkForDraw()
  })

  const checkForDraw = (): void => {
    const squaresLeft = boardArr.filter(item => item === '').length
    if (squaresLeft === 0) {
      setGameState('Draw')
    }
  }

  const checkForWin = (): void => {
    const firstRow = boardArr.slice(0, 3).filter(i => i === 'X')
    console.log(boardArr.slice(0, 3), firstRow);
    if (firstRow.length === 3) {
      setGameState('X wins')
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
  }
  return (
    <div className="App" data-testid='App'>
      <Alert gameState={gameState} />
      <Board boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
