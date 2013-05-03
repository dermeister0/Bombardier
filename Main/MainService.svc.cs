using Bombardier.Common;
using System.ServiceModel;
using System.ServiceModel.Activation;

namespace Bombardier
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class MainService
    {
        [OperationContract]
        public Map GetMap()
        {
            var map = new Map(20, 20);
            map.Randomize();

            return map;
        }
    }
}
