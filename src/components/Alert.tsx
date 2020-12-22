import '../styles/Alert.scss'

interface AlertProps {
  isNext: boolean
  gameState: string
  restart: () => void
}

const Alert: React.FC<AlertProps> = ({ isNext, gameState, restart }) => {
  return (
    <div className='Alert'>
      <p>{gameState !== 'ongoing' ? gameState : null}</p>
      <button className={`reset ${!isNext ? 'turquoise' : 'pink'}`} onClick={restart}>Reset</button>
    </div>
  )
}
export default Alert