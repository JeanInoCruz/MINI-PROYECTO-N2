-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2024 a las 04:14:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miniproyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(50) NOT NULL,
  `nombres` varchar(150) DEFAULT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `dni` varchar(150) DEFAULT NULL,
  `edad` int(50) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `telefono` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `direccion`, `correo_electronico`, `dni`, `edad`, `fecha_creacion`, `telefono`) VALUES
(1, 'Libbie', 'Crock', '747 Dryden Pass', 'lcrock0@gravatar.com', '6521525689', 49, '2023-12-22', '849-686-4332'),
(2, 'Chandal', 'Tredger', '346 Dwight Drive', 'ctredger1@bluehost.com', '9569352760', 39, '2017-12-24', '343-298-9402'),
(3, 'Hendrick', 'Maasz', '92 Bashford Road', 'hmaasz2@geocities.jp', '3642680623', 40, '2023-09-18', '809-266-1127'),
(4, 'Gaye', 'Kyneton', '90 Summit Road', 'gkyneton3@auda.org.au', '2469604672', 47, '2015-01-21', '161-486-9695'),
(5, 'Guglielmo', 'Shackell', '8 Southridge Street', 'gshackell4@chron.com', '7122830268', 29, '2013-10-10', '852-323-8777'),
(6, 'Christiana', 'Lummasana', '82 Karstens Parkway', 'clummasana5@about.me', '5601658889', 39, '2019-08-18', '509-576-7868'),
(7, 'Howey', 'Keizman', '201 Miller Center', 'hkeizman6@ebay.com', '1492697052', 31, '2018-01-31', '877-992-2257'),
(8, 'Charlotte', 'Bigglestone', '89 Roxbury Street', 'cbigglestone7@weibo.com', '7666502478', 54, '2020-10-11', '519-750-5012'),
(9, 'Cassandry', 'Breffitt', '551 Lotheville Hill', 'cbreffitt8@godaddy.com', '5993461578', 22, '2016-06-20', '277-923-5051'),
(10, 'Romola', 'Volage', '38 Mayer Drive', 'rvolage9@example.com', '8135104103', 53, '2013-11-10', '579-187-6912'),
(11, 'Addie', 'Pheasant', '22472 Hoffman Place', 'apheasanta@yahoo.co.jp', '0056412991', 29, '2019-07-31', '206-789-9309'),
(12, 'Burch', 'Randalston', '6 Esker Crossing', 'brandalstonb@dell.com', '3579543431', 25, '2012-10-17', '576-302-2715'),
(13, 'Svend', 'Gregh', '4 New Castle Alley', 'sgreghc@google.cn', '2794654330', 52, '2015-04-19', '916-972-0424'),
(14, 'Norby', 'Peyton', '92217 Artisan Parkway', 'npeytond@nsw.gov.au', '9929663207', 18, '2020-02-07', '403-357-3420'),
(15, 'Abdel', 'Pollie', '3673 Mayer Place', 'apolliee@nydailynews.com', '4056950911', 26, '2010-10-16', '881-281-6588'),
(16, 'Marlene', 'Ebbins', '2248 Atwood Parkway', 'mebbinsf@twitter.com', '2896978631', 37, '2023-02-03', '277-507-5921'),
(17, 'Yvette', 'Meak', '69 Lukken Place', 'ymeakg@live.com', '4234357863', 55, '2011-07-11', '153-923-1469'),
(18, 'Saleem', 'Duprey', '0 Fremont Place', 'sdupreyh@blogtalkradio.com', '5609359694', 55, '2012-05-15', '621-776-8406'),
(19, 'Baryram', 'Bloom', '1637 Moland Trail', 'bbloomi@4shared.com', '0356961346', 54, '2012-05-06', '408-368-4021'),
(20, 'Chery', 'Oldfield-Cherry', '3 Farwell Trail', 'coldfieldcherryj@census.gov', '9651920823', 25, '2018-11-13', '824-786-2122');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `apellidos` (`apellidos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
