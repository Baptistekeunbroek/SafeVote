DROP DATABASE IF EXISTS safevote;
create database safevote;
use safevote;

CREATE TABLE utilisateurs(
   id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(50),
   password VARCHAR(50),
   PRIMARY KEY(id)
);

select * from utilisateurs;