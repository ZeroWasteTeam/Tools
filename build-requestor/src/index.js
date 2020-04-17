var htmlInterface = require('./htmlInterface');
const axios = require('axios');

module.exports = {
    onPageLoad: function () {
        console.log("Page loaded started");
        populateToken();
        populateOrganziation();
        setRepositoryNames()
            .then(x => console.log("Page Load Completd Successfully"))
            .catch(x => {
                htmlInterface.setError(x.message);
                console.log(`Page load completed with errors : ${x.message}`);
            });
    },

    onTokenChange: function () {
        console.log("Token has been changed");
        persistToken();
        setRepositoryNames()
            .then(x => console.log("Token Change completed successfully"))
            .catch(x => {
                htmlInterface.setError(x.message);
                console.log(`Token change completed with errors: ${x.message}`);
            });
    },

    onOrganizationChange: function () {
        console.log("Organization has been changed");
        persistOrganization();
        setRepositoryNames()
            .then(x => console.log("Organziation Change completed successfully"))
            .catch(x => {
                console.log("Organziation Change completed with errors: " + x.message);
                htmlInterface.setError(x.message);
            });
    },

    onRepositoryChange: function () {
        console.log("Repository has been changed");

        setBranchNames()
            .then(x => console.log("Repository Change completed successfully"))
            .catch(x => {
                console.log("Repository Change completed with errors: " + x.message);
                htmlInterface.setError(x.message);
            });
    },

    onInputChangeSyncInterface: function () {
        setRepositoryNames();
    }
};

function persistToken() {
    var token = htmlInterface.getToken();
    let localStorageToken = localStorage.getItem("token");
    if (token == null) token = "";
    if (localStorageToken != token)
        localStorage.setItem("token", token);
}

function persistOrganization() {
    var organization = htmlInterface.getOrganization();
    console.log("organization is " + organization);
    let localStorageOrganization = localStorage.getItem("organization");
    if (organization == null) organization = "";
    if (localStorageOrganization != organization) {
        localStorage.setItem("organization", organization);
        console.log("LocalStorage org" + localStorage.getItem("organization"));
    }
}

function populateToken() {
    let token = localStorage.getItem("token");
    if (token != null) {
        document.getElementById('form-token').value = token;
    }
}

function populateOrganziation() {
    let organziation = localStorage.getItem("organization");
    if (organziation != null) {
        document.getElementById('form-organization').value = organziation;
    }
}

async function setRepositoryNames() {
    assertBasicInputsAreNotEmpty();
    await valiateToken();

    let repositoryNames = await getRepositoryNames();
    htmlInterface.setRepositoryNames(repositoryNames);

    /*s
    

    let commitIds = await getCommitIds();
    htmlInterface.setCommitIds(commitIds);
    */
}

async function setBranchNames() {
    //Validation needed

    let branches = await getBranchNames();
    htmlInterface.setBranchNames(branches);
}

function assertBasicInputsAreNotEmpty() {
    let token = htmlInterface.getToken();
    if ((token == null) || (token == ""))
        throw new Error("The token is empty");
    let organization = htmlInterface.getOrganization();
    if ((organization == null) || (organization == ""))
        throw new Error("The organization is empty");
}

async function getCommitIds() {
    let organizationName = htmlInterface.getOrganization();
    let repoName = htmlInterface.getRepository();
    let branchName = htmlInterface.getBranch();
    try {
        let res = await axios.get(`https://api.github.com/repos/${organizationName}/${repoName}/commits?sha=${branchName}`, getConfig());
        return res.data.map(x => x.sha);
    } catch (e) {
        if (e.response.status == 404)
            throw new Error("The repoName is not found");
        throw new Error("There may be a problem with the repoName");
    }
}

async function getBranchNames() {
    let organizationName = htmlInterface.getOrganization();
    let repoName = htmlInterface.getRepository();
    console.log("THe repo name is#" + repoName);
    try {
        let res = await axios.get(`https://api.github.com/repos/${organizationName}/${repoName}/branches`, getConfig());
        branches = res.data.map(x => x.name);
    } catch (e) {
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
        return res.data.map(x => x.full_name).map(x => x.replace(`${organizationName}/`, ''));
    } catch (e) {
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
        let res = await axios.get("https://api.github.com/user", getConfig());
    } catch (e) {
        if (e.response.status == 401)
            throw new Error("The token is incorrect");
        throw new Error("There may be a problem with the token");
    }
}