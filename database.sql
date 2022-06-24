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

drop table if exists vote;
CREATE TABLE vote(idUser INT, idCandidat INT);

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
    candidats(nomC, prenomC, partiPolitique,photo)
VALUES
    ('Melenchon', 'Jean-luc', 'LFI','https://img.20mn.fr/BxVfVpOnSem0eySjbAQZMg/2048x1536-fit_jean-luc-melenchon-recu-a-l-elysee-le-25-juin-2016.jpg');

INSERT INTO
    candidats(nomC, prenomC, partiPolitique,photo)
VALUES
    ('Macron', 'Emmanuel', 'LREM','https://cdn-s-www.bienpublic.com/images/46E73E51-5DBE-4731-B8B8-114B8F1D9890/NW_raw/photo-afp-1498942715.jpg');

INSERT INTO
    candidats(nomC, prenomC, partiPolitique,photo)
VALUES
    ('Le Pen', 'Marine', 'RN','https://cdn-s-www.republicain-lorrain.fr/images/AE2F98DD-DC36-4925-A921-769C99163174/NW_raw/marine-le-pen-photo-afp-1488452154.jpg');

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
    id = 1