using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Services
{
    class ToolbarService : IToolbar
    {
        Tool currentTool = Tool.Clear;

        public Tool CurrentTool
        {
            get
            {
                return currentTool;
            }
            set
            {
                currentTool = value;
            }
        }
    }
}
