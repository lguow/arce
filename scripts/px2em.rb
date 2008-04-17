#!/usr/bin/env ruby
#
#  Created by  nwind on 2008-1-4.


Name = File.basename(__FILE__)

def usage
"USAGE: #{Name} file_path

"
end

def px2em(file)
  unless FileTest.exists?(file)
    puts '#{ARGV[0]} doen\'t exist'
    exit 
  end
  
  styles = IO.read(file).gsub(/\s*-?\d*px/) do |px|
     sprintf(" %.1fem", px[0..-3].to_f / 10) 
  end
  
  outPutFile = File.open(file, 'r+')
  outPutFile.puts styles
  outPutFile.close 
end

if ARGV.size == 1
  px2em(ARGV[0])
else
  puts usage
end
