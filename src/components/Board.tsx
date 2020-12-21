import '../styles/Board.scss'
import Square from './Square'

const Board = () => {

  const handleClick = () => { alert('xd') }
  return (
    <div className='Board' aria-label='Board'>
      <Square onClick={handleClick} />
    </div>
  )
}

export default Board