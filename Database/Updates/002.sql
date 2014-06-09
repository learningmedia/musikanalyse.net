USE [MusikanalyseDb]
GO


CREATE TABLE [dbo].[Categories] (
    [Id]                INT IDENTITY(1,1)   NOT NULL,
    [Name]              NVARCHAR(MAX)       NULL,
    [Rank]              INT                 NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO


ALTER TABLE [dbo].[Pages]
    ADD [CategoryId] INT NULL;
GO


ALTER TABLE [dbo].[Pages]
    ADD CONSTRAINT [FK_Pages_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id])
GO


UPDATE [dbo].[Settings] SET [Value] = N'2' WHERE [Name] = N'AppVersion';
GO
