using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
        public const int CurrentFormat = 4;

        [DataMember]
        public int Format { get; private set; }

        int width;

        [DataMember]
        public int Width
        {
            get { return width; }
        }

        int height;

        [DataMember]
        public int Height
        {
            get { return height; }
        }

        [DataMember]
        public MapCell[][] Cells { get; private set; }

        [DataMember]
        public Collection<MapObject> Objects { get; private set; }
        
        public Map(int width, int height)
        {
            Format = CurrentFormat;

            this.width = width;
            this.height = height;

            Cells = new MapCell[height][];
            for (int i = 0; i < Height; ++i)
                Cells[i] = new MapCell[Width];

            CreateObjects();
        }

        public void Randomize()
        {
            var random = new Random((int)DateTime.Now.Ticks);

            for (int y = 0; y < Height; ++y)
                for (int x = 0; x < Width; ++x)
                    Cells[y][x] = (MapCell)random.Next(2);
        }

        private void CreateObjects()
        {
            Objects = new Collection<MapObject>();
            Objects.Add(new MapObject { ObjectType = MapObjectType.Start, X = -10, Y = -10 });
        }

        public void Upgrade()
        {
            if (Format == 0)
            {
                if (Objects == null)
                    CreateObjects();
            }
            else if (Format == 1)
            {
                // 11/10/2013 Not used more.
                //foreach (var o in Objects)
                //    o.Properties = new Dictionary<string, ObjectProperty>();
            }
            else if (Format == 2)
            {
                foreach (var o in Objects)
                    o.IsEnabled = true;
            }
            else if (Format == 3)
            {
                Objects = new Collection<MapObject>();
            }

            Format = CurrentFormat;
        }
    }
}