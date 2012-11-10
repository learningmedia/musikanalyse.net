CREATE TABLE [dbo].[TagTutorialRelations]
(
  [TutorialId] INT NOT NULL,
  [TagId] INT NOT NULL,
  PRIMARY KEY ([TutorialId], [TagId]),
  CONSTRAINT [FK_TagTutorialRelations_Tutorials] FOREIGN KEY ([TutorialId]) REFERENCES [Tutorials]([Id]),
  CONSTRAINT [FK_TagTutorialRelations_Tags] FOREIGN KEY ([TagId]) REFERENCES [Tags] ([Id])
)
