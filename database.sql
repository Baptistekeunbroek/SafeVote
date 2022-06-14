DROP DATABASE IF EXISTS safevote;
create database safevote;
use safevote;

CREATE TABLE utilisateurs(
   id INT NOT NULL AUTO_INCREMENT,
   email VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   password VARCHAR(60),
   dateDeNaissance VARCHAR(50),
   PRIMARY KEY(id)
);

select * from utilisateurs;