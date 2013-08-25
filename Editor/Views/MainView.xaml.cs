﻿using Bombardier.Editor.ViewModels;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Ribbon;
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
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainView : RibbonWindow
    {
        const string FileDialogFilter = "Bombardier maps|*.bin";

        public MainView()
        {
            InitializeComponent();

            DataContext = new MainViewModel();
        }

        private void FileSave_Click(object sender, RoutedEventArgs e)
        {
            var sfd = new SaveFileDialog();
            sfd.Filter = FileDialogFilter;

            if (sfd.ShowDialog() == true)
            {
                var viewModel = DataContext as MainViewModel;
                viewModel.FileSaveCommand.Execute(sfd.FileName);
            }
        }

        private void FileOpen_Click(object sender, RoutedEventArgs e)
        {
            var ofd = new OpenFileDialog();
            ofd.Filter = FileDialogFilter;

            if (ofd.ShowDialog() == true)
            {
                var viewModel = DataContext as MainViewModel;
                viewModel.FileOpenCommand.Execute(ofd.FileName);
            }
        }
    }
}
