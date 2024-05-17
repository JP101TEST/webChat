-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2024 at 03:58 PM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id_friend` int(255) NOT NULL,
  `id_user` int(255) DEFAULT NULL,
  `status` enum('friend','unfriend') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id_friend`, `id_user`, `status`) VALUES
(1, NULL, 'friend'),
(2, NULL, 'friend'),
(3, 9, 'unfriend'),
(4, 5, 'unfriend'),
(5, NULL, 'friend');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id_message` int(255) NOT NULL,
  `id_room` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `message` text NOT NULL,
  `time_send` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id_message`, `id_room`, `id_user`, `message`, `time_send`) VALUES
(1, 2, 1, 'Hello', '2024-05-17 13:12:56'),
(2, 2, 1, 'What are you to day.', '2024-05-17 14:37:11'),
(3, 2, 7, 'I\'m find.', '2024-05-17 14:48:40'),
(4, 2, 7, 'Can you help me?', '2024-05-17 14:50:12'),
(5, 2, 1, 'Help what?', '2024-05-17 14:50:30'),
(6, 2, 7, 'Help to fix my code.', '2024-05-17 14:51:43'),
(7, 2, 7, 'Is just a simple code for chat app.', '2024-05-17 14:52:00'),
(8, 2, 1, 'Give me you code.', '2024-05-17 14:52:46'),
(10, 2, 7, '\"function renderMessageLists(list) {\n    for (let index = 0; index < list.length; index++) {\n        const chatBox = document.createElement(\"div\");\n        const chatBoxInsite = document.createElement(\"div\");\n        const messageBlock = document.createElement(\"div\");\n        chatBox.classList.add(\"chatBox\");\n        chatBoxInsite.classList.add(\"chatBoxInsite\");\n        messageBlock.classList.add(\"message\");\n        setText(messageBlock, list[index].message);\n        if (list[index].id_user != currentIdUser) {\n            chatBox.style.justifyContent = \"start\";\n            setHTML(chatBoxInsite, `<div class=\"imagePerson\"> <img src=\"http://localhost:8000/get/image/${currentIdUserFriendImage}\" alt=\"\"> </div>`);\n        } else {\n            chatBox.style.justifyContent = \"end\";\n\n        }\n        chatBoxInsite.appendChild(messageBlock);\n        chatBox.appendChild(chatBoxInsite);\n        panelDetailChat.appendChild(chatBox);\n    }\n}\"', '2024-05-17 15:05:36'),
(11, 2, 1, 'Need some time.', '2024-05-17 15:07:28'),
(12, 2, 7, 'Ok', '2024-05-17 15:07:40');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id_room` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id_room`) VALUES
(1),
(2),
(3),
(4),
(5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `image`) VALUES
(1, 'adminjob', 'job.peer2012@gmail.com', '$2b$10$zMTAiOYfVHq51XivwqcKjOHxjXD0WKtrqxpc035lTajxTb/U3ZShe', '1715690653338.jpg'),
(2, 'firebaseAuth@ChanakanKampila', 'firebaseAuth@chanakan.km@rmuti.ac.th', '$2b$10$r5cQRIrXQsbgf9pHaKpgBOHk5zKgdIIkWhdiEXtp/DJzpTPiiNQj2', '1715690796290.jpg'),
(3, 'user1', 'user1', '$2b$10$QIlsof3LadTW/yIuXHCi.Oi6qXK/Dc.OTANrv1Dz4HPlL9gJWzADu', 'user_default.png'),
(4, 'user2', 'user2', '$2b$10$/0sjcxAmSnbkicyWLHJHEeYgLAG5sG0UwrtvLLxj6VUhHNw7xpWSW', 'user_default.png'),
(5, 'user3', 'user3', '$2b$10$H9bCf0FtgRk6TlKBwFpHL.K8JVjgHzFeNYSeeGJQOlepvl604ASKm', '1715696144662.jpg'),
(6, 'user4', 'user4', '$2b$10$ATGumStljctDP7ztz23/ROzlj4hZLsebDfww4.QWh4aPYTFx4Il/6', 'user_default.png'),
(7, 'user5', 'user5', '$2b$10$M0QevOLbLQNxxlxVUHVE.uRRjXOam44JnpsYYuK.ywJy/6Jz46ikC', '1715696157285.jpg'),
(8, 'user6', 'user6', '$2b$10$pb9Ax/U8SSNRJ9TOVd660uMNjLClA6tmT3aQYpqvmk6g9ZjF2a4qq', '1715696170917.jpg'),
(9, 'user7', 'user7', '$2b$10$uH9VIw/uf./w1qzh3bpH.uJ2d1PGXdcYFhGE8ie9WQt/9nxX51HGe', 'user_default.png');

-- --------------------------------------------------------

--
-- Table structure for table `user_friend`
--

CREATE TABLE `user_friend` (
  `id_friend` int(255) NOT NULL,
  `id_user` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_friend`
--

INSERT INTO `user_friend` (`id_friend`, `id_user`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2),
(5, 2),
(4, 5),
(5, 5),
(2, 7),
(3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `user_room`
--

CREATE TABLE `user_room` (
  `id_room` int(255) NOT NULL,
  `id_user` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_room`
--

INSERT INTO `user_room` (`id_room`, `id_user`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(1, 2),
(5, 2),
(4, 5),
(5, 5),
(2, 7),
(3, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id_friend`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_room` (`id_room`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_friend`
--
ALTER TABLE `user_friend`
  ADD PRIMARY KEY (`id_friend`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user_room`
--
ALTER TABLE `user_room`
  ADD PRIMARY KEY (`id_room`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id_friend` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id_message` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id_room` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id_room`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `user_friend`
--
ALTER TABLE `user_friend`
  ADD CONSTRAINT `user_friend_ibfk_1` FOREIGN KEY (`id_friend`) REFERENCES `friends` (`id_friend`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_friend_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `user_room`
--
ALTER TABLE `user_room`
  ADD CONSTRAINT `user_room_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id_room`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_room_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
