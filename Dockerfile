# Étape 1 : Utiliser l'image officielle de Playwright (inclut toutes les dépendances système)
FROM mcr.microsoft.com/playwright:v1.41.0-jammy

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du code
COPY . .

# Étape 6 : Exposer le port du serveur d'automation
EXPOSE 3001

# Étape 7 : Lancer le serveur
CMD ["npm", "run", "automation"]
