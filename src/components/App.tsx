import { useState, useEffect } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'
import Alert from './Alert'

const App: React.FC = () => {
  const [isNext, setIsNext] = useState(true)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))
  const [gameState, setGameState] = useState('onGoing')
  const [aiOn, setAiOn] = useState(true)

  useEffect(() => {
    const checkForDraw = (board: string[]): boolean | string => {
      if (gameState === 'onGoing') {
        const squaresLeft = board.filter(item => item === '').length
        if (squaresLeft === 0) {
          return 'tie'
        } else {
          return false
        }
      }
      return false
    }
    const checkForWin = (board: string[]): string => {

      const signs = ['X', 'O']

      for (let i = 0; i < signs.length; i++) {
        const firstRow = board.slice(0, 3).filter(item => item === signs[i]).length
        const secondRow = board.slice(3, 6).filter(item => item === signs[i]).length
        const thirdRow = board.slice(6, 9).filter(item => item === signs[i]).length

        const firstColumn = [board[0], board[3], board[6]].filter(item => item === signs[i]).length
        const secondColumn = [board[1], board[4], board[7]].filter(item => item === signs[i]).length
        const thirdColumn = [board[2], board[5], board[8]].filter(item => item === signs[i]).length

        const firstDiagonal = [board[0], board[4], board[8]].filter(item => item === signs[i]).length
        const secondDiagonal = [board[2], board[4], board[6]].filter(item => item === signs[i]).length

        if (firstRow === 3 || secondRow === 3 || thirdRow === 3) {
          return `${signs[i]} wins`
        } else if (firstColumn === 3 || secondColumn === 3 || thirdColumn === 3) {
          return `${signs[i]} wins`
        } else if (firstDiagonal === 3 || secondDiagonal === 3) {
          return `${signs[i]} wins`
        }
      }
      return ''
    }
    const randomAi = () => {
      const squaresLeft = boardArr.filter(item => item === '').length
      let num = 4
      while (squaresLeft > 0 && boardArr[num] !== '') {
        num = randomizeNumber(0, 8)
      }
      setIsNext(!isNext)
      setBoardArr((prev) => {
        prev[num] = isNext ? 'O' : 'X'
        return prev
      })
    }

    const minimax = (board: string[], depth: number, isMax: boolean): any => {
      return 1
    }
    const bestMove = () => {
      let bestScore = -Infinity
      let bestSpot: any
      let board = boardArr.slice(0, boardArr.length)
      for (let i = 0; i < 9; i++) {
        if (boardArr[i] === '') {
          board[i] = 'O'

          let score = minimax(board, 0, false)
          console.log(score);
          if (score > bestScore) {
            bestScore = score
            bestSpot = i
          }
        }
      }
      setIsNext(!isNext)
      setBoardArr((prev) => {
        prev[bestSpot] = isNext ? 'X' : 'O'
        return prev
      })

    }
    const randomizeNumber = (min: number, max: number): number => {
      const num = Math.floor(Math.random() * (max - min)) + min
      return num
    }
    if (checkForWin(boardArr)) {
      setGameState(`${isNext ? 'O' : 'X'} wins`)
    }
    else if (checkForDraw(boardArr) === 'tie') {
      setGameState('Draw')
    } else if (aiOn && isNext && gameState === 'onGoing') {
      bestMove()
    }
  }, [gameState, boardArr, isNext, aiOn])

  const reset = (): void => {
    setBoardArr(Array(9).fill(''))
    setGameState('onGoing')
    setIsNext(false)
  }

  const turnAi = () => {
    setAiOn(!aiOn)
  }

  const updateBoard = (id: any) => {
    if (gameState === 'onGoing') {
      if (boardArr[id] === '') {
        setBoardArr((prev) => {
          prev[id] = isNext ? 'X' : 'O'
          return prev
        })
        setIsNext(!isNext)
      }
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (gameState === 'onGoing') {
      updateBoard((e.target as any).id)
    }
    else if (gameState === 'Draw' || gameState === 'X wins' || gameState === 'O wins') {
      reset()
    }
  }

  return (
    <div className="App" data-testid='App'>
      <Alert aiOn={aiOn} isNext={isNext} gameState={gameState} restart={reset} setAiOn={turnAi} />
      <Board aiOn={aiOn} boardArr={boardArr} onClick={handleClick} isNext={isNext} />
    </div>
  );
}

export default App;
