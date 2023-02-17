# 데이터베이스 접속 정보 및 프로젝트 ERD

## 데이터베이스 접속 정보

- hostname: [i8a803.p.ssafy.io](http://i8a803.p.ssafy.io/)

### 유저 디비
- port: 3001
- username: ekdrms
- password: ehdrms

### 트레이너 디비
- port: 3002
- username: ekdrms
- password: ehdrms

### 비지니스 디비
- port: 3003
- username: ekdrms
- password: ehdrms

### 채팅 디비
- port: 27017
- username: ekdrms
- password: ehdrms

### 인증 디비
- port: 6379
- username: ekdrms
- password: ehdrms


## 프로젝트 ERD
![Image](https://user-images.githubusercontent.com/103018534/219516803-3b53252f-a2d2-4fde-bad3-29c5ddbf448a.png)

## DDL

```sql
DROP TABLE IF EXISTS `memo`;
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

UNLOCK TABLES;

DROP TABLE IF EXISTS `user`;
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


CREATE TABLE `trainer` (
  `trainer_id` bigint NOT NULL AUTO_INCREMENT,
  `approved` bit(1) NOT NULL,
  `awards` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `career` varchar(255) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` varchar(10) DEFAULT 'local',
  `stars` double DEFAULT '0',
  `stop_until` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`trainer_id`),
  UNIQUE KEY `UK_4jrvips0u6okch0ktcu7xdaxw` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `opinion` (
  `dtype` varchar(31) NOT NULL,
  `opinion_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `target_id` bigint NOT NULL,
  `target_name` varchar(255) NOT NULL,
  `writer_id` bigint NOT NULL,
  `writer_name` varchar(255) NOT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `stop_until` datetime DEFAULT NULL,
  `target_role` varchar(255) DEFAULT NULL,
  `star` int DEFAULT NULL,
  PRIMARY KEY (`opinion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
  `reservation_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `day` int NOT NULL,
  `hour` int NOT NULL,
  `month` int NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `trainer_id` bigint NOT NULL,
  `trainer_name` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `year` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `UK_6em0vimwo1wvw8uao1iffv89m` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=768 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




```