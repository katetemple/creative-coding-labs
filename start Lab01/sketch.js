let age;
const dob = "02/05/2002";

age = 2025 - parseInt(dob.substring(6, 10));
console.log(age);

let friends = ["Joe", "Brian", "Rob"];
// friends.push("Joe");

friends.splice(1, 0, "Mary");

let arrayLength = friends.length;

for (let num = 0; num < friends.length; num++) {
    console.log(friends[num]);
}

let myFriend = {
    name: "Joe",
    age: "20",
    eirCode: "A98FJST",
};
