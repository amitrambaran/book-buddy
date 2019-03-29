-- MySQL Script generated by MySQL Workbench
-- Thu Mar 28 20:39:53 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookdb` DEFAULT CHARACTER SET utf8 ;
USE `bookdb` ;

-- -----------------------------------------------------
-- Table `bookdb`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `comment` VARCHAR(100) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE USER 'root' IDENTIFIED BY 'temp';

GRANT ALL ON `bookdb`.* TO 'root';
GRANT SELECT, INSERT, TRIGGER ON TABLE `bookdb`.* TO 'root';
GRANT SELECT ON TABLE `bookdb`.* TO 'root';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `bookdb`.* TO 'root';
GRANT EXECUTE ON ROUTINE `bookdb`.* TO 'root';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `bookdb`.`comments`
-- -----------------------------------------------------
START TRANSACTION;
USE `bookdb`;
INSERT INTO `bookdb`.`comments` (`id`, `name`, `comment`, `date`) VALUES (DEFAULT, 'Test1', 'Testing', NULL);

COMMIT;
