namespace Musikanalyse.Website.ViewModels
{
    using System.Collections.Generic;

    using Musikanalyse.Services.Contracts;

    public class TutorialsViewModel
    {
        public IList<TutorialInfo> TutorialInfos { get; set; }
    }
}
