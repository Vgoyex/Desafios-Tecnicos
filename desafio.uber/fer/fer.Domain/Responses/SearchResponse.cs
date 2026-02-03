using fer.Domain.Entities;

namespace fer.Domain.Responses
{
    public class SearchResponse
    {
        public string query { get; set; }
        public int total { get; set; }
        public List<SearchMatchesEntity> matches { get; set; }
    }
}
