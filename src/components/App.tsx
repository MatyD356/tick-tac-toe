import '../styles/App.scss'

import './Board'
import Board from './Board'

const App = () => {
  return (
    <div className="App" data-testid='App'>
      <Board />
    </div>
  );
}

export default App;
