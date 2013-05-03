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

namespace Bombardier.Editor
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            DataContext = new ViewModels.MainViewModel();

            MapBody body = new MapBody();

            for (int y = 0; y < 30; y++)
            {
                MapRow row = new MapRow();
                for (int x = 0; x < 30; x++)
                    row.MainPanel.Children.Add(new MapCell());

                body.MainPanel.Children.Add(row);
            }

            MainScrollViewer.Content = body;
        }
    }
}
