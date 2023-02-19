import { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal } from "d3";

const defaultData = [25, 30, 45, 60, 20, 75, 95];

function LineChart() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");

    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   // .join(
    //   //   (enter) => enter.append("circle").attr("class", "new")
    //   //   // (update) => update.attr("class", "updated")
    //   //   // (exit) => exit.remove()
    //   // )
    //   .attr("r", (value) => value)
    //   .attr("cx", (value) => value * 2)
    //   .attr("cy", (value) => value * 2)
    //   .attr("stroke", "red");
  }, [data]);
  return (
    <>
      <svg ref={svgRef}>
        {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
      </svg>
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

export default LineChart;
