#!/usr/bin/python

__license__   = 'GPL v3'
__copyright__ = '2022, Grant Drake'

'''
Creates an XPI extension file (renamed zip) for Firefox.
All subfolders of the addons folder will be included, unless prefixed with '.'
i.e. .build and .tx will not be included in the zip.
'''

import os, sys, zipfile
from glob import glob

def addFolderToZip(myZipFile,folder,exclude=[]):
    excludelist=[]
    for ex in exclude:
        excludelist.extend(glob(folder+"/"+ex))
    for file in glob(folder+"/*"):
        if file in excludelist:
            continue
        if os.path.isfile(file):
            myZipFile.write(file, file)
        elif os.path.isdir(file):
            addFolderToZip(myZipFile,file,exclude=exclude)

def createZipFile(filename,mode,files,exclude=[]):
    myZipFile = zipfile.ZipFile( filename, mode, zipfile.ZIP_STORED ) # Open the zip file for writing
    excludelist=[]
    for ex in exclude:
        excludelist.extend(glob(ex))
    for file in files:
        if file in excludelist:
            continue
        if os.path.isfile(file):
            (filepath, filename) = os.path.split(file)
            myZipFile.write(file, filename)
        if os.path.isdir(file):
            addFolderToZip(myZipFile,file,exclude=exclude)
    myZipFile.close()
    return (1,filename)

def getSubfolders():
    cwd = os.getcwd()
    folders = []
    for subfolder in os.listdir(cwd):
        subfolderPath = os.path.join(cwd, subfolder)
        if os.path.isdir(subfolderPath):
            # Filter out our special development folders like .build
            if not subfolder.startswith('.'):
                folders.append(subfolder)
    return folders

if __name__=="__main__":
    
    zipFileName = sys.argv[1]

    files = getSubfolders()
    exclude = ['*.pyc','*~']
    files.extend(glob('*.*'))

    createZipFile(zipFileName, "w", files, exclude=exclude)