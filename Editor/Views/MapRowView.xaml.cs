using Bombardier.Editor.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Bombardier.Editor.Views
{
    /// <summary>
    /// Interaction logic for MapRow.xaml
    /// </summary>
    public partial class MapRowView : UserControl
    {
        public MapRowView()
        {
            InitializeComponent();
        }

        private void UserControl_DataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            var viewModel = e.NewValue as MapRowViewModel;

            MainPanel.Children.Clear();
            for (int x = 0; x < viewModel.Cells.Count; ++x)
            {
                var cellView = new MapCellView();
                cellView.DataContext = viewModel.Cells[x];

                MainPanel.Children.Add(cellView);
            }
        }
    }
}
