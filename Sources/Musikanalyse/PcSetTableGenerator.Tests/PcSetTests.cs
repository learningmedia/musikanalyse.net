namespace PcSetTableGenerator.Tests
{
    using System.Linq;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class PcSetTests
    {
        [TestMethod]
        public void ShiftTest()
        {
            PcSet original = new PcSet(new[] { 1, 3, 8 });
            PcSet shifted = original.Shift(1);
            CollectionAssert.AreEqual(new[] { 1, 6, 11 }, shifted.ToArray());
        }

        [TestMethod]
        public void ShiftTest2()
        {
            PcSet original = new PcSet(new[] { 0, 1, 11 });
            PcSet shifted = original.Shift(2);
            CollectionAssert.AreEqual(new[] { 0, 1, 2 }, shifted.ToArray());
        }
    }
}
