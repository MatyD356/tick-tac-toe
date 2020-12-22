import '../styles/Alert.scss'

interface AlertProps {
  gameState: string
}

const Alert: React.FC<AlertProps> = ({ gameState }) => {
  return (
    <div className='Alert'>
      {gameState !== 'ongoing' ? gameState : null}
    </div>
  )
}
export default Alert