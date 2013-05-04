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

        public MapViewModel(Bombardier.Common.Map map)
        {
            this.map = map;

            Rows = new ObservableCollection<MapRowViewModel>();

            for (int y = 0; y < map.Height; ++y)
                Rows.Add(new MapRowViewModel());
        }
    }
}
