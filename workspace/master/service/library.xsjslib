/** API KEY */
var API_KEY = "<<API KEY HERE>>";
/** Segment size for batch processing */
var BATCH_SIZE = 10;

var oGoogleLib = $.import("./googleApi.xsjslib");

/**
 * Geocodes an address using the google API library.
 * @param   {string}    sAddress    The address to be geocoded.
 * @returns {object}    The coordinates in the form {lat: number, lng: number}.
 * 
 */
function geocodeAddress(sAddress) {
    try {
        var oData = oGoogleLib.callGeocodingApi(API_KEY, sAddress);
    	if (oData && oData.results && oData.results.length && oData.results[0].geometry) {
    	    return oData.results[0].geometry.location;
    	}
    	else {
    	    return null;
    	}
    }
    catch (e) {
        $.trace.error(e);
        return null;
    }
}

/**
 * Geocodes a segment of the data. Takes only the first BATCH_SIZE not-geocoded points.
 * Updates the objectGeocoded column.
 * @returns {void}
 */
function geocodeBatch() {
    var oConn = $.hdb.getConnection(),
        aEntries = oConn.executeQuery('SELECT "policyNumber", "objectAddress"'
            + ' FROM "WORKSPACE_MASTER_SPATIAL"."workspace.master.data::ctxSpatial.eInsurance"'
            + ' WHERE "objectGeocoded" = 0 LIMIT ' + BATCH_SIZE);
        
    for (var i = 0; i < aEntries.length; ++i) {
        var oLatLng = geocodeAddress(aEntries[i].objectAddress);
        if (oLatLng) {
            oConn.executeUpdate('UPDATE "WORKSPACE_MASTER_SPATIAL"."workspace.master.data::ctxSpatial.eInsurance"'
                + ' SET "objectLocation" = NEW ST_POINT(TO_DECIMAL(?, 9, 6), TO_DECIMAL(?, 9, 6)),' 
                + ' "objectGeocoded" = 1 WHERE "policyNumber" = ?', oLatLng.lng, oLatLng.lat, aEntries[i].policyNumber);
        }
        else {
            oConn.executeUpdate('UPDATE "WORKSPACE_MASTER_SPATIAL"."workspace.master.data::ctxSpatial.eInsurance"'
                + 'SET "objectGeocoded" = 1 WHERE "policyNumber" = ?', aEntries[i].policyNumber);
        }
    }
    
    oConn.commit();
    oConn.close();
}