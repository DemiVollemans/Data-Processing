import csv
import json

csvfile = open('lifedata.csv', 'r')
jsonfile = open('lifedata.json', 'w')

fieldnames = ("country","indicator")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  