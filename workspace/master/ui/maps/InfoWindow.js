/* global google */
sap.ui.define([
	"sap/ui/core/Control"
], function(Control) {
	"use strict";
	
	/**
	 * Popover-like window which can be displayed on a map.
	 */
	return Control.extend("msg.maps.InfoWindow", {
	    metadata: {
	        properties: {
	            title: {
	                type: "string"
	            }
	        },
	        aggregations: {
	            items: {
	                type: "sap.ui.core.Item",
	                multiple: true
	            }
	        },
	        defaultAggregation: "items"
	    },
	    
	    _infoWindow: null,
	    
	    init: function() {
	        this._infoWindow = new google.maps.InfoWindow({
                content: ""
            });
	    },
	    
	    openByMarker: function(oMarker) {
	        var sContent = "<strong>" + (this.getTitle() || "") + "</strong><br /><ul>",
	            aItems = this.getItems() || [];
	        for (var i = 0; i < aItems.length; ++i) {
	            sContent += "<li><strong>" + (aItems[i].getKey() || "") + ": </strong>";
	            sContent += (aItems[i].getText() || "") + "</li>";
	        }
	        sContent += "</ul>";
	        this._infoWindow.setContent(sContent);
	        this._infoWindow.open(oMarker.getParent()._map, oMarker._marker);
	    },
	    
	    renderer: function() {}
	    
	});
});