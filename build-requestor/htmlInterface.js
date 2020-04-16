var htmlInterface = {
    getToken: function () { 
        return '78e26e0fec3199740896159e819ac50271b10479';
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