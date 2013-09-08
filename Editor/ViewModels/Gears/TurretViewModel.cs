using Bombardier.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels.Gears
{
    class TurretViewModel : ObjectViewModel
    {
        public TurretViewModel(MapObject mapObject)
            : base(mapObject)
        {
        }

        public int Rotation
        {
            get
            {
                string direction = mapObject.Properties["Direction"];

                switch (direction)
                {
                    case "left":
                        return 0;
                    case "right":
                        return 180;
                    default:
                        return 0;
                }
            }
        }
    }
}
