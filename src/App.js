import './index.css';
import routes from './config/routes'
import Header from './components/Header';
import './style/main.css'

function App() {
  return (
    <div className="h-screen bg-blue-200">
      <Header/>
      {routes} 


    </div>
  );
}

export default App;
