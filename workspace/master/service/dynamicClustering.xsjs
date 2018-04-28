/**
 * Performs the clustering based on the cluster count.
 * @param   {integer}   iCount  The number of clusters.
 * @returns {object} The result from the query.
 */
function doClustering(iCount) {
    var oConn = $.hdb.getConnection(),
        oResult = oConn.executeQuery('SELECT ST_ClusterID() AS "id", SUM("insuredSum") AS "totalSum",' 
        + ' COUNT("insuredSum") AS "objectCount", ST_ClusterCentroid().ST_Y() AS "centerLatitude",'
        + ' ST_ClusterCentroid().ST_X() AS "centerLongitude"'
        + ' FROM ('
        + '     SELECT "insuredSum", "objectLocation".ST_Transform(1000004326) AS "objectLocation" '
        + '         FROM "WORKSPACE_MASTER_SPATIAL"."workspace.master.data::ctxSpatial.eInsurance" '
        + '         WHERE "objectLocation" IS NOT NULL'
        + '  )'
        + ' GROUP CLUSTER BY "objectLocation"'
        + ' USING KMEANS CLUSTERS ?;', iCount);
    oConn.commit();
    oConn.close();
    return oResult;
}

if($.request.method === $.net.http.GET) {
   try {
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(doClustering(parseInt($.request.parameters.get("clusters"), 10) || 5)));
   }
   catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.getMessage ? e.getMessage() : e.toString());
   }
} else {
   // unsupported method
   $.response.status = $.net.http.METHOD_NOT_ALLOWED;
}
