import csv
import json

csvfile = open('oracle.csv', 'r')
jsonfile = open('oracle.json', 'w')

fieldnames = ("date","open","high","low")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')

print jsonfile  