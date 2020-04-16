var htmlInterface = require('./htmlInterface');
const axios = require('axios');

async function process(){
    await valiateToken();

    console.log(res);
    console.log("done");
    
}

console.log(htmlInterface.getBranch());

process().then(x => console.log("Went well")).catch(x => console.log(x.message));

async function valiateToken() {
    var token = htmlInterface.getToken();
    try {
        let res = await axios.get("https://api.github.com/user");
    }
    catch (e) {
        if (e.response.status == 401)
            throw new Error("The token is incorrect");
        throw new Error("There may be a problem with the token");
    }
}

