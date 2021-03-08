import './index.css';
import routes from './config/routes'
import Header from './components/Header';
import './style/main.css'

function App() {
  
  return (
    <div className="bg-blue-200" style={{minHeight: '100vh'}}>
      <Header/>
      {routes} 


    </div>
  );
}

export default App;
