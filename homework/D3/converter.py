import csv
import json

csvfile = open('Microsoft.csv', 'r')
jsonfile = open('Microsoft.json', 'w')

fieldnames = ("date","open","high","low")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  