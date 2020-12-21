import '../styles/Board.scss'
import Square from './Square'

interface BoardProps {
  boardArr: string[]
  onClick: () => void
}

const Board: React.FC<BoardProps> = ({ boardArr, onClick }) => {

  return (
    <div className='Board' aria-label='Board'>
      {boardArr.map((item, index) =>
        <Square onClick={onClick} value={boardArr[index]} />)}
    </div>
  )
}

export default Board