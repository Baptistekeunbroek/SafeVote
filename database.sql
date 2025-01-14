DROP DATABASE IF EXISTS safevote;

create database safevote;

use safevote;

CREATE TABLE candidats(
    idCandidat INT NOT NULL AUTO_INCREMENT,
    nomC VARCHAR(50),
    prenomC VARCHAR(50),
    partiPolitique VARCHAR(50),
    photo varchar(500),
    idListeElec int,
    PRIMARY KEY(idCandidat)
);

CREATE TABLE listeElectorale(
    idListe INT NOT NULL AUTO_INCREMENT,
    nomListe VARCHAR(50),
    PRIMARY KEY(idListe)
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

insert into sondage(titre,descr,option1,option2,option3,option4) values ('Sondage politique',"S'il y avait des élections générales demain, pour quel parti voteriez-vous?",'droite','centre','gauche','abstention');

drop table if exists voteListe;

CREATE TABLE voteListe(idUser INT, idCandidat INT, idListe int);

drop table if exists voteSondage;

create table voteSondage(idUser int, idSondage int, choix int);

INSERT INTO
    listeElectorale(idListe, nomListe)
VALUES
    (1, 'Élections présidentielles');

INSERT INTO
    listeElectorale(idListe, nomListe)
VALUES
    (2, 'Le meilleur étudiant');

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Le Corvec',
        'Malo',
        'Etudiant',
        'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg',
        2
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Keunebroek',
        'Baptiste',
        'Etudiant',
        'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg',
        2
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Blanc',
        'Vote',
        '',
        'https://www.lutece-papierpeint.com/wp-content/uploads/2019/04/51145606C.jpg',
        2
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
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Melenchon',
        'Jean-luc',
        'LFI',
        'https://img.20mn.fr/BxVfVpOnSem0eySjbAQZMg/2048x1536-fit_jean-luc-melenchon-recu-a-l-elysee-le-25-juin-2016.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Macron',
        'Emmanuel',
        'LREM',
        'https://cdn-s-www.bienpublic.com/images/46E73E51-5DBE-4731-B8B8-114B8F1D9890/NW_raw/photo-afp-1498942715.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Le Pen',
        'Marine',
        'RN',
        'https://cdn-s-www.republicain-lorrain.fr/images/AE2F98DD-DC36-4925-A921-769C99163174/NW_raw/marine-le-pen-photo-afp-1488452154.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Hidalgo',
        'Anne',
        'PS',
        "https://hospitality-on.com/sites/default/files/styles/image825xosef/public/import/contenu/anne-hidalgo.jpg",
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Poutou',
        'Philippe',
        'LO',
        'https://cdn-s-www.ledauphine.com/images/5F5CD3EF-1BEC-4AA0-AA26-F943EE6027EA/NW_raw/philippe-poutou-archives-afp-1356467319.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Zemmour',
        'Éric',
        'Reconquête',
        'https://fl24.net/wp-content/uploads/2020/05/zemmour-1068x712.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Pécresse',
        'Valérie',
        'FVPA',
        'https://static.cnews.fr/sites/default/files/000_ua838_1.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Arthaud',
        'Nathalie',
        'LO',
        'https://www.magcentre.fr/wp-content/uploads/2016/03/10982242_709619955810717_3980400537565160389_n.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Roussel',
        'Fabien',
        'PCF',
        'https://cdn.static01.nicematin.com/media/npo/mobile_1440w/2018/11/files-this-file-pho-25766157.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Lasalle',
        'Jean',
        'Résistons !',
        'https://fr.web.img5.acsta.net/pictures/19/01/03/17/39/2520084.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Jadot',
        'Yannick',
        'EELV',
        'https://www.myeventnetwork.com/sites/default/files/styles/open_graph/public/2019-10/yannickjadot.jpg',
        1
    );

INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Dupont-Aignan',
        'Nicolas',
        'DLR',
        'https://www.debout-la-france.fr/sites/default/files/membre/nda.jpg',
        1
    );
    
INSERT INTO
    candidats(
        nomC,
        prenomC,
        partiPolitique,
        photo,
        idListeElec
    )
VALUES
    (
        'Blanc',
        'Vote',
        ' ',
        'https://www.lutece-papierpeint.com/wp-content/uploads/2019/04/51145606C.jpg',
        1
    );

select
    *
from
    utilisateurs;

select
    u.id,
    c.idCandidat
from
    utilisateurs u
    join voteListe v on v.idUser = u.id
    join candidats c on c.idCandidat = v.idCandidat
where
    u.id = 1;

select
    *
from
    utilisateurs
where
    id = 1;