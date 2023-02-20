import { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

const defaultData = [25, 30, 45, 60, 20, 65, 75];

function BarChart() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((_, index) => index)) // range of x values
      .range([0, 300])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, 150]) // range of y values
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 125, 150])
      .range(["green", "yellow", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index);
    svg.select("#x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select("#y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (_, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
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

export default BarChart;
