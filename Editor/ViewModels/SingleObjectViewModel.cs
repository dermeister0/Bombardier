using Bombardier.Common;
using Bombardier.Editor.Views.SingleObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Bombardier.Editor.ViewModels
{
    class SingleObjectViewModel : ObjectViewModel
    {
        public SingleObjectViewModel(MapObject mapObject)
            : base(mapObject)
        {
            mapObject.X = -1;
            mapObject.Y = -1;
        }

        public UserControl CreateView()
        {
            UserControl result = null;

            if (mapObject.ObjectType == MapObjectType.Start)
                result = new StartView();

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
    }
}
