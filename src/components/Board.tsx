import '../styles/Board.scss'
import Square from './Square'
const Board = () => {
  return (
    <div className='Board' aria-label='Board'>
      <Square />
    </div>
  )
}

export default Board