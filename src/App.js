import "./App.css";
import { useRef, useEffect, useState } from "react";
import { select } from "d3";

const defaultData = [25, 30, 45, 60, 20];

function App() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      // .join(
      //   (enter) => enter.append("circle").attr("class", "new")
      //   // (update) => update.attr("class", "updated")
      //   // (exit) => exit.remove()
      // )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);
  return (
    <>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData((prev) => prev.map((x) => x + 5))}>
        Update Data
      </button>
      <button onClick={() => setData((prev) => prev.filter((x) => x < 35))}>
        Filter Data
      </button>
    </>
  );
}

export default App;
