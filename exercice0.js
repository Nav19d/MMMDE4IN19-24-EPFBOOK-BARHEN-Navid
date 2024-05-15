const apiUrl = "https://rickandmortyapi.com/api/character/5";


fetch(apiUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Erreur: ${response.status}`);
    }
  })
  .then(characterData => {
    console.log(characterData.name);
  })
  .catch(error => {
    console.error("Une erreur est survenue:", error);
  });
