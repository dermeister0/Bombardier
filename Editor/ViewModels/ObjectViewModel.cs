using Bombardier.Common;
using Bombardier.Editor.ViewModels.Gears;
using Bombardier.Editor.Views.MultipleObjects;
using Bombardier.Editor.Views.SingleObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Bombardier.Editor.ViewModels
{
    class ObjectViewModel : ViewModelBase
    {
        protected MapObject mapObject;

        public int X { get { return mapObject.X; } }

        public int Y { get { return mapObject.Y; } }

        public MapObjectType ObjectType { get { return mapObject.ObjectType; } }

        public int LocalX { get { return Global.RulerSize + mapObject.X * Global.CellSize; } }

        public int LocalY { get { return Global.RulerSize + mapObject.Y * Global.CellSize; } }

        protected ObjectViewModel(MapObject mapObject)
        {
            this.mapObject = mapObject;
        }

        public UserControl CreateView()
        {
            UserControl result = null;

            switch (mapObject.ObjectType)
            {
                case MapObjectType.Start:
                    result = new StartView();
                    break;
                case MapObjectType.Turret:
                    result = new TurretView();
                    break;
                default:
                    throw new ArgumentException("Unsupported object type: " + mapObject.ObjectType.ToString());
            }

            if (result != null)
                result.DataContext = this;

            return result;
        }

        public void UpdatePosition(int x, int y)
        {
            mapObject.X = x;
            mapObject.Y = y;

            OnPropertyChanged("LocalX");
            OnPropertyChanged("LocalY");
        }

        public static ObjectViewModel Create(MapObject mapObject)
        {
            switch (mapObject.ObjectType)
            {
                case MapObjectType.Turret:
                    return new TurretViewModel(mapObject);
                default:
                    return new ObjectViewModel(mapObject);
            }
        }

        public bool IsPointInRect(int x, int y)
        {
            return x >= LocalX && x <= LocalX + Global.CellSize && y >= LocalY && y <= LocalY + Global.CellSize;
        }

        public bool IsEnabled 
        { 
            get { return mapObject.IsEnabled; } 
            set 
            { 
                mapObject.IsEnabled = value;
                OnPropertyChanged("IsEnabled");
            } 
        }
    }
}
