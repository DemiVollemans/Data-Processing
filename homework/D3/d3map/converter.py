import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data2.json', 'w')

fieldnames = ("country","GDP")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  