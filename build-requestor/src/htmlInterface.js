var htmlInterface = {
    getToken: function () { 
        var token = document.getElementById("form-token").value;
        console.log(document.getElementById("form-token"));
        console.log("Token is "+token);
        return token;
    },

    getOrganization:function () { 
        return 'ZeroWasteTeam';
    },

    getRepository:function () { 
        return 'SampleJavaMavenPackage';
    },

    getBranch:function () { 
        return 'release-1234';
    },

    getSha:function () { 
        return 'sha';
    },

    setError:function (error) {
        console.log(error);
    },

    setRepositoryNames: function(repositories) {
        console.log(repositories);
    },

    setBranchNames: function(branches) {
        console.log(branches);
    },

    setCommitIds: function(commitIds) {
        console.log(commitIds);
    }
    


};

module.exports = htmlInterface