let data;
let cleanedData = [];
let charts = [];
let font;

function preload() {
    data = loadTable("data/GreenhouseGasEmissions.csv", "csv", "header");
    font = loadFont("fonts/Sarabun-Bold.ttf");
}

function setup() {
    createCanvas(3800, 2500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    textFont(font);

    charts.push(
        new Chart({
            data: cleanedData,
            chartType: "barChart",
            xValue: "Year",
            yValues: ["Transportation"],
            chartHeight: 400,
            chartWidth: 450,
            chartPosX: 200,
            chartPosY: 600,
            chartTitle: "Transportation Emissions Over Time",
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions ('000 tonnes CO₂e)",
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            numTicks: 6,
        }),
        new Chart({
            data: cleanedData,
            chartType: "barChart",
            xValue: "Year",
            yValues: ["Industry & Manufacturing"],
            chartHeight: 400,
            chartWidth: 450,
            chartPosX: 1000,
            chartPosY: 600,
            chartOrientation: "horizontal",
            chartTitle: "Industry & Manufacturing Emissions Over Time",
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions ('000 tonnes CO₂e)",
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            numTicks: 6,
        }),
        new Chart({
            data: cleanedData,
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022)",
            chartType: "stackedBarChart",
            stackedType: "absolute",
            chartOrientation: "vertical",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions ('000 tonnes CO₂e)",
            yValueTotal: "Total",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 200,
            chartPosY: 1350,
            numTicks: 6,
        }),
        new Chart({
            data: cleanedData,
            chartType: "stackedBarChart",
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022)",
            chartOrientation: "horizontal",
            stackedType: "absolute",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions ('000 tonnes CO₂e)",
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
        new Chart({
            data: cleanedData,
            chartType: "stackedBarChart",
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022)",
            chartOrientation: "vertical",
            stackedType: "100%",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions (%)",
            yValueTotal: "Total",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 2000,
            chartPosY: 1350,
            numTicks: 5,
        }),
        new Chart({
            data: cleanedData,
            chartType: "stackedBarChart",
            chartTitle: "Greenhouse Gas Emissions by Sector (2018-2022)",
            chartOrientation: "horizontal",
            stackedType: "100%",
            xValue: "Year",
            yValues: ["Agriculture & Land Use", "Households & Buildings", "Transportation", "Energy Production & Supply", "Industry & Manufacturing", "Waste & Construction"],
            xAxisTitle: "Year",
            yAxisTitle: "Emmissions (%)",
            yValueTotal: "Total",
            chartHeight: 400,
            chartWidth: 450,
            barWidth: 50,
            margin: 15,
            axisThickness: 2,
            chartPosX: 2900,
            chartPosY: 1350,
            numTicks: 5,
        }),
        new Chart({
            data: cleanedData,
            chartType: "radialHistogram",
            chartTitle: "Industry & Manufacturing Emissions Over Time 2018-2022 ('000 tonnes CO₂e)",
            chartDiameter: 400, 
            chartPosX: 400,
            chartPosY: 2000,
            xValue: "Year",
            yValues: ["Industry & Manufacturing"],
            numTicks: 3,
        }),
        new Chart({
            data: cleanedData,
            chartType: "radialHistogram",
            chartTitle: "Transportation Emissions Over Time 2018-2022 ('000 tonnes CO₂e)",
            chartDiameter: 400, 
            chartPosX: 1300,
            chartPosY: 2000,
            xValue: "Year",
            yValues: ["Transportation"],
            numTicks: 3,
        })
    );

}

function draw() {
    background(48,48,48);
    charts.forEach((chart) => {
        chart.render();
    });
}

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
