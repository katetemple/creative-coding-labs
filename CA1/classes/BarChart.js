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
        this.chartTitle = obj.chartTitle || "Bar Chart";

        // GAP & SCALER - depending on vertical or horizontal orientation
        if (this.chartOrientation === "vertical") {
            this.gap = (this.chartWidth - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
            this.scaler = this.chartHeight / max(this.data.map((row) => row[this.yValue])); // converts string to property
        } else {
            this.gap = (this.chartHeight - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
            this.scaler = this.chartWidth / max(this.data.map((row) => row[this.yValue])); // converts string to property
        }

        // COLOUR STYLES
        this.axisColour = color(143, 143, 143);
        this.barColour = color(93,170,217);
        this.axisTextColour = color(222, 222, 222);
        this.tickColour = color(143, 143, 143);
        this.gridLineColour = color(94, 94, 94);
        this.titleColour = color(222, 222, 222);
        this.labelSize = 15;
        this.textRotation = 40;
        this.titleSize = 22;
        this.yAxisTitleRotation = -90;
    }

    render() {
        // use this. so that it knows the function belongs to this class
        this.renderGridLines();
        this.renderBars();
        this.renderAxis();
        this.renderLabels();
        this.renderTicks();
        this.renderTitle();
    }

    renderBars() {
        push();
            translate(this.chartPosX, this.chartPosY);

            // ==============
            // VERTICAL BARS
            // ==============
            if (this.chartOrientation === "vertical") {
                push();
                    translate(this.margin, 0);
                    for (i = 0; i < this.data.length; i++) {
                        let xPos = (this.barWidth + this.gap) * i;
                        fill(this.barColour);
                        noStroke();
                        rect(xPos, 0, this.barWidth, -(this.data[i][this.yValue] * this.scaler)); // Scale value to align with chart height
                    }
                pop();

            // ===============
            // HORIZONTAL BARS
            // ===============
            } else {
                push();
                    translate(0, -this.margin);
                    for (i = 0; i < this.data.length; i++) {
                        let yPos = -((this.barWidth + this.gap) * i);
                        fill(this.barColour);
                        noStroke();
                        rect(0, yPos, this.data[i][this.yValue] * this.scaler, -this.barWidth); // Scale value to align with chart width
                    }
                pop();
            }
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
            fill(this.axisTextColour);
            textSize(this.labelSize);
    
            // ======================
            // VERTICAL CHART LABELS
            // ======================
            if (this.chartOrientation === "vertical") {

                // Y-Axis labels
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = (this.chartHeight / this.numTicks) * i; // Spacing between labels
                    let maxValue = max(this.data.map((row) => row[this.yValue]));
                    let value = round((i / this.numTicks) * maxValue); // Scale value to fit amt of ticks

                    textAlign(RIGHT, CENTER);
                    text(value, -15, -yPos);
                }

                // X-Axis Labels
                translate(this.margin, 0);
                for (let i = 0; i < this.data.length; i++) {
                    let xPos = (this.barWidth + this.gap) * i;

                    push();
                        translate(xPos + this.barWidth / 2, 15);
                        rotate(this.textRotation);
                        textAlign(LEFT);
                        text(this.data[i][this.xValue], 0, 0);
                    pop();
                }

            // =======================
            // HORIZONTAL CHART LABELS
            // =======================
            } else {

                // Y-Axis Labels
                push();
                    translate(0, -this.margin);
                    for (let i = 0; i < this.data.length; i++) {
                        let yPos = -((this.barWidth + this.gap) * i);
                        textAlign(RIGHT, CENTER);

                        push();
                            translate(-15, yPos - this.barWidth / 2);
                            text(this.data[i][this.xValue], 0, 0);
                        pop();
                    }
                pop();

                // X-Axis Lables
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = (this.chartWidth / this.numTicks) * i;
                    let maxValue = max(this.data.map((row) => row[this.yValue]));
                    let value = round((i / this.numTicks) * maxValue); // Scale to fit amt of ticks

                    textAlign(CENTER);
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

            //// VERTICAL TICKS
            if (this.chartOrientation === "vertical") {
                let tickIncrement = this.chartHeight / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = -tickIncrement * i;
                    line(0, yPos, -10, yPos);
                }

            //// HORIZONTAL TICKS
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
        fill(this.titleColour);
        textAlign(CENTER);
        textSize(this.titleSize);

        // Chart Title
        push();
            translate(this.chartPosX, this.chartPosY);
            text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 40);
        pop();

        // Y Axis Title
        push();
            if (this.chartOrientation === "vertical") {
                translate(this.chartPosX - 80, this.chartPosY - this.chartHeight / 2);
                rotate(this.yAxisTitleRotation);
                text(this.yValue,0, 0);
            } else {
                translate(this.chartPosX + this.chartWidth / 2, this.chartPosY + 80);
                text(this.yValue,0, 0);
            }
        pop();

    }

    renderGridLines() {
        push();
            translate(this.chartPosX, this.chartPosY);

            stroke(this.gridLineColour);
            drawingContext.setLineDash([5, 5]); // Makes line dashed

            //// VERTICAL GRID LINES
            if (this.chartOrientation === "vertical") {
                let gridSpacing = this.chartHeight / this.numTicks; // calculates space between each grid line
                for (let i = 0; i <= this.numTicks; i++) {
                    let yPos = gridSpacing * i;
                
                    line(0, -yPos, this.chartWidth, -yPos)
                }

            //// HORIZONTAL GRID LINES
            } else {
                let gridSpacing = this.chartWidth / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = gridSpacing * i;

                    line(xPos, 0, xPos, -this.chartHeight);
                }
            }

        pop();
    }
}
