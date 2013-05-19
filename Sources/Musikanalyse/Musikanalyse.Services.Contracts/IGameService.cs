namespace Musikanalyse.Services.Contracts
{
    using System.Collections.Generic;

    /// <summary>
    /// Provides an interface for loading games.
    /// </summary>
    public interface IGameService
    {
        /// <summary>
        /// Gets all available games.
        /// </summary>
        /// <returns>All available games.</returns>
        IList<Game> GetGames();

        /// <summary>
        /// Gets all game levels for the specified game type.
        /// </summary>
        /// <typeparam name="TGameType">The type of the game.</typeparam>
        /// <returns>All game levels for the specified game type.</returns>
        IList<Level> GetLevels<TGameType>() where TGameType : IGameLevel;

        /// <summary>
        /// Gets the game level with the specified game type and level name.
        /// </summary>
        /// <typeparam name="TGameType">The type of the game.</typeparam>
        /// <param name="name">The level name of the game.</param>
        /// <param name="levelObject">The instantiated level obejct.</param>
        /// <returns>The game level with the specified game type and level name.</returns>
        Level GetLevel<TGameType>(string name, out TGameType levelObject) where TGameType : IGameLevel;
    }
}
