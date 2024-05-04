CREATE DATABASE employeedb;
USE employeedb;

CREATE TABLE employeefile (
  recid bigint NOT NULL UNIQUE AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  birthdate date,
  age int,
  gender VARCHAR(255) NOT NULL,
  civilstat VARCHAR(255) NOT NULL,
  contactnum VARCHAR(255) NOT NULL,
  salary decimal NOT NULL,
  isactive int
);
