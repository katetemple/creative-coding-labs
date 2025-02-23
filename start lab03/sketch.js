let data;
let cleanedData = [];
let charts = [];

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
    createCanvas(1400, 1400);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    charts.push(
        // new BarChart({
        //     data: cleanedData,
        //     chartOrientation: "horizontal",
        //     xValue: "Age_Group",
        //     yValue: "Male",
        //     chartHeight: 400,
        //     chartWidth: 450,
        //     barWidth: 30,
        //     margin: 15,
        //     axisThickness: 2,
        //     chartPosX: 300,
        //     chartPosY: 500,
        //     numTicks: 8,
        // }),
        new StackedBarChart({
                data: cleanedData,
                xValue: "Age_Group",
                yValues: ["Male", "Female"],
                yValueTotal: "Total",
                chartHeight: 400,
                chartWidth: 450,
                barWidth: 30,
                margin: 15,
                axisThickness: 2,
                chartPosX: 300,
                chartPosY: 1200,
                numTicks: 8,
            }),
        new RadialHistogram({
            data: cleanedData,
            chartPosX: 500,
            chartPosY: 400,
            xValue: "Age_Group",
            yValue: "Female",
        })
    );

    let maxValue = max(cleanedData.map(row => row.Total));
    console.log(maxValue);
}

function draw() {
    background(43, 48, 64);
    charts.forEach((chart) => {
        chart.render();
    });
}

// chart.renderGridLines();
//         chart.renderAxis();
//         chart.renderBars();
//         chart.renderLabels();
//         chart.renderTicks();
//         chart.renderTitle();
//         chart.renderKey();

function cleanData() {
    for (i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
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
