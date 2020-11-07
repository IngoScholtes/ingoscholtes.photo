gdal_translate -of GTiff -A_ullr 12.73 68.47851 15.07589 67.78542 lofoten_map.png lofoten_map-with-gcps.tif
gdalwarp -of GTiff -t_srs EPSG:4326 -overwrite lofoten_map-with-gcps.tif lofoten_map-reprojected.tif
python C:\Users\ingos\Downloads\gdal2tiles-leaflet\gdal2tiles-multiprocess.py -p mercator -z 9-13 -w all lofoten_map-reprojected.tif lofoten_tiles