var htmlInterface = require('./htmlInterface');
const axios = require('axios');

module.exports = {
    onPageLoad: function () {
        populateToken();
        populateOrganziation();
        console.log("Token"+document.getElementById("form-token").value);
        onInputChangeSync();
    },
    
    onTokenChange: function () {
        persistToken();
        onInputChangeSync()
    },
    
    onOrganizationChange: function (){
        persistOrganization();
        onInputChangeSync();
    }
};

function readToken() {
    return document.getElementById("form-token").value;
}

function readOrganization() {
    return document.getElementById("form-organization").value;
}

function persistToken() {
    var token = readToken();
    let localStorageToken = localStorage.getItem("token");
    if (token == null) token = "";
    if (localStorageToken != token)
        localStorage.setItem("token", token);
}

function persistOrganization() {
    var organization = readOrganization();
    console.log("organization is "+organization);
    let localStorageOrganization = localStorage.getItem("organization");
    if (organization == null) organization = "";
    if (localStorageOrganization != organization){
        localStorage.setItem("organization", organization);
        console.log("LocalStorage org"+localStorage.getItem("organization"));
    }
}



function populateToken() {
      let token = localStorage.getItem("token");
      if(token != null){
          document.getElementById('form-token').value = token;
      }
  }

  function populateOrganziation() {
      let organziation = localStorage.getItem("organization");
      if(organziation != null){
          document.getElementById('form-organization').value = organziation;
      }
  }


  function onPageLoad() {
      populateToken();
      populateOrganziation();
      console.log("Token"+document.getElementById("form-token").value);
      onInputChangeSync();
  }



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








