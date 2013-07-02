using Bombardier.Common;
using Bombardier.Editor.Services;
using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Media;

namespace Bombardier.Editor.ViewModels
{
    class MapCellViewModel : ViewModelBase
    {
        MapCell cell;

        public ICommand CellClickCommand { get; set; }

        public Brush CellBrush
        {
            get
            {
                if (cell == MapCell.Clear)
                    return new SolidColorBrush(Colors.Black);
                else if (cell == MapCell.Brick)
                    return new SolidColorBrush(Colors.DarkRed);

                return new SolidColorBrush(Colors.White);
            }
        }

        public MapCellViewModel()
        {
            CellClickCommand = new DelegateCommand(CellClick_Executed);
        }

        void CellClick_Executed()
        {
            var toolbar = ServiceLocator.GetToolbar();

            // @@ [AZ] 7/2/2013
            // @@ Look at the Prism Service Locator.
            if (toolbar.CurrentTool == Tool.Bricks00)
                cell = MapCell.Brick;
            else if (toolbar.CurrentTool == Tool.Clear)
                cell = MapCell.Clear;

            OnPropertyChanged("CellBrush");
        }
    }
}
