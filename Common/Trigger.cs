using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    [Serializable]
    public class Trigger
    {
        public int EventId { get; set; }

        public int TargetObjectId { get; set; }

        public int TargetActionId { get; set; }
    }
}
