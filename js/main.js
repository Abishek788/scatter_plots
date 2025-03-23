// // Set up dimensions for the SVG container
// const width = 960;
// const height = 600;

// const svg = d3.select("svg")
//     .attr("width", width)
//     .attr("height", height);

// // Tooltip for showing node details
// const tooltip = d3.select(".tooltip");

// // Color scale for nodes (e.g., by movie)
// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// // Mapping for edge types to colors (customize as needed)
// const edgeColor = {
//   "close_friends": "#1f77b4",
//   "travel_companions": "#ff7f0e",
//   "mentorship": "#2ca02c",
//   "allies": "#d62728",
//   "unlikely_friends": "#9467bd"
//   // add more types if your data contains others
// };

// // Load JSON data for nodes and links
// Promise.all([
//   d3.json("data/Nodes.json"),
//   d3.json("data/Edge-Relation.json")
// ]).then(function(data) {
//   const nodes = data[0];
//   const links = data[1];

//   // Create a force simulation
//   const simulation = d3.forceSimulation(nodes)
//       .force("link", d3.forceLink(links).id(d => d.id).distance(100))
//       .force("charge", d3.forceManyBody().strength(-200))
//       .force("center", d3.forceCenter(width / 2, height / 2));

//   // Add links (edges) to the SVG
//   const link = svg.append("g")
//       .attr("class", "links")
//       .selectAll("line")
//       .data(links)
//       .enter().append("line")
//       .attr("class", "link")
//       .attr("stroke-width", 2)
//       .attr("stroke", d => edgeColor[d.type] || "#999");

//   // Add nodes to the SVG
//   const node = svg.append("g")
//       .attr("class", "nodes")
//       .selectAll("circle")
//       .data(nodes)
//       .enter().append("circle")
//       .attr("class", "node")
//       .attr("r", 8)
//       .attr("fill", d => colorScale(d.movie))
//       .call(drag(simulation));

//   // Tooltip and interactive events on nodes
//   node.on("mouseover", (event, d) => {
//       tooltip.transition().duration(200).style("opacity", .9);
//       tooltip.html(`<strong>${d.name}</strong><br/>Movie: ${d.movie}<br/>${d.description}`)
//           .style("left", (event.pageX + 10) + "px")
//           .style("top", (event.pageY - 28) + "px");
//     })
//     .on("mouseout", () => {
//       tooltip.transition().duration(500).style("opacity", 0);
//     })
//     .on("click", (event, d) => {
//       // Reset previous highlights
//       node.attr("stroke", null);
//       link.attr("stroke-width", 2);
      
//       // Highlight clicked node
//       d3.select(event.currentTarget)
//           .attr("stroke", "black")
//           .attr("stroke-width", 3);
      
//       // Highlight links connected to the clicked node
//       link.filter(l => l.source.id === d.id || l.target.id === d.id)
//           .attr("stroke-width", 4);
//     });

//   // Update positions for nodes and links during simulation
//   simulation.on("tick", () => {
//     link.attr("x1", d => d.source.x)
//         .attr("y1", d => d.source.y)
//         .attr("x2", d => d.target.x)
//         .attr("y2", d => d.target.y);

//     node.attr("cx", d => d.x)
//         .attr("cy", d => d.y);
//   });

//   // Create a legend for edge types
//   const legendData = Object.entries(edgeColor);
//   const legend = d3.select("#legend")
//       .append("svg")
//       .attr("width", 300)
//       .attr("height", legendData.length * 25);

//   legend.selectAll("rect")
//       .data(legendData)
//       .enter()
//       .append("rect")
//       .attr("x", 10)
//       .attr("y", (d, i) => i * 25)
//       .attr("width", 20)
//       .attr("height", 20)
//       .attr("fill", d => d[1]);

//   legend.selectAll("text")
//       .data(legendData)
//       .enter()
//       .append("text")
//       .attr("x", 40)
//       .attr("y", (d, i) => i * 25 + 15)
//       .text(d => d[0]);

// }).catch(function(error) {
//   console.error("Error loading data: ", error);
// });

// // Function to handle drag events for nodes
// function drag(simulation) {
  
//   function dragstarted(event, d) {
//     if (!event.active) simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }
  
//   function dragged(event, d) {
//     d.fx = event.x;
//     d.fy = event.y;
//   }
  
//   function dragended(event, d) {
//     if (!event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//   }
  
//   return d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
// }

// Set up dimensions for the SVG container
const width = 960;
const height = 600;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Tooltip for showing node details
const tooltip = d3.select(".tooltip");

// Color scale for nodes (e.g., by movie)
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Mapping for edge types to colors (customize as needed)
const edgeColor = {
  "close_friends": "#1f77b4",
  "travel_companions": "#ff7f0e",
  "mentorship": "#2ca02c",
  "allies": "#d62728",
  "unlikely_friends": "#9467bd"
  // add more types if your data contains others
};

// Load JSON data for nodes and links
Promise.all([
  d3.json("data/Nodes.json"),
  d3.json("data/Edge-Relation.json")
]).then(function(data) {
  const nodes = data[0];
  const links = data[1];

  // Create a force simulation
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      // Add a collision force to prevent nodes from overlapping
      .force("collision", d3.forceCollide().radius(20));

  // Add links (edges) to the SVG
  const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke-width", 2)
      .attr("stroke", d => edgeColor[d.interaction] || "#999");

  // Add nodes to the SVG
  const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .attr("fill", d => colorScale(d.movie))
      .call(drag(simulation));

  // Tooltip and interactive events on nodes
  node.on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip.html(`<strong>${d.name}</strong><br/>Movie: ${d.movie}<br/>${d.description}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .on("click", (event, d) => {
      // Reset previous highlights
      node.attr("stroke", null);
      link.attr("stroke-width", 2);

      // Highlight clicked node
      d3.select(event.currentTarget)
          .attr("stroke", "black")
          .attr("stroke-width", 3);

      // Highlight links connected to the clicked node
      link.filter(l => l.source.id === d.id || l.target.id === d.id)
          .attr("stroke-width", 4);
    });

  // Update positions for nodes and links during simulation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // Clamp node positions to keep them within the SVG
    node
      .attr("cx", d => {
        d.x = Math.max(8, Math.min(width - 8, d.x));
        return d.x;
      })
      .attr("cy", d => {
        d.y = Math.max(8, Math.min(height - 8, d.y));
        return d.y;
      });
  });

  // Create a legend for edge types
  const legendData = Object.entries(edgeColor);
  const legend = d3.select("#legend")
      .append("svg")
      .attr("width", 300)
      .attr("height", legendData.length * 25);

  legend.selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 10)
      .attr("y", (d, i) => i * 25)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", d => d[1]);

  legend.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 40)
      .attr("y", (d, i) => i * 25 + 15)
      .text(d => d[0]);

}).catch(function(error) {
  console.error("Error loading data: ", error);
});

// Function to handle drag events for nodes
function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
