using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Microsoft.Practices.Prism.Commands;
using Bombardier.Editor.Services;
using System.Windows;
using System.IO;

namespace Bombardier.Editor.ViewModels
{
    class MainViewModel : ViewModelBase, IToolbar
    {
        public MapViewModel MapVM { get; private set; }

        public ICommand FileNewCommand { get; private set; }

        public ICommand FileOpenCommand { get; private set; }

        public ICommand FileSaveCommand { get; private set; }

        public ICommand FileExitCommand { get; private set; }

        public ICommand ChangeTool { get; private set; }

        public Tool CurrentTool { get; set; }

        public Visibility ObjectToolsVisible { get; private set; }

        string fileName;

        public string FileName
        {
            get { return fileName; }
            private set
            {
                fileName = value;
                OnPropertyChanged("FileName");
                OnPropertyChanged("Title");
            }
        }

        public MainViewModel()
        {
            ServiceLocator.InitializeToolbar(this);

            FileNewCommand = new DelegateCommand(FileNew_Executed);
            FileOpenCommand = new DelegateCommand<string>(FileOpen_Executed);
            FileSaveCommand = new DelegateCommand<string>(FileSave_Executed);
            FileExitCommand = new DelegateCommand(FileExit_Executed);

            ChangeTool = new DelegateCommand<string>(ChangeTool_Executed);

            MapVM = new MapViewModel(new Bombardier.Common.Map(0, 0));
            OnPropertyChanged("MapVM");

            ChangeTool.Execute("Clear");

            ObjectToolsVisible = Visibility.Hidden;
        }

        void FileNew_Executed()
        {
            MapVM = new MapViewModel(new Bombardier.Common.Map(30, 30));
            OnPropertyChanged("MapVM");

            FileName = null;
        }

        void ChangeTool_Executed(string tool)
        {
            Tool toolCode = (Tool)Enum.Parse(typeof(Tool), tool);

            CurrentTool = toolCode;
            OnPropertyChanged("CurrentTool");

            SelectedObject = null;
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

            FileName = fileName;
        }

        void FileExit_Executed()
        {
            App.Current.MainWindow.Close();
        }

        ObjectViewModel selectedObject;

        public ObjectViewModel SelectedObject
        {
            get { return selectedObject; }
            set
            {
                selectedObject = value;
                OnPropertyChanged("SelectedObject");

                if (selectedObject != null)
                    ObjectToolsVisible = Visibility.Visible;
                else
                    ObjectToolsVisible = Visibility.Hidden;
                OnPropertyChanged("ObjectToolsVisible");
            }
        }

        public string Title
        {
            get
            {
                string file = Path.GetFileName(FileName) ?? "New map";

                return file + " - Bombardier Editor";
            }
        }
    }
}
