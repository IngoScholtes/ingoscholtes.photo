#%%
import json
import pandas as pd

with open('outdoors/hike_db.json', 'r') as f:
    hikes = pd.read_json(f.read())
with open('outdoors/canoe_db.json', 'r') as f:
    canoe = pd.read_json(f.read())

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
