using Bombardier.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace Bombardier.Editor.ViewModels
{
    abstract class ObjectViewModel : ViewModelBase
    {
        protected MapObject mapObject;

        public int X { get { return mapObject.X; } }

        public int Y { get { return mapObject.Y; } }

        public MapObjectType ObjectType { get { return mapObject.ObjectType; } }

        public int LocalX { get { return mapObject.X * 50; } }

        public int LocalY { get { return mapObject.Y * 50; } }

        public ObjectViewModel(MapObject mapObject)
        {
            this.mapObject = mapObject;
        }

        public abstract UserControl CreateView();

        public void UpdatePosition(int x, int y)
        {
            mapObject.X = x;
            mapObject.Y = y;

            OnPropertyChanged("LocalX");
            OnPropertyChanged("LocalY");
        }
    }
}
