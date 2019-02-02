const axios = require("axios"); 
require("dotenv").config();

const reposToKeep = ["FiDirect", "FiDirect-Client", "Rails-Fitness-Tracker", "Sinatra-Fantasy-Football", "RateYourAcquaintance", "RateYourAcquaintanceAPI", "highestProductOfThree", "hand-trackerAPI", "hand-trackerClient", "github-batch-delete", "CipherText", "JsPong", "AdamT213.github.io", "FBA-prof-prodsClient", "FBA-prof-prods"];

const getListOfRepos = () => { 

	return axios({
		method:"get",
		Accept: "application/vnd.github.v3+json",
		url:`https://api.github.com/user/repos?access_token=${process.env.Github_OAuth_Token}&per_page=100`,
		affiliation: "owner"
	}).then(success => success.data)
		.catch(e => console.log(e));
};

const deleteOldRepos = async () => { 
	const repos = await getListOfRepos();
	repos.forEach(r => {
		if (!(reposToKeep.includes(r.name))) {
			console.log(r.name); 
			deleteRepo(r.name);
		}
	});
}; 

const deleteRepo = repo => { 
	return axios({
		method:"delete",
		Accept: "application/vnd.github.v3+json",
		url:`https://api.github.com/repos/${process.env.Github_Username}/${repo}?access_token=${process.env.Github_OAuth_Token}`
	}).then(success => console.log(success))
		.catch(e => console.log(e));
};

deleteOldRepos();
