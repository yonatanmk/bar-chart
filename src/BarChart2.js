import { useRef, useEffect, useState } from "react";
import {
  select,
  axisBottom,
  axisRight,
  axisLeft,
  scaleLinear,
  scaleBand,
  selectAll,
} from "d3";

const defaultData = [
  {
    language: "HP",
    value: 78,
  },
  {
    language: "Atk",
    value: 75,
  },
  {
    language: "Def",
    value: 68,
  },
  {
    language: "SAtk",
    value: 67,
  },
  {
    language: "SDef",
    value: 65,
  },
  {
    language: "Spd",
    value: 65,
  },
];

const width = 300;
const height = 250;

function BarChart() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const chart = svg.append("g");

    const xScale = scaleBand()
      .range([0, width])
      .domain(data.map((s) => s.language))
      .padding(0.4);

    const yScale = scaleLinear().range([height, 0]).domain([0, 100]);

    const makeYLines = () => axisLeft().scale(yScale);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(xScale));

    chart.append("g").call(axisLeft(yScale));

    chart
      .append("g")
      .attr("class", "grid")
      .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

    const barGroups = chart.selectAll().data(data).enter().append("g");

    barGroups
      .append("rect")
      .attr("class", "bar")
      .attr("x", (g) => xScale(g.language))
      .attr("y", (g) => yScale(g.value))
      .attr("height", (g) => height - yScale(g.value))
      .attr("width", xScale.bandwidth());

    barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", (a) => xScale(a.language) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a.value) + 30)
      .attr("text-anchor", "middle")
      .text((a) => `${a.value}`);
  }, [data]);
  return (
    <>
      <div className="BarChart2">
        <svg ref={svgRef} />
      </div>
      <br />
      <button
        onClick={() =>
          setData((prev) => prev.map((x) => ({ ...x, value: x.value + 3 })))
        }
      >
        Update Data
      </button>
    </>
  );
}

export default BarChart;
