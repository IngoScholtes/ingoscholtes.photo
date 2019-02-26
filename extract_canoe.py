from bs4 import BeautifulSoup
import json
from collections import OrderedDict

filenames = [ 
    '2015/greifensee',
    '2018/zuerichsee',
]

results = OrderedDict()

for file in filenames:
    with open('./outdoors/' + file + '/index.htm', 'r') as f:
        results[file] = OrderedDict()
        html = f.read()
        parsed_html = BeautifulSoup(html, 'lxml')        

        results[file]['title'] = parsed_html.find_all('h3')[1].text.split(',')[0].strip()
        results[file]['region'] = ''
        results[file]['country'] = ''
        results[file]['year'] = file.split('/')[0].strip()
        results[file]['month'] = parsed_html.find_all('h5')[0].text.split(' ')[0].strip()
        results[file]['category'] = 'Canoe Tour'

        travel_report = parsed_html.body.find('article', attrs={'class':'travelreport'})
        lis = travel_report.find_all('li')
        results[file]['distance'] = float(lis[3].text.replace('km', '').strip())
        results[file]['launch'] = lis[1].text.strip()
        results[file]['time_h'] = int(lis[5].text.split(' ')[0].replace('h', '').strip())
        results[file]['time_m'] = int(lis[5].text.split(' ')[1].replace('m', '').strip())

        images = OrderedDict()
        kml = ''
        lat = ''
        lon = ''
        zoom = ''
        for s in parsed_html.body.find_all('script'):
            for line in s.text.splitlines():
                print(line.strip())
                if '.jpg' in line:
                    jpg_file = line.split("'")[1]
                    desc = line.split("'")[3]
                    images[jpg_file] = desc
                elif '.kml' in line:
                    lat = float(line.split(',')[0].split('(')[1])
                    lon = float(line.split(',')[1])
                    kml = line.split(',')[3].replace("'", "").strip()
                    zoom = int(line.split(',')[2])

        results[file]['track'] = kml
        results[file]['map_latitude'] = lat
        results[file]['map_longitude'] = lon
        results[file]['map_zoom'] = zoom
        results[file]['text'] = parsed_html.find_all('p')[1].text.strip()
        results[file]['coverimage'] = 'NA'        
        results[file]['images'] = images

                        

with open('results.json', 'w') as f:
    json.dump(results, f, indent=4)

        