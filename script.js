/*  0 = pas de couleur
	1 = Rouge
	2 = Jaune
	3 = Vert
	4 = Bleu
	5 = Orange
	6 = Violet
	7 = marron
	8 = Blanc
*/
function init(){ //Initialise le jeux.
	window.tabSelection = [];
	window.tabReponse = [];
	window.nbTentative = 1;
	window.tabEssai = document.querySelectorAll('.essai');

	window.colorReponse = document.querySelectorAll('.reponse');
	for(i=0; i<4; i++){
		do{
			var temp = parseInt(Math.random() * (9 - 1) + 1);
		}while(temp == tabReponse[0] || temp == tabReponse[1] || temp == tabReponse[2] || temp == tabReponse[3])
		tabReponse.push(temp);
	}
}

function conversionChiffreCouleur(tabChiffre, caseC){//Convertie les chiffres avec les bonnes couleurs
	for(i=0; i<caseC.length; i++){
		switch(tabChiffre[i]){
			case 0:
				caseC[i].className += ' noir';
				break;
			case 1:
				caseC[i].className += ' rouge';
				break;
			case 2:
				caseC[i].className += ' jaune';
				break;
			case 3:
				caseC[i].className += ' vert';
				break;
			case 4:
				caseC[i].className += ' bleu';
				break;
			case 5:
				caseC[i].className += ' orange';
				break;
			case 6:
				caseC[i].className += ' violet';
				break;
			case 7:
				caseC[i].className += ' marron';
				break;
			case 8:
				caseC[i].className += ' blanc';
		}
	}
}

function selection(valeur){//Enregistre les couleurs rentré et les affiche sur la ligne d'essai
	var i = 0;
	var test = true;
	while(test){
		if(tabEssai[i].getAttribute('class') == 'case essai'){
			tabSelection.push(valeur);
			conversionChiffreCouleur(tabSelection, tabEssai);
			test = false
		} else {
			i++
		}
	}
}

function verif(){//Compare les couleur rentré avec la solution et les affiche sur la bonne ligne
	if(tabSelection.length == 4){
		var bCouleur = 0;//Variable s'incrémente pour couleur juste
		var bPosition = 0; //Variable s'incrémente emplacement juste
		var ligneTentative = document.querySelectorAll('.lt'+nbTentative);//selectionne les éléments HTML pour afficher la tentative sur le plateau de jeu
		var aideCouleur = document.getElementById('bc'+nbTentative);//
		var aidePosition = document.getElementById('bp'+nbTentative);
		conversionChiffreCouleur(tabSelection, ligneTentative);
		for(i=0; i<4; i++){
			for(p=0; p<4; p++){
				if(tabSelection[p] == tabReponse[i] && p==i){
					bPosition++;
				} else if(tabSelection[p] == tabReponse[i]){
					bCouleur++;
				}
			}
			tabEssai[i].setAttribute('class', 'case essai');
		}
		if(bPosition == 4){
			winner(nbTentative);
		}
		aideCouleur.innerHTML = bCouleur;
		aidePosition.innerHTML = bPosition;
		tabSelection = [];
		nbTentative++;
		if(nbTentative == 9){
			loser();
		}
	}
}

function supp(){
	for(i=0; i<4; i++){
		tabEssai[i].setAttribute('class', 'case essai');
	}
	tabSelection = [];
}

function winner(coup){
	var win = document.getElementById('fin');
	win.style.visibility = 'visible';
	win.style.backgroundColor = 'green';
	win.innerHTML += '<br>Bravo vous avez gagnez en '+coup+' coups';
	conversionChiffreCouleur(tabReponse, colorReponse);
}

function loser(){
	var lose = document.getElementById('fin');
	lose.style.visibility = 'visible';
	lose.style.backgroundColor = 'red';
	lose.innerHTML += "<br>Dommage c'est perdu";
	conversionChiffreCouleur(tabReponse, colorReponse);
}