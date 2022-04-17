-- -------------------------------------------------------------
--
-- Database: admission
--
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `FACULTY`;

CREATE TABLE `FACULTY` (
    `fac_id` int(10) AUTO_INCREMENT,
    `uni_id` int(10),
    `fac_name` varchar(255) NOT NULL,
    `fac_desc` varchar(255),
    PRIMARY KEY(`fac_id`,`uni_id`),
    foreign key (uni_id) references UNIVERSITY(uni_id)
);

DROP TABLE IF EXISTS `ROUND`;

CREATE TABLE `ROUND` (
    `r_id` int(10) AUTO_INCREMENT,
    `fac_id` int(10),
    `round` int(1) NOT NULL,
    `r_desc` varchar(255),
    `r_gpax` float(3,2),
    PRIMARY KEY(`r_id`,`fac_id`),
    foreign key (fac_id) references FACULTY(fac_id)
);

DROP TABLE IF EXISTS `R_GAT`;

CREATE TABLE `R_GAT` (
    `r_gat_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_gat_type` enum('THAI', 'ENG') NOT NULL,
    `r_gat_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_gat_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_ONET`;

CREATE TABLE `R_ONET` (
    `r_onet_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_onet_type` enum('ภาษาไทย','สังคมศึกษา','ภาษาอังกฤษ','คณิตศาสตร์','วิทยาศาสตร์','สุขศึกษาและพลศึกษา','การงานอาชีพและเทคโนโลยี','ศิลปะ') NOT NULL,
    `r_onet_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_onet_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_LANG`;

CREATE TABLE `R_LANG` (
    `r_lang_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_lang_type` varchar(255) NOT NULL,
    `r_lang_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_lang_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_SUB`;

CREATE TABLE `R_SUB` (
    `r_sub_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_sub_type` enum('ภาษาไทย','สังคมศึกษา','ภาษาอังกฤษ','คณิตศาสตร์1','ฟิสิกส์','เคมี','ชีววิทยา','คณิตศาสตร์2','วิทยาศาสตร์ทั่วไป') NOT NULL,
    `r_sub_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_sub_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_PAT`;

CREATE TABLE `R_PAT` (
    `r_pat_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_pat_type` enum('1','2','3','4','5','6','7','7.1','7.2','7.3','7.4','7.5','7.6') NOT NULL,
    `r_pat_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_pat_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);

DROP TABLE IF EXISTS `R_SPECIFIC`;

CREATE TABLE `R_SPECIFIC` (
    `r_spe_no` int(10) AUTO_INCREMENT,
    `r_id` int(10),
    `r_spe_type` varchar(255) NOT NULL,
    `r_spe_percentage` float(3,2) NOT NULL,
    PRIMARY KEY(`r_spe_no`,`r_id`),
    foreign key (r_id) references ROUND(r_id)
);