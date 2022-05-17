const fs = require('fs');
const commandFile = require('./command.json');

const dataRead = fs.readFileSync('./command.json');
const dataJSON = dataRead.toString();
const command = JSON.parse(dataJSON);
console.log(command);

const userInput = "추가 한것 ";

command[userInput] = "test1";

const updateJSON = JSON.stringify(command);

fs.writeFileSync('./command.json', updateJSON);


var keys = Object.keys(commandFile); 
for (var i=0; i<keys.length; i++) {
    var key = keys[i];
    //console.log("key : " + key + ", value : " + commandFile[key]);
}


