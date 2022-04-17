-- -------------------------------------------------------------
--
-- Database: admission
--
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `u_id` int(10) primary key AUTO_INCREMENT,
    `prefix` varchar(255) not null,
    `f_name` varchar(255) not null,
    `l_name1` varchar(255) not null,
    `type_user` enum('student', 'admin'),
    `birth_date` date,
    `sex` enum('male', 'female'),
    `nationality` varchar(30),
    `blood_type` enum('A', 'B', 'AB', 'O'),
    `address` text,
    `phone` varchar(30),
    `picture` varchar(30),
    `u_created_date` date,
    `u_edited_date` date
);

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
    `u_id` int(10) primary key,
    foreign key (`u_id`) references student(u_id)
);

DROP TABLE IF EXISTS `admin_news`;

CREATE TABLE `admin_news` (
    `u_id` int(10),
    `news_id` int(10),
    `manage_type` enum('create', 'edit') not null,
    foreign key (`u_id`) references `admin`(u_id),
    foreign key (`news_id`) references `news`(news_id),
    primary key(`u_id`, `news_id`)
);

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
    `news_id` int(10) primary key AUTO_INCREMENT,
    `news_title` varchar(255) not null,
    `news_desc` varchar(255),
    `news_picture` varchar(255),
    `news_created_date` date not null,
    `news_created_by` int(10) not null,
    `news_edited_date` date not null,
    `news_edited_by` int(10) not null
);

DROP TABLE IF EXISTS `news_category`;

CREATE TABLE `news_category` (
    `category_no` int(10) AUTO_INCREMENT,
    `category_name` varchar(255) not null,
    `news_id` int(10),
    foreign key (`news_id`) references `news`(news_id),
    primary key (`category_no`, `news_id`)
);

DROP TABLE IF EXISTS `news_ref`;

CREATE TABLE `news_ref` (
    `ref_no` int(10) AUTO_INCREMENT,
    `ref_name` varchar(255) not null,
    `news_id` int(10),
    foreign key (`news_id`) references `news`(news_id),
    primary key (`ref_no`, `news_id`)
);

DROP TABLE IF EXISTS `admin_university`;

CREATE TABLE `admin_university` (
    `u_id` int(10),
    `uni_id` int(10),
    `manage_type` enum('create', 'edit') not null,
    foreign key (`u_id`) references `admin`(u_id),
    foreign key (`uni_id`) references `university`(uni_id),
    primary key (`u_id`,`uni_id`)
);

DROP TABLE IF EXISTS `university`;

CREATE TABLE `university` (
    `uni_id` int(10) primary key AUTO_INCREMENT,
    `uni_name` varchar(255),
    `province` int(3) not null,
    `u_created_date` date not null,
    `u_created_by` int(10) not null,
    `u_edited_date` date not null,
    `u_edited_by` int(10) not null,
    foreign key (`province`) references `province`(province_id)
);

DROP TABLE IF EXISTS `province`;

CREATE TABLE `province` (
    `province_id` int(3) primary key AUTO_INCREMENT,
    `province_name` varchar(255) not null
);