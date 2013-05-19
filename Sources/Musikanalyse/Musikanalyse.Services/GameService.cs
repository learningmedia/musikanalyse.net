namespace Musikanalyse.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    using Musikanalyse.Services.Contracts;

    using Newtonsoft.Json;

    public class GameService : IGameService
    {
        /// <summary>
        /// The index read from the config file.
        /// </summary>
        private readonly GameIndex index;

        /// <summary>
        /// Initializes a new instance of the <see cref="GameService"/> class.
        /// </summary>
        /// <param name="configFile">The config file.</param>
        public GameService(string configFile)
        {
            this.index = JsonConvert.DeserializeObject<GameIndex>(File.ReadAllText(configFile));
        }

        /// <summary>
        /// Gets all available games.
        /// </summary>
        /// <returns>
        /// All available games.
        /// </returns>
        public IList<Game> GetGames()
        {
            return this.index.Games;
        }

        /// <summary>
        /// Gets all game levels for the specified game type.
        /// </summary>
        /// <typeparam name="TGameType">The type of the game.</typeparam>
        /// <returns>All game levels for the specified game type.</returns>
        public IList<Level> GetLevels<TGameType>() where TGameType : IGameLevel
        {
            return this.index.Games
                .Single(x => typeof(TGameType).FullName.Equals(x.ClrGameType, StringComparison.Ordinal))
                .Levels
                .ToList();
        }

        /// <summary>
        /// Gets the game level with the specified game type and level name.
        /// </summary>
        /// <typeparam name="TGameType">The type of the game.</typeparam>
        /// <param name="name">The level name of the game.</param>
        /// <param name="levelObject">The instantiated level obejct.</param>
        /// <returns>The game level with the specified game type and level name.</returns>
        public Level GetLevel<TGameType>(string name, out TGameType levelObject) where TGameType : IGameLevel
        {
            Level level = this.index.Games
                .Single(x => typeof(TGameType).FullName.Equals(x.ClrGameType, StringComparison.Ordinal))
                .Levels
                .Single(x => name.Equals(x.Name, StringComparison.Ordinal));

            IGameLevel gameLevel = (IGameLevel)Activator.CreateInstance(typeof(TGameType));
            gameLevel.SetConfig(level.Config);
            levelObject = (TGameType)gameLevel;
            return level;
        }
    }
}
