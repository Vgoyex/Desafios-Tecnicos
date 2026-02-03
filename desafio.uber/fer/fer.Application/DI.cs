using fer.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace fer.Application
{
    public static class DI
    {
        public static void AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<TransportLondonService>();
            services.AddScoped<GeolocationService>();
        }
    }
}
