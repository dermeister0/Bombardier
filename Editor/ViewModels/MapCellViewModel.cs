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
                else if (cell == MapCell.Stone)
                    return new SolidColorBrush(Colors.DarkGray);

                return new SolidColorBrush(Colors.White);
            }
        }

        int x;

        int y;

        public MapCellViewModel(int x, int y)
        {
            this.x = x;
            this.y = y;

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
            else if (toolbar.CurrentTool == Tool.Stones00)
                cell = MapCell.Stone;

            OnPropertyChanged("CellBrush");

            if (toolbar.CurrentTool == Tool.Start)
            {
                var map = ServiceLocator.GetMap();
                map.SetSingleObjectPosition(MapObjectType.Start, x, y);
            }
            else if (toolbar.CurrentTool == Tool.TurretLeft)
            {
                var map = ServiceLocator.GetMap();
                var turret = map.AddObject(MapObjectType.Turret, x, y);
                turret.Properties["Direction"] = "left";
            }
            else if (toolbar.CurrentTool == Tool.TurretRight)
            {
                var map = ServiceLocator.GetMap();
                var turret = map.AddObject(MapObjectType.Turret, x, y);
                turret.Properties["Direction"] = "right";
            }
        }

        public MapCell GetCell()
        {
            return cell;
        }

        public void SetCell(MapCell cell)
        {
            this.cell = cell;
        }

        public int X { get { return x; } }

        public int Y { get { return y; } }
    }
}
