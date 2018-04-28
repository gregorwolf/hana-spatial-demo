var oGeocodeLib = $.import("./library.xsjslib");

/**
 * Prepares the entry for being inserted into the database by calling the geocoding.
 * @param   {object}    oEntry  The data (has the same attributes as the table).
 * @returns {void}
 */
function prepare(oEntry) {
    var oLatLng = oGeocodeLib.geocodeAddress(oEntry.objectAddress);
    if (oLatLng) {
        oEntry.objectLocation.longitude = oLatLng.lng;
        oEntry.objectLocation.latitude = oLatLng.lat;
    }
}

/**
 * Creates a new database entry.
 * @param   {object}    oEntry  The data (has the same attributes as the table).
 * @returns {void}
 */
function createEntry(oEntry) {
    var oConn = $.hdb.getConnection();
    oConn.executeUpdate('INSERT INTO "WORKSPACE_MASTER_SPATIAL"."workspace.master.data::ctxSpatial.eInsurance"'
        + ' ("policyNumber", "personName", "objectAddress", "insuredSum", "objectLocation", "objectGeocoded")'
        + ' VALUES (?, ?, ?, ?, new ST_POINT(TO_DECIMAL(?, 9, 6), TO_DECIMAL(?, 9, 6)), ?)', oEntry.policyNumber, 
        oEntry.personName, oEntry.objectAddress, oEntry.insuredSum, oEntry.objectLocation.longitude, 
        oEntry.objectLocation.latitude, 1);
    oConn.commit();
    oConn.close();
}

if($.request.method === $.net.http.POST) {
   try {
        createEntry(JSON.parse($.request.body.asString()));
        $.response.status = $.net.http.NO_CONTENT;
   }
   catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.getMessage ? e.getMessage() : e.toString());
   }
} else {
   // unsupported method
   $.response.status = $.net.http.METHOD_NOT_ALLOWED;
}
