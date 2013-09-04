using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public enum MapObjectType { Start };

    public class MapObject
    {
        public int X { get; set; }

        public int Y { get; set; }

        public MapObjectType ObjectType { get; set; }
    }
}
