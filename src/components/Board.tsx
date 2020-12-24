import '../styles/Board.scss'
import Square from './Square'

interface BoardProps {
  boardArr: string[]
  isNext: boolean
  onClick: React.MouseEventHandler<HTMLElement>
  aiOn: boolean
}

const Board: React.FC<BoardProps> = ({ boardArr, onClick, isNext, aiOn }) => {

  return (
    <div className={`Board ${aiOn ? 'turquoise' : isNext ? 'pink' : 'turquoise'}`} aria-label='Board'>
      {boardArr.map((item, index) =>
        <Square key={index} onClick={onClick} value={boardArr[index]} id={index} />)}
    </div>
  )
}

export default Board