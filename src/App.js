import "./App.css";
import Circles from "./Circles";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

function App() {
  return (
    <div className="App">
      <div>
        <Circles />
      </div>
      <div>
        <LineChart />
      </div>
      <div>
        <BarChart />
      </div>
    </div>
  );
}

export default App;
