class StackedBarChart {
    constructor(
        _data,
        _xValue,
        _yValue,
        _chartHeight,
        _chartWidth,
        _barWidth,
        _margin,
        _axisThickness,
        _chartPosX,
        _chartPosY
    ) {
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;

        this.gap =
            (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) /
            (this.data.length - 1);
        this.scaler = this.chartHeight / max(cleanedData.map((row) => row[this.yValue])); // converts string to property

        this.axisColour = color(0, 0, 220);
        this.barColour = color(0, 0, 220);
        this.axisTextColour = color(0, 0, 220);
    }

    render() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        // y axis
        line(0, 0, 0, -this.chartHeight);
        // x axis
        line(0, 0, this.chartWidth, 0);

        push();
        translate(this.margin, 0);
        for (i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.barColour);
            noStroke();
            rect(xPos, 0, this.barWidth, -(this.data[i][this.yValue] * this.scaler));

            

            // fill(this.axisTextColour);
            // textAlign(LEFT);
            // textStyle(BOLD);
            // textSize(13);
            // push();
            // translate(xPos + this.barWidth / 2, 15);
            // rotate(60);
            // text(this.data[i][this.xValue], 0, 0);
            // pop();
        }
        pop();
        pop();
    }
}
