import csv
import json

csvfile = open('list.csv', 'r')
jsonfile = open('list.json', 'w')

fieldnames = ("Country","Liters_per_head")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile    