let data;
let cleanedData = [];
let charts = [];
let font;

function preload() {
    // data = loadTable("data/Combined.csv", "csv", "header");
    data = loadTable("data/GreenhouseGasEmissions.csv", "csv", "header");
    font = loadFont("fonts/Sarabun-Bold.ttf");
}

function setup() {
    createCanvas(2000, 2500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    textFont(font);

    // To select the year to filter
    let selectedYear = 2020;
    let filteredData = cleanedData.filter(row => row.Year == selectedYear);


    charts.push(
        new BarChart({
            data: cleanedData,
            chartTitle: "Transportation Emissions Over Time ('000 tonnes CO₂e)",
            chartOrientation: "vertical",
            xValue: "Year",
            yValue: "Transportation",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 200,
            chartPosY: 600,
            numTicks: 6,
        }),
        new BarChart({
            data: cleanedData,
            chartTitle: "Transportation Emissions Over Time ('000 tonnes CO₂e)",
            chartOrientation: "horizontal",
            xValue: "Year",
            yValue: "Transportation",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 1000,
            chartPosY: 600,
            numTicks: 8,
        }),
        new StackedBarChart({
            data: cleanedData,
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022) ('000 tonnes CO₂e)",
            chartType: "100%",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            yValueTotal: "Total",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 200,
            chartPosY: 1350,
            numTicks: 4,
        }),
        new StackedBarChart({
            data: cleanedData,
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022) ('000 tonnes CO₂e)",
            chartOrientation: "horizontal",
            chartType: "100%",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            yValueTotal: "Total",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 1100,
            chartPosY: 1350,
            numTicks: 5,
        }),
        
        new RadialHistogram({
            data: cleanedData,
            chartPosX: 1300,
            chartPosY: 2000,
            xValue: "Year",
            yValue: "Waste & Construction",
        })
    );

    let maxValue = max(cleanedData.map(row => row.Emissions));
    console.log(maxValue);
}

function draw() {
    background(43, 48, 64);
    charts.forEach((chart) => {
        chart.render();
    });
}

// function cleanData() {
//     for (i = 0; i < data.rows.length; i++) {
//         let row = data.rows[i].obj;

//         let cleanedRow = {
//             Year: parseInt(row.Year),
//             "Energy Production & Supply": parseInt(row["Energy Production & Supply"]),
//             "Transportation": parseInt(row["Transportation"]),
//             "Agriculture & Land Use": parseInt(row["Agriculture & Land Use"]),
//             "Industry & Manufacturing": parseInt(row["Industry & Manufacturing"]),
//             "Waste & Construction": parseInt(row["Waste & Construction"]),
//             "Households & Buildings": parseInt(row["Households & Buildings"]),
//         };

//         cleanedData.push(cleanedRow);
//     }
// }




function cleanData() {
    for (i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (i = 0; i < cleanedData.length; i++) {
        cleanedData[i]["Energy Production & Supply"] = parseInt(cleanedData[i]["Energy Production & Supply"]);
        cleanedData[i]["Transportation"] = parseInt(cleanedData[i]["Transportation"]);
        cleanedData[i]["Agriculture & Land Use"] = parseInt(cleanedData[i]["Agriculture & Land Use"]);
        cleanedData[i]["Industry & Manufacturing"] = parseInt(cleanedData[i]["Industry & Manufacturing"]);
        cleanedData[i]["Waste & Construction"] = parseInt(cleanedData[i]["Waste & Construction"]);
        cleanedData[i]["Households & Buildings"] = parseInt(cleanedData[i]["Households & Buildings"]);

        // add total column to the dataset
        cleanedData[i].Total = cleanedData[i]["Energy Production & Supply"] + 
                                cleanedData[i]["Transportation"] + 
                                cleanedData[i]["Agriculture & Land Use"] + 
                                cleanedData[i]["Industry & Manufacturing"] + 
                                cleanedData[i]["Waste & Construction"] + 
                                cleanedData[i]["Households & Buildings"] ;
    }
}





// let femaleAges = [];
// FOR LOOP
// for (i = 0; i < cleanedData.length; i++) {
//     // console.log(i);
//     femaleAges.push(cleanedData[i].Female);
//     console.log(femaleAges);
// }

// FOREACH LOOP
// cleanedData.forEach(function (row) {
//     femaleAges.push(row.Female);
// });

// ARROW FUNCTION
//

// let femaleAges = cleanedData.map(function (row) {
//     return row.Female;
// });
// let friends = [];
// friends.push(new Friend("Joe", 200));
// friends.push(new Friend("Brian", 238));
// console.log(friends);
