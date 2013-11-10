using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Models
{
    class RecentMapsCollection : IEnumerable<string>, INotifyCollectionChanged
    {
        List<string> recentMaps = new List<string>();

        public void Add(string fileName)
        {
            recentMaps.Remove(fileName);
            recentMaps.Insert(0, fileName);

            while (recentMaps.Count > 10)
                recentMaps.RemoveAt(0);

            if (CollectionChanged != null)
                CollectionChanged(this, new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Reset));
        }

        public IEnumerator<string> GetEnumerator()
        {
            return recentMaps.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return recentMaps.GetEnumerator();
        }

        public event NotifyCollectionChangedEventHandler CollectionChanged;
    }
}
