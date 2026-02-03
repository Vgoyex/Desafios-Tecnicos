using System.Text.Json.Serialization;

namespace fer.Domain.Entities
{
    public class TimingEntity
    {
        [JsonPropertyName("$type")]
        public string type { get; set; }
        public string countdownServerAdjustment { get; set; }
        public string source { get; set; }
        public string insert { get; set; }
        public string read { get; set; }
        public string sent { get; set; }
        public string received { get; set; }
    }
}
