import { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
} from "d3";

const defaultData = [25, 30, 45, 60, 20, 65, 75];

function LineChart() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1]) // range of x values
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 150]) // range of y values
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select("#x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select("#y-axis").style("transform", "translateX(300px)").call(yAxis);

    const myLine = line()
      .x((_, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
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
        <g id="x-axis" />
        <g id="y-axis" />
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
