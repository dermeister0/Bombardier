using Bombardier.Editor.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Services
{
    enum Tool { Clear, Bricks00, Stones00, Start, TurretLeft, TurretRight, Select, Door }

    interface IToolbar
    {
        Tool CurrentTool { get; set; }

        ObjectViewModel SelectedObject { get; set; }
    }
}
