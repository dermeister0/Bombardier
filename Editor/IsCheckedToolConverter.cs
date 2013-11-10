using Bombardier.Editor.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace Bombardier.Editor
{
    public class IsCheckedToolConverter : IValueConverter
    {
        public IsCheckedToolConverter()
        {
        }

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return String.Compare(value.ToString(), parameter.ToString(), StringComparison.OrdinalIgnoreCase) == 0;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return null;
        }
    }
}
