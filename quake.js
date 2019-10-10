const w = 1000;
const h = 700;
const api_url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
const world_api_url = "world_map.json";

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("position", "fixed")
  .style("left", "13%")
  .style("right", "0px")
  .style("top", "10%")
  .style("bottom", "0px");

const div = d3
  .select("body")
  .append("div")
  .style("pointer-events", "none")
  .style("position", "absolute")
  .style("width", "150px")
  .style("height", "80px")
  .style("background-color", "#d6d5d2")
  .style("border-radius", "5px")
  .style("text-align", "center")
  .style("padding", "5px")
  .style("font-size", "20px")
  .style("opacity", 0);

var albersProjection = d3
  .geoMercator()
  .center([0, 0])
  .translate([w / 2, h / 2]);

var geoPath = d3.geoPath().projection(albersProjection);

d3.json(world_api_url).then(data => {
  svg
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("fill", "#ccb77e")
    .attr("stroke", "#333")
    .attr("d", geoPath);

  d3.json(api_url).then(data => {
    svg
      .selectAll("circle")
      .data(data.features)
      .enter()
      .append("circle")
      .attr("r", (d, i) => d.properties.mag)
      .attr("transform", function(d) {
        return (
          "translate(" +
          albersProjection([
            d.geometry.coordinates[0],
            d.geometry.coordinates[1]
          ]) +
          ")"
        );
      })
      .attr("fill", d => d.properties.alert)
      .on("mouseover", function(d, i) {
        var date = new Date(d.properties.time);
        div
          .html(
            "<b>Magnitude : " +
              d.properties.mag +
              "</b><br>" +
              "<b>Place : " +
              d.properties.place.split(",")[1] +
              "</b><br>" +
              "<b>Date : " +
              date.toLocaleDateString("en-US") +
              "</b>"
          )

          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY - 28 + "px")
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseout", function(d, i) {
        div
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  });
});
