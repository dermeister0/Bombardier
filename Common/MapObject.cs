using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public enum MapObjectType { Start, Turret };

    [DataContract]
    [Serializable]
    public class MapObject
    {
        [DataMember(Name="x")]
        public int X { get; set; }

        [DataMember(Name="y")]
        public int Y { get; set; }

        [DataMember(Name="objectType")]
        public MapObjectType ObjectType { get; set; }

        [DataMember(Name="properties")]
        public Dictionary<string, ObjectProperty> Properties = new Dictionary<string,ObjectProperty>();
    }
}
