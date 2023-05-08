-- phpMyAdmin SQL Dump
-- version 5.2.1-1.fc37
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2023 at 06:21 PM
-- Server version: 10.5.18-MariaDB
-- PHP Version: 8.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwll`
--

-- --------------------------------------------------------

--
-- Table structure for table `reflist`
--

CREATE TABLE `reflist` (
  `sl` int(11) NOT NULL,
  `typename` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reflist`
--

INSERT INTO `reflist` (`sl`, `typename`) VALUES
(1, 'Offline Shops'),
(2, 'Youtube'),
(3, 'Facebook'),
(4, 'Whatsapp'),
(5, 'Instagram'),
(6, 'Offline Ad'),
(7, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(1000) NOT NULL,
  `type` enum('user','admin') NOT NULL DEFAULT 'user',
  `password` varchar(1000) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `mob` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ref` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `type`, `password`, `name`, `mob`, `age`, `ref`) VALUES
(1, 'w@w', 'admin', '$2b$10$4Qawk63a008OKWOhVjsYbekXnVeTQ0JvSMK/BRRF1/z.S/DvTDvnG', 'w', NULL, NULL, NULL),
(2, 'jib@gm', 'user', '$2b$10$12ahAWM67ROAyDDe4busXOjn.eLA0NLMXWDRxt0i/lqptuhCVoOgK', 'Jibon', NULL, NULL, 1),
(3, 'hodol@gm', 'user', '$2b$10$W3P6y8YCpoUbTPNcyOdRqeM6M0Mv028jcVFexMU23kBXddkpyLJna', 'Hodol', '1234', 21, 5),
(4, 'bau@tt', 'user', '$2b$10$8SxDJrkFBSCmGsDOGxkiGuRTPOFseov7hONyiSm6L73NFysK0vVHa', 'Bau', 'undefined', 53, 2),
(5, 'qq@qq', 'user', '$2b$10$SwrIrRYyHetuoeiUEGMwR.OwKKnJijR7OsKq.eI6tro0ORdjg/qVG', 'Qq', '8246166', 69, 6),
(6, 'tttt@tt', 'user', '$2b$10$Y70RK9STb2UOYpzRaAKPVOp/XuGkVZ0ufiwM.7lD4rcI4pvA31nfK', 'tttt', 'hjbj5156', 54, 2),
(7, 'subh@gmail.com', 'user', '$2b$10$GdQHwOV0t/ArCqKQCMrGo.JZ1f4ofSdDaaYcVVDY85zkTlryPwnyG', 'Subh', '1234', 56, 5),
(8, 'fd@fbd', 'user', '$2b$10$3.OkBwcnzIpMer05BLLzvuGW/SpgPdIqWP778gjnNtjLucSY9IBkW', 'dths', '346', 43, 3);

-- --------------------------------------------------------

--
-- Table structure for table `visitinfo`
--

CREATE TABLE `visitinfo` (
  `sl` int(11) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `visitinfo`
--

INSERT INTO `visitinfo` (`sl`, `email`, `date`) VALUES
(1, 'jib@gm', '2023-05-08'),
(2, 'qq@qq', '2021-03-02'),
(3, 'jib@gm', '2023-05-08'),
(4, 'subh@gmail.com', '2023-05-08'),
(5, 'jib@gm', '2023-05-08'),
(6, 'jib@gm', '2023-05-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reflist`
--
ALTER TABLE `reflist`
  ADD PRIMARY KEY (`sl`,`typename`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `refrel` (`ref`);

--
-- Indexes for table `visitinfo`
--
ALTER TABLE `visitinfo`
  ADD PRIMARY KEY (`sl`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reflist`
--
ALTER TABLE `reflist`
  MODIFY `sl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `visitinfo`
--
ALTER TABLE `visitinfo`
  MODIFY `sl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `refrel` FOREIGN KEY (`ref`) REFERENCES `reflist` (`sl`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
