CREATE DATABASE Fire;

USE Fire;


-- UserInfo

drop table UserInfo;


CREATE TABLE UserInfo (
  userId int NOT NULL PRIMARY KEY,
  userLevel int NOT NULL CHECK (userLevel IN (1, 2)),
  userName varchar(250),
  userPassword varchar(50) NOT NULL
);

DELIMITER //

CREATE TRIGGER prevent_level_2_change
BEFORE UPDATE ON UserInfo
FOR EACH ROW
BEGIN
    IF OLD.userLevel = 2 AND NEW.userLevel <> 2 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Cannot change userLevel when it is 2';
    END IF;
END//

DELIMITER ;




INSERT INTO UserInfo (userId,  userLevel, userName, userPassword)
VALUES 
  (1001,1,'Abdul Ahad Rifat','User1234'),
  (1002,1,'Iftekhar Hossain','User1234'),
  (1003,1,'Sajidul Islam','User1234'),
  (1004,1,'Alfaz Zaman','User1234'),
  (1005,2,'Dr.Salah Uddin','User5678')
 ; -- Corrected data types
       
select * from UserInfo;


-- Trinee Info

drop table Trainee;

CREATE TABLE Trainee (
    userId INT NOT NULL,
    Tid INT(5) ZEROFILL NOT NULL AUTO_INCREMENT,
    Accuracy FLOAT NOT NULL,
    result TINYINT NOT NULL CHECK (result IN (0, 1)),
    PRIMARY KEY (Tid),
    FOREIGN KEY (userId) REFERENCES UserInfo(userId)
) ENGINE=InnoDB AUTO_INCREMENT=10500;

INSERT INTO Trainee (userId, Accuracy, result)
VALUES 
    (1001, 0.85, 1),
    (1001, 0.97, 1),
    (1001, 0.98, 1),
    (1002, 0.78, 1),
    (1002, 0.85, 1),
    (1002, 0.54, 0),
    (1003, 0.92, 1),
    (1004, 0.67, 0),
    (1005, 0.99, 1);

SELECT * FROM Trainee;


SELECT 

 T.Tid,
 T.Accuracy,
 T.result
 
 FROM
 Trainee AS T
 INNER JOIN
 UserInfo AS U ON T.userId = U.userId
 Where
 U.userId = 1001;
 





