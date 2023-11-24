function _1(md){return(
md`# HW04 Strong`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv({typed: true})
)}

function _workplaceKey(artist){return(
Object.keys(artist[0])[1]
)}

function _regionKey(artist){return(
Object.keys(artist[0])[2]
)}

function _carbonEmissionKey(artist){return(
Object.keys(artist[0])[3]
)}

function _followUpKey(artist){return(
Object.keys(artist[0])[19]
)}

function _7(artist,workplaceKey,regionKey,carbonEmissionKey,followUpKey)
{
  let workplaces = artist.map(row => row[workplaceKey]);
  let regions = artist.map(row => row[regionKey]);
  let carbonEmissions = artist.map(row => row[carbonEmissionKey]);
  let followUps = artist.map(row => row[followUpKey]);

  let uniqueWorkplaces = [...new Set(workplaces)];
  let uniqueRegions = [...new Set(regions)];
  let uniqueCarbonEmissions = [...new Set(carbonEmissions)];
  let uniqueFollowUps = [...new Set(followUps)];

  return {w: uniqueWorkplaces.length, r: uniqueRegions.length, c: uniqueCarbonEmissions.length, f: uniqueFollowUps.length};
}


function _data(){return(
[]
)}

function _filteredData(data,artist,workplaceKey,regionKey,carbonEmissionKey,followUpKey)
{
  data.length = 0;

  let workplaces = artist.map(row => row[workplaceKey]);
  let regions = artist.map(row => row[regionKey]);
  let carbonEmissions = artist.map(row => row[carbonEmissionKey]);
  let followUps = artist.map(row => row[followUpKey]);

  let uniqueWorkplaces = [...new Set(workplaces)];
  let uniqueRegions = [...new Set(regions)];
  let uniqueCarbonEmissions = [...new Set(carbonEmissions)];
  let uniqueFollowUps = [...new Set(followUps)];

  uniqueWorkplaces.forEach(w => {
    uniqueRegions.forEach(r => {
      uniqueFollowUps.forEach(f => {
        data.push({workplace: w, region: r, followUp: f, carbonEmission: 0, count: 0});
      })
    })
  })

  for (let i = 0; i < workplaces.length; i++) {
    let w = uniqueWorkplaces.indexOf(workplaces[i]) * uniqueRegions.length * uniqueFollowUps.length;
    let r = uniqueRegions.indexOf(regions[i]) * uniqueFollowUps.length;
    let f = uniqueFollowUps.indexOf(followUps[i]);

    let index = w + r + f;
    data[index].count++;
    data[index].carbonEmission += carbonEmissions[i];
  }

  return data.filter((d) => d.count > 0);
}


function _10(Plot,workplaceKey,regionKey,filteredData){return(
Plot.plot({
  width: 800,
  height: 800,
  title: "不同區域及工作地點對藝術產業的碳排放量平均相對位置和瞭解藝術永續意願圖",
  x: {
    label: workplaceKey,
    tickRotate: 15,
    labelOffset: -10
  },
  y: {
    label: regionKey,
    labelOffset: 40
  },
  grid: true,
  color: {
    legend: true,
    scheme:"Reds",
    domain: [0, 1, 2, 3, 4, 5]
  },
  marks: [
    Plot.frame(),
    Plot.dot(
      filteredData.filter((d) => {return d.followUp == "願意"}),
      { 
        x: "workplace",
        y: "region",
        fill: d => (Math.round(d.carbonEmission / d.count) || 0),
        symbol: "circle",
        dx: 10,
        r: 8,
        title: d => `place: ${d.region} - ${d.workplace}\navg. carbon emission: ${(Math.round(d.carbonEmission / d.count) || 0)}\ncount: ${d.count}\nfollow up: ${d.followUp}`
      }
    ),
    Plot.dot(
      filteredData.filter((d) => {return d.followUp != "願意"}),
      {
        x: "workplace",
        y: "region",
        fill: d => (d.carbonEmission / d.count || 0),
        symbol: "cross",
        dx: -10,
        r: 8,
        title: d => `place: ${d.region} - ${d.workplace}\navg. carbon emission: ${(Math.round(d.carbonEmission / d.count) || 0)}\ncount: ${d.count}\n follow up: ${d.followUp}`
      }
    )
  ]
})
)}

function _11(md){return(
md`# 結論
從上圖中，我們可以看出：
- 北部對平均藝術產業碳排放量相對位置較低
- 南部對平均藝術產業碳排放量相對位置較高
- 不論藝術產業碳排放量相對位置的高低，大多數人都願意瞭解藝術永續`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("workplaceKey")).define("workplaceKey", ["artist"], _workplaceKey);
  main.variable(observer("regionKey")).define("regionKey", ["artist"], _regionKey);
  main.variable(observer("carbonEmissionKey")).define("carbonEmissionKey", ["artist"], _carbonEmissionKey);
  main.variable(observer("followUpKey")).define("followUpKey", ["artist"], _followUpKey);
  main.variable(observer()).define(["artist","workplaceKey","regionKey","carbonEmissionKey","followUpKey"], _7);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("filteredData")).define("filteredData", ["data","artist","workplaceKey","regionKey","carbonEmissionKey","followUpKey"], _filteredData);
  main.variable(observer()).define(["Plot","workplaceKey","regionKey","filteredData"], _10);
  main.variable(observer()).define(["md"], _11);
  return main;
}
