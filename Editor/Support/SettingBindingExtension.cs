using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Bombardier.Editor.Support
{
    /// <summary>
    /// <remarks>http://www.thomaslevesque.com/2008/11/18/wpf-binding-to-application-settings-using-a-markup-extension/</remarks>
    /// </summary>
    public class SettingBindingExtension : Binding
    {
        public SettingBindingExtension()
        {
            Initialize();
        }

        public SettingBindingExtension(string path)
            : base(path)
        {
            Initialize();
        }

        private void Initialize()
        {
            this.Source = Properties.Settings.Default;
            this.Mode = BindingMode.TwoWay;
        }
    }

}
