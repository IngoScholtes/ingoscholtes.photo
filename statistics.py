#%%
import json
from io import StringIO
import pandas as pd

hikes = pd.read_json('outdoors/hike_db.json')
canoe = pd.read_json('outdoors/canoe_db.json')

#%%
dist = 653 + 855 + 35 + 140 + 123 + 33 + 123 + 20 + 37
alt = 6500 + 10988 + 1036 + 4585 + 3608 + 1017 + 4338 + 1468 + 1223
time_h = 46 + 8 + 34 + 29 + 9 + 32 + 6 + 10
time_m = 7 + 38 + 43 + 32 + 39 + 31 + 3 + 5
num = 9

dist += hikes.loc['distance'].sum()
alt += hikes.loc['ascend'].sum()
time_h += hikes.loc['time_h'].sum()
time_m += hikes.loc['time_m'].sum()
num += len(hikes.columns)

dist += canoe.loc['distance'].sum()
num += len(canoe.columns)
time_h += canoe.loc['time_h'].sum()
time_m += canoe.loc['time_m'].sum()

time_h += time_m//60
time_m = time_m%60

print(num, ' tours')
print(time_h, ' hours')
print(time_m, ' minutes')
print(dist, ' km')
print(alt, ' m')


#%%

def country_stats(country):
    print(' '.join(country))
    num = 0
    dist = 0
    ascend = 0
    time_h = 0
    time_m = 0

    for x in hikes.keys():    
        if hikes[x]['country'] in country:
            num += 1
            dist += hikes[x]['distance']
            ascend += hikes[x]['ascend']
            time_h += hikes[x]['time_h']
            time_m += hikes[x]['time_m']
    print(num, ' tours')
    print(dist, ' km')
    print(ascend, ' m')

    time_h += time_m//60
    time_m = time_m%60

    print(time_h, ' hours')
    print(time_m, ' minutes')
    print('----')

def canoe_stats():
    print('Canoe')
    num = 0
    dist = 0
    ascend = 0
    time_h = 0
    time_m = 0

    for x in canoe.keys():    
        num += 1
        dist += canoe[x]['distance']
        time_h += canoe[x]['time_h']
        time_m += canoe[x]['time_m']
    print(num, ' tours')
    print(dist, ' km')

    time_h += time_m//60
    time_m = time_m%60

    print(time_h, ' hours')
    print(time_m, ' minutes')
    print('----')

def region_stats(region):
    print(' '.join(region))
    num = 0
    dist = 0
    ascend = 0
    time_h = 0
    time_m = 0

    for x in hikes.keys():    
        if hikes[x]['region'] in region:
            num += 1
            dist += hikes[x]['distance']
            ascend += hikes[x]['ascend']
            time_h += hikes[x]['time_h']
            time_m += hikes[x]['time_m']
    print(num, ' tours')
    print(dist, ' km')
    print(ascend, ' m')

    time_h += time_m//60
    time_m = time_m%60

    print(time_h, ' hours')
    print(time_m, ' minutes')
    print('----')

region_stats(['Hunsrück', 'Hunsr&uuml;ck', 'Eifel', 'Pfalz'])

region_stats(['Black Forest'])

region_stats(['Madeira'])

country_stats(['Switzerland'])

country_stats(['Sweden', 'Norway', 'Denmark'])

country_stats(['USA', 'Canada'])

country_stats(['France', 'Italy', 'Spain'])

canoe_stats()
    
# hunsrueck = hikes.unstack()
# print(hunsrueck[hunsrueck['region']=='Hunsrück'])
# print('Hunsrueck', hunsrueck.loc['distance'].sum())
# %%
