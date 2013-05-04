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
    /// Interaction logic for MapBody.xaml
    /// </summary>
    public partial class MapView : UserControl
    {
        public MapView()
        {
            InitializeComponent();
        }

        private void UserControl_DataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            var viewModel = e.NewValue as ViewModels.MapViewModel;

            MainPanel.Children.Clear();
            for (int y = 0; y < viewModel.Rows.Count; ++y)
            {
                var rowView = new MapRowView();
                rowView.DataContext = viewModel.Rows[y];

                MainPanel.Children.Add(rowView);
            }
        }
    }
}
