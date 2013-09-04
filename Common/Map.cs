using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bombardier.Common
{
    public enum MapCell { Clear, Brick, Stone };

    [DataContract]
    [Serializable]
    public class Map
    {
        [DataMember]
        public readonly int Width;

        [DataMember]
        public readonly int Height;

        [DataMember]
        public readonly MapCell[][] Cells;

        [DataMember]
        public readonly List<MapObject> Objects;
        
        public Map(int width, int height)
        {
            Width = width;
            Height = height;

            Cells = new MapCell[height][];
            for (int i = 0; i < Height; ++i)
                Cells[i] = new MapCell[Width];

            Objects = new List<MapObject>();
            Objects.Add(new MapObject { ObjectType = MapObjectType.Start });
        }

        public void Randomize()
        {
            var random = new Random((int)DateTime.Now.Ticks);

            for (int y = 0; y < Height; ++y)
                for (int x = 0; x < Width; ++x)
                    Cells[y][x] = (MapCell)random.Next(2);
        }
    }
}