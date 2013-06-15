using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Services
{
    enum Tool { Clear, Bricks00 }

    interface IToolbar
    {
        Tool CurrentTool { get; set; }
    }
}
