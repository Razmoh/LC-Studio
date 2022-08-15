-- phpMyAdmin SQL Dump
-- version 2.9.1.1-Debian-4
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Oct 10, 2007 at 12:47 AM
-- Server version: 5.0.32
-- PHP Version: 5.2.0-8+etch7
-- 
-- Database: `studio`
-- 



--CREATE TABLES --------------------------------------------------------

DROP DATABASE IF EXISTS studio;
CREATE DATABASE studio;

USE studio;

DROP TABLES IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL DEFAULT 0,
  `creation_date` varchar(255) NOT NULL,
  `admin` varchar(255) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `visuels`;

CREATE TABLE `visuels` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(455) NOT NULL,
  `create` varchar(255) NOT NULL,
  `creation_date` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `produits`;

CREATE TABLE `produits` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `ref` varchar(255) NOT NULL,
  `description` varchar(455) NOT NULL,
  `price` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `categorie`;

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `theme`;

CREATE TABLE `theme` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `devis`;

CREATE TABLE `devis` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`email` varchar(255) NOT NULL,
`ref` varchar(255) NOT NULL,
`quantity` varchar(255) NOT NULL,
`date` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

TRUNCATE TABLE `users`;

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `phone`, `creation_date`,  `admin`) VALUES
(1, 'Chazot', 'Laetitia', 'laetitia.chazot@gmail.com', '$2b$10$yT0iY1vmHvFkQuFnImFgYeVaFf/Cm89FcQdcFnJ7L66lKEcquxjAK', '06 47 72 01 12', '24/05/2022', 1);

TRUNCATE TABLE `categorie`;

INSERT INTO `categorie`(`id`,`title`) VALUES (1,'Faire-part'), (2,'Save The Date'), (3,'Carton réponse'), (4,'Etiquette enveloppe'), (5,'Plan de table'), (6,'Marque place'), (7,'Numéro de table'), (8,'Menu'), (9,'Panneau directionnel'), (10,'Etiquette bouteille');

TRUNCATE TABLE `theme`;
INSERT INTO `theme` (`id`, `title`) VALUES (1, 'Steampunk'), (2, 'Baroque'), (3, 'Harry Potter'), (4, 'Marvel'), (5, 'World of Warcraft'), (6, 'Studio Ghibli'), (7, 'Cyberpunk');
