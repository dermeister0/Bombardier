using Bombardier.Common;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Web.Hosting;

namespace Bombardier
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class MainService
    {
        [OperationContract]
        public Map GetMap()
        {
            var map = MapSerialization.LoadMap(HostingEnvironment.MapPath("~/Maps/00.bin"));

            return map;
        }
    }
}
