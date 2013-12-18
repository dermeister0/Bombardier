using Bombardier.Common;
using Bombardier.Editor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels.Triggers
{
    enum ButtonEvent { OnPress = 1 };

    class ButtonViewModel : ObjectViewModel
    {
        public ButtonViewModel(MapObject mapObject)
            : base(mapObject)
        {
            Events.Add(new Event((int)ButtonEvent.OnPress, ButtonEvent.OnPress.ToString()));
        }
    }
}
