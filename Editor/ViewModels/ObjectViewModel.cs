using Bombardier.Common;
using Bombardier.Editor.Support;
using Bombardier.Editor.ViewModels.Gears;
using Bombardier.Editor.ViewModels.Walls;
using Bombardier.Editor.Views.MultipleObjects;
using Bombardier.Editor.Views.SingleObjects;
using Bombardier.Editor.Views.Triggers;
using Bombardier.Editor.Views.Walls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Bombardier.Editor.Models;
using Bombardier.Editor.ViewModels.Triggers;

namespace Bombardier.Editor.ViewModels
{
    class ObjectViewModel : ViewModelBase
    {
        protected MapObject mapObject;

        public int X { get { return mapObject.X; } }

        public int Y { get { return mapObject.Y; } }

        public MapObjectType ObjectType { get { return mapObject.ObjectType; } }

        public int LocalX { get { return UnitConverter.MapXToLocal(mapObject.X); } }

        public int LocalY { get { return UnitConverter.MapYToLocal(mapObject.Y); } }

        public List<Event> Events { get; set; }

        public List<ObjectAction> Actions { get; set; }

        protected ObjectViewModel(MapObject mapObject)
        {
            this.mapObject = mapObject;
            Events = new List<Event>();
            Actions = new List<ObjectAction>();
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
                case MapObjectType.Door:
                    result = new DoorView();
                    break;
                case MapObjectType.Button:
                    result = new ButtonView();
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
                case MapObjectType.Door:
                    return new DoorViewModel(mapObject);
                case MapObjectType.Button:
                    return new ButtonViewModel(mapObject);
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
