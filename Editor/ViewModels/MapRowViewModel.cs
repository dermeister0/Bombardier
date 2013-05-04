using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

namespace Bombardier.Editor.ViewModels
{
    class MapRowViewModel
    {
        public ObservableCollection<MapCellViewModel> Cells { get; private set; }

        public MapRowViewModel()
        {
            Cells = new ObservableCollection<MapCellViewModel>();

            for (int i = 0; i < 3; i++)
                Cells.Add(new MapCellViewModel());
        }
    }
}
