# P7_mare_michael

## Description du Projet
Création d'un réseau social d'entreprise avec :
- Possibilité de créer et supprimer un utilisateur
- Envoie de messages texte avec ou sans image
    - Modification du message possible une fois posté
    - Suppression également possible
- Possibilité de commenter les publications
    - Possibilité de les modifier
    - et de les supprimer

### Compétences mises en place
- Développement de l'interface utilisateur en VueJS
- Mise en place d'une API REST avec une base de données SQL (utilisation de sequelize) en suivants les réglementations de sécurité (OWASP / RGPD)
- Utilisation des opérations CRUD (Create Read Update Delete)

### Stacks Techniques
- Front :
    - HTML/CSS
    - JS
    - VueJS
- Back :
    - NodeJS / Express
    - MySQL / Sequelize
    - Axios
- Sécurité :
    - JWT
    - Bcrypt
- Versionning :
    - Git / Github

---


## Accès au projet (avec la ligne de commande)
### 1. Cloner le dépo sur Github

`Git clone adressedudepo`

### 2. Activer le back (API)
- Accédez au projet puis au dossier backend

`cd backend/`

- Installez npm (si vous ne l'avez pas déjà) ainsi que nodemon

`npm install`

puis

`npm install -g nodemon`

- Enfin lancez le server 

`nodemon start`

## 3Activer le front
- Accédez au dossier frontend

`cd ../frontend` (le '../' n'est utile que si vous êtes encore dans le dossier backend)

- Installez npm et Vue.cli 

`npm install`

puis

`npm install -g @vue/cli`

- Enfin lancez le frontend

`npm run serve`

- Et vous pouvez naviguer sur l'application à l'aide de l'adresse fournie dans le terminal