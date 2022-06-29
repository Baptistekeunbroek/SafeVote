DROP DATABASE IF EXISTS safevote;

create database safevote;

use safevote;

CREATE TABLE candidats(
    idCandidat INT NOT NULL AUTO_INCREMENT,
    nomC VARCHAR(50),
    prenomC VARCHAR(50),
    partiPolitique VARCHAR(50),
    photo varchar(500),
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

CREATE TABLE sondage(
	idSondage INT NOT NULL auto_increment unique,
    titre varchar(60),
    descr varchar(500),
    option1 varchar (100),
    option2 varchar (100),
    option3 varchar (100),
    option4 varchar (100),
    userID int
    );

drop table if exists vote;
CREATE TABLE vote(idUser INT, idCandidat INT);

create table voteSondage(idUser int, idSondage int);

INSERT INTO
    utilisateurs (
        email,
        nom,
        prenom,
        password,
        dateDeNaissance,
        genre,
        tel
    )
VALUES
    (
        'malo@gmail.com',
        'Master',
        'Malo',
        '$2b$10$L3EjdaIp7mhposf.awcCoOh1h4rJUT5EiTLbYQOSmqziHy9bIxNhW',
        '12-05-2001',
        'Mr',
        '0684456257'
    );

INSERT INTO
    utilisateurs (
        email,
        nom,
        prenom,
        password,
        dateDeNaissance,
        genre,
        tel
    )
VALUES
    (
        'baptiste.keunebroek@gmail.com',
        'Keunebroek',
        'Baptiste',
        '$2b$10$E5jcnoMx1m39NZRq/Yz4ouZvt1WKf7keGJCJVJO4UtUhqpl3.p..W',
        '10-05-2001',
        'Mr',
        '0652477441'
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Melenchon',
        'Jean-luc',
        'LFI',
        'https://img.20mn.fr/BxVfVpOnSem0eySjbAQZMg/2048x1536-fit_jean-luc-melenchon-recu-a-l-elysee-le-25-juin-2016.jpg'
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Macron',
        'Emmanuel',
        'LREM',
        'https://cdn-s-www.bienpublic.com/images/46E73E51-5DBE-4731-B8B8-114B8F1D9890/NW_raw/photo-afp-1498942715.jpg'
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Le Pen',
        'Marine',
        'RN',
        'https://cdn-s-www.republicain-lorrain.fr/images/AE2F98DD-DC36-4925-A921-769C99163174/NW_raw/marine-le-pen-photo-afp-1488452154.jpg'
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Hidalgo',
        'Anne',
        'PS',
        "https://hospitality-on.com/sites/default/files/styles/image825xosef/public/import/contenu/anne-hidalgo.jpg"
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Poutou',
        'Philippe',
        'LO',
        'https://cdn-s-www.ledauphine.com/images/5F5CD3EF-1BEC-4AA0-AA26-F943EE6027EA/NW_raw/philippe-poutou-archives-afp-1356467319.jpg'
    );

INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Zemmour',
        'Éric',
        'Reconquête',
        'https://fl24.net/wp-content/uploads/2020/05/zemmour-1068x712.jpg'
    );
    
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Pécresse',
        'Valérie',
        'FVPA',
        'https://static.cnews.fr/sites/default/files/000_ua838_1.jpg'
    );
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Arthaud',
        'Nathalie',
        'LO',
        'https://www.magcentre.fr/wp-content/uploads/2016/03/10982242_709619955810717_3980400537565160389_n.jpg'
    );
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Roussel',
        'Fabien',
        'PCF',
        'https://cdn.static01.nicematin.com/media/npo/mobile_1440w/2018/11/files-this-file-pho-25766157.jpg'
    );
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Lasalle',
        'Jean',
        'Résistons !',
        'https://fr.web.img5.acsta.net/pictures/19/01/03/17/39/2520084.jpg'
    );
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Jadot',
        'Yannick',
        'EELV',
        'https://www.myeventnetwork.com/sites/default/files/styles/open_graph/public/2019-10/yannickjadot.jpg'
    );
INSERT INTO
    candidats(nomC, prenomC, partiPolitique, photo)
VALUES
    (
        'Dupont-Aignan',
        'Nicolas',
        'DLR',
        'https://www.debout-la-france.fr/sites/default/files/membre/nda.jpg'
    );

-- insert into vote(idUser,idCandidat) values(1,2);
select
    *
from
    utilisateurs;

select
    u.id,
    c.idCandidat
from
    utilisateurs u
    join vote v on v.idUser = u.id
    join candidats c on c.idCandidat = v.idCandidat
where
    u.id = 1;

select
    *
from
    utilisateurs
where
    id = 1;