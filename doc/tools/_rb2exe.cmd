cd .. 
start exerb buildDoc.rb
dir
mkexy buildDoc.rb
exerb buildDoc.exy
del buildDoc.exy
cd tools
exerb grep.rb
mkexy grep.rb
exerb grep.exy
del grep.exy