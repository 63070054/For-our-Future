-- -------------------------------------------------------------
--
-- Database: admission
--
-- -------------------------------------------------------------

DROP TABLE IF EXISTS `blogs`;

CREATE TABLE `blogs` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(200) NOT NULL,
    `content` text NOT NULL,
    `status` enum('01', '02') NOT NULL DEFAULT '01',
    `pinned` tinyint(1) NOT NULL DEFAULT '0',
    `like` int NOT NULL DEFAULT '0',
    `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `create_by_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id` (`id`)
);

