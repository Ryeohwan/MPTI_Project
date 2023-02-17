CREATE DATABASE  IF NOT EXISTS `mpti` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mpti`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8a803.p.ssafy.io    Database: mpti
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `memo`
--

DROP TABLE IF EXISTS `memo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memo` (
  `memo_id` bigint NOT NULL AUTO_INCREMENT,
  `aerobic` int NOT NULL,
  `back` int NOT NULL,
  `biceps` int NOT NULL,
  `chest` int NOT NULL,
  `core` int NOT NULL,
  `date` date DEFAULT NULL,
  `legs` int NOT NULL,
  `record` varchar(255) DEFAULT NULL,
  `shoulder` int NOT NULL,
  `trainer_id` bigint DEFAULT NULL,
  `triceps` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`memo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memo`
--

LOCK TABLES `memo` WRITE;
/*!40000 ALTER TABLE `memo` DISABLE KEYS */;
INSERT INTO `memo` VALUES (1,0,0,1,0,0,'2023-02-17',0,'회원이 코어운동 위주의 루틴 요청함',0,12,1,23),(2,0,0,1,0,0,'2023-02-17',0,'회원이 코어운동 위주의 루틴 요청함',0,23,1,12),(3,0,1,0,0,0,'2023-02-16',0,'업무 중 손목 부상으로 인해 이두 운동은 피했음',0,23,0,12),(4,0,0,1,0,0,'2023-02-16',0,'집에 운동기구가 몇 개 있어서 다양한 운동 가르쳐드리기',0,23,1,12),(5,0,0,0,0,0,'2023-02-16',1,'스쿼트 자세가 많이 교정되셨으나 약간의 교정이 추가적으로 필요할 것 같음',0,23,0,12),(6,1,0,0,0,0,'2023-02-16',0,'유산소 운동을 하시다보니 유연성이 많이 좋아지심',0,23,0,12);
/*!40000 ALTER TABLE `memo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `aerobic` int DEFAULT '0',
  `age` int NOT NULL,
  `back` int DEFAULT '0',
  `biceps` int DEFAULT '0',
  `birth` date DEFAULT NULL,
  `chest` int DEFAULT '0',
  `core` int DEFAULT '0',
  `create_at` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `legs` int DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `s3url` varchar(255) DEFAULT NULL,
  `shoulder` int DEFAULT '0',
  `stop_until` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `triceps` int DEFAULT '0',
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,NULL,0,26,0,0,NULL,0,0,'2023-02-16 19:40:55','wjddnjscjf123@naver.com','M',0,'정원철','$2a$10$qkxbLGUqaTzogmUHI93p5.8CBISuO9ZQcADYVlxneaXtzlAn1fvLi','01012341234',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/wjddnjscjf123',0,'2023-02-15',NULL,0,'2023-02-16 21:21:34'),(5,NULL,0,26,0,0,NULL,0,0,'2023-02-16 19:50:49','dldPdms123@naver.com','F',0,'이예은','$2a$10$G6epXnu68W7tvZXZmGU7leYXob.jDAlTWz6pRpIgXDisDBazmECq.','01011111111',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/dldPdms123',0,'2023-02-15',NULL,0,'2023-02-16 21:22:02'),(6,NULL,0,26,0,0,NULL,0,0,'2023-02-16 19:52:10','tjdbwls123@naver.com','F',0,'서유진','$2a$10$iV6aLiwSIRR4BeOBakHWSeBZWB5cL1Jdgt/.2v7M1KpnyDW4e2d52','01077777777',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/tjdbwls123',0,'2023-02-15',NULL,0,'2023-02-16 21:22:24'),(7,NULL,0,28,0,0,NULL,0,0,'2023-02-16 19:54:19','wltjsgh123@naver.com','M',0,'지선호','$2a$10$gXEsKqo8B6Dy2XsYl7pkgOr6GVhAuLizRMenzA78AZ9ypMMiPhiC6','01077777777',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/wltjsgh123',0,'2023-02-15',NULL,0,'2023-02-16 21:22:43'),(8,NULL,0,29,0,0,NULL,0,0,'2023-02-16 19:55:57','dksfughks123@naver.com','M',0,'안려환','$2a$10$GnLFDHkEXqgBtXepXhyCweV.NFxdWkyBm1K6r.uxpKeoCzTwe0F66','01055555555',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/dksfughks123',0,'2023-02-15',NULL,0,'2023-02-16 21:22:57'),(9,NULL,0,28,0,0,NULL,0,0,'2023-02-16 19:57:56','dbsehdrms123@naver.com','M',0,'윤동근','$2a$10$4BXAS66/JzLIx9MIsCoxp.4FvvrE0luND5jrGrtX0DKuGjrztMqZW','01066666666',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/dbsehdrms123',0,'2023-02-15',NULL,0,'2023-02-16 21:23:29'),(10,NULL,0,26,0,0,NULL,0,0,'2023-02-16 20:00:41','dlwlgP123@naver.com','F',0,'이지혜','$2a$10$6BLYFGzB04KHpKFhQAg3RuwSqtMTEbR7aXU8qYRpLplRU9d51b6Vu','01035075141',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/dlwlgP123',0,'2023-02-15',NULL,0,'2023-02-16 21:23:43'),(11,NULL,0,27,0,0,NULL,0,0,'2023-02-16 20:04:01','jinjin123@didi.com','F',0,'서유진','$2a$10$.FBqMeM6m3UWGWKX9.jMseqWvV18nh.w9UwXLDQTocfHOQiS0G2ze','01012345678',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 20:04:01'),(12,NULL,1,26,1,2,NULL,0,0,'2023-02-16 20:09:42','lucke123@naver.com','M',2,'Lucke','$2a$10$qqU0.9GtdwqYysDWI.GzuuBYHbeAjfyHPbJFGvHLi5zarowiBWLL6','01012341234',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/lucke123',0,'2023-02-15',NULL,2,'2023-02-17 04:30:31'),(13,NULL,0,26,0,0,NULL,0,0,'2023-02-16 20:10:47','wlemfprhs123@naver.com','M',0,'지드레곤','$2a$10$gk.tELdmut2Rs0d5nljqrOcFu3x4lr6hGx4h0iGsXSmQh.qaVMY6i','01088888888',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/wlemfprhs123',0,'2023-02-15',NULL,0,'2023-02-16 21:24:24'),(14,NULL,0,27,0,0,NULL,0,0,'2023-02-16 20:13:20','arh95@naver.com','M',0,'안춘배','$2a$10$Zus9besy2FunvTGCtb2xgeUcEOIv/fCQ2yLWPoWpUYwhSrj9V8q1q','01055551604',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 20:13:20'),(15,NULL,0,27,0,0,'1999-10-10',0,0,'2023-02-16 20:19:33','arh@aaa.com','M',0,'ryeoryeo','$2a$10$Arz/iZ73ZjO0kkmOGfL6nOCamKXbU92T990hn04kWq.MB3SlaVd4C',NULL,NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 20:19:33'),(16,NULL,0,26,0,0,NULL,0,0,'2023-02-16 20:43:29','ss@ss.ss','M',0,'서유진','$2a$10$sIGrf/DaSlae8i1xpMddg.kHGvyQrO1SUvQT.OPHGzdl.3CL71qxG','01012345678',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 20:43:29'),(17,NULL,0,26,0,0,NULL,0,0,'2023-02-16 20:45:14','aaaa@naver.com','M',0,'차무식','$2a$10$6g4WgVuZzqjPsR5438fQUe0zO5UqtFU1s9dnrnTq8Nt4RNKxD83uS','010-5054-6125',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/aaaa',0,'2023-02-15',NULL,0,'2023-02-16 20:47:29'),(18,NULL,0,26,0,0,'2023-02-09',0,0,'2023-02-16 20:50:52','aaaaa@aaa.aa','M',0,'서유진','$2a$10$fmZIw3RTqRm6Gnvv3cdfz.vAS8CO6pmmA1xbUjONaIch3/wGrJrDi','01012345678',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 20:50:52'),(19,NULL,0,26,0,0,'1998-06-11',0,0,'2023-02-16 21:06:34','dbwls123@aa.com','F',0,'유진서','$2a$10$lUE8Bzaj3pkCOcj5IgAM9e7mbcmksdrbR9PHJoXi95jkOiQx7hNGi','01012345678',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 21:06:34'),(20,NULL,0,26,0,0,NULL,0,0,'2023-02-16 21:09:45','roclsth@naver.com','M',0,'정원철','$2a$10$Cr3pBae8Aj0oVtKK4Sy4Y.DMAn7Ux7L9dCM4IDq4Dxdy.4yVIvKYu','010-2032-1414',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 21:09:45'),(21,NULL,0,26,0,0,'1998-06-11',0,0,NULL,'dodamond222@gmail.com','F',0,'Yeeun Lee','$2a$10$h.67QY9w7PMU5gXVJDXi1uMERrtvL6GCje/.dU8M33bLCofUpkfYi',NULL,'google',NULL,NULL,0,'2023-02-15',NULL,0,NULL),(22,NULL,0,26,0,0,NULL,0,0,'2023-02-16 23:02:32','aaa@naver.com','M',0,'진영정','$2a$10$rohEZdb5OH0uf2da5ChIiuOfh1bcSRfot6ScKSvrr2IQ9IClyR2Bu','123141414',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-16 23:02:32'),(23,NULL,5,26,2,11,'1998-02-09',0,0,'2023-02-17 00:31:27','rlaTkvl123@naver.com','M',0,'김싸피','$2a$10$ewU2Afq4NdArfCV3OdEX7OFtPvlNBcpirUN.u6VrPmZ6i5ewulMjO','01011111111',NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/rlaTkvl123',0,'2023-02-15',NULL,1,'2023-02-17 03:32:23'),(24,NULL,0,27,0,0,'2023-02-16',0,0,'2023-02-17 01:51:09','health@naver.com','M',0,'정원철','$2a$10$XY1dh5lGcjpHkKsns4YUgeHTGDl.MsJFFCGCoIhk11OIYTldR9xkW','010-1234-5678',NULL,NULL,NULL,0,'2023-02-15',NULL,0,'2023-02-17 01:51:09'),(25,NULL,0,26,0,0,'1998-06-11',0,0,NULL,'vksek222@nate.com','F',0,'이예은','$2a$10$yskGL32eALXKjl2VbDEQie/renUNu4hfoNtDDNVziISUW9ptDcChu',NULL,'kakao',NULL,NULL,0,'2023-02-15',NULL,0,NULL),(26,NULL,0,26,0,0,'1998-06-11',0,0,NULL,'dodamond333@gmail.com','F',0,'YEEUN LEE','$2a$10$JZzmUehPToo8nooOp8CTZORkkZBt5YFt/WpwL1BJVB0E.T8VUko4u',NULL,'google',NULL,NULL,0,'2023-02-15',NULL,0,NULL),(28,NULL,0,0,0,0,NULL,0,0,NULL,'ehdrmsdl9999@naver.com',NULL,0,'윤동근','$2a$10$ll2wyjPYZsjBOnXi0.Ik/uXbJS2pOlaH.GmzT5MJ67G8rPd9SeApy',NULL,'naver',NULL,NULL,0,'2023-02-15',NULL,0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:06:45
