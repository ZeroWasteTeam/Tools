var htmlInterface = require('./htmlInterface');
const axios = require('axios');


onInputChangeSync();

function onInputChangeSync() {
    onInputChange().then(x => console.log("Went well")).catch(x => htmlInterface.setError(x.message));
}

async function onInputChange(){
    await valiateToken();
    
    let repositoryNames = await getRepositoryNames();
    htmlInterface.setRepositoryNames(repositoryNames);

    let branches = await getBranchNames();
    htmlInterface.setBranchNames(branches);


    let commitIds = await getCommitIds();

    htmlInterface.setCommitIds(commitIds);
}

async function getCommitIds() {
    let organizationName = htmlInterface.getOrganization();
    let repoName = htmlInterface.getRepository();
    let branchName = htmlInterface.getBranch();
    try {
        let res = await axios.get(`https://api.github.com/repos/${organizationName}/${repoName}/commits?sha=${branchName}`, getConfig());
        return res.data.map(x => x.sha);
    }
    catch (e) {
        if (e.response.status == 404)
            throw new Error("The repoName is not found");
        throw new Error("There may be a problem with the repoName");
    }
}

async function getBranchNames() {
    let organizationName = htmlInterface.getOrganization();
    let repoName = htmlInterface.getRepository();
    try {
        let res = await axios.get(`https://api.github.com/repos/${organizationName}/${repoName}/branches`, getConfig());
        branches = res.data.map(x => x.name);
    }
    catch (e) {
        if (e.response.status == 404)
            throw new Error("The repoName is not found");
        throw new Error("There may be a problem with the repoName");
    }
    return branches;
}

async function getRepositoryNames() {
    let organizationName = htmlInterface.getOrganization();
    try {
        let res = await axios.get(`https://api.github.com/orgs/${organizationName}/repos`, getConfig());
        return res.data.map(x => x.full_name).map(x => x.replace(`${organizationName}/`,''));
    }
    catch (e) {
        if (e.response.status == 404)
            throw new Error("The organization is not found");
        throw new Error("There may be a problem with the organization");
    }
    return repositoryNames;
}

function getConfig() {
    return {
        headers: {
            'Authorization': `token ${htmlInterface.getToken()}`,
            'Accept': 'application/vnd.github+json',
        }
    };
}

async function valiateToken() {
    try {
        let res = await axios.get("https://api.github.com/user",  getConfig());
    }
    catch (e) {
        if (e.response.status == 401)
            throw new Error("The token is incorrect");
        throw new Error("There may be a problem with the token");
    }
}








