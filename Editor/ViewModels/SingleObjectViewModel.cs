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
    }
}
