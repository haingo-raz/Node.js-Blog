-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table coursework3.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`username`,`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table coursework3.users: ~17 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	(1, 'Paul', 'paul.cool@earth.com', 'trello'),
	(2, 'Melissa12', 'melissa.jolie@earth.com', 'ouioui'),
	(3, 'Annah14', 'annah.b@earth.com', 'qwerty'),
	(5, 'Haingo', 'haingo.life@earth.com', 'hello'),
	(6, 'Stella', 'stella@earth.com', 'hiafnf'),
	(7, 'Jessica', 'jessica.davis@earth.com', 'jesss123'),
	(8, 'Rolland', 'rolland@earth.com', 'Rolland&1'),
	(9, 'Prisca', 'prisca.lovely@earth.com', 'prisca123'),
	(32, 'Rindra09', 'Rindra@earth.com', 'okok'),
	(33, 'Serenity', 'serenity.love@earth.com', 'lovely123'),
	(34, 'Brenda', 'brenda@earth.com', 'brenda123'),
	(35, 'Dorothy', 'dorothy@earth.com', 'dorothy123'),
	(37, 'Mary11', 'mary@earth.com', 'mary123'),
	(40, 'Beverly44', 'beverly@earth.com', 'beverly123'),
	(41, 'Patrick', 'patrick@earth.com', 'patrick123'),
	(43, 'Test-Patrick', 'patrick-test@earth.com', 'patrick123'),
	(46, 'Norbert12', 'norbert.12@earth.com', 'norbert123'),
	(47, 'Prisca45', 'prisca45@earth.com', 'prisca123'),
	(48, 'Paul22', 'paul22@earth.com', 'paul22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
