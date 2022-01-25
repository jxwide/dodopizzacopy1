-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 24 2022 г., 21:04
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dodopizza`
--

-- --------------------------------------------------------

--
-- Структура таблицы `combo`
--

CREATE TABLE `combo` (
  `id` int NOT NULL,
  `imgsource` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desk` varchar(128) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `combo`
--

INSERT INTO `combo` (`id`, `imgsource`, `name`, `desk`, `price`) VALUES
(1, 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/bccccffd37e5420db351b16e0ec5c6f8_138x138.jpeg', 'Комбо от 599 ₽', 'Пицца 25 см, Додстер, напиток и соус.', 599),
(2, 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/d9aef4419e5943b39656fb8732925d72_138x138.jpeg', '2 пиццы', 'Самое популярное комбо из 2 пицц 30 см.', 969),
(3, 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/e770a40a896248678f778dbf429409c9_138x138.jpeg', '3 пиццы от 999 ₽', '3 пиццы 30 см по суперцене.', 999),
(4, 'https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/419357ea19c840f5826927f02cdaba95_138x138.jpeg', '2 пиццы и напиток', '2 пиццы 25 см и напиток на выбор. Для компании из 2–4 человек.', 739);

-- --------------------------------------------------------

--
-- Структура таблицы `desserts`
--

CREATE TABLE `desserts` (
  `id` int NOT NULL,
  `imgsource` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desk` varchar(128) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `desserts`
--

INSERT INTO `desserts` (`id`, `imgsource`, `name`, `desk`, `price`) VALUES
(1, 'https://dodopizza-a.akamaihd.net/static/Img/Products/4c4be1059e5c4643887258b0ff49a557_138x138.jpeg', 'Вишневый пирог', 'Это не просто десерт, а вишенка на торте! Творожно-песочное тесто с ягодами, заварным кремом и лепестками миндаля.', 129),
(2, 'https://dodopizza-a.akamaihd.net/static/Img/Products/5ffff27c9c2d488eb6cec35c27ebff9a_138x138.jpeg', 'Чизкейк Нью-Йорк', 'Мы перепробовали тысячу десертов и наконец нашли любимца гостей — нежнейший творожный чизкейк.', 129),
(3, 'https://dodopizza-a.akamaihd.net/static/Img/Products/6eacb241458547c68a570d86954568aa_138x138.jpeg', 'Бруслетики, 16 шт', 'Это задорные сладкие рулетики, в которых закрутился микс из натуральной брусники и сгущенного молока.', 195);

-- --------------------------------------------------------

--
-- Структура таблицы `drinks`
--

CREATE TABLE `drinks` (
  `id` int NOT NULL,
  `imgsource` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desk` varchar(128) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `drinks`
--

INSERT INTO `drinks` (`id`, `imgsource`, `name`, `desk`, `price`) VALUES
(1, 'https://dodopizza-a.akamaihd.net/static/Img/Products/646062734a454f6c9c8b8992846d478a_138x138.jpeg', 'Coca-Cola Zero', '', 99),
(2, 'https://dodopizza-a.akamaihd.net/static/Img/Products/c99ec0985f37456a8084928dfe8ed379_138x138.jpeg', 'Coca-Cola', '', 99),
(3, 'https://dodopizza-a.akamaihd.net/static/Img/Products/cbf4fc24b6784abe9b061f44411bebed_138x138.jpeg', 'Sprite', '', 99),
(4, 'https://dodopizza-a.akamaihd.net/static/Img/Products/39ec292094ab4fa2b241acc85d1680c0_138x138.jpeg', 'Fanta', '', 99);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `pizzaid` int NOT NULL,
  `section` int NOT NULL,
  `country` varchar(64) NOT NULL,
  `town` varchar(64) NOT NULL,
  `street` varchar(64) NOT NULL,
  `home` varchar(64) NOT NULL,
  `kv` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `pizzaid`, `section`, `country`, `town`, `street`, `home`, `kv`) VALUES
(7, 2, 4, '123', '123', '123', '123', '123');

-- --------------------------------------------------------

--
-- Структура таблицы `pizza`
--

CREATE TABLE `pizza` (
  `id` int NOT NULL,
  `imgsource` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `comp` varchar(128) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `pizza`
--

INSERT INTO `pizza` (`id`, `imgsource`, `name`, `comp`, `price`) VALUES
(1, 'https://dodopizza-a.akamaihd.net/static/Img/Products/e5c6c0eab4584aca913210aef749d6a7_138x138.jpeg', 'Индейка в мандаринах', 'Пастрами из индейки, соус альфредо, мандарины, цитрусовый соус, моцарелла, смесь сыров чеддер и пармезан', 495),
(2, 'https://dodopizza-a.akamaihd.net/static/Img/Products/2c71cd53e50746279f7aa0f59c7ec50f_138x138.jpeg', 'Сырная', 'Моцарелла, сыры чеддер и пармезан, соус альфредо', 245),
(3, 'https://dodopizza-a.akamaihd.net/static/Img/Products/e9624d2bf1ae41598cd6635c0d3ed0f6_138x138.jpeg', 'Пепперони фреш', 'Пикантная пепперони, увеличенная порция моцареллы, томаты, томатный соус', 245),
(4, 'https://dodopizza-a.akamaihd.net/static/Img/Products/9bd4c76d4c2548c090ac6ae5a1eabae6_138x138.jpeg', 'Песто', 'Цыпленок, соус песто, кубики брынзы, томаты, моцарелла, соус альфредо', 425),
(5, 'https://dodopizza-a.akamaihd.net/static/Img/Products/7a0fac09c2264f8e8928f205c7acb5cf_138x138.jpeg', 'Карбонара', 'Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок, соус альфредо, итальянские травы', 425),
(6, 'https://dodopizza-a.akamaihd.net/static/Img/Products/80af1cf2138447b4a9afc30df6af712c_138x138.jpeg', 'Пепперони', 'Пикантная пепперони, увеличенная порция моцареллы, томатный соус', 375);

-- --------------------------------------------------------

--
-- Структура таблицы `snacks`
--

CREATE TABLE `snacks` (
  `id` int NOT NULL,
  `imgsource` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desk` varchar(128) NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `snacks`
--

INSERT INTO `snacks` (`id`, `imgsource`, `name`, `desk`, `price`) VALUES
(1, 'https://dodopizza-a.akamaihd.net/static/Img/Products/a1554882b1dc412982151c4567c4fb8c_138x138.jpeg', 'Додстер', 'Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке', 159),
(2, 'https://dodopizza-a.akamaihd.net/static/Img/Products/06cda7a8f9a64a2d92a3f87ae0412063_138x138.jpeg', 'Сырный Стартер', 'Горячая закуска с очень сырной начинкой. Моцарелла, пармезан, чеддер и соус ранч в тонкой пшеничной лепешке', 159),
(3, 'https://dodopizza-a.akamaihd.net/static/Img/Products/4f21f83f43674d37818f1a26e0e43b65_138x138.jpeg', 'Грибной Стартер', 'Горячая закуска с шампиньонами, моцареллой и соусом ранч в тонкой пшеничной лепешке', 159),
(4, 'https://dodopizza-a.akamaihd.net/static/Img/Products/e3eeee00e41c4b2cb4f3f5f2fc0f504e_138x138.jpeg', 'Картофель из печи', 'Ароматный запеченный картофель с итальянскими травами.', 179),
(5, 'https://dodopizza-a.akamaihd.net/static/Img/Products/80a7715ede17489db4010ce3c5741efa_138x138.jpeg', 'Куриные крылья', 'Куриные крылышки со специями и ароматом копчения. Большая порция', 349);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `desserts`
--
ALTER TABLE `desserts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `drinks`
--
ALTER TABLE `drinks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `pizza`
--
ALTER TABLE `pizza`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `snacks`
--
ALTER TABLE `snacks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `combo`
--
ALTER TABLE `combo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `desserts`
--
ALTER TABLE `desserts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `drinks`
--
ALTER TABLE `drinks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `pizza`
--
ALTER TABLE `pizza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `snacks`
--
ALTER TABLE `snacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
