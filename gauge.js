// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleData = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var filterSample = sampleData.filter(sampleObj => sampleObj.id == sample);
    // g1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataSample = metadata.filter(sampleID => sampleObj.id == sample.id);
    // Create a variable that holds the first sample in the array.
    var firstId = metadataSample[0];
    var firstSample = filterSample[0];
    // gauge2. Create a variable that holds the first sample in the metadata array.
    var firstId = metadataSample[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;

    // gauge3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(firstId.wfreq);

    // Create the yticks for the bar chart.
    var yticks = otuIds.slice(0, 10).map(otuIds => `OTU ${otuIds}`).reverse();
    var xticks = sampleValues.slice(0, 10).reverse()

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: xticks,
      y: yticks,
      text: otuLabels,
      type: "bar",
      orientation: "h",
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

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
      },
      hovermode: text
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
};

// 4. Create the trace for the gauge chart.
var gaugeData = [{
  value: washFreq,
  title: { text: "<b> Belly Button Washing Frequency </b><br></br> Scrubs per Week" },
  type: "indicator",
  mode: "gauge+number",
  gauge: {
    axis: { range: [null, 10], dtick: "2" },
    bar: { color: "black" },
    steps: [
      { range: [0, 2], color: "red" },
      { range: [2, 4], color: "darkorange" },
      { range: [4, 6], color: "yellow" },
      { range: [6, 8], color: "lightgreen" },
      { range: [8, 10], color: "green" },
    ],
    dtick: 2
  }
}
];

// 5. Create the layout for the gauge chart.
var gaugeLayout = {
  width: 500,
  height: 450,
  margin: { t: 1, b: 0 }
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeData, gaugeLayout);

