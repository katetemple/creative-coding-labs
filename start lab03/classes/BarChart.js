class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.chartOrientation = obj.chartOrientation || "vertical";
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 350;
        this.numTicks = obj.numTicks || 5;

        if (this.chartOrientation === "vertical") {
            this.gap =
                (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) /
                (this.data.length - 1);
            this.scaler = this.chartHeight / max(this.data.map((row) => row[this.yValue])); // converts string to property
        } else {
            this.gap =
                (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) /
                (this.data.length - 1);
            this.scaler = this.chartWidth / max(this.data.map((row) => row[this.yValue])); // converts string to property
        }

        this.axisColour = color(0, 0, 0);
        this.barColour = color(0, 100, 200);
        this.axisTextColour = color(0, 0, 0);
        this.tickColour = color(0, 0, 0);
    }

    // Renders the Bars
    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);

        if (this.chartOrientation === "vertical") {
            push();
            translate(this.margin, 0);
            for (i = 0; i < this.data.length; i++) {
                let xPos = (this.barWidth + this.gap) * i;
                fill(this.barColour);
                noStroke();
                rect(xPos, 0, this.barWidth, -(this.data[i][this.yValue] * this.scaler));

                fill(this.axisTextColour);
                textAlign(LEFT);
                textStyle(BOLD);
                textSize(13);
                push();
                translate(xPos + this.barWidth / 2, 15);
                rotate(60);
                text(this.data[i][this.xValue], 0, 0);
                pop();
            }
            pop();
            pop();
        } else {
            push();
            translate(0, -this.margin);
            for (i = 0; i < this.data.length; i++) {
                let yPos = -((this.barWidth + this.gap) * i);
                fill(this.barColour);
                noStroke();
                rect(0, yPos, this.data[i][this.yValue] * this.scaler, -this.barWidth);

                fill(this.axisTextColour);
                textAlign(RIGHT);
                textStyle(BOLD);
                textSize(13);
                push();
                translate(-15, yPos - this.barWidth / 2);
                text(this.data[i][this.xValue], 0, 0);
                pop();
            }
            pop();
            pop();
        }
    }

    // Renders the Axis
    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);

        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);

        // y
        line(0, 0, 0, -this.chartHeight);
        // x
        line(0, 0, this.chartWidth, 0);
        pop();
    }

    // Renders the label
    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        if (this.chartOrientation === "vertical") {
            // y axis labels
            for (let i = 0; i <= this.numTicks; i++) {
                let yPos = (this.chartHeight / this.numTicks) * i;
                let maxValue = max(this.data.map((row) => row[this.yValue]));
                let value = (i / this.numTicks) * maxValue;

                fill(this.axisTextColour);
                textAlign(RIGHT, CENTER);
                textSize(12);
                text(value, -15, -yPos);
            }

            // X axis labels
            push();
            translate(this.chartPosX, this.chartPosY + this.margin);
            for (let i = 0; i < this.data.length; i++) {
                let xPos = (this.barWidth + this.gap) * i;

                push();
                translate(xPos + this.barWidth / 2, 15);
                rotate(60);

                fill(this.axisTextColour);
                textAlign(LEFT);
                textStyle(BOLD);
                textSize(13);
                text(this.data[i][this.xValue], 0, 0);
                pop();
            }
            pop();
        } else {
            push();
            translate(0, -this.margin);
            for (let i = 0; i < this.data.length; i++) {
                let yPos = -((this.barWidth + this.gap) * i);

                fill(this.axisTextColour);
                textAlign(RIGHT);
                textStyle(BOLD);
                textSize(13);
                push();
                translate(-15, yPos - this.barWidth / 2);
                text(this.data[i][this.xValue], 0, 0);
                pop();
            }
            pop();
            pop();
        }
        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.tickColour);
        strokeWeight(2);

        let tickIncrement = this.chartHeight / this.numTicks;
        for (let i = 0; i <= this.numTicks; i++) {
            line(0, -tickIncrement * i, -10, -tickIncrement * i);
        }

        pop();
    }
}
