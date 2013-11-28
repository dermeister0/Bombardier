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

        public ICommand CellPressCommand { get; set; }

        public ICommand CellReleaseCommand { get; set; }

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

            CellPressCommand = new DelegateCommand(CellPress_Executed);
            CellReleaseCommand = new DelegateCommand(CellRelease_Executed);
        }

        void CellPress_Executed()
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

        void CellRelease_Executed()
        {
            var toolbar = ServiceLocator.GetToolbar();
            var map = ServiceLocator.GetMap();
            MapObject mapObject;

            switch (toolbar.CurrentTool)
            {
                case Tool.Start:
                    map.SetSingleObjectPosition(MapObjectType.Start, x, y);
                    break;
                case Tool.TurretLeft:
                    mapObject = map.AddObject(MapObjectType.Turret, x, y);
                    mapObject.Properties["Direction"] = "left";
                    break;
                case Tool.TurretRight:
                    mapObject = map.AddObject(MapObjectType.Turret, x, y);
                    mapObject.Properties["Direction"] = "right";
                    break;
                case Tool.Door:
                    mapObject = map.AddObject(MapObjectType.Door, x, y);
                    break;
                case Tool.Button:
                    mapObject = map.AddObject(MapObjectType.Button, x, y);
                    break;
            }
        }
    }
}
