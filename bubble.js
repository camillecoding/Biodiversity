//DELIVERABLE 2 - CREATE BUBBLE CHART
// 1. Create the trace for the bubble chart.
var text = otuLabels;

var bubbleData = [{
  x: otuIds,
  y: sampleValues,
  mode: 'markers',
  marker: {
    size: sampleValues,
    color: otuIds,
    colorscale: "Electric",
    opacity: 0.8
  },
  text: otuLabels

}];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: "Bacteria Cultures Per Sample",
  xaxis: { title: "OTU ID" },
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  hovermode: text
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout);
