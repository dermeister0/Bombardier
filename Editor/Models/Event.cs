using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Models
{
    class Event
    {
        public readonly int Code;

        public readonly string Name;

        public Event(int code, string name)
        {
            Code = code;
            Name = name;
        }
    }
}
