using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels
{
    class MapViewModel
    {
        Bombardier.Common.Map map;

        public ObservableCollection<MapRowViewModel> Rows { get; private set; }

        public List<SingleObjectViewModel> SingleObjects { get; private set; }

        public MapViewModel(Bombardier.Common.Map map)
        {
            this.map = map;

            Rows = new ObservableCollection<MapRowViewModel>();

            for (int y = 0; y < map.Height; ++y)
            {
                var rowVM = new MapRowViewModel();

                for (int x = 0; x < map.Width; ++x)
                {
                    var cell = new MapCellViewModel();
                    cell.SetCell(map.Cells[y][x]);
                    rowVM.Cells.Add(cell);
                }

                Rows.Add(rowVM);
            }

            SingleObjects = new List<SingleObjectViewModel>();

            foreach (var o in map.Objects)
            {
                if (o.ObjectType == Common.MapObjectType.Start)
                    SingleObjects.Add(new SingleObjectViewModel(o));
            }
        }

        public Bombardier.Common.Map GetMap()
        {
            int y = 0;
            foreach (var row in Rows)
            {
                int x = 0;
                foreach (var cell in row.Cells)
                {
                    map.Cells[y][x] = cell.GetCell();
                    ++x;
                }
                ++y;
            }

            return map;
        }
    }
}
