CREATE DATABASE Fire;

USE Fire;




-- UserInfo


CREATE TABLE UserInfo (
  userId int NOT NULL PRIMARY KEY,
  userName varchar(250),
 userPassword varchar(50) NOT NULL
);

drop table UserInfo;

INSERT INTO UserInfo (userId,  userName, userPassword)
VALUES 
  (1001,'Abdul Ahad Rifat','User1234'),
  (1002,'Iftekhar Hossain','User1234'),
  (1003,'Sajidul Islam Saief','User1234'),
  (1004,' Alfaz Zaman Akash','User1234'),
  (1005,'Dr. Mohammad Salah Uddin','User5678')
 ; -- Corrected data types
       
select * from employee;
-- Leaves