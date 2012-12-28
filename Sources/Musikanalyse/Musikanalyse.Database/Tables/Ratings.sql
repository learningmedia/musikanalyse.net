CREATE TABLE [dbo].[Ratings]
(
    [Value] INT NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [TutorialId] INT NOT NULL, 
    CONSTRAINT [FK_Ratings_Tutorials] FOREIGN KEY ([TutorialId]) REFERENCES [Tutorials]([Id]) 
)

