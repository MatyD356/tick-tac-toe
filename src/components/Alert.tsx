import '../styles/Alert.scss'

interface AlertProps {
  isNext: boolean
  gameState: string
  restart: () => void
  setAiOn: () => void
  aiOn: boolean
}

const Alert: React.FC<AlertProps> = ({ isNext, gameState, restart, setAiOn }) => {
  return (
    <div className='Alert'>
      <button className={`reset ${!isNext ? 'turquoise' : 'pink'}`} onClick={restart}>
        Reset
      </button>
      <button className={`reset ${!isNext ? 'turquoise' : 'pink'}`} onClick={setAiOn}>
        Ai
      </button>
      <p className={`info ${!isNext ? 'turquoise' : 'pink'}`}>
        {gameState !== 'onGoing' ? gameState : null}
      </p>
    </div>
  )
}
export default Alert