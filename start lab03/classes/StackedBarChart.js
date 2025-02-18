class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.chartOrientation = obj.chartOrientation || "vertical";
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.yValueTotal = obj.yValueTotal || "Total";
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 350;
        this.numTicks = obj.numTicks || 5;
        this.chartTitle = obj.chartTitle || "Bar Chart";

        if (this.chartOrientation === "vertical") {
            this.gap =
                (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) /
                (this.data.length - 1);
            this.scaler = this.chartHeight / max(this.data.map((row) => row[this.yValueTotal])); // converts string to property
        } else {
            this.gap =
                (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) /
                (this.data.length - 1);
            this.scaler = this.chartWidth / max(this.data.map((row) => row[this.yValueTotal])); // converts string to property
        }

        this.axisColour = color(143, 143, 143);
        this.barColour = color(64, 143, 227);
        this.axisTextColour = color(222, 222, 222);
        this.tickColour = color(143, 143, 143);
        this.gridLineColour = color(94, 94, 94);
        this.titleColour = color(222, 222, 222);
        this.barColours = [color(222, 222, 222), color(64, 143, 227)];
    }

    renderBars() {
        push();
            translate(this.chartPosX, this.chartPosY);

            push();
                translate(this.margin,0);
                
                for (let i = 0; i < this.data.length; i++) {
                    let xPos = (this.barWidth + this.gap) * i;

                    push();
                    translate(xPos, 0)
                    for (let j = 0; j < this.yValues.length; j++) {
                        fill(this.barColours[j]);
                        noStroke();
                        
                        rect(0, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scaler);
                        translate(0, -this.data[i][this.yValues[j]] * this.scaler - 1);
                        

                        
                    }
                    pop();
                }

            pop();
        pop();
    }

    renderAxis() {
        push();
            translate(this.chartPosX, this.chartPosY);

            // Styles
            noFill();
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);

            // Y Axis
            line(0, 0, 0, -this.chartHeight);
            // X Axis
            line(0, 0, this.chartWidth, 0);

        pop();
    }

    renderLabels() {
        push();
            translate(this.chartPosX, this.chartPosY);

            if (this.chartOrientation === "vertical") {
                
                // Y axis labels
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = (this.chartHeight / this.numTicks) * i;
                    let maxValue = max(this.data.map((row) => row[this.yValue]));
                    let value = round((i / this.numTicks) * maxValue);

                    fill(this.axisTextColour);
                    textAlign(RIGHT, CENTER);
                    textSize(12);
                    text(value, -15, -yPos);
                }

                // X axis labels
                translate(this.margin, 0);
                for (let i = 0; i < this.data.length; i++) {
                    let xPos = (this.barWidth + this.gap) * i;

                    push();
                        translate(xPos + this.barWidth / 2, 15);
                        rotate(60);

                        fill(this.axisTextColour);
                        textAlign(LEFT);
                        textSize(13);
                        text(this.data[i][this.xValue], 0, 0);
                    pop();
                }

            } else {

                // Y axis Labels
                push();
                    translate(0, -this.margin);
                    for (let i = 0; i < this.data.length; i++) {
                        let yPos = -((this.barWidth + this.gap) * i);

                        fill(this.axisTextColour);
                        textAlign(RIGHT, CENTER);
                        textSize(13);

                        push();
                            translate(-15, yPos - this.barWidth / 2);
                            text(this.data[i][this.xValue], 0, 0);
                        pop();
                    }
                pop();

                // X axis Lables
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = (this.chartWidth / this.numTicks) * i;
                    let maxValue = max(this.data.map((row) => row[this.yValue]));
                    let value = round((i / this.numTicks) * maxValue);

                    fill(this.axisTextColour);
                    textAlign(CENTER);
                    textSize(12);
                    text(value, xPos, 30);
                }
            }
        pop();
    }

    renderTicks() {
        push();
            translate(this.chartPosX, this.chartPosY);

            noFill();
            stroke(this.tickColour);
            strokeWeight(2);

            if (this.chartOrientation === "vertical") {

                let tickIncrement = this.chartHeight / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = -tickIncrement * i;
                    line(0, yPos, -10, yPos);
                }

            } else {

                let tickIncrement = this.chartWidth / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = tickIncrement * i;
                    line(xPos, 0, xPos, 10);
                }

            }

        pop();
    }

    renderTitle() {
        push();
            translate(this.chartPosX, this.chartPosY);
            fill(this.titleColour);
            textAlign(CENTER);
            textSize(20);
            text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 40);
        pop();
    }

    renderGridLines() {
        push();
            translate(this.chartPosX, this.chartPosY);

            stroke(this.gridLineColour);
            drawingContext.setLineDash([5, 5]);

            if (this.chartOrientation === "vertical") {
                let tickIncrement = this.chartHeight / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = tickIncrement * i;
                
                    line(0, -yPos, this.chartWidth, -yPos)
                }
            } else {

                let tickIncrement = this.chartWidth / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = tickIncrement * i;

                    line(xPos, 0, xPos, -this.chartHeight);
                }
            }

        pop();
    }
}
