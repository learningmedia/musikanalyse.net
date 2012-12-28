using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Musikanalyse.Services.Tests
{
    using Musikanalyse.Entities;

    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1( )
        {
            TutorialService service = new TutorialService();

            Tutorial tutorial = new Tutorial();
            service.CreateTutorial(tutorial);

            Assert.AreNotEqual(0, tutorial.Id);

            TutorialRevision revision = new TutorialRevision
                                            {
                                                Description = "Blab",
                                                Title = "Blubb",
                                                Text = "Hallo Welt!",
                                                TutorialId = tutorial.Id
                                            };
            service.WriteTutorialRevision(revision);

            Assert.AreNotEqual(0, revision.Id);
        }
    }
}
