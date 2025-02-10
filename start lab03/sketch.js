let data;
let cleanedData = [];
let charts = [];

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
    createCanvas(800, 600);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    // charts.push(new BarChart(cleanedData, "Age_Group", "Female", 200, 200, 10, 15, 2, 50, 450));
    // charts.push(new BarChart(cleanedData, "Age_Group", "Male", 200, 200, 10, 15, 2, 300, 450));
    charts.push(
        new BarChart(cleanedData, "horizontal", "Age_Group", "Male", 400, 450, 30, 15, 2, 300, 500)
    );
}

function draw() {
    background(220);
    charts.forEach((chart) => chart.render());
}

function cleanData() {
    for (i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

    for (i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
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
}

// let friends = [];
// friends.push(new Friend("Joe", 200));
// friends.push(new Friend("Brian", 238));
// console.log(friends);
