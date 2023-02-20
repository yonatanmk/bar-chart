import "./App.css";
import Circles from "./Circles";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import BarChart2 from "./BarChart2";

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
      <div>
        <BarChart2 />
      </div>
    </div>
  );
}

export default App;
