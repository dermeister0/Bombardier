using Bombardier.Common;
using Bombardier.Editor.Views.MultipleObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace Bombardier.Editor.ViewModels
{
    class MultipleObjectViewModel : ObjectViewModel
    {
        public MultipleObjectViewModel(MapObject mapObject)
            : base(mapObject)
        {
        }

        public override UserControl CreateView()
        {
            UserControl result = null;

            switch (mapObject.ObjectType)
            {
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
    }
}
