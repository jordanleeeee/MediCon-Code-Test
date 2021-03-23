use clinicapp;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: clinicapp
-- ------------------------------------------------------
-- Server version       8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clinic`
--

DROP TABLE IF EXISTS `clinic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `clinicName` varchar(255) NOT NULL,
  `phoneNo` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `uid_UNIQUE` (`cid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic`
--

LOCK TABLES `clinic` WRITE;
/*!40000 ALTER TABLE `clinic` DISABLE KEYS */;
INSERT INTO `clinic` VALUES (1,'jordanlee80@gmail.com','2a7e838f41b07ae1b228a30f4d466b4547b491d05fd3842b2d72920a17cfab76','happyClinic','12345678','hk'),(2,'peterlee@gmail.com','80e0b4910b5aa996ff524b2f4c8063bf344b00b2a82adb70115dff36e76b7090','peterClinic','12345678','hk'),(3,'test@gmail.com','d0e273c6acc0c009759132503f2170e351b6a8b40758e8b3360c0632d80f7028','Tester','999','HK'),(6,'2test@gmail.com','fbe90ad7de979788a90c2c12fdea076a28e81f166a459a7b4b8c668ac95bc951','Tester','999','HK'),(7,'3test@gmail.com','8f0cb31b32aaf81508e175ae18c7df35e9f341bae60e0dccbc7637a03ea9a1d7','Tester3','9998','Kowloon'),(8,'4test@gmail.com','c15a6dbb7b461258fe81ab6dca91ce95d9da3b76096fb8cc7790eb3dae88f865','Tester4','99988','Kowloon East'),(9,'5test@gmail.com','b1c2b64e475a6b5b73e5d2950b494228f940363648d248b7f189bc76c7dde688','Tester4','99988','Kowloon East'),(11,'dfas@jk.dfs','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(12,'d55fas@jk.dfs','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(13,'d552fas@jk.dfs','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(14,'ds@jk.dfs','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(16,'ds@j.dfs','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(18,'ds@j.ds','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(19,'ds@jdd.ds','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(20,'ds@jdd.ddds','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd'),(21,'ds@jdd.ddddds','8ea990175b7360f8b61cc3851567c980150a243547807c47189e3853c0c7880b','fds','12345678','ddd');
/*!40000 ALTER TABLE `clinic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultation`
--

DROP TABLE IF EXISTS `consultation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL,
  `doctorName` varchar(45) NOT NULL,
  `patientName` varchar(45) NOT NULL,
  `diagnosis` varchar(45) NOT NULL,
  `medication` varchar(45) NOT NULL,
  `consultationFee` int unsigned NOT NULL,
  `time` bigint unsigned NOT NULL,
  `followUp` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `consultation_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `clinic` (`cid`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultation`
--

LOCK TABLES `consultation` WRITE;
/*!40000 ALTER TABLE `consultation` DISABLE KEYS */;
INSERT INTO `consultation` VALUES (127,1,'lee','James','headache','drug',27,1616328656353,1),(128,1,'lam','chan','fever','vitaminA',1068,1616328657035,0),(129,1,'lee','chan','headache','vitaminC',1261,1616328657473,1),(130,1,'Lau','Amy','headache','injection',1103,1616328657857,0),(131,1,'lam','Charles','fever','drug',1730,1616328658202,1),(132,1,'lee','chan','headache','vitaminA',1343,1616328658600,0),(133,1,'Poon','James','headache','drug',1527,1616328659058,1),(134,1,'Lau','Amy','fever','injection',1604,1616328659481,0),(135,1,'lee','chan','covid19','vitaminC',1442,1616328659842,1),(136,1,'lee','James','headache','vitaminA',398,1616328660292,0),(137,1,'lam','chan','headache','drug',1665,1616328660667,1),(138,1,'Lau','Amy','headache','vitaminC',1131,1616328661046,0),(139,1,'lee','James','covid19','drug',661,1616328661389,1),(140,1,'lam','chan','fever','vitaminA',1912,1616328661799,0),(141,1,'Poon','chan','headache','vitaminC',1576,1616328662209,1),(142,1,'Lau','Amy','headache','injection',148,1616328662561,0),(143,1,'lam','chan','fever','drug',9,1616328662941,1),(144,1,'lee','chan','headache','vitaminA',1602,1616328663294,0),(145,1,'lee','James','headache','drug',1982,1615648844683,1),(146,1,'Lau','Amy','fever','injection',1107,1615604810311,0),(147,1,'lee','Charles','headache','vitaminC',1588,1615642316517,1),(148,1,'lee','James','headache','vitaminA',619,1615443550659,0),(149,1,'Poon','chan','fever','drug',332,1615633202753,1),(150,1,'Lau','Amy','headache','vitaminC',1804,1615622560794,0),(151,1,'lee','James','covid19','drug',23,1615518794721,1),(152,1,'lam','chan','headache','vitaminA',704,1615550290232,0),(153,1,'lee','chan','headache','vitaminC',1452,1615500666006,1),(154,1,'Lau','Amy','headache','injection',1149,1615676458342,0),(155,1,'lam','Charles','fever','drug',1389,1615667492699,1),(156,1,'lee','chan','headache','vitaminA',1498,1615613687479,0),(157,1,'Poon','James','headache','drug',1325,1615630758305,1),(158,1,'Lau','Amy','fever','injection',132,1615618328097,0),(159,1,'lee','chan','covid19','vitaminC',686,1615504964578,1),(160,1,'lee','James','headache','vitaminA',1032,1615493837609,0),(161,1,'lam','chan','fever','drug',1102,1615519093318,1),(162,1,'Lau','Amy','headache','vitaminC',415,1615678752770,0),(163,1,'lee','James','covid19','drug',772,1615623682905,1),(164,1,'lam','chan','fever','vitaminA',613,1615646955224,0),(165,1,'Poon','chan','headache','vitaminC',749,1615669326414,1),(166,1,'Lau','Amy','headache','injection',1906,1615452165408,0),(167,1,'lam','chan','headache','drug',1284,1615595246805,1),(168,1,'lee','chan','headache','vitaminA',704,1615666136809,0),(169,1,'lee','James','headache','drug',1667,1615591342638,1),(170,1,'Lau','Amy','fever','injection',224,1615523101772,0),(171,1,'lee','Charles','covid19','vitaminC',122,1615665479954,1),(172,1,'lee','James','headache','vitaminA',1935,1615545293461,0),(173,1,'Poon','chan','fever','drug',1311,1615554026455,1),(174,1,'Lau','Amy','headache','vitaminC',751,1615439850898,0),(175,1,'lee','James','covid19','drug',1820,1615620374134,1),(176,1,'lam','chan','fever','vitaminA',851,1615569516985,0),(177,1,'lee','chan','headache','vitaminC',793,1615551261531,1),(178,1,'Lau','Amy','headache','injection',1412,1615612555707,0),(179,1,'lam','Charles','fever','drug',682,1615455392953,1),(180,1,'lee','chan','headache','vitaminA',1176,1615522496654,0),(181,1,'Poon','James','headache','dru\n\ng',1835,1615551903416,1),(182,1,'Lau','Amy','headache','injection',1645,1615497626127,0),(183,1,'lee','chan','covid19','vitaminC',721,1615656419394,1),(184,1,'lee','James','headache','vitaminA',669,1615576417598,0),(185,1,'lam','chan','fever','drug',1184,1615477628816,1),(186,1,'Lau','Amy','headache','vitaminC',1912,1615482890296,0),(187,1,'lee','James','headache','drug',9,1615546364041,1),(188,1,'lam','chan','fever','vitaminA',311,1615588748324,0),(189,1,'Poon','chan','headache','vitaminC',1526,1612180730308,1),(190,1,'Lau','Amy','headache','injection',698,1612186929056,0),(191,1,'lam','chan','fever','drug',912,1612240453365,1),(192,1,'lee','chan','headache','vitaminA',469,1612230278666,0),(193,1,'lee','James','headache','drug',1609,1612278032240,1),(194,1,'Lau','Amy','fever','injection',636,1612288124214,0),(195,1,'lee','Charles','covid19','vitaminC',356,1612195323358,1),(196,1,'lee','James','headache','vitaminA',1871,1612219443157,0),(197,1,'Poon','chan','headache','drug',286,1612359244717,1),(198,1,'Lau','Amy','headache','vitaminC',1821,1612208293124,0),(199,1,'lee','James','covid19','drug',245,1612330130478,1),(200,1,'lam','chan','fever','vitaminA',1765,1612355372026,0),(201,1,'lee','chan','headache','vitaminC',89,1612375267702,1),(202,1,'Lau','Amy','headache','injection',1150,1612399021443,0),(203,1,'lam','Charles','fever','drug',1484,1612198903118,1),(204,1,'lee','chan','headache','vitaminA',1972,1612163850270,0),(205,1,'Poon','James','headache','drug',1408,1612329741004,1),(206,1,'Lau','Amy','fever','injection',1122,1612227553220,0),(207,1,'lee','chan','headache','vitaminC',1389,1612255742093,1),(208,1,'lee','James','headache','vitaminA',1579,1612184849817,0),(209,1,'lam','chan','fever','drug',1728,1612264221812,1),(210,1,'Lau','Amy','headache','vitaminC',1905,1612355358616,0),(211,1,'lee','James','covid19','drug',340,1612313726655,1),(212,1,'lam','chan','headache','vitaminA',1988,1612350556436,0),(213,1,'Poon','chan','headache','vitaminC',919,1612400401221,1),(214,1,'Lau','Amy','headache','injection',630,1612279935808,0),(215,1,'lam','chan','fever','drug',396,1612305674383,1),(216,1,'lee','chan','headache','vitaminA',90,1612277363501,0),(217,1,'lee','James','headache','drug',1263,1612317793364,1),(218,1,'Lau','Amy','fever','injection',45,1612345675327,0),(219,1,'lee','Charles','covid19','vitaminC',436,1612363795551,1),(220,1,'lee','James','headache','vitaminA',47,1612370750781,0),(221,1,'Poon','chan','fever','drug',925,1612351166263,1),(222,1,'Lau','Amy','headache','vitaminC',485,1612232377980,0),(223,1,'lee','James','covid19','drug',1653,1612215590118,1),(224,1,'lam','chan','fever','vitaminA',807,1612228815661,0),(225,1,'lee','chan','headache','vitaminC',1080,1612345306959,1),(226,1,'Lau','Amy','headache','injection',977,1612369686821,0),(227,1,'Lee','Chan','Headache','Drug',100,1616413014399,1),(228,1,'Lee','Chan','Headache','Drug',100,1616413014399,1),(229,1,'Lee','Chan','Headache','Drug',100,1616413014399,1),(230,1,'Lee','Chan','Headache','Drug',100,1616413014399,0),(231,1,'Lee','Chan','Headache','Drug',100,1616413014399,0),(232,1,'Lee','Chan','Headache','Drug',100,1616413014399,0),(233,1,'Lee','Chan','Covid19','Injection',1000,1616413014399,0),(234,1,'Lee','Chan','Covid19','Injection',2000,1616413014399,0),(235,1,'Chan','Han','Dizzy','Vitamin c',10,1616413465258,1),(236,1,'Chan','Lau','Dizzy','Vitamin C',10,1616413489675,0),(237,1,'James','Pet','Crazy','None',2000,1616385600000,1),(238,3,'David','Carman','Crazy','Drug',10,1616414405530,0),(239,3,'Amy','Peter','Opps','Tooo',56,1616414445584,1),(240,3,'James','Andy','Happy','No',10,1616414704114,0),(241,3,'Crazy','May','O','None',30,1616415003711,0),(242,3,'Ooo','Oo','Oooooo','Ooo',0,1616415024197,1);
/*!40000 ALTER TABLE `consultation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `uuid` varchar(100) NOT NULL,
  `cid` int NOT NULL,
  `expireTime` bigint NOT NULL,
  `token` varchar(100) NOT NULL,
  `ip` varchar(45) NOT NULL,
  UNIQUE KEY `token_UNIQUE` (`token`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-22 21:24:00