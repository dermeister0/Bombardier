using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Support
{
    static class UnitConverter
    {
        public static int MapXToLocal(int x)
        {
            return Global.RulerSize + x * Global.CellSize;
        }

        public static int MapYToLocal(int y)
        {
            return Global.RulerSize + y * Global.CellSize;
        }

        public static int MouseXToMap(int x)
        {
            return (x - Global.RulerSize) / Global.CellSize;
        }

        public static int MouseYToMap(int y)
        {
            return (y - Global.RulerSize) / Global.CellSize;
        }
    }
}
