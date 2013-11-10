using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Editor.Support
{
    [Serializable]
    public class GeneralException : Exception
    {
        public GeneralException()
            : base()
        {
        }

        public GeneralException(string message)
            : base(message)
        {
        }

        public GeneralException(String message, Exception innerException)
            : base(message, innerException)
        {
        }

        protected GeneralException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
