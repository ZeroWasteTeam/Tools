var htmlInterface = require('./htmlInterface');

async function process(){
    var token = htmlInterface.getToken();
    
}

console.log(htmlInterface.getBranch());

process().then(x => console.log("Went well")).catch(x => console.log("There is an error"));