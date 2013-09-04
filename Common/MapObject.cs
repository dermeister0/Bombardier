using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public enum MapObjectType { Start };

    [DataContract]
    [Serializable]
    public class MapObject
    {
        [DataMember]
        public int X { get; set; }

        [DataMember]
        public int Y { get; set; }

        [DataMember]
        public MapObjectType ObjectType { get; set; }
    }
}
