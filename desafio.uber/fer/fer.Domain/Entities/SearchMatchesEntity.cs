namespace fer.Domain.Entities
{
    public class SearchMatchesEntity
    {
        public string id { get; set; }
        public string name { get; set; }
        public double lat { get; set; }
        public double lon { get; set; }
        public List<string> modes { get; set; }
        public string zone { get; set; }
    }
}
