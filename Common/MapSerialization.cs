using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public class MapSerialization
    {
        public static Map LoadMap(string fileName)
        {
            throw new NotImplementedException();
        }

        public static void SaveMap(Map map, string fileName)
        {
            var bf = new BinaryFormatter();

            using (var stream = new System.IO.FileStream(fileName, System.IO.FileMode.Create))
            {
                bf.Serialize(stream, map);
            }
        }
    }
}
