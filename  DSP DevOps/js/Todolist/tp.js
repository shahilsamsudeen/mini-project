let tabTaches = [];
let tabTravailleurs = [
    {id: 0,  nom: "Ahmed", departement: "CyberSec", score: 0,},
    {id: 1,  nom: "Joe", departement: "Dev", score: 0,},
    {id: 2,  nom: "Mike", departement: "Dev", score: 0,},
    {id: 3, nom: "Billy", departement: "Front-end", score: 0}

];
let tabDepartement = [
    {id: 0,  nom: "CyberSec", scoreValider: 0, scoreEnCours: 0,},
    {id: 1,  nom: "Dev", scoreValider: 0, scoreEnCours: 0,},
    {id: 2,  nom: "Front-end", scoreValider: 0, scoreEnCours: 0,}
    

];
let tabTravailDept = [
    {id: 0, nom: "Dev", nbrTravailleurs: 0, scoreValider: 0},
    {id: 1, nom: "CyberSec", nbrTravailleurs: 0, scoreValider: 0},
    {id: 2, nom: "Front-end", nbrTravailleurs: 0, scoreValider: 0},
]


function ajouterTache() {
    let leTravailleur = document.getElementById("travailleur").value;
    let laDescriptionTache = document.getElementById("descriptionTache").value;
    let laDatetache = document.getElementById("dateTache").value;

    let leStatus = "en cours";

    let nouvelleTache = {
        nom: leTravailleur,
        description: laDescriptionTache,
        date: laDatetache,
        status: leStatus
    };

    tabTaches.push(nouvelleTache);

    for (let j = 0; j < tabTravailleurs.length; j++) {
        if (tabTravailleurs[j].nom == leTravailleur) {
            let leDepartement = tabTravailleurs[j].departement;

            for (let k = 0; k < tabDepartement.length; k++) {
                if (tabDepartement[k].nom == leDepartement) {
                    tabDepartement[k].scoreEnCours += 1;
                }
            }
        }
    }

    document.getElementById("travailleur").value = "";
    document.getElementById("descriptionTache").value = "";
    document.getElementById("dateTache").value = "";

    afficherTaches();
    afficherDepartements();
}

function ajouterTravailleurs () {
    let tempid = tabTravailleurs.length;
    let Travailleur = document.getElementById("ajoutTravailleur").value;
    let departement = document.getElementById("ajoutDepartement").value;
    let Score = 0;


    let nouveauTravailleur = {
        id: tempid,
        nom: Travailleur,
        departement: departement,
        score: Score
    };
    tabTravailleurs.push(nouveauTravailleur);

    let departementExiste = false;
    for (let k = 0; k < tabDepartement.length; k++){
        if ( tabDepartement[k].nom == departement) {
            departementExiste = true;
        }
        }
        if (departementExiste == false) {
            tabDepartement.push ({
                id: tabDepartement.length,
                nom: departement,
                scoreEnCours: 0,
                scoreValider: 0
            })
    }

    afficherTaches();
    afficherDepartements();
    afficherTravailleurs();
}


function validerTache(maTacheTerminer) {   
    tabTaches[maTacheTerminer].status = "Terminer";

    let leTravailleur = tabTaches[maTacheTerminer].nom;
    for (let j = 0; j < tabTravailleurs.length; j++) {
        if (tabTravailleurs[j].nom == leTravailleur) {
            tabTravailleurs[j].score += 1;

            let leDepartement = tabTravailleurs[j].departement;
            for (let k = 0; k < tabDepartement.length; k++) {
                if (tabDepartement[k].nom == leDepartement) {
                tabDepartement[k].scoreValider += 1;
                tabDepartement[k].scoreEnCours -= 1;
                }
            }
        }
    }

    afficherTaches();
    afficherTravailleurs();
    afficherDepartements();
    moyenneTache();
    
}
   

function afficherTaches() {
    let listeAfficherTache = '';
    for (let i = 0; i < tabTaches.length; i++) {
        listeAfficherTache = listeAfficherTache                                       
                              +" Nom : " + tabTaches[i].nom
                              +"<br> Description : " + tabTaches[i].description
                              +"<br> Date : " + tabTaches[i].date
                              +"<br> Status : " + tabTaches[i].status
                              
        if (tabTaches[i].status !== "Terminer") {
            listeAfficherTache += `<button onclick="validerTache(${i})">Valider la tâche</button>`;
        }
        listeAfficherTache += "<br><hr><br>";
    }
    document.getElementById("listeTaches").innerHTML = listeAfficherTache;
}



function afficherTravailleurs() {
    let listeAfficherTravailleurs = '';
    for (let j = 0; j < tabTravailleurs.length; j++) {
        listeAfficherTravailleurs = listeAfficherTravailleurs
            +" Nom : " + tabTravailleurs[j].nom
            +"<br> Département : " + tabTravailleurs[j].departement
            +"<br> Score : " + tabTravailleurs[j].score + "<br><br>";
    }
    document.getElementById("listeTravailleurs").innerHTML = listeAfficherTravailleurs;

    afficherTaches();
    afficherDepartements();
}


function afficherDepartements(){
    let listeAfficherDepartements = '';
    for (let l = 0; l < tabDepartement.length; l++) {
        listeAfficherDepartements = listeAfficherDepartements
            + "<br>Nom : " + tabDepartement[l].nom
            + "<br>Tâches en cours : " + tabDepartement[l].scoreEnCours
            + "<br>Tâches validés : " + tabDepartement[l].scoreValider + "<br><br>";
    }
    document.getElementById("listeDepartements").innerHTML = listeAfficherDepartements;
}

function moyenneTache (){
    let listeAfficherMoyenne = '';
    let compteurTravailleur = 0;
    for (let n = 0; n < tabDepartement.length; n++) {

        for (let j = 0; j < tabTravailleurs.length; j++){
            if ( tabTravailleurs[j].departement == tabDepartement[n].nom) {
                compteurTravailleur += 1;
            }
        }
        let moyenne = tabDepartement[n].scoreValider / compteurTravailleur;
        listeAfficherMoyenne = listeAfficherMoyenne
                +"<br>Département : " + tabDepartement[n].nom 
                + "<br>Moyenne : " + moyenne + "<br><br>";
        compteurTravailleur = 0;
    }
    document.getElementById("moyenne").innerHTML = listeAfficherMoyenne;
}

    afficherTravailleurs();
    afficherDepartements();

document.getElementById("AjouterTache").addEventListener("click", function() {
    ajouterTache();
});

document.getElementById("AjouterTravailleurs").addEventListener("click", function() {
    ajouterTravailleurs();
});

