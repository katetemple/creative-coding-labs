class RadialHistogram {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj. yValue;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 350;
        this.chartDiameter = obj.chartDiameter || 600;
        this.chartTitle = obj.chartTitle || "Raadial Histogram";

        // calc number of slices and the angle for each slice
        this.numSlices = this.data.length;
        this.sliceAngle = 360 / this.numSlices;

        // calc max value and scaler
        this.maxValue = max(this.data.map((row) => row[this.yValue]));
        this.scaler = this.chartDiameter / this.maxValue;
    }

    render() {
        this.renderBase();
        this.renderData();
        this.renderTitle();
        this.renderLabels();
    }

    renderBase() {
        push();
            translate(this.chartPosX, this.chartPosY);

            for (let i = 0; i < this.numSlices; i++) {
                stroke(1)

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

            for(let i = 0; i < this.numSlices; i++){
                let startAngle = 0;
                let endAngle = this.sliceAngle;
                let heightValue = this.data[i][this.yValue] * this.scaler;

                noStroke();
                fill (random(150));
                arc(0, 0, heightValue, heightValue, startAngle, endAngle, PIE);
                rotate(endAngle);
            }
        pop();
    }

    renderTitle() {
        push();
            translate(this.chartPosX, this.chartPosY)
            textAlign(CENTER);
            text(this.chartTitle, 0, -this.chartDiameter / 2 - 90);

        pop();
    }

    renderLabels() {
        push();
            translate(this.chartPosX, this.chartPosY);
            fill(255)
            textAlign(CENTER, CENTER);
            let labelRadius = this.chartDiameter / 2;

            for(let i = 0; i < this.numSlices; i++) {
                let midAngle = i * this.sliceAngle + this.sliceAngle / 2;
                let xPos = (labelRadius + 50) * cos(midAngle);
                let yPos = (labelRadius + 50) * sin(midAngle);

                text(this.data[i][this.xValue], xPos, yPos);
            }
        pop();
    }
}
