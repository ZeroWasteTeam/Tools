var htmlInterface = {
    getToken: function () { 
        return '6b6bd877bc80d72c071bb36c9d6da56146d9ba32';
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