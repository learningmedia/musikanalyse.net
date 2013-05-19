namespace Musikanalyse.Website.GameLevels
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web;

    using Musikanalyse.Services.Contracts;

    public sealed class MemoryGameLevel : IGameLevel
    {
        private List<Tuple<string, string>> pairs;

        public IList<Tuple<string, string>> Pairs
        {
            get
            {
                return this.pairs;
            }
        }

        /// <summary>
        /// Sets the configuration object for the game.
        /// </summary>
        /// <param name="config">The configuration object.</param>
        /// <exception cref="System.NotImplementedException"></exception>
        public void SetConfig(dynamic config)
        {
            string s = config.Directory;
            string virtualDir = VirtualPathUtility.AppendTrailingSlash(s);
            string fileSystemDir = HttpContext.Current.Server.MapPath(virtualDir);
            this.pairs = Directory.GetFiles(fileSystemDir, "*.png", SearchOption.TopDirectoryOnly)
                .Select(x => VirtualPathUtility.Combine(virtualDir, Path.GetFileName(x)))
                .Bundle(2)
                .Select(x => new Tuple<string, string>(x.First(), x.Last()))
                .ToList();
        }
    }
}
