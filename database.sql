-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: marketpilot_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `client` varchar(150) NOT NULL,
  `platform` varchar(100) NOT NULL,
  `objective` varchar(150) NOT NULL,
  `budget` decimal(12,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(10) NOT NULL DEFAULT 'SAR',
  `spent` decimal(12,2) NOT NULL DEFAULT 0.00,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'نشطة',
  `impressions` int(10) unsigned NOT NULL DEFAULT 0,
  `clicks` int(10) unsigned NOT NULL DEFAULT 0,
  `conversions` int(10) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_campaign_client` (`client_id`),
  CONSTRAINT `fk_campaign_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES (1,5,'حملة الصيف','عميل 5','Google Ads','زيادة المبيعات',15000.00,'SAR',8250.00,'2026-06-29','2026-07-29','حملة صيفية لزيادة المبيعات.','مكتملة',245800,12460,312,'2026-08-19 08:56:33','2026-08-22 12:11:34'),(2,5,'حملة العودة للمدارس','عميل 5','Meta Ads','زيادة المبيعات',9500.00,'SAR',6700.00,'2026-06-30','2026-08-30','حملة العودة للمدارس.','نشطة',180000,9500,220,'2026-08-19 08:56:33','2026-08-22 12:11:25'),(3,3,'حملة الخدمات الطبية معدلللل','العميل 2 معدل','Google Ads','جمع العملاء المحتملين',12000.00,'SAR',12000.00,'2026-05-30','2026-07-13','حملة للترويج للخدمات الطبية.','مكتملة',210000,11000,300,'2026-08-19 08:56:33','2026-08-22 12:11:11'),(4,3,'حملة السفر','العميل 2 معدل','TikTok Ads','زيارات الموقع',7000.00,'SAR',3500.00,NULL,NULL,'حملة للترويج لعروض السفر.','مكتملة',120000,6000,150,'2026-08-19 08:56:33','2026-08-22 11:37:33'),(5,3,'حملة جديدة','العميل 2 معدل','TikTok Ads','زيادة المبيعات',1000.00,'SAR',0.00,NULL,NULL,'','نشطة',0,0,0,'2026-08-20 08:05:11','2026-08-22 11:37:05'),(6,3,'حملة عميل','العميل 2 معدل','Google Ads','زيادة المبيعات',0.00,'SAR',0.00,NULL,NULL,'','نشطة',0,0,0,'2026-08-20 08:47:24','2026-08-22 11:35:06'),(7,5,'ح ع 5','عميل 5','Google Ads','زيادة المبيعات',0.00,'SAR',0.00,'2026-08-21','2026-09-03','','نشطة',0,0,0,'2026-08-22 11:51:15','2026-08-22 11:52:06'),(8,3,'لاتالت','العميل 2 معدل','Google Ads','زيادة المبيعات',0.00,'SAR',0.00,'2026-08-23','2026-09-02','','نشطة',0,0,0,'2026-08-22 11:52:27','2026-08-22 11:54:45'),(9,5,'fhfgh','عميل 5','Google Ads','زيادة المبيعات',345.00,'SAR',0.00,'2026-08-21','2026-09-02','','نشطة',0,0,0,'2026-08-22 11:55:09','2026-08-22 11:55:34'),(10,5,'dsf','عميل 5','Google Ads','زيادة المبيعات',5.00,'SAR',0.00,'2026-08-25','2026-08-31','','نشطة',0,0,0,'2026-08-22 12:07:08','2026-08-22 12:30:51');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `industry` varchar(150) NOT NULL,
  `manager` varchar(150) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'نشط',
  `campaigns` int(10) unsigned NOT NULL DEFAULT 0,
  `revenue` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (3,'العميل 2 معدل','قطاع 2','مدير 2','نشط',0,0.00,'2026-08-19 09:38:47','2026-08-20 10:16:07'),(5,'عميل 5','ققق','ممم','نشط',0,0.00,'2026-08-22 11:50:39','2026-08-22 11:50:39');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `company` varchar(200) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `source` varchar(100) NOT NULL,
  `campaign` varchar(150) DEFAULT NULL,
  `assigned_to` varchar(150) DEFAULT NULL,
  `value` decimal(15,2) NOT NULL DEFAULT 0.00,
  `status` varchar(50) NOT NULL DEFAULT 'جديد',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (1,'محمد أحمد u11pdated','شركة الريادة العقارية','0501234567','m.ahmed@gmail.com','Google Ads','حملة الصيف','أحمد محمد',12000.00,'مؤهل','العميل مهتم بالخدمة وطلب عرض سعر، وتم تحديد موعد اجتماع الأسبوع القادم.','2026-08-18 21:40:45','2026-08-19 07:18:27'),(2,'سارة خالد','عيادات النخبة','0559876543',NULL,'Meta Ads',NULL,NULL,8500.00,'تم التواصل',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(3,'f','f','f',NULL,'Google Ads',NULL,NULL,0.00,'جديد',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(4,'sadf','dsf','fds',NULL,'Google Ads',NULL,NULL,0.00,'جديد',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(5,'dfg','fdg','34435435348',NULL,'Google Ads',NULL,NULL,0.00,'جديد',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(6,'fdg','fdg','fdg',NULL,'Google Ads',NULL,NULL,0.00,'جديد',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(7,'ghj','','',NULL,'Google Ads',NULL,NULL,0.00,'جديد',NULL,'2026-08-18 21:40:45','2026-08-18 21:40:45'),(9,'أحمد علي','شركة الاختبار','0591234567',NULL,'Google Ads',NULL,NULL,15000.00,'جديد',NULL,'2026-08-19 07:12:08','2026-08-19 07:12:08');
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'marketpilot_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-22 17:04:01
