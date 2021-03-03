import './index.css';
import routes from './config/routes'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <div> {routes} </div>
    </div>
  );
}

export default App;
