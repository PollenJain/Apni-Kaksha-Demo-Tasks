-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2021 at 08:37 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointmentrequests`
--

CREATE TABLE `appointmentrequests` (
  `patientEmail` varchar(30) NOT NULL,
  `appointmentDate` varchar(30) NOT NULL,
  `appointmentTime` varchar(30) NOT NULL,
  `doctorEmail` varchar(30) NOT NULL,
  `requestStatus` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointmentrequests`
--

INSERT INTO `appointmentrequests` (`patientEmail`, `appointmentDate`, `appointmentTime`, `doctorEmail`, `requestStatus`) VALUES
('paragjainpes@gmail.com', '10th April, 2021', '10:30 am', 'parags@gmail.com', 'Accepted'),
('paragjainpes@gmail.com', '12th April, 2021', '10:30 am', 'parags@gmail.com', 'Accepted'),
('jpmorgan@gmail.com', '12th April, 2021', '10:30 am', 'parags@gmail.com', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `email` varchar(30) NOT NULL,
  `uname` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`email`, `uname`, `password`, `role`) VALUES
('jpmorgan@gmail.com', 'jpmorgan', 'jp2134', 'patient'),
('parag@gmail.com', 'pqwrt', 'qwerty', 'doctor'),
('paragjainpes@gmail.com', 'paragjain', 'abc123', 'patient'),
('parags@gmail.com', 'ased', 'ab2c123', 'doctor'),
('pj@gmail.com', 'pj', 'qwerty', 'doctor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
