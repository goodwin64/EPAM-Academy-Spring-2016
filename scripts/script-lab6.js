// ------------------------------ comment
"use strict";
var animal = { username: "Cat", tagline: "Meow!", noises: [] };

// ------------------------------ loops
for (var key in animal) {
    if (key == "username") {
        console.log('Hi my name is ' + animal[key]);
    } else if (key == "tagline") {
        console.log('I like to say ' + animal[key]);
    }

    // return; // SyntaxError, it's not a function
}
/* 1. Ways to add properties to object:
    1) while creating: 
        someObj.someProp = someVal
        or
        someObj["someProp"] = someVal
    2) assignment: the same, but after creating an object
    3) via Prototypes 
*/

/* 2. Which of these methods would you use if you wanted to add a property to an object that had a weird symbol (think '&')?
    ["someProp&"]
*/

/* 3. What about if the property is a variable, how does that change the syntax?
    This var should be string
*/

// ------------------------------ Arrays as Collections

// Create an array.
var noiseArray = ["Woof!", "Meow", "Bzzz"];
// Using a native array method…
noiseArray.unshift("First noise");
noiseArray.push("Almost last noise");
// Using Bracket Notation…
noiseArray = noiseArray.concat(["Last noise"]);
// What is the length? - 6
// What is the last index? - 5
// How is it different than the length? - length = lastIndex + 1
// Inspect your handiwork! What does it look like? - ["First noise", "Woof!", "Meow", "Bzzz", "Last noise"]

// ------------------------------ Review
/* What are the different ways you can add properties and values to arrays? 
    unshift, push, via square brackets
*/

var animals = [];
animals = [animal];

var quackers = { username: 'DaffyDuck', tagline: 'Yippeee!', noises: ['quack', 'honk', 'sneeze', 'growl'] };
animals.unshift(quackers);

animals.push({
    username: "someFancyUsername",
    tagline: "someMuchMoreFancyTagline",
    noises: ["noise1", "noise2", "noise3"]
});

animals[animals.length] = {
    username: "Woodpecker",
    tagline: "Dr-dr-dr!",
    noises: ["woodpeckerNoise1", "woodpeckerNoise2", "woodpeckerNoise3"]
};

// ------------------------------ Nesting
var friends = [];
for (var i = 0; i < 2; i++) {
    friends.push(animals[i].username);
}

// Add your friends data structure to the relationships object.
var relationships = {};
relationships.friends = friends;

// Add the matches array to the relationships object.
var matches = [];
relationships.matches = matches;

// Using the relationships object, add at at least one username to matches.
relationships.matches.push(relationships.friends[-1]);

// Inspect your object. Is the matches array now populated with some lucky animal?
// mb

// Loop through your animals collection, adding the relationships object to each animal object. 
for (var a in animals) {
    animals[a].relationships = relationships;
}
console.log(animals);
// ------------------------------ Functions
function AnimalTestUser(name) {
    var otherArgs = [];
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            otherArgs.push(arguments[i]);
        }
    }
    return !!otherArgs ? { username: name, otherArgs: otherArgs } : { username: name };
}

function AnimalCreator(username, species, tagline, noises) {
    return {
        username: username,
        species: species,
        tagline: tagline,
        noises: noises,
        friends: []
    };
}

function addFriend(thisAnimal, otherAnimal) {
    thisAnimal.friends.push(otherAnimal.username);
    // otherAnimal.friends.push(thisAnimal);
}

var myFarm = [new AnimalCreator("username", "species", "tagline", "noises")];
console.log("With only 1 animal created by AnimalCreator:", myFarm);
animals.forEach(function(elem) {
    myFarm.push(elem);
});
myFarm.map(function(elem) {
    if (!elem.friends) {
        elem.friends = [];
    }
});
console.log(myFarm);
addFriend(myFarm[0], myFarm[1]);
addFriend(myFarm[0], myFarm[2]);
addFriend(myFarm[1], myFarm[3]);
addFriend(myFarm[2], myFarm[1]);
addFriend(myFarm[3], myFarm[0]);
// explicit friend addition
myFarm[0].friends.push("Another friend 1");
myFarm[0].friends.push("Another friend 2");
myFarm[0].friends.push("Another friend 3");

function addMatchesArray(farm) {
    for (var i = 0; i < farm.length; i++) {
        farm[i].matches = [];
    }
}
addMatchesArray(myFarm);
console.log("After adding matches:", myFarm);

function giveMatches(farm) {
    for (var i = 0; i < farm.length; i++) {
        for (var j = 0; j < farm[i].friends.length; j++) {
            if (Math.random() < 0.5) {
                farm[i].matches.push(farm[i].friends[j]);
            }
        }
    }
}
giveMatches(myFarm);
console.log("After giving matches:", myFarm);
