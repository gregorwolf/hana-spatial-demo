/**
 * Calls the google geocoding API.
 * @param   {string}    sApiKey     The Google Maps API key.
 * @param   {string}    sAddress    The address which should be geocoded.
 * @returns {object|null}   The response body returned by the service.
 * Null if the request failed.
 */
function callGeocodingApi(sApiKey, sAddress) {
    try {
        var sUrl = "/geocode/json?address=" + encodeURIComponent(sAddress) + "&key=" + sApiKey,
            oDestination = $.net.http.readDestination("workspace.master.service", "googleApi"),
    		oClient = new $.net.http.Client(),
    		oRequest = new $.net.http.Request($.net.http.GET, sUrl),
    		oResponse = oClient.request(oRequest, oDestination).getResponse(),
    		oData = JSON.parse(oResponse.body.asString());
    	return oData;
    }
    catch (e) {
        $.trace.error(e);
        return null;
    }
}