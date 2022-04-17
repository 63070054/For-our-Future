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

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
    `u_id` INT(10),
    `u_gpax` FLOAT(2,2) NOT NULL,
    PRIMARY KEY (`u_id`),
    FOREIGN KEY (`u_id`) REFERENCES user(u_id)
);

DROP TABLE IF EXISTS `u_onet`;

CREATE TABLE `u_onet` (
    `u_onet_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_onet_type` enum('ภาษาไทย','สังคมศึกษา','ภาษาอังกฤษ','คณิตศาสตร์','วิทยาศาสตร์','สุขศึกษาและพลศึกษา','การงานอาชีพและเทคโนโลยี','ศิลปะ') NOT NULL,
    `u_onet_score` FLOAT(2,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_onet_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_gat`;

CREATE TABLE `u_gat` (
    `u_gat_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_gat_type` enum('THAI','ENG') NOT NULL,
    `u_gat_score` FLOAT(3,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_gat_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);
DROP TABLE IF EXISTS `u_pat`;

CREATE TABLE `u_pat` (
    `u_pat_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_pat_type` enum('1','2','3','4','5','6','7','7.1','7.2','7.3','7.4','7.5','7.6') NOT NULL,
    `u_pat_score` FLOAT(3,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_pat_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);
DROP TABLE IF EXISTS `u_sub`;

CREATE TABLE `u_sub` (
    `u_sub_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_sub_type` enum('ภาษาไทย','สังคมศึกษา','ภาษาอังกฤษ','คณิตศาสตร์1','ฟิสิกส์','เคมี','ชีววิทยา','คณิตศาสตร์2','วิทยาศาสตร์ทั่วไป') NOT NULL,
    `u_sub_score` FLOAT(3,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_sub_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);
DROP TABLE IF EXISTS `u_lang`;

CREATE TABLE `u_lang` (
    `u_lang_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_lang_type` varchar(255) NOT NULL,
    `u_lang_score` FLOAT(3,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_lang_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);
DROP TABLE IF EXISTS `u_specific`;

CREATE TABLE `u_specific` (
    `u_specific_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_specific_type` varchar(255) NOT NULL,
    `u_specific_score` FLOAT(3,2) NOT NULL,
    PRIMARY KEY (`u_id`,`u_specific_no`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);
