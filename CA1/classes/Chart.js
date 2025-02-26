class Chart {
    constructor(obj) {
        //// SHARED PROPERTIES
        this.data = obj.data;
        this.chartType = obj.chartType || "barChart";
        this.xValue = obj.xValue;
        this.yValues = obj.yValues || [];
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 350;
        this.chartTitle = obj.chartTitle || "Chart";
        this.gridLineColour = color(255);
        this.titleColour = color(222, 222, 222);
        this.labelSize = 15;
        this.titleSize = 22;
        this.labelColour = color(255);

        //// RADIAL HISTOGRAM SPECIFICS
        this.chartDiameter = obj.chartDiameter || 400;
        this.numSlices = this.data.length; // calc number of slices and the angle for each slice
        this.sliceAngle = 360 / this.numSlices; // TO GET THE ANGLE OF ONEEE SECTOR   
        this.outlineColour = color(255);
        this.outlineThickness = 2;
        this.arcColours = [color(148,74,166), color(80,81,196), color(0,166,208), color(245,85,114), color(0,187,110), color(0,187,110)];

        //// BAR AND STACKED BAR SPECIFICS
        // Shared properties
        this.chartOrientation = obj.chartOrientation || "vertical";
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.numTicks = obj.numTicks || 5;
        this.axisThickness = obj.axisThickness || 2;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.axisColour = color(255);
        this.axisTextColour = color(222, 222, 222);
        this.tickColour = color(255);
        this.barColour = color(80,173,118);
        this.yAxisTitleRotation = -90;
        this.yAxisTitle = obj.yAxisTitle || "Y-Axis Title";
        this.xAxisTitle = obj.xAxisTitle || "X-Axis Title";
        this.axisTitleSize = 17;
        this.labelRotation = 40;

        // Stacked specifics
        this.stackedType = obj.stackedType || "absolute";
        this.yValueTotal = obj.yValueTotal || "Total";
        this.barColours = [color(45,162,191), color(245,101,130), color(49,152,105), color(125,68,147), color(71,100,130), color(228,136,51)];

        // Gap and Scaler for different orientations
        // Determine dimensions based on orientation
        let gapDimension, scaleDimension;
        if (this.chartOrientation === "vertical") {
            gapDimension = this.chartWidth;
            scaleDimension = this.chartHeight;
        } else {
            gapDimension = this.chartHeight;
            scaleDimension = this.chartWidth;
        }
        // Calc gap
        this.gap = (gapDimension - this.data.length * this.barWidth - this.margin * 2) / (this.data.length - 1);
        
        // Calc scaler - handling stacked type
        if (this.chartType === "stackedBarChart") {
            if (this.stackedType === "absolute") {
                this.scaler = scaleDimension / max(this.data.map((row) => row[this.yValueTotal]));
            } else {
                this.scaler = scaleDimension / 100; // gives px value for 1%
            }
        } else {
            this.scaler = scaleDimension / max(this.data.map((row) => row[this.yValues[0]]));
        }
        }   


    render() {
        this.renderGridLines();
        if (this.chartType === "radialHistogram") {
            this.renderData();
            this.renderBase();
            this.renderGridLines();
            this.renderMeasurementLine();
            this.renderTitle();
        } else {
            this.renderTitle();
            this.renderBars();
            this.renderAxis();
            if (this.chartType === "stackedBarChart") {
                this.renderKey();
            }
        }
        this.renderTicks();
        this.renderLabels();
    }

    renderBase() {
        push();
            translate(this.chartPosX, this.chartPosY);

            for (let i = 0; i < this.numSlices; i++) {
                stroke(this.outlineColour);
                strokeWeight(this.outlineThickness);
                noFill();

                // always 0 to sliceAngle for each rotation
                let startAngle = 0;
                let endAngle = this.sliceAngle;

                arc(0, 0, this.chartDiameter, this.chartDiameter, startAngle, endAngle, PIE);
                rotate(endAngle);
            }

        pop();
    }

    renderData() {
        push();
            translate(this.chartPosX, this.chartPosY);
            noStroke();
            this.scaler = this.chartDiameter / max(this.data.map((row) => row[this.yValues[0]]));

            for(let i = 0; i < this.numSlices; i++){
                fill(this.arcColours[i]);

                let startAngle = 0;
                let endAngle = this.sliceAngle;
                let heightValue = this.data[i][this.yValues[0]] * this.scaler;

                arc(0, 0, heightValue, heightValue, startAngle, endAngle, PIE);
                rotate(endAngle);
            }
        pop();
    }

    renderMeasurementLine() {
        push();
            translate(this.chartPosX, this.chartPosY);
            stroke(this.outlineColour);
            strokeWeight(2);

            let lineLength = (this.chartDiameter / 2);
            line(0, 0, lineLength, 0);
        pop();
    }

    renderBars() {
        push();
            translate(this.chartPosX, this.chartPosY);

                // ==============
                // BAR CHART BARS
                // ==============
                if (this.chartType === "barChart") {
            
                    //// VERTICAL BARS ////
                    if (this.chartOrientation === "vertical") {
                        push();
                            translate(this.margin, 0);
                            for (i = 0; i < this.data.length; i++) {
                                let xPos = (this.barWidth + this.gap) * i;
                                fill(this.barColour);
                                noStroke();
                                rect(xPos, 0, this.barWidth, -(this.data[i][this.yValues] * this.scaler)); // Scale value to align with chart height
                            }
                        pop();
            
                    //// HORIZONTAL BARS ////
                    } else {
                        push();
                            translate(0, -this.margin);
                            for (i = 0; i < this.data.length; i++) {
                                let yPos = -((this.barWidth + this.gap) * i);
                                fill(this.barColour);
                                noStroke();
                                rect(0, yPos, this.data[i][this.yValues] * this.scaler, -this.barWidth); // Scale value to align with chart width
                            }
                        pop();
                    }

                // ======================
                // STACKED BAR CHART BARS
                // ======================
                } else {

                    //// VERTICAL BARS ////
                    if (this.chartOrientation === "vertical") {
                        push();
                            translate(this.margin,0);
        
                            // Loop through each bar in dataset
                            for (let i = 0; i < this.data.length; i++) {
                                let xPos = (this.barWidth + this.gap) * i;
                                push();
                                    translate(xPos, 0)
        
                                    // Stack segments within the current bar
                                    for (let j = 0; j < this.yValues.length; j++) {
                                        // Fill colour for current segment
                                        fill(this.barColours[j]);
                                        noStroke();
        
                                        // Calculate segment height based on stacking type
                                        let segmentValue;
                                        if (this.stackedType === "absolute") {
                                            segmentValue = this.data[i][this.yValues[j]] * this.scaler;
                                        } else {
                                            segmentValue = (this.data[i][this.yValues[j]] / this.data[i][this.yValueTotal]) * 100 * this.scaler; // divide SV by total to get fraction
                                        }
                                        
                                        rect(0, 0, this.barWidth, -segmentValue);
                                        translate(0, -segmentValue);
                                        
                                    }
                                pop();
                            }
                        pop();
        
                    //// HORIZONTAL BARS ////
                    } else {
                        push();
                            translate(0, -this.margin);
        
                            // Loop through each bar in dataset
                            for (let i = 0; i < this.data.length; i++) {
                                let yPos = -((this.barWidth + this.gap) * i);
                                push();
                                    translate(0, yPos)
        
                                    // Stack segments within current bar
                                    for (let j = 0; j < this.yValues.length; j++) {
                                        // Fill colour for current segment
                                        fill(this.barColours[j]);
                                        noStroke();
        
                                        // Calculate segment width based on stacking type
                                        let segmentValue;
                                        if (this.stackedType === "absolute") {
                                            segmentValue = this.data[i][this.yValues[j]] * this.scaler;
                                        } else {
                                            segmentValue = (this.data[i][this.yValues[j]] / this.data[i][this.yValueTotal]) * 100 * this.scaler; // divide SV by total to get fraction
                                        }
                                        
                                        rect(0, 0, segmentValue, -this.barWidth);
                                        translate(segmentValue, 0);
                                        
                                    }
                                pop();
                            }
                        pop();    
                    }

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
            fill(this.labelColour);
            textSize(this.labelSize)

            // ========================
            // RADIAL HISTOGRAM LABELS
            // ========================
            if (this.chartType === "radialHistogram") {
                textAlign(CENTER, CENTER);

                //// Measurement line labels
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = (this.chartDiameter / 2) / this.numTicks * i;
                    let maxValue = max(this.data.map((row) => row[this.yValues[0]]));
                    let value = Math.round((i / this.numTicks) * maxValue);
                    push();
                        translate(xPos, 20);
                        // rotate(this.labelRotation);
                        textAlign(CENTER)
                        text(value, 0, 0);
                    pop();
                }

                //// Category labels
                let radius = this.chartDiameter / 2;
                for(let i = 0; i < this.numSlices; i++) {
                    let midAngle = i * this.sliceAngle + this.sliceAngle / 2;
                    let xPos = (radius + 50) * cos(midAngle);
                    let yPos = (radius + 50) * sin(midAngle);

                    text(this.data[i][this.xValue], xPos, yPos);
                }

            // ========================
            // BAR & STACKED BAR LABELS
            // ========================
            } else {

                //// VERTICAL CHART LABELS ////
                if (this.chartOrientation === "vertical") {
                    // Y-Axis labels
                    for (let i = 0; i <= this.numTicks; i++) {
                        let yPos = (this.chartHeight / this.numTicks) * i; // Spacing between labels

                        let maxValue;
                        if (this.chartType === "stackedBarChart") {
                            if (this.stackedType === "absolute") {
                                maxValue = max(this.data.map((row) => row[this.yValueTotal]));
                            } else {
                                maxValue = 100;
                            }
                        } else {
                            maxValue = max(this.data.map((row) => row[this.yValues]));
                        }
                        let value = round((i / this.numTicks) * maxValue); // Scale value to fit amt of ticks
                        textAlign(RIGHT, CENTER);

                        if (this.chartType === "stackedBarChart" && this.stackedType === "100%") {
                            text(value + "%", -15, -yPos);
                        } else {
                            text(value, -15, -yPos);
                        }
                    }
                    // X-Axis Labels
                    translate(this.margin, 0);
                    for (let i = 0; i < this.data.length; i++) {
                        let xPos = (this.barWidth + this.gap) * i;

                        push();
                            translate(xPos + this.barWidth / 2, 15);
                            rotate(this.labelRotation);
                            textAlign(LEFT);
                            text(this.data[i][this.xValue], 0, 0);
                        pop();
                    }

                //// HORIZONTAL CHART LABELS ////
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


                        let maxValue;
                        if (this.chartType === "stackedBarChart") {
                            if (this.stackedType === "absolute") {
                                maxValue = max(this.data.map((row) => row[this.yValueTotal]));
                            } else {
                                maxValue = 100;
                            }
                        } else {
                            maxValue = max(this.data.map((row) => row[this.yValues]));
                        }

                        let value = round((i / this.numTicks) * maxValue); // Scale to fit amt of ticks
                        textAlign(CENTER);

                        if (this.chartType === "stackedBarChart" && this.stackedType === "100%") {
                            text(value + "%", xPos, 30);
                        } else {
                            text(value, xPos, 30);
                        }
                    }
                }
            }
        pop();
    }

    renderTitle() {
        textAlign(CENTER);
        fill(this.titleColour);
        textSize(this.titleSize);

        // ========================
        // RADIAL HISTOGRAM TITLE
        // ========================
        if (this.chartType === "radialHistogram") {
            push();
                translate(this.chartPosX, this.chartPosY);
                text(this.chartTitle, 0, -this.chartDiameter / 2 - 90);
            pop();

        // =================
        // BAR CHARTS TITLE
        // =================
        } else {
            push();
                // Main title
                translate(this.chartPosX, this.chartPosY);
                text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 40);
            pop();

            push();
                // Y-Axis Title
                if (this.chartOrientation === "vertical") {
                    translate(this.chartPosX - 80, this.chartPosY - this.chartHeight / 2);
                    textSize(this.axisTitleSize);
                    rotate(this.yAxisTitleRotation);
                    text(this.yAxisTitle,0, 0);
                } else {
                    translate(this.chartPosX + this.chartWidth / 2, this.chartPosY + 80);
                    textSize(this.axisTitleSize);
                    text(this.yAxisTitle,0, 0);
                }
            pop();

            push();
                // X-Axis Title
                if (this.chartOrientation === "vertical") {
                    translate(this.chartPosX + this.chartWidth / 2, this.chartPosY + 80);
                    textSize(this.axisTitleSize);
                    text(this.xAxisTitle,0, 0);
                } else {
                    translate(this.chartPosX - 80, this.chartPosY - this.chartHeight / 2);
                    textSize(this.axisTitleSize);
                    rotate(this.yAxisTitleRotation);
                    text(this.xAxisTitle,0, 0);
                }
            pop();
        }
    }

    renderGridLines() {
        push();
            translate(this.chartPosX, this.chartPosY);
            stroke(this.gridLineColour);
            drawingContext.setLineDash([5, 5]);

            // ===========================
            // RADIAL HISTOGRAM GRID LINES
            // ===========================
            if (this.chartType === "radialHistogram") {
                noFill();
                strokeWeight(.5);
                let spacer = this.chartDiameter / this.numTicks;
                for(let i = 1; i <= this.numTicks; i++) {
                    let diameter = i * spacer;
                    ellipse(0, 0, diameter, diameter);
                }

            // =====================
            // BAR CHARTS GRID LINES
            // =====================
            } else {
                //// VERTICAL GRID LINES
                if (this.chartOrientation === "vertical") {
                    let gridSpacing = this.chartHeight / this.numTicks;
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
            }
        pop();
    }

    renderTicks() {
        push();
            translate(this.chartPosX, this.chartPosY);
            noFill();
            stroke(this.tickColour);
            strokeWeight(2);

            if (this.chartType === "radialHistogram") {
                let tickIncrement = (this.chartDiameter / 2) / this.numTicks;
                for (let i = 0; i <= this.numTicks; i++) {
                    let xPos = tickIncrement * i;
                    line(xPos, 0, xPos, 8);
                }
            } else {
                //// VERTICAL TICK LINES
                if (this.chartOrientation === "vertical") {
                    let tickIncrement = this.chartHeight / this.numTicks;
                    for (let i = 0; i <= this.numTicks; i++) {
                        let yPos = -tickIncrement * i;
                        line(0, yPos, -10, yPos);
                    }

                //// HORIZONTAL TICK LINES
                } else {
                    let tickIncrement = this.chartWidth / this.numTicks;
                    for (let i = 0; i <= this.numTicks; i++) {
                        let xPos = tickIncrement * i;
                        line(xPos, 0, xPos, 10);
                    }
                }
            }
        pop();
    }

    renderKey() {
        push();
            translate(this.chartPosX, this.chartPosY);
            noStroke();
            textAlign(LEFT, TOP)
            textSize(this.labelSize);

            for (let i = 0; i < this.yValues.length; i++) {
                let xPos = this.chartWidth + 40;
                let yPos = -40 - (i * 30); // next one sits 30px above the previous

                // Fill both text and rect with same bar colour
                fill(this.barColours[i]);
                // Draw square and yValue beside it
                rect(xPos, yPos, 15, 15);
                text(this.yValues[i], xPos + 25, yPos);
            }

        pop();
    }
}
