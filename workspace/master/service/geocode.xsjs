/*
 *Geocoding service. Gets a parameter with the address and returns the coordinates. 
 */
var oGeocodeLib = $.import("./library.xsjslib"),
    sAddress = $.request.parameters.get("address"),
    oLatLng = oGeocodeLib.geocodeAddress(sAddress);
    
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(oLatLng));
$.response.status = $.net.http.OK;