var formElt = document.querySelector("form");
var infosElt = document.getElementById("infos");

function ajaxGet(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function () {
		if (req.status >=200 && req.status < 400) {
			callback(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url)
		}
	});

	req.addEventListener("error", function () {
		console.error("Erreur réseau avec l'URL " + url)
	});

	req.send(null);
}

function showProfile (reqResponse) {
	var responseJson = JSON.parse(reqResponse);
	console.log(responseJson);
	//Ajout de l'avatar
	var avatarElt = document.createElement("img");
	avatarElt.setAttribute("src", responseJson.avatar_url);
	infosElt.appendChild(avatarElt);
	//Ajout du nom
	var fullNameElt = document.createElement("h2");
	fullNameElt.textContent = responseJson.name;
	infosElt.appendChild(fullNameElt);
	//Ajout de l'employeur
	var companyElt = document.createElement("h4");
	companyElt.textContent = responseJson.company;
	infosElt.appendChild(companyElt);
	//Ajout du site web
	var siteElt = document.createElement("a");
	siteElt.textContent = responseJson.blog;
	siteElt.setAttribute("href", responseJson.blog);
	siteElt.setAttribute("target", "_blank");
	infosElt.appendChild(siteElt);
	//Repos
	var reposElt = document.createElement("p");
	reposElt.textContent = responseJson.public_repos + " public repos";
	infosElt.appendChild(reposElt);
}


formElt.addEventListener("submit", function(e) {
	//Empêche le rechargement de la page quand on soumet le formulaire :
	e.preventDefault();

	//Supprimer le contenu actuel
	infosElt.innerHTML = ""

	//récupérer le nom saisi
	var profile = formElt.elements[0].value;

	//modifier l'url de la requête avec le nom
	completeUrl = "https://api.github.com/users/" + profile
	console.log(completeUrl);
	//envoyer la requête à l'API
	ajaxGet(completeUrl, showProfile);
});