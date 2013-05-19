namespace Musikanalyse.Website.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;

    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;
    using Musikanalyse.Website.GameLevels;

    public class GamesController : Controller
    {
        private readonly IGameService service;

        public GamesController()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/content/games/index.json");
            this.service = new GameService(path);
        }

        public ActionResult Index(string gameName, string levelName)
        {
            // In case a specific level has been chosen:
            if (!string.IsNullOrWhiteSpace(levelName))
            {
                if ("memory".Equals(gameName, StringComparison.OrdinalIgnoreCase))
                {
                    MemoryGameLevel levelObject;
                    Level level = this.service.GetLevel(levelName, out levelObject);
                    this.ViewBag.LevelTitle = level.Title;
                    return this.View("MemoryGameLevel", levelObject);
                }

                throw new HttpException(404, "Not found.");
            }

            // In case a specific game type has been chosen:
            if (!string.IsNullOrWhiteSpace(gameName))
            {
                if ("memory".Equals(gameName, StringComparison.OrdinalIgnoreCase))
                {
                    this.ViewBag.GameName = "memory";
                    this.ViewBag.GameTitle = "Memory";

                    IList<Level> levels = service.GetLevels<MemoryGameLevel>();
                    return this.View("LevelIndex", levels);
                }

                throw new HttpException(404, "Not found.");
            }

            // Otherwise we return the game type index:
            IList<Game> games = this.service.GetGames();
            return this.View("GameIndex", games);
        }
    }
}
