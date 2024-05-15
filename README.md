# Application Web de Gestion des Étudiants

## Exercice 0

Pour avoir les informations du personnage de Rick and Morty dont l'id est 5, il faut se rendre sur la page : https://rickandmortyapi.com/api/character/5
et récuperer le champ "name". On peut alors voir que le personnage est Jerry Smith

Cette application web permet de gérer les informations des étudiants (nom et école). Elle est construite en utilisant Node.js et Express, avec les vues rendues par EJS. Les données des étudiants sont stockées dans un fichier CSV.

## Fonctionnalités

- Visualiser la liste des étudiants
- Ajouter un nouvel étudiant
- Mettre à jour les informations d'un étudiant existant

## Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Docker (facultatif, pour exécuter l'application dans un conteneur)

## Installation


1. Clonez ce dépôt :

    ```sh
    git clone https://github.com/votre-utilisateur/votre-repo.git
    cd votre-repo
    ```
### Sans Docker

2. Installez les dépendances :

    ```sh
    npm install
    ```

3. Créez les fichiers CSV nécessaires :

    - `data.csv` : pour stocker les données des étudiants
    - `users.csv` : pour stocker les informations d'authentification (si utilisé)

    Exemple de contenu pour `data.csv` :

    ```csv
    name;school
    John Doe;Harvard
    Jane Smith;MIT
    ```
### Avec docker

2. Construisez l'image Docker :

    ```sh
    docker build -t docker-nodejs .
    ```

3. Lancer l'application :
        ```sh
    docker run -p 49160:3000 -d docker-nodejs
    ```

## Exécution de l'Application

Pour démarrer l'application en mode développement :

```sh
npm start
