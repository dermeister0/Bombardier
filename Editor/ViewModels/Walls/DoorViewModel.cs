using Bombardier.Common;
using Bombardier.Editor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels.Walls
{
    enum DoorAction { Open = 1, Close };

    class DoorViewModel : ObjectViewModel
    {
        public DoorViewModel(MapObject mapObject)
            : base(mapObject)
        {
            Actions.Add(new ObjectAction((int)DoorAction.Open, DoorAction.Open.ToString()));
            Actions.Add(new ObjectAction((int)DoorAction.Close, DoorAction.Close.ToString()));
        }
    }
}
