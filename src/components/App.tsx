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
    console.log(isNext);

  })
  const reset = (): void => {
    setBoardArr(Array(9).fill(''))
    setGameState('ongoing')
    setIsNext(false)
  }
  const checkForDraw = (): void => {
    //bug when last move wins the game
    const squaresLeft = boardArr.filter(item => item === '').length
    if (squaresLeft === 0) {
      setGameState('Draw')
    }
  }

  //TO DO IMPROVE
  const checkForWin = (): void => {

    const sign = isNext ? 'X' : 'O'

    const firstRow = boardArr.slice(0, 3).filter(i => i === sign).length
    const secondRow = boardArr.slice(3, 6).filter(i => i === sign).length
    const thirdRow = boardArr.slice(6, 9).filter(i => i === sign).length

    const firstColumn = [boardArr[0], boardArr[3], boardArr[6]].filter(i => i === sign).length
    const secondColumn = [boardArr[1], boardArr[4], boardArr[7]].filter(i => i === sign).length
    const thirdColumn = [boardArr[2], boardArr[5], boardArr[8]].filter(i => i === sign).length

    const firstDiagonal = [boardArr[0], boardArr[4], boardArr[8]].filter(i => i === sign).length
    const secondDiagonal = [boardArr[2], boardArr[4], boardArr[6]].filter(i => i === sign).length

    if (firstRow === 3 || secondRow === 3 || thirdRow === 3) {
      setGameState(`${sign} wins`)
    } else if (firstColumn === 3 || secondColumn === 3 || thirdColumn === 3) {
      setGameState(`${sign} wins`)
    } else if (firstDiagonal === 3 || secondDiagonal === 3) {
      setGameState(`${sign} wins`)
    }
  }

  const updateBoard = (id: any) => {
    if (boardArr[id] === '') {
      setBoardArr((prev) => {
        prev[id] = isNext ? 'O' : 'X'
        return prev
      })
      setIsNext(!isNext)
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (gameState === 'ongoing') {
      updateBoard((e.target as any).id)
    }
    else if (gameState === 'draw' || gameState === 'X wins' || gameState === 'O wins') {
      reset()
    }
  }
  return (
    <div className="App" data-testid='App'>
      <Alert isNext={isNext} gameState={gameState} restart={reset} />
      <Board boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
