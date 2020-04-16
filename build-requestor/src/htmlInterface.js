var htmlInterface = {
    getToken: function () { 
        return document.getElementById("form-token").value;
    },

    getOrganization:function () { 
        return document.getElementById("form-organization").value;
    },

    getRepository:function () { 
        return document.getElementById("form-repository").value;
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