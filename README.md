## HANA Spatial Demo Apps
A small suite of demo applications for HANA Spatial functions.

## Overview
The demo uses a list of auto-generated random real addresses located in the U.K. These are then geocoded using the 
[Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro) through a XS Job. The coordinates
are used afterwards for several simple scenarios:
 - Simple visualization. 
 - Acquiring new data.
 - Clustering (on the UI, in the back end with a fixed number of clusters and with a dynamic number of clusters).
 - Aggregation (based on radius and on drawn polygon).
All the UIs are stand-alone HTML files.

## Getting it running
First clone the project and replace all occurrences of the string `<<API KEY HERE>>` with a real Google Geocoding API key. 
The string is located in all the HTML files and in the `service/library.xsjslib` file.

Simply import all the files into a HANA Trial MDC and activate all files in the following order:
 - `.xsapp` and `.xsaccess`.
 - `data/WORKSPACE_MASTER_SPATIAL.hdbschema` + also grant yourself privileges on it.
 - `data/ctxSpatial.hdbdd`.
 - `data/eHouses.csv`.
 - `data/import.hdbti`.
 - the whole `model` package.
 - the whole `service` package (the `service/jos.xsjob` file last).
 - the whole `ui` package.

The `googleApi.xshttpdest` must be configured using the XS Admin 
([a new trust store must be created](https://help.sap.com/viewer/6b94445c94ae495c83a19646e7c3fd56/2.0.00/en-US/dbe18cbe48004d5f90a6c6c35680adb0.html) 
and then assigned to the destination). [Lastly, the job may be activated](https://help.sap.com/viewer/6b94445c94ae495c83a19646e7c3fd56/2.0.00/en-US/445b9667c4aa4a7b9a17b9b45eacb435.html).

Finally, the UIs can be opened and interacted with.

## Screenshots
Screenshots of the running UIs can be found in the `screenshots` folder of this repository.