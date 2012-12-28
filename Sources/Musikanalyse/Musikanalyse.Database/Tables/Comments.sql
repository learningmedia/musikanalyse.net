CREATE TABLE [dbo].[Comments]
(
  [Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Value] NVARCHAR(1000) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [TutorialId] INT NOT NULL, 
    [Author] NVARCHAR(100) NOT NULL, 
    CONSTRAINT [FK_Comments_Tutorials] FOREIGN KEY ([TutorialId]) REFERENCES [Tutorials]([Id]) 
)
