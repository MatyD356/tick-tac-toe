import '../styles/Square.scss'

interface SquareProps {
  onClick: () => void,
  value: string
}

const Square: React.FC<SquareProps> = ({ onClick, value }) => {
  return (
    <div
      className='Square'
      aria-label='Square'
      onClick={onClick}>{value}</div>
  )
}
export default Square