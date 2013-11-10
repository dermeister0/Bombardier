using Bombardier.Editor.Services;
using Bombardier.Editor.Support;
using Microsoft.Practices.Prism.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Bombardier.Editor.ViewModels.Dialogs
{
    class ResizeMapViewModel : ViewModelBase
    {
        public ICommand OKCommand { get; private set; }

        MapViewModel oldMap;

        public ResizeMapViewModel(MapViewModel oldMap)
        {
            OKCommand = new DelegateCommand(OK_Executed);
            this.oldMap = oldMap;
        }

        void OK_Executed()
        {
            ServiceLocator.GetEventAggregator().GetEvent<CloseWindowEvent>().Publish(this);
        }
    }
}
