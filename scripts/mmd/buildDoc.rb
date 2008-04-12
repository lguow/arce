#!/usr/bin/env ruby
#
#  Created by  on $Date$

require "../libs.rb"
require "find"
require 'ftools'

Dir.chdir("doc")

files = Dir["*.text"]

unless FileTest.directory?("output")
  Dir.mkdir("output")
end

files.each do |f|
  fileName = f.to_s.split(".")[0..-2].join("")
  fileName.gsub!(/ /im, "\\ ")

  if platform
	if platform == 'win'
		output = system("perl ..\\MultiMarkdown\\bin\\multimarkdown2XHTML.pl #{fileName}.text > output\\#{fileName}.html")		
	else
		output = system("perl ../MultiMarkdown/bin/multimarkdown2XHTML.pl #{fileName}.text > output/#{fileName}.html")
	end

  else
    puts "sorry, don't kown which system you use"
  end

  
end
