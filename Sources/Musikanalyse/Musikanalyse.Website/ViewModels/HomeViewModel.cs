namespace Musikanalyse.Website.ViewModels
{
    using System.Collections.Generic;

    using Musikanalyse.Services.Contracts;

    public class HomeViewModel
    {
        public IList<TutorialInfo> TutorialInfos { get; set; }
    }
}