using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;

namespace Bombardier.Editor.ViewModels
{
    class MainViewModel : ViewModelBase
    {
        public MapViewModel MapVM { get; private set; }

        public ICommand FileNewCommand { get; private set; }

        public ICommand ChangeTool { get; private set; }

        public MainViewModel()
        {
            FileNewCommand = new DelegateCommand(FileNew_Executed);
            ChangeTool = new DelegateCommand<string>(ChangeTool_Executed);

            MapVM = new MapViewModel(new Bombardier.Common.Map(0, 0));
            OnPropertyChanged("MapVM");
        }

        bool isClearChecked;
        public bool IsClearChecked
        {
            get { return isClearChecked; }
            set
            {
                if (value != isClearChecked)
                {
                    isClearChecked = value;
                    OnPropertyChanged("IsClearChecked");
                }
            }
        }

        void FileNew_Executed()
        {
            MapVM = new MapViewModel(new Bombardier.Common.Map(10, 10));
            OnPropertyChanged("MapVM");
        }

        void ChangeTool_Executed(string tool)
        {
            IsClearChecked = true; // @@
        }
    }
}
