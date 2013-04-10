﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bombardier.Server
{
    public enum MapCell { Clear, Brick };

    [DataContract]
    public class Map
    {
        [DataMember]
        public readonly int Width;

        [DataMember]
        public readonly int Height;

        [DataMember]
        public readonly MapCell[][] Cells;
        
        public Map(int width, int height)
        {
            Width = width;
            Height = height;

            Cells = new MapCell[height][];
            for (int i = 0; i < Height; ++i)
                Cells[i] = new MapCell[Width];
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