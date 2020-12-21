import '../styles/Board.scss'
import Square from './Square'

interface BoardProps {
  boardArr: string[],
  isNext: boolean,
  onClick: () => void
}

const Board: React.FC<BoardProps> = ({ boardArr, onClick, isNext }) => {

  return (
    <div className={`Board ${isNext ? 'pink' : 'turquoise'}`} aria-label='Board'>
      {boardArr.map((item, index) =>
        <Square key={index} onClick={onClick} value={boardArr[index]} />)}
    </div>
  )
}

export default Board