var htmlInterface = {
    getToken: function () { 
        return 'e14267c2a56d4adf4e27a7e403e05303a30b976e';
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

    setError:function () {
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