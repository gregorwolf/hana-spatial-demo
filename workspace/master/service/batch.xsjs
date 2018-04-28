/*
 * Batch service. Performs geocoding on a segment of the data.
 */
var oGeocodeLib = $.import("library.xsjslib");
    
oGeocodeLib.geocodeBatch();
    
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;