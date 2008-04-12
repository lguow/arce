#!/usr/bin/env ruby
#
#  Created by  nwind on 2007-12-28.

require 'scripts/libs'

module Arce
  module VERSION
    MAJOR = 1
    MINOR = 0
    TINY  = 0

    STRING = [MAJOR, MINOR, TINY].join('.')
  end
end

Name = File.basename(__FILE__)

def usage
"USAGE: #{Name} [-h] [-v]

COMMANDS:

"
end

if ARGV.size == 1
  if  ARGV[0] == '-h'
    puts usage
    exit
  elsif ARGV[0] == '-v'
    puts "#{Name} #{Arce::VERSION::STRING}"
    exit
  end
end


arce = IO.readlines("arce.css")

baseCss = arce.grep(/@import/).collect do |import|
  /@import [\"\']([^\"\']*)\.*/.match(import)[1]
end

base = ""
conf_high = "--template=high --compress_colors=true --timestamp=true --optimise_shorthands=2 --sort_properties=true"
conf_low = "--template=low --timestamp=true --sort_properties=true"


csstidy = "tools/csstidy/#{platform}/csstidy"

baseCss.each do |line|
  base += IO.readlines(line).join("")
  
  fileName =  line.split("/")[-1]
  # load User's Style
  if FileTest.exist?("base/User/#{fileName}")
    base += IO.readlines("base/User/#{fileName}").join("")
  end
end


baseCSS = File.open("base/output/base_debug.css", "w")
baseCSS.puts base
baseCSS.close


if platform 
  system("#{csstidy} base/output/base_debug.css #{conf_high} base/output/base.css")
  system("#{csstidy} base/output/base_debug.css #{conf_low} base/output/base_min.css")
else
  puts "sorry, your platform can't use csstidy"
end
