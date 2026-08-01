# include "inout.h"
#define BOOL int 
#define TRUE 1
#define FALSE 0


// On va vérifier si les trois cases de la ligne sont identiques et pas vide ('_')
BOOL ligneIdentique(char grille[], int ligne) {     // renvoie TRUE si la ligne du tableau grille est identique

    // ligne 0, c'est les indices 0,1,2; ligne 1, indice 3,4,5; ligne 2, indice 6,7,8
    // les trois cases de la ligne sont grille[ligne*3], grile[ligne*3+1], grille[ligne*3+1]

    char c = grille[ligne * 3];
    // on vérifie que la case n'est pas vide et que les trois cases sont égales
    return (c != '_') && (c == grille[ligne * 3 + 1] ) && (c == grille[ligne * 3 + 2]);
} 

// Pareil pour la colonne, on vérifie si les trois cases de la colonne sont identiques et pas vide
BOOL colonneIdentique(char grille[], int col) {     // renvoie TRUE si la ligne du tableau grille est identique

    // colonne 0, indice 0,3,6; colonne 1, indice 1,4,7; colonne 2, indice 2,5,8
    // les trois cases de la colonne sont grille[col], grille[col + 3], grille[col + 6]
    char c = grille[col];
    return (c != '_') && (c == grille[col + 3]) && (c == grille[col + 6]);
}

// pareil pour la diagonale majeure 
BOOL diag1Identique(char grille[]) {        // renvoie TRUE si la diagonale majeure du tableau grille est identique
    // indices: 0,4,8
    char c = grille[0];
    return (c != '_') && (c == grille[4]) && (c == grille[8]);
}

// pareil pour la diagonale mineure 
BOOL diag2Identique(char grille[]) {        // renvoie TRUE si la diagonale mineure du tableau grille est identique
    // indices : 2,4,6
    char c = grille[2];
    return (c != '_') && (c == grille[4]) && (c == grille[6]);

}

// Appelle les 4 fonctions au dessus pour chaque lignes, colonnes et diagonales
// On va vérifier si toutes les lignes, colonnes et diagonales sont gagantes
BOOL testGagne(char grille[])  {        // renvoie TRUE si le tableau grille est une position gagnante.

    // tester les 3 lignes (0, 1, 2)
    if (ligneIdentique(grille, 0)) return TRUE;
    if (ligneIdentique(grille, 1)) return TRUE;
    if (ligneIdentique(grille, 2)) return TRUE;

    // tester les 3 colonnes (0,1,2)
    if (colonneIdentique(grille, 0)) return TRUE;
    if (colonneIdentique(grille, 1)) return TRUE;
    if (colonneIdentique(grille, 2)) return TRUE;

    // tester les 2 diagonales
    if (diag1Identique(grille)) return TRUE;
    if (diag2Identique(grille)) return TRUE;

    return FALSE;
}


void afficheGrille(char grille[]) {         // affiche les 9 caractères omme une grille dans le terminal : 3 lignes de 3 caractères

    // ligne 0 : cases 0, 1, 2
    ecrireChar(grille[0]);
    ecrireChar(grille[1]);
    ecrireChar(grille[2]);
    ecrireSautDeLigne();

    // ligne 2 : cases 3,4,5
     ecrireChar(grille[3]);
    ecrireChar(grille[4]);
    ecrireChar(grille[5]);
    ecrireSautDeLigne();

    // ligne 3 : cases 6,7,8
     ecrireChar(grille[6]);
    ecrireChar(grille[7]);
    ecrireChar(grille[8]);
    ecrireSautDeLigne();
}


int main() {

    // On représente la grille du jeu 
    char grille[9] = {'_','_','_','_','_','_','_','_','_',};
    
    // Devient FALSE quand une victoire st détectée et arrête la boucle 
    int pasGagne = TRUE;

    // Devient FALSE quand toute les cases ont été cochées et arrête la boucle 
    int casesLibres = TRUE;

    // contiendra le numéro désigné ar le joueur qui joue ( 1 à 9)
    int casecochee;

    // Le joueur dont c'est le tour ('x' ou 'o')
    char joueur = 'x';

    // nombre de coups joués
    int nbCoupsJoues = 0;

    // boucle principale : on joue tant que personne n'a gagné et qu'il reste des cases
    while (pasGagne && casesLibres) {

        // 1) affiche la grille 
        afficheGrille(grille); 

        // 2) lire un entier au clavier
        ecrireString("Joueur ");
        ecrireChar(joueur);
        ecrireString(" ? ");
        casecochee = lireInt();

        // 3) Redemander la case jusqu’a obtenir une case existantes et vide.
        // les cases valides : entre 1 et 9
        // les cases libres : grille [casecochee - 1] == '_'
        while (casecochee < 1 || casecochee > 9 || grille[casecochee - 1] != '_') {
            ecrireString(" case invalide ou deja prise, rejouer : ");
            casecochee = lireInt();
        }

        // 4) Maintenant on peut jouer
        // on met le symbole du joueur dans la case choisie
        // la case saisie correspond à l'indice (casecochee - 1)
        grille[casecochee - 1] = joueur;
        nbCoupsJoues = nbCoupsJoues + 1;

        // 5) Si coup gagnant mettre a jour pasGagne 
        if (testGagne(grille)) {
            pasGagne = FALSE;       // on sort de la boucle
        }

        // 6) Si toutes les cases ont été jouées mettre a jour caseLibres
        if (nbCoupsJoues == 9) {
            casesLibres = FALSE;    // on sort de la boucle 
        }

        // 7) Changer de joueur
        if (joueur == 'x') {
            joueur = 'o';
        } else {
            joueur = 'x';
        }
    }


    // afficher une dernière fois la grille 
    afficheGrille(grille);

    // afficher le résultat final
    if (pasGagne == FALSE) {
        ecrireString(" victoire du joueur ");

        if (joueur =='x') {
            ecrireChar ('o');
        } else {
            ecrireChar('x');
        }
        ecrireString(" !\n");
    } else {
        ecrireString(" Partie terminée,aucun vainqueur \n");
    }


    return 0;
}