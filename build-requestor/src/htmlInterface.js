var htmlInterface = {
    getToken: function () { 
        return document.getElementById("form-token").value;
    },

    getOrganization:function () { 
        return document.getElementById("form-organization").value;
    },

    getRepository:function () { 
        console.log("element ->"+document.getElementById("form-repository"));
        console.log(document.getElementById("form-repository"));
        console.log("element value ->"+document.getElementById("form-repository").value);
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
        var x = document.getElementById("form-branch");
        

        branches.forEach(branch => {
            var option = document.createElement("option");
            option.text = branch;
            x.add(option, x[0]);
        });
        console.log(branches);
    },

    setCommitIds: function(commitIds) {
        console.log(commitIds);
    }
};


module.exports = htmlInterface