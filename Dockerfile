FROM node:16

# Créer un répertoire d'applications
WORKDIR /usr/src/app

# Installer les dépendances de l'application
# Un caractère générique (wildcard) est utilisé pour s'assurer que package.json ET package-lock.json sont copiés
COPY package*.json ./
RUN npm install

# Regroupez la source de l'application
COPY . .

EXPOSE 3000


CMD [ "node", "app.js" ]