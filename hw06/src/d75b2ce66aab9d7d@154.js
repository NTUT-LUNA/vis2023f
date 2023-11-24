function _1(md){return(
md`# HW06`
)}

function _artistver(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer.csv"),{from:{table:"artistVer"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistpublic(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic.csv"),{from:{table:"artistPublic"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _blue(){return(
"#7DB9DE"
)}

function _pink(){return(
"#F4A7B9"
)}

function _brown(){return(
"#C2742D"
)}

function _artistQuestion(artistver){return(
Object.keys(artistver[0])[3]
)}

function _artistpublicQuestion(artistpublic){return(
Object.keys(artistpublic[0])[4]
)}

function _yCounts(){return(
[]
)}

function _10(yCounts,artistver,artistQuestion,artistpublic,artistpublicQuestion)
{
  yCounts.length = 0;

  // {value: 1, count: 10, series: "artist"}
  for (var v = 1; v <= 5; v++) {
    yCounts.push({value: v, count: 0, series: "artist"});
    yCounts.push({value: v, count: 0, series: "artistpublic"});
  }
  
  artistver.map(row => row[artistQuestion]).forEach(x => {
    var i = (x - 1) * 2;
    yCounts[i].count++;
  })

  artistpublic.map(row => row[artistpublicQuestion]).forEach(x => {
    var i = x * 2 - 1;
    yCounts[i].count++;
  })
  
  return yCounts;
}


function _checkboxes(Inputs){return(
Inputs.checkbox(
  ["artist", "artistpublic"], 
  {label: "Choose datasets", value: ["artist", "artistpublic"]}
)
)}

function _12(Plot,artistQuestion,blue,pink,yCounts,checkboxes){return(
Plot.plot({
  title: artistQuestion,
  x: {
    label: "Value"
  },
  y: {
    label: "Count",
    grid: true
  },
  color: {
    domain: ["artist", "artistpublic"],
    range: [blue, pink], // WASURENAGUSA, IKKONZOME
    legend: true
  },
  marks: [
    Plot.barY(
      yCounts.filter(y => checkboxes.includes(y.series)), 
      Plot.stackY({ 
        x: "value",
        y: "count",
        fill: "series",
        title: y => `${y.series}\nvalue: ${y.value}\ncount: ${y.count}`
      })
    )
  ]
})
)}

function _checkboxes1(Inputs){return(
Inputs.checkbox(
  ["artist", "artistpublic"], 
  {label: "Choose datasets", value: ["artist", "artistpublic"]}
)
)}

function _medium(yCounts,checkboxes1,d3,blue,pink)
{
  let margin = {
    top: 20, 
    right: 30, 
    bottom: 30, 
    left: 40
  };
  let width = 500;
  let height = 500;
  
  let uniqueSeries = [...new Set(yCounts.map(y => y.series))];
  let filteredData = yCounts.filter(y => checkboxes1.includes(y.series));
  let groupedData = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  })
  
  let stack = d3.stack().keys(uniqueSeries);
  let series = stack(groupedData);

  let xScale = d3.scaleBand()
    .domain(yCounts.map(y => y.value))
    .range([0, width])
    .padding(0.1);

  let yMax = d3.max(series, s => d3.max(s, x => x[1]));
  let yScale = d3.scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([height, 0]);

  let colorScale = d3.scaleOrdinal()
    .domain(uniqueSeries)
    .range([blue, pink]);

  let svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  let g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  series.forEach((s) => {
    let bars = g.append("g")
      .attr("fill", colorScale(s.key))
      .selectAll("rect")
      .data(s);

    bars.enter()
      .append("rect")
      .attr("x", d => xScale(d.data.value))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .transition() 
      .duration(1000)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]));
    });

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
  
    g.append("g")
      .call(d3.axisLeft(yScale));

  return svg.node();
}


function _checkboxes2(Inputs){return(
Inputs.checkbox(
  ["artist", "artistpublic"], 
  {label: "Choose datasets", value: ["artist", "artistpublic"]}
)
)}

function _hard(yCounts,checkboxes2,d3,blue,pink,brown)
{
  let margin = {
    top: 20, 
    right: 30, 
    bottom: 30, 
    left: 40
  };
  let width = 500;
  let height = 500;
  
  let uniqueSeries = [...new Set(yCounts.map(y => y.series))];
  let filteredData = yCounts.filter(y => checkboxes2.includes(y.series));
  let groupedData = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  })
  
  let stack = d3.stack().keys(uniqueSeries);
  let series = stack(groupedData);

  let xScale = d3.scaleBand()
    .domain(yCounts.map(y => y.value))
    .range([0, width])
    .padding(0.1);

  let yMax = d3.max(series, s => d3.max(s, x => x[1]));
  let yScale = d3.scaleLinear()
    .domain([0, yMax])
    .nice()
    .range([height, 0]);

  let colorScale = d3.scaleOrdinal()
    .domain(uniqueSeries)
    .range([blue, pink]);

  let svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  let g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  let defs = svg.append("defs");
  let filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");
  
  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");

  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 4)
    .attr("dy", 4)
    .attr("result", "offsetBlur");

  let feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "offsetBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  series.forEach((s) => {
    let bars = g.append("g")
      .attr("fill", colorScale(s.key))
      .selectAll("rect")
      .data(s);

    bars.enter()
      .append("rect")
      .attr("x", d => xScale(d.data.value))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("filter", "url(#drop-shadow)")
      .on("mouseover", function(d) { 
        d3.select(this).attr("fill", brown); 
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("fill", colorScale(s.key));
      });
  });

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
  
    g.append("g")
      .call(d3.axisLeft(yScale));

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic.csv", {url: new URL("./artistPublic.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer.csv", {url: new URL("./artistVer.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artistver")).define("artistver", ["__query","FileAttachment","invalidation"], _artistver);
  main.variable(observer("artistpublic")).define("artistpublic", ["__query","FileAttachment","invalidation"], _artistpublic);
  main.variable(observer("blue")).define("blue", _blue);
  main.variable(observer("pink")).define("pink", _pink);
  main.variable(observer("brown")).define("brown", _brown);
  main.variable(observer("artistQuestion")).define("artistQuestion", ["artistver"], _artistQuestion);
  main.variable(observer("artistpublicQuestion")).define("artistpublicQuestion", ["artistpublic"], _artistpublicQuestion);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer()).define(["yCounts","artistver","artistQuestion","artistpublic","artistpublicQuestion"], _10);
  main.variable(observer("viewof checkboxes")).define("viewof checkboxes", ["Inputs"], _checkboxes);
  main.variable(observer("checkboxes")).define("checkboxes", ["Generators", "viewof checkboxes"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artistQuestion","blue","pink","yCounts","checkboxes"], _12);
  main.variable(observer("viewof checkboxes1")).define("viewof checkboxes1", ["Inputs"], _checkboxes1);
  main.variable(observer("checkboxes1")).define("checkboxes1", ["Generators", "viewof checkboxes1"], (G, _) => G.input(_));
  main.variable(observer("medium")).define("medium", ["yCounts","checkboxes1","d3","blue","pink"], _medium);
  main.variable(observer("viewof checkboxes2")).define("viewof checkboxes2", ["Inputs"], _checkboxes2);
  main.variable(observer("checkboxes2")).define("checkboxes2", ["Generators", "viewof checkboxes2"], (G, _) => G.input(_));
  main.variable(observer("hard")).define("hard", ["yCounts","checkboxes2","d3","blue","pink","brown"], _hard);
  return main;
}
