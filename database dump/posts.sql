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

-- Dumping structure for table coursework3.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table coursework3.posts: ~15 rows (approximately)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `author`, `title`, `country`, `content`, `date`, `time`) VALUES
	(1, 'Haingo', 'Orange Parc', 'USA', 'This place is just heaven on earth. At the same time peaceful and enjoyable. Will definitely go there again next year!', '2022-03-28', '14:35:53'),
	(2, 'Annah14', 'Nelly Book shop', 'Mauritius', 'Most beautiful place I have ever seen. And the books available there just seem unlimited! My favorite spot as from today!', '2022-03-28', '14:38:07'),
	(3, 'Haingo', 'Hills of Hope', 'Madagascar', 'This place is incredible and the locals are very welcoming. I will repeat this experience as soon as I have the opportunity again.', '2022-03-29', '13:57:44'),
	(4, 'Melissa12', 'Pizza Dolores', 'Italy', 'Let me tell you, this is the only pizza restaurant you should visit once in a lifetime. Not only, the price is very affordable, but the place itself just screams Italy!! ', '2022-03-29', '14:35:59'),
	(5, 'Paul', 'La Vie en Rose', 'France', 'Romantic place. I recommend for a wedding proposal. Thank me later!', '2022-03-29', '14:49:27'),
	(6, 'Prisca', 'Koto Cat', 'Mauritius', 'The best place for cat lovers. Say no more if you love cats! Just go there!', '2022-03-29', '15:13:04'),
	(7, 'Melissa12', 'Hello blue', 'Mauritius', 'Peaceful place, great for meditation', '2022-03-30', '12:31:39'),
	(36, 'Rindra09', 'Wellness Parc QB', 'Mauritius', 'Nice', '2022-03-30', '16:29:27'),
	(37, 'Serenity', 'The twelves towers', 'Canada', 'A futuristic place! I thought we were in 2050 already! You should visit!', '2022-03-30', '23:05:14'),
	(38, 'Haingo', 'Mille vie et deux nuits', 'France', 'I loved the experience.', '2022-03-31', '13:14:32'),
	(39, 'Haingo', 'La vie en Diamond', 'France', 'I loved this place so much. So fancy!', '2022-03-31', '13:38:33'),
	(44, 'Haingo', 'The Northern Restaurant', 'Finland', 'This restaurant is guaranteed to make you full and happy at the same time.', '2022-03-31', '14:01:32'),
	(48, 'Haingo', 'National Park II', 'Germany', 'This park has something that I cannot explain. It reminds of my childhood.', '2022-03-31', '14:14:58'),
	(52, 'Norbert12', 'Lucky Charm Restauran', 'Maldives', 'Great for holidays', '2022-03-31', '15:11:34');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
