# SafeVote

Projet Mastercamp :
Création d'un site web de voe en ligne sécurisé et fiable.



## 🛠 Skills
**Client:** React, CSS, HTML, Axios

**Server:** Node, Express, Passport, MySQL

## Lancer le project en server local

### 1. Cloner le project

```bash
  git clone https://github.com/Malo-LC/SafeVote
```

### 2. Exécuter le script [sql](https://github.com/Malo-LC/SafeVote/blob/main/database.sql) pour créer la base de données.
S'il y a des problèmes avec la bdd, regarder dans le fichier ressources.txt, et exécutez les deux commandes SQL, par exemple dans MySQL Workbench

### 3. Configurer

Dans un terminal dans le dossier racine, faire:

```bash
  npm install
```
Ensuite remplir le dossier configTemplate en remplaçant le 'user' et 'password' par vos informations.
```bash
  user: '', // votre adresse mail
  pass: '', // votre mot de passe
```
Et le renommer config.js

Puis
```bash
  npm installDependencies
```
Et enfin
```bash
  npm start
```



