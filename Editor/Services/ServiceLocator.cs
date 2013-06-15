using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Services
{
    static class ServiceLocator
    {
        static IToolbar toolbarService;

        public static IToolbar GetToolbar()
        {
            if (toolbarService == null)
                toolbarService = new ToolbarService();

            return toolbarService;
        }
    }
}
