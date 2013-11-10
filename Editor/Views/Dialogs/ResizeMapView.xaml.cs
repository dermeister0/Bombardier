using Bombardier.Editor.Services;
using Bombardier.Editor.Support;
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
using System.Windows.Shapes;

namespace Bombardier.Editor.Views.Dialogs
{
    /// <summary>
    /// Interaction logic for ResizeMapView.xaml
    /// </summary>
    public partial class ResizeMapView : Window
    {
        public ResizeMapView()
        {
            InitializeComponent();

            ServiceLocator.GetEventAggregator().GetEvent<CloseWindowEvent>().Subscribe(OnClose);
        }

        void OnClose(ViewModelBase viewModel)
        {
            if (viewModel == DataContext)
                Close();
        }
    }
}
