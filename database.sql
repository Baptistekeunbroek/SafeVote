DROP DATABASE IF EXISTS safevote;
create database safevote;
use safevote;

CREATE TABLE utilisateurs(
   id INT NOT NULL AUTO_INCREMENT UNIQUE,
   email VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   password VARCHAR(60),
   dateDeNaissance VARCHAR(50),
   genre VARCHAR(50),
   tel VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE candidats(
	id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    partiPolitique VARCHAR(50),
    PRIMARY KEY(id)
);



INSERT INTO utilisateurs (email, nom, prenom, password, dateDeNaissance, genre, tel) VALUES ('malo@gmail.com', 'Le Corvec', 'Malo', '$2b$10$L3EjdaIp7mhposf.awcCoOh1h4rJUT5EiTLbYQOSmqziHy9bIxNhW', '31-10-2001', 'Mr', '789036761');
INSERT INTO candidats(nom, prenom, partiPolitique) VALUES ('Melenchon','Jean-luc','LFI');






select * from utilisateurs;








