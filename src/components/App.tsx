import { useState, useEffect } from 'react'
import '../styles/App.scss'
import './Board'
import Board from './Board'
import Alert from './Alert'

const App: React.FC = () => {
  const [isNext, setIsNext] = useState(false)
  const [boardArr, setBoardArr] = useState(Array(9).fill(''))
  const [gameState, setGameState] = useState('onGoing')
  const [aiOn, setAiOn] = useState(false)

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
    const checkForWin = (board: string[]): boolean => {

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
        return true
      } else if (firstColumn === 3 || secondColumn === 3 || thirdColumn === 3) {
        return true
      } else if (firstDiagonal === 3 || secondDiagonal === 3) {
        return true
      }
      return false
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
      console.log('here');
      return 1
      /*      if (checkForWin() || checkForDraw() === 'tie') {
             return checkForDraw() === 'tie ' ? 0 : checkForWin() && !isNext ? -1 : 1
           }
           if (isMax) {
             let bestScore = -Infinity
             for (let i = 0; i < 9; i++) {
               if (boardArr[i] === '') {
                 board[i] = 'O'
                 let score = minimax(board, depth + 1, false)
                 if (score > bestScore) {
                   bestScore = score
                 }
               }
             }
             return bestScore
           } else {
             let bestScore = Infinity
             for (let i = 0; i < 9; i++) {
               if (boardArr[i] === '') {
                 board[i] = 'X'
                 let score = minimax(board, depth + 1, true)
                 if (score > bestScore) {
                   bestScore = score
                 }
               }
             }
             return bestScore
           } */
    }
    const bestMove = () => {
      let bestScore = -Infinity
      let bestSpot: any
      let board = boardArr.slice(0, boardArr.length)
      for (let i = 0; i < 9; i++) {
        if (boardArr[i] === '') {
          board[i] = isNext ? 'X' : 'O'
          let score = minimax(board, 0, false)
          if (score > bestScore) {
            bestScore = score
            bestSpot = i
          }
        }
      }
      setIsNext(!isNext)
      setBoardArr((prev) => {
        prev[bestSpot] = isNext ? 'O' : 'X'
        return prev
      })

    }
    const randomizeNumber = (min: number, max: number): number => {
      const num = Math.floor(Math.random() * (max - min)) + min
      return num
    }
    if (checkForWin(boardArr)) {
      setGameState(`${isNext ? 'X' : 'O'} wins`)
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
          prev[id] = isNext ? 'O' : 'X'
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
