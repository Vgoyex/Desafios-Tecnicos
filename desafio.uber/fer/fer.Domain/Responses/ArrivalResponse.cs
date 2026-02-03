using fer.Domain.Entities;
using System.Text.Json.Serialization;

namespace fer.Domain.Responses
{
    public class ArrivalResponse
    {
        [JsonPropertyName("$type")]
        public string type {get;set;}

        public string id { get; set; }
        public int operationType { get; set; }
        public string vehicleId { get; set; }
        public string naptanId { get; set; }
        public string stationName { get; set; }
        public string lineId { get; set; }
        public string lineName { get; set; }
        public string platformName { get; set; }
        public string direction { get; set; }
        public string bearing { get; set; }
        public string destinationNaptanId { get; set; }
        public string destinationName { get; set; }
        public string timestamp { get; set; }
        public int timeToStation { get; set; }
        public string currentLocation { get; set; }
        public string towards { get; set; }
        public string expectedArrival { get; set; }
        public string timeToLive { get; set; }
        public string modeName { get; set; }
        public TimingEntity timing { get;set;}
    }
}

