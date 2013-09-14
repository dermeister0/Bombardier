using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.ViewModels
{
    class SelectionViewModel : ViewModelBase
    {
        int x;

        public int X
        {
            get { return x; }
            set
            {
                x = value;
                OnPropertyChanged("X");
            }
        }

        int y;

        public int Y
        {
            get { return y; }
            set
            {
                y = value;
                OnPropertyChanged("Y");
            }
        }

        public int Width { get; set; }

        public int Height { get; set; }

        public SelectionViewModel()
        {
            Clear();
        }

        public void Clear()
        {
            X = -100;
            Y = -100;
        }
    }
}
