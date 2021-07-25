import './App.css';
import SecondTimer from '../SecondTimer/SecondTimer';


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-12 col-md-6 text-center">
            <SecondTimer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
