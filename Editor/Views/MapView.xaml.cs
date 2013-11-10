using Bombardier.Editor.Services;
using Bombardier.Editor.Support;
using Bombardier.Editor.ViewModels;
using Bombardier.Editor.Views.Rulers;
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
            viewModel.ObjectAdded += viewModel_ObjectAdded;

            MainPanel.Children.Clear();

            var rulerTop = new RulerTopRowView();
            for (int x = 0; x < viewModel.GetMap().Width; x++)
            {
                var rulerCell = new RulerTopView();
                rulerCell.DataContext = x;
                rulerTop.MainPanel.Children.Add(rulerCell);
            }
            MainPanel.Children.Add(rulerTop);

            for (int y = 0; y < viewModel.Rows.Count; ++y)
            {
                var rowView = new MapRowView();
                rowView.DataContext = viewModel.Rows[y];

                MainPanel.Children.Add(rowView);
            }

            ObjectsCanvas.Children.Clear();
            foreach (var oVM in viewModel.Objects)
            {
                ObjectsCanvas.Children.Add(oVM.CreateView());
            }

            var selectionView = new SelectionView();
            selectionView.DataContext = viewModel.Selection;
            ObjectsCanvas.Children.Add(selectionView);
        }

        void viewModel_ObjectAdded(ViewModels.ObjectViewModel objectVM)
        {
            var view = objectVM.CreateView();
            ObjectsCanvas.Children.Add(view);
        }

        private void MainGrid_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            var viewModel = DataContext as MapViewModel;

            Cursor = Cursors.Arrow;
            viewModel.MoveMode = false;
        }

        private void MainGrid_MouseMove(object sender, MouseEventArgs e)
        {
            var viewModel = DataContext as MapViewModel;
            var toolbar = ServiceLocator.GetToolbar();

            if (e.LeftButton == MouseButtonState.Pressed && viewModel.SelectedObject != null && toolbar.CurrentTool == Tool.Select)
            {
                if (!viewModel.MoveMode)
                {
                    viewModel.MoveMode = true;
                    Cursor = Cursors.SizeAll;
                }

                var mousePoint = e.GetPosition(ObjectsCanvas);
                viewModel.SelectedObject.UpdatePosition(UnitConverter.MouseXToMap((int)mousePoint.X),
                    UnitConverter.MouseYToMap((int)mousePoint.Y));

                viewModel.UpdateSelection(viewModel.SelectedObject);
            }
        }

        private void MainGrid_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var toolbar = ServiceLocator.GetToolbar();

            if (toolbar.CurrentTool == Tool.Select)
            {
                var map = ServiceLocator.GetMap();
                map.SelectObject((int)e.GetPosition(ObjectsCanvas).X, (int)e.GetPosition(ObjectsCanvas).Y);
            }
        }
    }
}
