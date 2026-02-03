using System.Net.Http.Json;
using fer.Domain.Responses;

namespace fer.Application.Services
{
    public class TransportLondonService
    {
        //https://api.tfl.gov.uk/StopPoint/{id}/ArrivalDepartures?lineIds={lineIds}
        //you can use /StopPoint/Search/{query}
        //https://api.tfl.gov.uk/StopPoint/{id}/ArrivalDepartures?lineIds={lineIds}
        //https://api.tfl.gov.uk/trackernet/LineStatus
        //https://api.tfl.gov.uk/StopPoint/{id}/Arrivals
        //https://api.tfl.gov.uk/trackernet/PredictionDetailed/{line}/{station}

        //var getStopPointsModes = await http.GetFromJsonAsync<dynamic>("https://api.tfl.gov.uk/StopPoint/Meta/Modes");
        //var getStopPointsTypes = await http.GetFromJsonAsync<dynamic>("https://api.tfl.gov.uk/StopPoint/Meta/StopTypes");

        public async Task<dynamic> GetDepartureTime(string id, string lineIds)
        {
            var http = new HttpClient();
            string urlDepartureTimes = $"https://api.tfl.gov.uk/StopPoint/{id}/ArrivalDepartures?lineIds={lineIds}";
            try
            {
                var result = await http.GetFromJsonAsync<List<DepartureTimeResponse>>(urlDepartureTimes);
                return result;
            }
            catch(Exception e)
            {
                return null;
            }

        }

        public async Task<dynamic> GetArrival(string id)
        {
            var http = new HttpClient();
            string urlArrival = $"https://api.tfl.gov.uk/StopPoint/{id}/Arrivals";
            try
            {
                var result = await http.GetFromJsonAsync<List<ArrivalResponse>>(urlArrival);
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<dynamic> SearchStopPoints(string query)
        {
            var http = new HttpClient();
            string searchUrl = "https://api.tfl.gov.uk/StopPoint/Search?query=" + query;
            try
            {
                var result = await http.GetFromJsonAsync<SearchResponse>(searchUrl);
                return result;
            }
            catch (Exception e) { 
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
