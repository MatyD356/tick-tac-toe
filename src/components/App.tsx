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
    /*     const checkForDraw = (board: string[]): boolean | string => {
          if (gameState === 'onGoing') {
            const squaresLeft = board.filter(item => item === '').length
            if (squaresLeft === 0) {
              return 'tie'
            } else {
              return false
            }
          }
          return false
        } */
    const checkForWin = (board: string[]): string | null => {

      const squaresLeft = board.filter(item => item === '').length
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
          return signs[i]
        } else if (firstColumn === 3 || secondColumn === 3 || thirdColumn === 3) {
          return signs[i]
        } else if (firstDiagonal === 3 || secondDiagonal === 3) {
          return signs[i]
        } else if (squaresLeft === 0) {
          return 'Tie'
        }
      }
      return null
    }
    const minimax = (board: string[], depth: number, isMaximizing: boolean): any => {
      if (checkForWin(board) === 'X wins') {
        return 10
      } else if (checkForWin(board) === 'O wins') {
        return -10
      }
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          // Is the spot available?
          if (board[i] === '') {
            board[i] = 'X';
            let score = minimax(board, depth + 1, false);
            board[i] = '';
            if (score > bestScore) {
              bestScore = score
            }
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          // Is the spot available?
          if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, depth + 1, true);
            board[i] = '';
            if (score < bestScore) {
              bestScore = score
            }
          }
        }
        return bestScore;
      }
    }

    const bestMove = () => {
      let bestScore = -Infinity;
      let move: any;
      let board = boardArr.slice(0, boardArr.length)
      for (let i = 0; i < 9; i++) {
        if (boardArr[i] === '') {
          board[i] = 'X'
          let score = minimax(board, 0, false)
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      setBoardArr((prev) => {
        prev[move] = 'X'
        return prev
      })
      setIsNext(!isNext)
    }
    if (checkForWin(boardArr) !== null) {
      if (checkForWin(boardArr) === 'Tie') setGameState('Tie')
      else setGameState(`${checkForWin(boardArr)} wins`)
    } else if (aiOn && isNext && gameState === 'onGoing') {
      bestMove()
    }
  }, [gameState, boardArr, isNext, aiOn])

  const reset = (): void => {
    setBoardArr(Array(9).fill(''))
    setGameState('onGoing')
    setIsNext(true)
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
    else if (gameState === 'Tie' || gameState === 'X wins' || gameState === 'O wins') {
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
