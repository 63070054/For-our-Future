-- -------------------------------------------------------------
--
-- Database: admission
--
-- -------------------------------------------------------------
SET
    FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `FACULTY`;

CREATE TABLE `FACULTY` (
    `fac_id` int(10) AUTO_INCREMENT,
    `uni_id` int(10),
    `fac_name` varchar(255) NOT NULL,
    `fac_desc` varchar(255),
    PRIMARY KEY(`fac_id`, `uni_id`),
    foreign key (uni_id) references UNIVERSITY(uni_id)
);

DROP TABLE IF EXISTS `ROUND`;

CREATE TABLE `ROUND` (
    `r_id` int(10) AUTO_INCREMENT,
    `uni_id` int(10),
    `fac_id` int(10),
    `round` int(1) NOT NULL,
    `r_desc` varchar(255),
    `r_gpax` float(3, 2),
    PRIMARY KEY(`r_id`, `fac_id`, `uni_id`),
    foreign key (fac_id) references FACULTY(fac_id),
    foreign key (uni_id) references university(uni_id)
);

DROP TABLE IF EXISTS `R_GAT`;

CREATE TABLE `R_GAT` (
    `r_gat_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_gat_type` enum('THAI', 'ENG') NOT NULL,
    `r_gat_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_gat_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_ONET`;

CREATE TABLE `R_ONET` (
    `r_onet_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_onet_type` enum(
        'ภาษาไทย',
        'สังคมศึกษา',
        'ภาษาอังกฤษ',
        'คณิตศาสตร์',
        'วิทยาศาสตร์',
        'สุขศึกษาและพลศึกษา',
        'การงานอาชีพและเทคโนโลยี',
        'ศิลปะ'
    ) NOT NULL,
    `r_onet_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_onet_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_LANG`;

CREATE TABLE `R_LANG` (
    `r_lang_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_lang_type` varchar(255) NOT NULL,
    `r_lang_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_lang_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
    `u_id` INT(10),
    `u_gpax` FLOAT(3, 2),
    PRIMARY KEY (`u_id`),
    FOREIGN KEY (`u_id`) REFERENCES user(u_id)
);

DROP TABLE IF EXISTS `u_onet`;

CREATE TABLE `u_onet` (
    `u_onet_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_onet_type` enum(
        'ภาษาไทย',
        'สังคมศึกษา',
        'ภาษาอังกฤษ',
        'คณิตศาสตร์',
        'วิทยาศาสตร์',
        'สุขศึกษาและพลศึกษา',
        'การงานอาชีพและเทคโนโลยี',
        'ศิลปะ'
    ) NOT NULL,
    `u_onet_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_onet_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_gat`;

CREATE TABLE `u_gat` (
    `u_gat_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_gat_type` enum('THAI', 'ENG') NOT NULL,
    `u_gat_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_gat_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_pat`;

CREATE TABLE `u_pat` (
    `u_pat_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_pat_type` enum(
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '7.1',
        '7.2',
        '7.3',
        '7.4',
        '7.5',
        '7.6'
    ) NOT NULL,
    `u_pat_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_pat_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_sub`;

CREATE TABLE `u_sub` (
    `u_sub_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_sub_type` enum(
        'ภาษาไทย',
        'สังคมศึกษา',
        'ภาษาอังกฤษ',
        'คณิตศาสตร์1',
        'ฟิสิกส์',
        'เคมี',
        'ชีววิทยา',
        'คณิตศาสตร์2',
        'วิทยาศาสตร์ทั่วไป'
    ) NOT NULL,
    `u_sub_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_sub_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_lang`;

CREATE TABLE `u_lang` (
    `u_lang_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_lang_type` varchar(255) NOT NULL,
    `u_lang_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_lang_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `u_specific`;

CREATE TABLE `u_specific` (
    `u_specific_no` int(10) AUTO_INCREMENT,
    `u_id` INT(10),
    `u_specific_type` varchar(255) NOT NULL,
    `u_specific_score` FLOAT(5, 2) NOT NULL,
    PRIMARY KEY (`u_specific_no`, `u_id`),
    FOREIGN KEY (`u_id`) REFERENCES student(u_id)
);

DROP TABLE IF EXISTS `R_SUB`;

CREATE TABLE `R_SUB` (
    `r_sub_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_sub_type` enum(
        'ภาษาไทย',
        'สังคมศึกษา',
        'ภาษาอังกฤษ',
        'คณิตศาสตร์1',
        'ฟิสิกส์',
        'เคมี',
        'ชีววิทยา',
        'คณิตศาสตร์2',
        'วิทยาศาสตร์ทั่วไป'
    ) NOT NULL,
    `r_sub_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_sub_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_PAT`;

CREATE TABLE `R_PAT` (
    `r_pat_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_pat_type` enum(
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '7.1',
        '7.2',
        '7.3',
        '7.4',
        '7.5',
        '7.6'
    ) NOT NULL,
    `r_pat_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_pat_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_SPECIFIC`;

CREATE TABLE `R_SPECIFIC` (
    `r_spe_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_spe_type` varchar(255) NOT NULL,
    `r_spe_percentage` float(5, 2) NOT NULL,
    PRIMARY KEY(`r_spe_no`, `r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `u_id` int(10) primary key AUTO_INCREMENT,
    `f_name` varchar(255) not null,
    `l_name` varchar(255) not null,
    `username` varchar(255) not null,
    `password` varchar(255) not null,
    `type_user` enum('student', 'admin'),
    `birth_date` date,
    `sex` enum('male', 'female'),
    `email` varchar(255),
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
    foreign key (`u_id`) references user(u_id)
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

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
    `news_id` int(10) AUTO_INCREMENT,
    `news_title` varchar(255) not null,
    `news_desc` varchar(255),
    `news_picture` varchar(255),
    `news_created_date` date not null,
    `news_created_by` int(10) not null,
    `news_edited_date` date not null,
    `news_edited_by` int(10) not null,
    primary key (`news_id`)
);

DROP TABLE IF EXISTS `admin_university`;

CREATE TABLE `admin_university` (
    `u_id` int(10),
    `uni_id` int(10),
    `manage_type` enum('create', 'edit') not null,
    foreign key (`u_id`) references `admin`(u_id),
    foreign key (`uni_id`) references `university`(uni_id),
    primary key (`u_id`, `uni_id`)
);

DROP TABLE IF EXISTS `university`;

CREATE TABLE `university` (
    `uni_id` int(10) primary key AUTO_INCREMENT,
    `uni_name` varchar(255) not null,
    `province_id` int(3) not null,
    `u_created_date` date not null,
    `u_created_by` int(10) not null,
    `u_edited_date` date not null,
    `u_edited_by` int(10) not null,
    `file_path` varchar(255),
    foreign key (`province_id`) references `province`(province_id)
);

DROP TABLE IF EXISTS `province`;

CREATE TABLE `province` (
    `province_id` int(3) primary key AUTO_INCREMENT,
    `province_name` varchar(255) not null,
    `region_id` int(1) not null,
    foreign key (`region_id`) references `region`(region_id)
);

DROP TABLE IF EXISTS `region`;

CREATE TABLE `region` (
    `region_id` int(1) primary key AUTO_INCREMENT,
    `region_name` varchar(255) not null
);

INSERT INTO
    `region` (`region_id`, `region_name`)
VALUES
    (1, 'ภาคเหนือ'),
    (2, 'ภาคกลาง'),
    (3, 'ภาคตะวันออกเฉียงเหนือ'),
    (4, 'ภาคตะวันตก'),
    (5, 'ภาคตะวันออก'),
    (6, 'ภาคใต้');

INSERT INTO
    `province` (`province_id`, `province_name`, `region_id`)
VALUES
    (1, 'กรุงเทพมหานคร', 2),
    (2, 'สมุทรปราการ', 2),
    (3, 'นนทบุรี', 2),
    (4, 'ปทุมธานี', 2),
    (5, 'พระนครศรีอยุธยา', 2),
    (6, 'อ่างทอง', 2),
    (7, 'ลพบุรี', 2),
    (8, 'สิงห์บุรี', 2),
    (9, 'ชัยนาท', 2),
    (10, 'สระบุรี', 2),
    (11, 'ชลบุรี', 5),
    (12, 'ระยอง', 5),
    (13, 'จันทบุรี', 5),
    (14, 'ตราด', 5),
    (15, 'ฉะเชิงเทรา', 5),
    (16, 'ปราจีนบุรี', 5),
    (17, 'นครนายก', 2),
    (18, 'สระแก้ว', 5),
    (19, 'นครราชสีมา', 3),
    (20, 'บุรีรัมย์', 3),
    (21, 'สุรินทร์', 3),
    (22, 'ศรีสะเกษ', 3),
    (23, 'อุบลราชธานี', 3),
    (24, 'ยโสธร', 3),
    (25, 'ชัยภูมิ', 3),
    (26, 'อำนาจเจริญ', 3),
    (27, 'หนองบัวลำภู', 3),
    (28, 'ขอนแก่น', 3),
    (29, 'อุดรธานี', 3),
    (30, 'เลย', 3),
    (31, 'หนองคาย', 3),
    (32, 'มหาสารคาม', 3),
    (33, 'ร้อยเอ็ด', 3),
    (34, 'กาฬสินธุ์', 3),
    (35, 'สกลนคร', 3),
    (36, 'นครพนม', 3),
    (37, 'มุกดาหาร', 3),
    (38, 'เชียงใหม่', 1),
    (39, 'ลำพูน', 1),
    (40, 'ลำปาง', 1),
    (41, 'อุตรดิตถ์', 1),
    (42, 'แพร่', 1),
    (43, 'น่าน', 1),
    (44, 'พะเยา', 1),
    (45, 'เชียงราย', 1),
    (46, 'แม่ฮ่องสอน', 1),
    (47, 'นครสวรรค์', 2),
    (48, 'อุทัยธานี', 2),
    (49, 'กำแพงเพชร', 2),
    (50, 'ตาก', 4),
    (51, 'สุโขทัย', 2),
    (52, 'พิษณุโลก', 2),
    (53, 'พิจิตร', 2),
    (54, 'เพชรบูรณ์', 2),
    (55, 'ราชบุรี', 4),
    (56, 'กาญจนบุรี', 4),
    (57, 'สุพรรณบุรี', 2),
    (58, 'นครปฐม', 2),
    (59, 'สมุทรสาคร', 2),
    (60, 'สมุทรสงคราม', 2),
    (61, 'เพชรบุรี', 4),
    (62, 'ประจวบคีรีขันธ์', 4),
    (63, 'นครศรีธรรมราช', 6),
    (64, 'กระบี่', 6),
    (65, 'พังงา', 6),
    (66, 'ภูเก็ต', 6),
    (67, 'สุราษฎร์ธานี', 6),
    (68, 'ระนอง', 6),
    (69, 'ชุมพร', 6),
    (70, 'สงขลา', 6),
    (71, 'สตูล', 6),
    (72, 'ตรัง', 6),
    (73, 'พัทลุง', 6),
    (74, 'ปัตตานี', 6),
    (75, 'ยะลา', 6),
    (76, 'นราธิวาส', 6),
    (77, 'บึงกาฬ', 3);

SET
    FOREIGN_KEY_CHECKS = 1;