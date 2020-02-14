// d3.select("p").style("color", "red");
const dataSet = [4, 10, 15];

const w = 500;
const h = 100;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg
  .selectAll("rect")
  .data(dataSet)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 30)
  .attr("y", (d, i) => h - 3 * d)
  .attr("width", 25)
  .attr("height", (d, i) => d * 3)
  .attr("fill", "navy");
