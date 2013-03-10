USE [MusikanalyseDb]
GO

CREATE TABLE [dbo].[Pages] (
    [Id]                INT IDENTITY(1,1)   NOT NULL,
    [Title]             NVARCHAR(MAX)       NULL,
    [CreationDate]      DATETIME            NOT NULL,
    [LastModifiedDate]  DATETIME            NOT NULL,
    [Value]             NVARCHAR(MAX)       NULL,
    [ContentId]         INT                 NULL,
    [Url]               NVARCHAR(2048)      NULL,
    [UrlKey]            NVARCHAR(2048)      NULL,
    [Abstract]          NVARCHAR(MAX)       NULL,
    [Discriminator]     NVARCHAR(128)       NOT NULL,
    CONSTRAINT [PK_Pages] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE TABLE [dbo].[Settings] (
    [Name]              NVARCHAR(256)       NOT NULL,
    [Value]             NVARCHAR(MAX)       NULL,
    CONSTRAINT [PK_Settings] PRIMARY KEY CLUSTERED ([Name] ASC)
);
GO

INSERT INTO [dbo].[Settings] (
    [Name],[Value]
) VALUES (
    N'AppVersion', N'0'
);
GO
