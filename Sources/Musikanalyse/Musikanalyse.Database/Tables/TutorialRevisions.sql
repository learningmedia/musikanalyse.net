CREATE TABLE [dbo].[TutorialRevisions]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Description] NVARCHAR(1000) NOT NULL, 
    [Title] NVARCHAR(500) NOT NULL, 
    [ThumbnailUrl] NCHAR(250) NULL, 
    [Date] DATETIME NOT NULL, 
    [Version] INT NOT NULL, 
    [References] NVARCHAR(MAX) NULL, 
    [Text] NVARCHAR(MAX) NULL, 
    [VideoId] INT NULL, 
    CONSTRAINT [FK_TutorialRevisions_Videos] FOREIGN KEY ([VideoId]) REFERENCES [Videos]([Id]) 
)
