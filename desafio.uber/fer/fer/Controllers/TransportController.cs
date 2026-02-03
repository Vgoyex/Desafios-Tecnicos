using fer.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace fer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransportController : ControllerBase
    {

        private readonly TransportLondonService _transportLondonService;
        private readonly GeolocationService _geolocationService;

        public TransportController(
            TransportLondonService transportLondonService,
            GeolocationService geolocationService
            )
        {
            _geolocationService = geolocationService;
            _transportLondonService = transportLondonService;
        }

        [HttpGet("searchStopPoints/{query}")]
        public async Task<IActionResult> GetStopPoints(string query)
        {
            if (!string.IsNullOrWhiteSpace(query) || query.Length > 100)
            {
                var getGeolocation = await _geolocationService.GetGeolocation();
                if (getGeolocation is not null)
                {
                    var search = await _transportLondonService.SearchStopPoints(query);
                    return Ok(search);
                }
            }
            return BadRequest("Invalid Query");
        }

        [HttpGet("getArrival/{id}")]
        public async Task<IActionResult> GetArrival(string id)
        {
            var getDepartureTimes = await _transportLondonService.GetArrival(id);
            if(getDepartureTimes is not null)
            {
                return Ok(getDepartureTimes);
            }
            return BadRequest("");
        }

        [HttpGet("getDepartureTime/{id}/{lineIds}")]
        public async Task<IActionResult> GetDepartureTime(string id, string lineIds)
        {
            var getDepartureTimes = await _transportLondonService.GetDepartureTime(id, lineIds);
            if (getDepartureTimes is not null)
            {
                return Ok(getDepartureTimes);
            }
            return BadRequest("");
        }
    }
}
