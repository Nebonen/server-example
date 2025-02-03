DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Week assingment 3 tables
CREATE TABLE Medications (
    medication_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Medication_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    medication_id INT NOT NULL,
    taken_at DATETIME,
    log_date DATE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (medication_id) REFERENCES Medications(medication_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

-- Inserting a single record, without specifying column names
INSERT INTO Users VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

-- Iserting multiple user rows at once (default values like created_at are inserted without need to specify them)
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Example when FK constraint fails (if user_id 15 does not exist) 15 -> 3
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (3, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

-- Week assingment 3 statements
INSERT INTO Medications (user_id, medication_name, dosage, frequency, start_date, end_date, notes) VALUES
  (1, 'Ibuprofen', '200mg', '3 times a day', '2024-01-10', '2024-01-15', 'For pain relief'),
  (2, 'Vitamin C', '500mg', 'Once a day', '2024-01-10', '2024-01-20', 'For immune system'),
  (3, 'Paracetamol', '500mg', 'Once a day', '2024-01-10', '2024-01-15', 'For fever');

INSERT INTO Medication_logs (user_id, medication_id, taken_at, notes) VALUES
  (1, 1, '2024-01-10 08:00:00', 'Taken with breakfast'),
  (1, 1, '2024-01-10 12:00:00', 'Taken with lunch'),
  (2, 1, '2024-01-10 18:00:00', 'Taken with dinner'),
  (2, 2, '2024-01-10 09:00:00', 'Taken with breakfast'),
  (3, 2, '2024-01-10 09:00:00', 'Taken with breakfast'),
  (3, 3, '2024-01-10 10:00:00', 'Taken with breakfast');

-- example queries --

-- get all diary entries for a specific user
-- SELECT * FROM DiaryEntries WHERE user_id = 1;

-- update users medication dosage
-- UPDATE Medications SET dosage = '300mg' WHERE medication_id = 1, user_id = 1;

-- delete a medication log entry
-- DELETE FROM Medication_logs WHERE log_id = 6;
