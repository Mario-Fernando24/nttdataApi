-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para udemy_delivery
CREATE DATABASE IF NOT EXISTS `udemy_delivery` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `udemy_delivery`;

-- Volcando estructura para tabla udemy_delivery.address
CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre_barrio` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `lat` decimal(10,0) NOT NULL,
  `lng` decimal(10,0) NOT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  `id_users` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_users` (`id_users`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.address: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

-- Volcando estructura para tabla udemy_delivery.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `description` text COLLATE utf8_spanish2_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.categories: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `update_at`) VALUES
	(23, 'Hamburguesas', 'mario fernando', '2022-09-10 01:38:55', '2022-09-10 01:38:55'),
	(24, 'Pizza', 'jkhhui ihiu', '2022-09-10 15:28:02', '2022-09-10 15:28:02'),
	(25, 'Degranado & Salchipapas', 'lo mejor de monteria', '2022-09-11 03:52:48', '2022-09-11 03:52:48'),
	(26, 'Mekatos', 'Lo mejor de Monteria', '2022-09-11 03:53:09', '2022-09-11 03:53:09'),
	(27, 'Arepas', 'Monteria Cordoba', '2022-09-11 03:53:46', '2022-09-11 03:53:46'),
	(28, 'Ensaladas', 'frutas de la casa', '2022-09-11 15:21:39', '2022-09-11 15:21:39'),
	(29, 'Helados', 'cnjdchiu', '2022-09-15 09:05:58', '2022-09-15 09:05:58'),
	(30, 'pasabocas', 'los mejores pasabocas para deleitar tu paladar', '2022-09-19 13:34:57', '2022-09-19 13:34:57');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Volcando estructura para tabla udemy_delivery.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `description` text COLLATE utf8_spanish2_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image1` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `image2` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `image3` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `id_category` bigint(90) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.products: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `description`, `price`, `image1`, `image2`, `image3`, `id_category`, `created_at`, `update_at`) VALUES
	(6, 'pizza de jamon y queso', 'La mejor pizza del norte de Monteria', 3232, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052035263?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663408426245?alt=media&token=fb02f6c7-f56d-4770-94f9-71dfeada6eee', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662890218126?alt=media&token=8b377229-14aa-41ff-b2d8-2f75bcdf7f98', 26, '2022-09-11 04:56:56', '2022-09-11 04:56:59'),
	(7, 'Pizza con queso y piña', 'La mejor pizza del norte de Monteria', 7999, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052035263?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662890285000?alt=media&token=8b377229-14aa-41ff-b2d8-2f75bcdf7f98', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662890285590?alt=media&token=8b377229-14aa-41ff-b2d8-2f75bcdf7f98', 24, '2022-09-11 04:58:04', '2022-09-11 04:58:06'),
	(8, 'Papas de mayonesa', 'papas rizadas sabor a mayonesa de la casa', 1990, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409514432?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662890555024?alt=media&token=8b377229-14aa-41ff-b2d8-2f75bcdf7f98', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662890555493?alt=media&token=8b377229-14aa-41ff-b2d8-2f75bcdf7f98', 26, '2022-09-11 05:02:35', '2022-09-11 05:02:36'),
	(9, 'Salchipapa de pollo', 'papas, papa ripio, pollo a la brasa, salsa de la casa y queso costeño', 34000, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052506833?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662927608698?alt=media&token=d22629fa-3c13-443b-8e35-3976fc0d1042', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1662927609147?alt=media&token=d22629fa-3c13-443b-8e35-3976fc0d1042', 25, '2022-09-11 15:20:07', '2022-09-11 15:20:10'),
	(10, 'Ensaladas de frutas', 'Ensaladas de frutas citricas', 39000, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/como-hacer-ensaladas-de-frutas-y-verduras-ricas-y-poderosas.jpg?alt=media&token=f2b577c5-5b90-480e-ac34-8d32375acc3b', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/como-hacer-ensaladas-de-frutas-y-verduras-ricas-y-poderosas.jpg?alt=media&token=f2b577c5-5b90-480e-ac34-8d32375acc3b', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/como-hacer-ensaladas-de-frutas-y-verduras-ricas-y-poderosas.jpg?alt=media&token=f2b577c5-5b90-480e-ac34-8d32375acc3b', 28, '2022-09-11 15:23:52', '2022-09-11 15:23:54'),
	(11, 'Pizza napolitanaa', 'la mejor pizza del norte de Monteria Cordoba en el cual puedes venir a disfrutar con tus amigos, familiares, ', 12000, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052035263?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052037292?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052037885?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 24, '2022-09-13 01:53:55', '2022-09-13 01:53:58'),
	(12, 'Perro caliente de la casa', 'lo mejor', 13900, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052099069?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052099617?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052100176?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 24, '2022-09-13 01:54:59', '2022-09-13 01:55:01'),
	(13, 'Degranado de la casa', 'lo mejor', 88000, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052506833?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052507399?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663052507882?alt=media&token=130d979b-6b60-4ba0-b0b6-5ab2c4268b00', 24, '2022-09-13 02:01:47', '2022-09-13 02:01:48'),
	(14, 'arepa rellena Monteria', 'la mejor arepa de monteria', 9900, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663195251276?alt=media&token=565ed963-a3bf-4233-b51e-f9f5d4a2774e', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663195255095?alt=media&token=565ed963-a3bf-4233-b51e-f9f5d4a2774e', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663195255673?alt=media&token=565ed963-a3bf-4233-b51e-f9f5d4a2774e', 24, '2022-09-14 17:40:51', '2022-09-14 17:41:00'),
	(15, 'Chococono tradicional', 'helado cubierno con el mejor  chocolate a base se cacao y plantas naturales', 2200, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663219531695?alt=media&token=f31c53a3-ad71-4ba2-8968-85ad0bfc3f96', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663219538456?alt=media&token=f31c53a3-ad71-4ba2-8968-85ad0bfc3f96', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663219539851?alt=media&token=f31c53a3-ad71-4ba2-8968-85ad0bfc3f96', 24, '2022-09-15 00:25:32', '2022-09-15 00:25:41'),
	(16, 'Aloha', 'jkheiu jheruihf jhfejf jhjkef eh', 3200, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663250956545?alt=media&token=1cbe5d79-5948-4ad3-8f7b-c7e46b3c93bd', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663250958522?alt=media&token=1cbe5d79-5948-4ad3-8f7b-c7e46b3c93bd', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663250960034?alt=media&token=1cbe5d79-5948-4ad3-8f7b-c7e46b3c93bd', 29, '2022-09-15 09:09:17', '2022-09-15 09:09:21'),
	(17, 'pollo asado', 'El mejor pollo del campo cordobes', 23000, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663408424817?alt=media&token=fb02f6c7-f56d-4770-94f9-71dfeada6eee', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663408426245?alt=media&token=fb02f6c7-f56d-4770-94f9-71dfeada6eee', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663408429205?alt=media&token=fb02f6c7-f56d-4770-94f9-71dfeada6eee', 24, '2022-09-17 04:53:45', '2022-09-17 04:53:50'),
	(18, 'Barrilete Golosina', 'Golosina', 2400, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409457889?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409459200?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409459700?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 26, '2022-09-17 05:10:58', '2022-09-17 05:11:00'),
	(19, 'Papas grande de mayonesa', 'las mejores papas para degustar tu paladar', 8600, 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409514077?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409514432?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663409514759?alt=media&token=1ad942ea-ed0c-4f66-b11b-1253a3df6ffc', 26, '2022-09-17 05:11:54', '2022-09-17 05:11:55');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Volcando estructura para tabla udemy_delivery.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `route` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.roles: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `image`, `route`, `created_at`, `update_at`) VALUES
	(1, 'RESTAURANTE', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/restaurant.png?alt=media&token=af8a3604-4161-4a22-a6d3-ca91578cd51c', '/restaurant/home', '2022-03-27 00:00:00', '2022-03-27 00:00:00'),
	(2, 'REPARTIDOR', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/delivery_firebase.png?alt=media&token=4509d682-b550-49a5-9e87-d941b0196947', '/delivery/home', '2022-03-27 00:00:00', '2022-03-27 00:00:00'),
	(3, 'CLIENTE', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/client_firebase.png?alt=media&token=1ec41e79-da57-4bf8-b99b-a5a97ecc4842', '/client/home', '2022-03-27 00:00:00', '2022-03-27 00:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Volcando estructura para tabla udemy_delivery.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `name` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `lastname` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `phone` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordd` varchar(90) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.users: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `name`, `lastname`, `phone`, `image`, `passwordd`, `created_at`, `updated_at`) VALUES
	(68, 'juan@gmail.com', 'mario', 'munoz', '3109872132', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1660328177779?alt=media&token=5e9dabd5-11ad-4055-83d1-c90921bc998a', '$2a$10$4alDlLHBX39tUtxCxvY6TO.jYy1TRVRtkihv2O5bsxZ2PIukuI1g6', '2022-08-12 13:16:19', '2022-08-12 13:16:19'),
	(69, 'ma@gmail.com', 'Cesar Luis', 'Muñoz Rivera', '321312', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1668066275292?alt=media&token=ab848b73-fd4b-481f-bb1e-1a8c8db8a20d', '$2a$10$VOm689EYgdYof8yAC4HGX.NHlPAsqDLkc6TJXybfGLDZrCIkJbSMq', '2022-08-12 13:18:01', '2022-08-22 03:03:29'),
	(70, 'ivone@gmail.com', 'ivone', 'nttdata', '3109871245', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1660339571408?alt=media&token=a7be34f0-9a4c-4c34-81db-479121093978', '$2a$10$OHIxWtbk81W.vJ5lQz4CzOgfaYBfm4fvBQyxTEzhgy6JYkwcUUNOm', '2022-08-12 16:26:13', '2022-08-12 16:26:13'),
	(71, 'sadyscastro@gmail.com', 'sadus', 'castro', '3109872354', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1660461031263?alt=media&token=a10bfe31-32b6-46fa-baee-12a8180d0656', '$2a$10$DBa.Ja4b.eL5HtDBBD7Txewo6CHhSdVMCq8pydE5.UFbF5O5IHbAm', '2022-08-14 02:10:33', '2022-08-14 02:10:33'),
	(72, 'prueba@gmail.com', '12345', '12345', '31345', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1660461743311?alt=media&token=a10bfe31-32b6-46fa-baee-12a8180d0656', '$2a$10$hT8mrLukcB.4.TTJ/y2TgOaveOxF9UOcP.FPSGnbkfGCXGAFRam7C', '2022-08-14 02:22:24', '2022-08-14 02:22:24'),
	(73, 'avilez@gmail.com', 'avilez', 'hacker', '3108761234', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1660623564807?alt=media&token=ac85c982-3598-47fa-8f35-8c9bbf6c4e92', '$2a$10$o5h6npE46G6OZCbCVZh8KOF5M.KqKVMa2dp4N6Vhjx8kben6jZR9m', '2022-08-15 23:19:26', '2022-08-15 23:19:26'),
	(74, 'sadyscastr@gmail.com', 'sadys', 'castro', '3006545334', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1663093308789?alt=media&token=83757e71-c7fa-4728-841f-1e4287e38db8', '$2a$10$xE3FK.q489yzqSFxbVuUo.wKGoQHVkuQIcjDNKXYCaafk4AZSsr.6', '2022-09-13 13:21:52', '2022-09-13 13:21:52'),
	(75, 'xiomy@gmail.com', 'xiomara Patricia', 'Muñoz Rivera', '3008494233', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1665720435136?alt=media&token=608d8e2f-a072-455b-8eb0-bdbc65be3bf5', '$2a$10$anMzX.QVVD6HFgUAbk12buwWUy5GNAGZPv4KkRUf/XiXpV5v6M3QO', '2022-10-13 23:07:16', '2022-10-13 23:07:16'),
	(76, 'clienteprueba@gmail.com', 'cliente', 'prueba', '3106335410', 'https://firebasestorage.googleapis.com/v0/b/fluttervarios-4a2ca.appspot.com/o/image_1668066275292?alt=media&token=ab848b73-fd4b-481f-bb1e-1a8c8db8a20d', '$2a$10$VOm689EYgdYof8yAC4HGX.NHlPAsqDLkc6TJXybfGLDZrCIkJbSMq', '2022-11-10 02:44:37', '2022-11-10 02:44:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Volcando estructura para tabla udemy_delivery.user_has_roles
CREATE TABLE IF NOT EXISTS `user_has_roles` (
  `id_user` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_rol`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `user_has_roles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_has_roles_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- Volcando datos para la tabla udemy_delivery.user_has_roles: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `user_has_roles` DISABLE KEYS */;
INSERT INTO `user_has_roles` (`id_user`, `id_rol`, `created_at`, `update_at`) VALUES
	(68, 3, '2022-08-12 13:16:19', '2022-08-12 13:16:19'),
	(69, 1, NULL, NULL),
	(69, 2, NULL, NULL),
	(69, 3, '2022-08-12 13:18:01', '2022-08-12 13:18:01'),
	(70, 3, '2022-08-12 16:26:13', '2022-08-12 16:26:13'),
	(71, 3, '2022-08-14 02:10:33', '2022-08-14 02:10:33'),
	(72, 3, '2022-08-14 02:22:24', '2022-08-14 02:22:24'),
	(73, 3, '2022-08-15 23:19:26', '2022-08-15 23:19:26'),
	(74, 3, '2022-09-13 13:21:52', '2022-09-13 13:21:52'),
	(75, 3, '2022-10-13 23:07:16', '2022-10-13 23:07:16'),
	(76, 3, '2022-11-10 02:44:37', '2022-11-10 02:44:37');
/*!40000 ALTER TABLE `user_has_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
