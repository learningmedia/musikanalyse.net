CREATE TABLE [dbo].[UsageStatistics]
(
    [Date] DATETIME NOT NULL, 
    [TutorialId] INT NOT NULL, 
    [CountryCode] NCHAR(8) NOT NULL, 
    CONSTRAINT [FK_UsageStatistics_Tutorials] FOREIGN KEY ([TutorialId]) REFERENCES [Tutorials]([Id]) 
)
