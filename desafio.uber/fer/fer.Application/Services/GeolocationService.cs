using System.Net.Http.Json;
using fer.Domain.Entities;


namespace fer.Application.Services
{
    public class GeolocationService
    {
        public async Task<object> GetGeolocation()
        {
            var ip = "81.2.69.142"; //HttpContext.Connection.RemoteIpAddress?.ToString();
            var http = new HttpClient();
            string url = $"https://ipinfo.io/{ip}/json";
            var geolocation = await http.GetFromJsonAsync<dynamic>(url);
            return geolocation;
        }
    }
}
