﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;

namespace Bombardier.Editor.ViewModels
{
    class MainViewModel
    {
        public ICommand FileNewCommand { get; private set; }

        private Bombardier.Common.Map map;

        public MapViewModel MapVM { get; private set; }

        public MainViewModel()
        {
            FileNewCommand = new DelegateCommand(FileNew_Executed);

            MapVM = new MapViewModel(new Bombardier.Common.Map(5, 5));
        }

        void FileNew_Executed()
        {
        }
    }
}
