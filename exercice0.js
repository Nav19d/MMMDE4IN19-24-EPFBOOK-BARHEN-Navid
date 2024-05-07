// URL de l'API Rick and Morty pour récupérer un personnage par son ID
const apiUrl = "https://rickandmortyapi.com/api/character/5";

// Envoi de la requête GET à l'API
fetch(apiUrl)
  .then(response => {
    // Vérification si la réponse est OK (statut 200)
    if (response.ok) {
      // Conversion de la réponse en JSON
      return response.json();
    } else {
      // Gestion des erreurs
      throw new Error(`Erreur: ${response.status}`);
    }
  })
  .then(characterData => {
    // Extraction et affichage des informations sur le personnage
    console.log(characterData.name);
  })
  .catch(error => {
    // Gestion des erreurs
    console.error("Une erreur est survenue:", error);
  });
