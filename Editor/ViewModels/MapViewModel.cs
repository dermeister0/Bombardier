﻿using Bombardier.Common;
using Bombardier.Editor.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels
{
    class MapViewModel : ViewModelBase, IMap
    {
        Bombardier.Common.Map map;

        public ObservableCollection<MapRowViewModel> Rows { get; private set; }

        public List<ObjectViewModel> Objects { get; private set; }

        public delegate void ObjectAddedEventHandler(ObjectViewModel objectVM);

        public event ObjectAddedEventHandler ObjectAdded;

        public MapViewModel(Bombardier.Common.Map map)
        {
            ServiceLocator.InitializeMap(this);

            this.map = map;

            Rows = new ObservableCollection<MapRowViewModel>();

            for (int y = 0; y < map.Height; ++y)
            {
                var rowVM = new MapRowViewModel();

                for (int x = 0; x < map.Width; ++x)
                {
                    var cell = new MapCellViewModel(x, y);
                    cell.SetCell(map.Cells[y][x]);
                    rowVM.Cells.Add(cell);
                }

                Rows.Add(rowVM);
            }

            Objects = new List<ObjectViewModel>();

            foreach (var o in map.Objects)
            {
                Objects.Add(new ObjectViewModel(o));
            }
        }

        public Bombardier.Common.Map GetMap()
        {
            int y = 0;
            foreach (var row in Rows)
            {
                int x = 0;
                foreach (var cell in row.Cells)
                {
                    map.Cells[y][x] = cell.GetCell();
                    ++x;
                }
                ++y;
            }

            return map;
        }

        public void SetSingleObjectPosition(Common.MapObjectType objectType, int x, int y)
        {
            var mapObject = Objects.First(o => o.ObjectType == objectType);
            mapObject.UpdatePosition(x, y);
        }

        public void AddObject(Common.MapObjectType objectType, int x, int y)
        {
            var mapObject = new MapObject { ObjectType = objectType, X = x, Y = y };
            ObjectViewModel vm = new ObjectViewModel(mapObject);
            Objects.Add(vm);

            OnPropertyChanged("Objects");

            if (ObjectAdded != null)
                ObjectAdded(vm);
        }
    }
}
