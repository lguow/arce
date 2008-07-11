#!/usr/bin/python
import os
import sys
import re
import glob
import signal
import codecs

os.chdir('..')


print 'building cache...'
doc_files = glob.glob("*/*.text")
doc_cache = {}


for file_path in doc_files:
    doc_cache[file_path] = []
    for line in codecs.open(file_path, 'r', 'utf-8'):
        doc_cache[file_path].append(line)
        

def wait_input():

    input = raw_input('>>> ')

    if re.search('win', sys.platform):
	input = unicode(input, 'GBK')
    
    go_search(input)

def go_search(input):

    for file_path in doc_cache:
        for line in doc_cache[file_path]:
	    if re.search(input, line):
	        print line

    wait_input()


wait_input()



#print filenames