namespace Musikanalyse.Services.Contracts
{
    /// <summary>
    /// Provides an interface for a game.
    /// </summary>
    public interface IGameLevel
    {
        /// <summary>
        /// Sets the configuration object for the game.
        /// </summary>
        /// <param name="config">The configuration object.</param>
        void SetConfig(dynamic config);
    }
}