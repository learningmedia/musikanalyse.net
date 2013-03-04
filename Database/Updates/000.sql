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
