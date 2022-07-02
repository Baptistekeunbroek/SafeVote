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

Puis

```bash
  npm installDependencies
```

Ensuite remplir le ficheir configTemplate.js qui ce situe dans le dossier backend en complétant le user et pass par vos informations.

```bash
  user: '', // votre adresse mail
  pass: '', // votre mot de passe
```

Et renommer ce fichier config.js

Enfin

```bash
  npm start
```

Pour lancer le server et le client en meme temps.
