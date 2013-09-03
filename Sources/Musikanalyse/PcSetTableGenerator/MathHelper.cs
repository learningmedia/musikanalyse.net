namespace PcSetTableGenerator
{
    public static class MathHelper
    {
        public static int Mod(int value, int baseValue)
        {
            return (value % baseValue + baseValue) % baseValue;
        }
    }
}