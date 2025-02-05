CREATE USER 'miska'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'miska'@'localhost';
FLUSH PRIVILEGES;
