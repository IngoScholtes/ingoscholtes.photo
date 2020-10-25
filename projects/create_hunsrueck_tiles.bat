gdal_translate -of GTiff -A_ullr 6.64599 49.69283 6.87186 49.59622 hunsrueck_map.png hunsrueck_map-with-gcps.tif
gdalwarp -of GTiff -t_srs EPSG:4326 -overwrite hunsrueck_map-with-gcps.tif hunsrueck_map-reprojected.tif
python C:\Users\ingos\Downloads\gdal2tiles-leaflet\gdal2tiles-multiprocess.py -p mercator -z 13-16 -w all hunsrueck_map-reprojected.tif hunsrueck_tiles