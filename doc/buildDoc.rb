#!/usr/bin/env ruby
#
#  Created by  nwind on 2008-07-08.
require 'find'
require 'erb'


module Find           
  def match(*paths) 
          matched = [] 
          find(*paths) { |path| matched << path if yield path } 
          return matched 
  end 
  module_function :match 
end
      
def platform
   case RUBY_PLATFORM
     when /ix/i, /ux/i, /gnu/i, /sysv/i, /solaris/i, /sounos/i, /bsd/i
       "linux"
     when /darwin/i
       "mac"
     when /win/i, /ming/i
       "win"
   else
     false
   end
end


def processFile(p) 
  title = ''
  
  headFile = File.open($header_path, 'w')
  headFile.puts $header
  headFile.close
  
  outputFile = p[0..-5] + 'html'
  system("#{$pandoc} -B #{$header_path} -A #{$footer_path} --toc #{p} > #{outputFile}")  
end

$rootDir = File.expand_path(File.dirname(__FILE__))

inlineCSS = IO.read("#{$rootDir}/lib/style/comb.css")

title = ''

$header = <<END
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
	<title>#{title}</title>
	<style type="text/css">
	#{inlineCSS}	
	</style>
</head>
<body>
END


$header_path = $rootDir + '/lib/header'

$footer_path = $rootDir + '/lib/footer'

$pandoc = 'pandoc'

if platform == 'win'
  $pandoc = $rootDir + '/tools/win32/pandoc'
end

if ARGV.size == 1
  processFile(File.expand_path(ARGV[0]))
else
  Find.match("./") { |p| 
    ext = p[-5...p.size]
    if ext && ext.downcase == ".text" 
      processFile(p)
    end
  }  
end





