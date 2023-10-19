import "../styles/App.css";
import REPL from "./REPL";

/**
 * This is the highest level component!
 * taken straight from gearup
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />
    </div>
  );
}

export default App;
