import '../styles/Square.scss'

interface SquareProps {
  onClick: React.MouseEventHandler<HTMLElement>
  value: string
  id: number
}

const Square: React.FC<SquareProps> = ({ onClick, value, id }) => {
  return (
    <div
      id={id.toString()}
      className='Square'
      aria-label='Square'
      onClick={onClick}>{value}</div>
  )
}
export default Square