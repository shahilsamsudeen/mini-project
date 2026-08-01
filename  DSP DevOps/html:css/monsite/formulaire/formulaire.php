<?php
// On récupère les données
$nom     = $_POST['nom'];
$email   = $_POST['email'];
$message = $_POST['message'];

// On vérifie que les champs ne sont pas vides
if (empty($nom) || empty($email) || empty($message)) {
    echo "Veuillez remplir tous les champs.";
    exit;
}

// On vérifie le format de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email invalide.";
    exit;
}

// Ici on simule juste une confirmation (mail() bloqué sur InfinityFree)
echo "Merci $nom, votre message a bien été envoyé !";
exit;
?>