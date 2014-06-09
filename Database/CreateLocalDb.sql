USE [master]
GO

-- Hier wird die Datenbank, wenn Sie existiert gelöscht.
IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'MusikanalyseDb')
    DROP DATABASE [MusikanalyseDb]
GO
-- Hier wird die Anmeldung gelöscht, falls sie existiert.
IF  EXISTS (SELECT * FROM sys.server_principals WHERE name = N'MusikanalyseUser')
    DROP LOGIN [MusikanalyseUser]
GO

-- Hier wird nun die Datenbank neu angelegt.
CREATE DATABASE [MusikanalyseDb] ON PRIMARY
( NAME = N'MusikanalyseDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\MusikanalyseDb.mdf' , SIZE = 102400KB , FILEGROWTH = 10240KB )
 LOG ON 
( NAME = N'MusikanalyseDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\MusikanalyseDb_log.ldf' , SIZE = 20480KB , FILEGROWTH = 10240KB )
GO

-- Hier wird die Anmeldung erzeugt.
CREATE LOGIN [MusikanalyseUser] WITH PASSWORD=N'123456', DEFAULT_DATABASE=[MusikanalyseDb], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

-- Umschalten auf die frisch erstellte Datenbank.
USE [MusikanalyseDb]
GO

-- Hier wird der Benutzer für die Anmeldung erstellt.
CREATE USER [MusikanalyseUser] FOR LOGIN [MusikanalyseUser]
GO
 
-- Hier werden die Leserechte für den Benutzer gesetzt.
EXEC sp_addrolemember N'db_datareader', N'MusikanalyseUser'
GO

-- Hier werden die Schreibrechte für den Benutzer gesetzt.
EXEC sp_addrolemember N'db_datawriter', N'MusikanalyseUser'
GO

-- Hier werden die Rechte gesetzt, um Konfigurationen und Wartungen durchzuführen, also all die Dinge, die Andreas auch nicht so recht weiß.
EXEC sp_addrolemember N'db_owner', N'MusikanalyseUser'
GO
