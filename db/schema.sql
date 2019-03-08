
CREATE DATABASE burgers_db;

USE burgers_db; 

CREATE TABLE Burgers (
id INTEGER NOT NULL AUTO_INCREMENT,
burger_name VARCHAR(35) NOT NULL, 
devoured BOOLEAN DEFAULT false,
PRIMARY KEY (id)
); 


INSERT into Burgers (burger_name, devoured)
VALUES ("Cheeseburger", false),
	   ("California Burger", false),
       ("Plain Hamburger", true),
       ("Bacon Cheeseburger", true)