using Bombardier.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Bombardier.Editor.ViewModels
{
    class ObjectViewModel : ViewModelBase
    {
        protected MapObject mapObject;

        public int X { get { return mapObject.X; } }

        public int Y { get { return mapObject.Y; } }

        public Thickness Margin
        {
            get { return new Thickness(X * 20, Y * 20, 0, 0); } // @@
        }

        public ObjectViewModel(MapObject mapObject)
        {
            this.mapObject = mapObject;
        }
    }
}
