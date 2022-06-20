DROP DATABASE IF EXISTS safevote;
create database safevote;
use safevote;


CREATE TABLE candidats(
	idCandidat INT NOT NULL AUTO_INCREMENT,
    nomC VARCHAR(50),
    prenomC VARCHAR(50),
    partiPolitique VARCHAR(50),
    PRIMARY KEY(idCandidat)
);

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




CREATE TABLE vote(
	idUser INT,
    idCandidat INT
);



INSERT INTO utilisateurs (email, nom, prenom, password, dateDeNaissance, genre, tel) VALUES ('malo@gmail.com', 'Master', 'Malo', '$2b$10$L3EjdaIp7mhposf.awcCoOh1h4rJUT5EiTLbYQOSmqziHy9bIxNhW', '12-05-2001', 'Mr', '0684456257');



INSERT INTO candidats(nomC, prenomC, partiPolitique) VALUES ('Melenchon','Jean-luc','LFI');
INSERT INTO candidats(nomC, prenomC, partiPolitique) VALUES ('Macron','Emmanuel','LREM');
INSERT INTO candidats(nomC, prenomC, partiPolitique) VALUES ('Le Pen','Marine','RN');



insert into vote(idUser,idCandidat) values(1,2);


select * from utilisateurs;


select u.id,c.idCandidat from utilisateurs u
join vote v on v.idUser = u.id
join candidats c on c.idCandidat = v.idCandidat
where u.id = 1;


select * from utilisateurs where id = 1



