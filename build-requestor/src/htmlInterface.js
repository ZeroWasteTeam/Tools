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
        var x = document.getElementById("form-branch");
        console.log("The selected branch is "+x.value);
        return x.value;
    },

    getSha:function () { 
        return 'sha';
    },

    setError:function (error) {
        document.getElementById("error").value = error;
    },

    setRepositoryNames: function(repositories) {
        console.log(repositories);
        setSelectOptions("form-repository", repositories);
    },

    setBranchNames: function(branches) {
        setSelectOptions("form-branch", branches);
    },

    setCommitIds: function(commitIds) {
        console.log(commitIds);
    }
};


module.exports = htmlInterface

function setSelectOptions(id, names) {
    let x = document.getElementById(id);
    let length = x.options.length;
    for (i = length - 1; i >= 0; i--) {
        x.options[i] = null;
    }
    names.forEach(name => {
        var option = document.createElement("option");
        option.text = name;
        x.add(option, x[0]);
    });
}
