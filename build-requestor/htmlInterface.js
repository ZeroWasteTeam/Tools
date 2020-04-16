var htmlInterface = {
    getToken: function () { 
        return 'e14267c2a56d4adf4e27a7e403e05303a30b976e';
    },

    getOrganization:function (warning) { 
        return 'ZeroWasteTeam';
    },

    getRepository:function (error) { 
        return 'SampleJavaMavenPackage';
    },

    getBranch:function (error) { 
        return 'branch';
    },

    getSha:function (error) { 
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
    }
    


};

module.exports = htmlInterface