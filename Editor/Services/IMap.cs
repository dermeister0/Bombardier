using Bombardier.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Services
{
    interface IMap
    {
        void SetSingleObjectPosition(MapObjectType objectType, int x, int y);
        void AddObject(MapObjectType objectType, int x, int y);
    }
}
