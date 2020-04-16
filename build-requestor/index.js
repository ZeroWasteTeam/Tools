var htmlInterface = require('./htmlInterface');
const axios = require('axios');

async function process(){
    await valiateToken();

    let organizationName = 'ZeroWasteTeam';    
    let repositoryNames = await getRepositoryNames(organizationName);
    htmlInterface
    console.log(repositoryNames);
    console.log("done");
    
}

console.log(htmlInterface.getBranch());

process().then(x => console.log("Went well")).catch(x => console.log(x.message));

async function getRepositoryNames(organizationName) {
    let repositoryNames;
    try {
        let config = {
            headers: {
                'Authorization': `token ${htmlInterface.getToken()}`,
                'Accept': 'application/vnd.github+json',
            }
        };
        let res = await axios.get(`https://api.github.com/orgs/${organizationName}/repos`, config);
        repositoryNames = res.data.map(x => x.full_name);
    }
    catch (e) {
        console.log(e);
        if (e.response.status == 404)
            throw new Error("The organization is not found");
        throw new Error("There may be a problem with the organization");
    }
    return repositoryNames;
}

async function valiateToken() {
    var token = htmlInterface.getToken();
    try {

        let config = {
            headers: {
                'Authorization': `token ${token}`,
                'Accept' : 'application/vnd.github+json',
            }
          }
        let res = await axios.get("https://api.github.com/user",  config);
    }
    catch (e) {
        if (e.response.status == 401)
            throw new Error("The token is incorrect");
        throw new Error("There may be a problem with the token");
    }
}








