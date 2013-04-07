USE [MusikanalyseDb]
GO

ALTER TABLE [dbo].[Pages]
    ADD [ThumbnailUrl] NVARCHAR(2048) NULL;
GO

UPDATE [dbo].[Settings] SET [Value] = N'1' WHERE [Name] = N'AppVersion';
GO
