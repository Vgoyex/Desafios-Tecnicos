using System.Text.Json.Serialization;

namespace fer.Domain.Responses
{
    public class DepartureTimeResponse
    {
        [JsonPropertyName("$type")]
        public string type { get; set; }
        public string platformName { get; set; }
        public string destinationNaptanId { get; set; }
        public string destinationName { get; set; }
        public string naptanId { get; set; }
        public string stationName { get; set; }
        public string estimatedTimeOfArrival { get; set; }
        public string scheduledTimeOfArrival { get; set; }
        public string estimatedTimeOfDeparture { get; set; }
        public string scheduledTimeOfDeparture { get; set; }
        public string minutesAndSecondsToArrival { get; set; }
        public string minutesAndSecondsToDeparture { get; set; }
        public string departureStatus { get; set; }
    }
}
