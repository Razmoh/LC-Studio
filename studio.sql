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
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `theme_id` int (11) NOT NULL,
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

TRUNCATE TABLE `users`;

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `phone`, `creation_date`,  `admin`) VALUES
(1, 'Chazot', 'Laetitia', 'laetitia.chazot@gmail.com', '$2b$10$TeVmXMxIAopqutmwjPhBB.fbrb039jgybYK9ucRelRH9MitVtlI4q', '06 47 72 01 12', '24/05/2022', 1);

TRUNCATE TABLE `theme`;

INSERT INTO `theme` (`id`,`title`, `image`) VALUES (1, 'Mariage', 'https://scontent.fcdg3-1.fna.fbcdn.net/v/t39.30808-6/218722924_302428234591962_4531353470822243372_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=6zuz1-JXXn0AX9-45xI&tn=wYmkeC_J9yNgq1QJ&_nc_ht=scontent.fcdg3-1.fna&oh=00_AT8-MJsU6ougQrA_q9OtKGUlyOD1CSL5qp7ujLKCnV4vMg&oe=62D3F861');
