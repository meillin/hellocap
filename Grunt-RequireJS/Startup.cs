using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Grunt_RequireJS.Startup))]
namespace Grunt_RequireJS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
