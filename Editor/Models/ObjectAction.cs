using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Models
{
    class ObjectAction
    {
        public readonly int Code;

        public string Name { get; private set; }

        public ObjectAction(int code, string name)
        {
            Code = code;
            Name = name;
        }
    }
}
