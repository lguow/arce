#!/usr/bin/ruby

Name = File.basename(__FILE__)

head = <<EOF
<?xml version="1.0" standalone="no"?>
<?xml-stylesheet href="line.css" type="text/css"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="1600px" height="1600px" version="1.1"
xmlns="http://www.w3.org/2000/svg">
EOF


body = ""

if ARGV.size == 1
  if ARGV[0].to_i == 0 then
    puts "USAGE: #{Name} spacing"
    exit
  end
  spacing = ARGV[0].to_i
else
  spacing = 12
end

i = 0

while i < 1600
  i += spacing  
  body += "<line x1=\"0\" y1=\"#{i}\" x2=\"1600\" y2=\"#{i}\" />"
  body += "<line x1=\"#{i}\" y1=\"0\" x2=\"#{i}\" y2=\"1600\" />"
end


foot = "</svg>"


outPutFile = File.open('grid.svg', 'w')
outPutFile.puts head + body + foot
outPutFile.close

system("convert grid.svg grid.png")