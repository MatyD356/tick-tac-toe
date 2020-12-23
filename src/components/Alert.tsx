import '../styles/Alert.scss'

interface AlertProps {
  isNext: boolean
  gameState: string
  restart: () => void
}

const Alert: React.FC<AlertProps> = ({ isNext, gameState, restart }) => {
  return (
    <div className='Alert'>
      <button className={`reset ${!isNext ? 'turquoise' : 'pink'}`} onClick={restart}>
        Reset
      </button>
      <p className={`info ${!isNext ? 'turquoise' : 'pink'}`}>
        {gameState !== 'onGoing' ? gameState : null}
      </p>
    </div>
  )
}
export default Alert