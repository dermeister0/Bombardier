﻿using System;
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

        public static IToolbar GetToolbar()
        {
            if (toolbarService == null)
                throw new NullReferenceException("Toolbar service not initialized.");

            return toolbarService;
        }

        public static IMap GetMap()
        {
            if (mapService == null)
                throw new NullReferenceException("Map service not initialized.");

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
    }
}
