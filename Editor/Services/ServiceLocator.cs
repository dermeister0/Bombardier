using Bombardier.Editor.Support;
using Microsoft.Practices.Prism.Events;
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

        static IMap mapService;

        static IEventAggregator eventAggregator = new EventAggregator();

        public static IToolbar GetToolbar()
        {
            if (toolbarService == null)
                throw new GeneralException("Toolbar service not initialized.");
            
            return toolbarService;
        }

        public static IMap GetMap()
        {
            if (mapService == null)
                throw new GeneralException("Map service not initialized.");

            return mapService;
        }

        public static void InitializeMap(IMap service)
        {
            mapService = service;
        }

        public static void InitializeToolbar(IToolbar service)
        {
            toolbarService = service;
        }

        public static IEventAggregator GetEventAggregator()
        {
            return eventAggregator;
        }
    }
}
