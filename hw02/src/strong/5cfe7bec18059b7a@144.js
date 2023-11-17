function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _constellations(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]
)}

function _5(yCounts,constellations,data)
{
  
  yCounts.length = 0;
  for (var c = 0; c < constellations.length; c++) {
    yCounts.push({constellation: c, gender: "male", count: 0});
    yCounts.push({constellation: c, gender: "female", count: 0});
  }
  var s = [];
  data.forEach(x => {
    var i = x.Constellation * 2 + (x.Gender == "男" ? 0 : 1);
    yCounts[i].count++;
  })
  return yCounts;
}


function _plot3(Inputs){return(
Inputs.form({
  mt: Inputs.range([0, 100], {label: "marginTop", step: 1}),
  mr: Inputs.range([0, 100], {label: "marginRight", step: 1}),
  mb: Inputs.range([0, 100], {label: "marginBottom", step: 1}),
  ml: Inputs.range([0, 100], {label: "marginLeft", step: 1})
})
)}

function _7(Plot,plot3,constellations,yCounts){return(
Plot.plot({
  marginTop: plot3.mt,
  marginRight: plot3.mr,
  marginBottom: plot3.mb,
  marginLeft: plot3.ml,
  grid: true,
  x: {tickFormat: d => constellations[d]},
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {
      x: "constellation", 
      y: "count", 
      fill: "gender", 
      tip: true, 
      title: d => `count: ${d.count}\nConstellation: ${constellations[d.constellation]}\ngender: ${d.gender}`
    })
  ]
})
)}

function _8(Plot,plot3,constellations,data){return(
Plot.plot({
  marginTop: plot3.mt,
  marginRight: plot3.mr,
  marginBottom: plot3.mb,
  marginLeft: plot3.ml,
  x: {tickFormat: d => constellations[d], ticks: 12},
  y: {grid: true, label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.rectY(
      data, 
      Plot.binX(
        {y: "count"}, 
        {
          x: "Constellation", 
          interval: 1, 
          fill: "Gender", 
          tip: true, 
          title: d => `Constellation: ${constellations[d.Constellation]}\n\ngender: ${d.Gender}`
        }
      )
    )
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("constellations")).define("constellations", _constellations);
  main.variable(observer()).define(["yCounts","constellations","data"], _5);
  main.variable(observer("viewof plot3")).define("viewof plot3", ["Inputs"], _plot3);
  main.variable(observer("plot3")).define("plot3", ["Generators", "viewof plot3"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot3","constellations","yCounts"], _7);
  main.variable(observer()).define(["Plot","plot3","constellations","data"], _8);
  return main;
}
