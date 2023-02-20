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
    // color: "#000000",
  },
  {
    language: "Atk",
    value: 75,
    // color: "#00a2ee",
  },
  {
    language: "Def",
    value: 68,
    // color: "#fbcb39",
  },
  {
    language: "SAtk",
    value: 67,
    // color: "#007bc8",
  },
  {
    language: "SDef",
    value: 65,
    // color: "#65cedb",
  },
  {
    language: "Spd",
    value: 65,
    // color: "#ff6e52",
  },
  // {
  //   language: "JavaScript",
  //   value: 61.9,
  //   color: "#f9de3f",
  // },
  // {
  //   language: "C#",
  //   value: 60.4,
  //   color: "#5d2f8e",
  // },
  // {
  //   language: "F#",
  //   value: 59.6,
  //   color: "#008fc9",
  // },
  // {
  //   language: "Clojure",
  //   value: 59.6,
  //   color: "#507dca",
  // },
];

// const margin = 80;
const margin = 0;
const width = 300 - 2 * margin;
const height = 250 - 2 * margin;

function BarChart() {
  const [data, setData] = useState(defaultData);
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

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
    // .on("mouseenter", function (actual, i) {
    //   selectAll(".value").attr("opacity", 0);

    //   select(this)
    //     .transition()
    //     .duration(300)
    //     .attr("opacity", 0.6)
    //     .attr("x", (a) => xScale(a.language) - 5)
    //     .attr("width", xScale.bandwidth() + 10);

    //   const y = yScale(actual.value);

    //   chart
    //     .append("line")
    //     .attr("id", "limit")
    //     .attr("x1", 0)
    //     .attr("y1", y)
    //     .attr("x2", width)
    //     .attr("y2", y);

    //   barGroups
    //     .append("text")
    //     .attr("class", "divergence")
    //     .attr("x", (a) => xScale(a.language) + xScale.bandwidth() / 2)
    //     .attr("y", (a) => yScale(a.value) + 30)
    //     .attr("fill", "white")
    //     .attr("text-anchor", "middle")
    //     .text((a, idx) => {
    //       const divergence = (a.value - actual.value).toFixed(1);

    //       let text = "";
    //       if (divergence > 0) text += "+";
    //       text += `${divergence}%`;

    //       return idx !== i ? text : "";
    //     });
    // })
    // .on("mouseleave", function () {
    //   selectAll(".value").attr("opacity", 1);

    //   select(this)
    //     .transition()
    //     .duration(300)
    //     .attr("opacity", 1)
    //     .attr("x", (a) => xScale(a.language))
    //     .attr("width", xScale.bandwidth());

    //   chart.selectAll("#limit").remove();
    //   chart.selectAll(".divergence").remove();
    // });

    barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", (a) => xScale(a.language) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a.value) + 30)
      .attr("text-anchor", "middle")
      .text((a) => `${a.value}`);

    // svg
    //   .append("text")
    //   .attr("class", "label")
    //   .attr("x", -(height / 2) - margin)
    //   .attr("y", margin / 2.4)
    //   .attr("transform", "rotate(-90)")
    //   .attr("text-anchor", "middle")
    //   .text("Love meter (%)");

    // svg
    //   .append("text")
    //   .attr("class", "label")
    //   .attr("x", width / 2 + margin)
    //   .attr("y", height + margin * 1.7)
    //   .attr("text-anchor", "middle")
    //   .text("Languages");

    // svg
    //   .append("text")
    //   .attr("class", "title")
    //   .attr("x", width / 2 + margin)
    //   .attr("y", 40)
    //   .attr("text-anchor", "middle")
    //   .text("Most loved programming languages in 2018");

    // svg
    //   .append("text")
    //   .attr("class", "source")
    //   .attr("x", width - margin / 2)
    //   .attr("y", height + margin * 1.7)
    //   .attr("text-anchor", "start")
    //   .text("Source: Stack Overflow, 2018");
  }, [data]);
  return (
    <>
      <div className="BarChart2">
        <svg ref={svgRef}>
          {/* <path d="M0,150 100,100 150,120" stroke="blue" fill="none" /> */}
          <g id="x-axis" />
          <g id="y-axis" />
        </svg>
      </div>
      <br />
      <button
        onClick={() =>
          setData((prev) => prev.map((x) => ({ ...x, value: x.value + 3 })))
        }
      >
        Update Data
      </button>
      {/* <button onClick={() => setData((prev) => prev.filter((x) => x < 35))}>
        Filter Data
      </button> */}
    </>
  );
}

export default BarChart;
