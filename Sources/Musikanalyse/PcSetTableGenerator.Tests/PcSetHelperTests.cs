using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace PcSetTableGenerator.Tests
{
    [TestClass]
    public class PcSetHelperTests
    {
        [TestMethod]
        public void GetIntervalVectorTest1()
        {
            CollectionAssert.AreEqual(new[] { 1, 0, 2, 1, 1, 1 }, PcSetHelper.GetIntervalVector(new PcSet(new[] { 0, 1, 4, 7 })));
        }

        [TestMethod]
        public void GetIntervalVectorTest2()
        {
            CollectionAssert.AreEqual(new[] { 2, 3, 3, 2, 4, 1 }, PcSetHelper.GetIntervalVector(new PcSet(new[] { 0, 1, 2, 4, 7, 9 })));
        }

        [TestMethod]
        public void GetIntervalVectorEmptySet()
        {
            CollectionAssert.AreEqual(new[] { 0, 0, 0, 0, 0, 0 }, PcSetHelper.GetIntervalVector(new PcSet(new int[0])));
        }

        [TestMethod]
        public void GetIntervalVectorOneItemSet()
        {
            CollectionAssert.AreEqual(new[] { 0, 0, 0, 0, 0, 0 }, PcSetHelper.GetIntervalVector(new PcSet(new[] { 1 })));
        }

        [TestMethod]
        public void GetIntervalVectorFullSet()
        {
            CollectionAssert.AreEqual(new[] { 12, 12, 12, 12, 12, 6 }, PcSetHelper.GetIntervalVector(new PcSet(new[] { 0, 1, 2, 3, 4, 5, 7, 6, 7, 8, 9, 10, 11 })));
        }
    }
}
