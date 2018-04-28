/**
 * Helper method which can be used inside an XSJOB.
 * @returns {void}
 */
function batch() {
    var oGeocodeLib = $.import("./library.xsjslib");
    oGeocodeLib.geocodeBatch();
}