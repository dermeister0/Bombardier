using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Bombardier.Editor.Services;

namespace Bombardier.Editor.ViewModels
{
    class MainViewModel : ViewModelBase
    {
        public MapViewModel MapVM { get; private set; }

        public ICommand FileNewCommand { get; private set; }

        public ICommand FileOpenCommand { get; private set; }

        public ICommand FileSaveCommand { get; private set; }

        public ICommand FileExitCommand { get; private set; }

        public ICommand ChangeTool { get; private set; }

        IToolbar toolbarService;

        public Tool CurrentTool { get; private set; }

        public MainViewModel()
        {
            toolbarService = ServiceLocator.GetToolbar();

            FileNewCommand = new DelegateCommand(FileNew_Executed);
            FileOpenCommand = new DelegateCommand<string>(FileOpen_Executed);
            FileSaveCommand = new DelegateCommand<string>(FileSave_Executed);
            FileExitCommand = new DelegateCommand(FileExit_Executed);

            ChangeTool = new DelegateCommand<string>(ChangeTool_Executed);

            MapVM = new MapViewModel(new Bombardier.Common.Map(0, 0));
            OnPropertyChanged("MapVM");

            ChangeTool.Execute("Clear");
        }

        void FileNew_Executed()
        {
            MapVM = new MapViewModel(new Bombardier.Common.Map(30, 30));
            OnPropertyChanged("MapVM");
        }

        void ChangeTool_Executed(string tool)
        {
            Tool toolCode = (Tool)Enum.Parse(typeof(Tool), tool);
            toolbarService.CurrentTool = toolCode;

            CurrentTool = toolCode;
            OnPropertyChanged("CurrentTool");
        }

        void FileSave_Executed(string fileName)
        {
            Bombardier.Common.MapSerialization.SaveMap(MapVM.GetMap(), fileName);
        }

        void FileOpen_Executed(string fileName)
        {
            Bombardier.Common.Map map = Bombardier.Common.MapSerialization.LoadMap(fileName);
            MapVM = new MapViewModel(map);
            OnPropertyChanged("MapVM");
        }

        void FileExit_Executed()
        {
            App.Current.MainWindow.Close();
        }
    }
}
