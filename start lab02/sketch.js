let friend01 = {
    name: "Brian",
    age: 21,
    bowling: true,
};

let friend02 = {
    name: "Joe",
    age: 24,
    bowling: false,
};

let friend03 = {
    name: "Rob",
    age: 26,
    bowling: false,
};

let friend04 = {
    name: "Rachel",
    age: 19,
    bowling: true,
};

let friend05 = {
    name: "Jack",
    age: 30,
    bowling: true,
};

let friends = [];
let friendAges = [];
let friendBowlingAges = [];

friends.push(friend01);
friends.push(friend02);
friends.push(friend03);
friends.push(friend04);
friends.push(friend05);

for (let i = 0; i < 5; i++) {
    friendAges.push(friends[i].age);
}

for (let i = 0; i < 5; i++) {
    if (friends[i].bowling == true) {
        friendBowlingAges.push(friends[i].age);
    }
}

function calcAvg(arrayNums) {
    let startValue = 0;

    for (i = 0; i < arrayNums.length; i++) {
        startValue = startValue + arrayNums[i];
    }

    return startValue / arrayNums.length;
}

// function calcAvg() {
//     let friendsTotalAge = 0;

//     for (i = 0; i < friendBowlingAges.length; i++) {
//         friendsTotalAge += friendBowlingAges[i];
//     }

//     return friendsTotalAge / friendBowlingAges.length;
// }

for (let i = 0; i < 100; i++) {
    if (i % 5 == 0) {
        console.log(i);
    }
}

function median(arrayNums) {
    arrayNums.sort((a, b) => a - b);

    if (arrayNums.length % 2 == 0) {
        let endNum = arrayNums.length / 2;
        let startNum = endNum - 1;

        return (arrayNums[startNum] + arrayNums[endNum]) / 2;
    } else {
        return arrayNums[Math.floor(arrayNums.length / 2)];
    }
}

// Make an array
let instruments = [];

let instrument01 = {
    name: "guitar",
    colour: "blue",
    strings: 5,
};

let instrument02 = {
    name: "bass",
    colour: "white",
    strings: 4,
};

let instrument03 = {
    name: "violin",
    colour: "red",
    strings: 6,
};

let instrument04 = {
    name: "mandalin",
    colour: "yellow",
    strings: 12,
};

let instrument05 = {
    name: "double bass",
    colour: "brown",
    strings: 8,
};

// let instrument06 = {
//     name: "blah",
//     colour: "brown",
//     strings: 10,
// };

let myInstruments = [instrument01, instrument02, instrument03, instrument04, instrument05];

// push instruments to my instruments array
for (i = 0; i < myInstruments.length; i++) {
    instruments.push(myInstruments[i]);
}

// Make functions to calc Mean and Median of the instruments' strings

let instrumentsStrings = [];
for (i = 0; i < instruments.length; i++) {
    instrumentsStrings.push(instruments[i].strings);
}

function calcMean(arrayNum) {
    // initialise sum variable
    let sum = 0;

    // loop through array
    for (i = 0; i < arrayNum.length; i++) {
        // add array value to sum
        sum = sum + arrayNum[i];
    }

    return sum / arrayNum.length;
}

function calcMed(arrayNum) {
    // sort the numbers
    arrayNum.sort((a, b) => a - b);

    if (arrayNum.length % 2 == 0) {
        let secondNum = arrayNum.length / 2;
        let firstNum = secondNum - 1;

        return (arrayNum[secondNum] + arrayNum[firstNum]) / 2;
    } else {
        return arrayNum[Math.floor(arrayNum.length / 2)];
    }
}

// function that calculates total strings on instruments with specified colour
function totalStrings(colour) {
    // initialise sum var
    let sum = 0;

    // loop through instruments
    for (i = 0; i < instruments.length; i++) {
        if (instruments[i].colour == colour) {
            sum = sum + instruments[i].strings;
        }
    }

    return sum;
}

// function that creates new array with high string instruments and calculates avg num of strings for them
function highStringInstrumentsAvgStrings() {
    // initialise array
    let highStringInstruments = [];
    let totalStrings = 0;

    // loop through instruments array
    for (i = 0; i < instruments.length; i++) {
        if (instruments[i].strings > 5) {
            highStringInstruments.push(instruments[i]);
            totalStrings = totalStrings + instruments[i].strings;
        }
    }

    return totalStrings / highStringInstruments.length;
}

// function to calculate range of strings
function calcRange(arrayNums) {
    let maxValue = Math.max(...arrayNums);
    let minValue = Math.min(...arrayNums);

    return maxValue - minValue;
}
