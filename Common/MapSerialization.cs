using System;
using System.Collections.Generic;
using System.IO;
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
            Map result = null;

            var bf = new BinaryFormatter();
            using (var stream = File.OpenRead(fileName))
            {
                result = bf.Deserialize(stream) as Map;
            }

            if (result.Format != Map.CurrentFormat)
                result.Upgrade();

            return result;
        }

        public static void SaveMap(Map map, string fileName)
        {
            var bf = new BinaryFormatter();

            using (var stream = new FileStream(fileName, System.IO.FileMode.Create))
            {
                bf.Serialize(stream, map);
            }
        }
    }
}
