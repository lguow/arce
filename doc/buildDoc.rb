#!/usr/bin/env ruby
#
#  Created by  nwind on 2008-07-08.

require 'cgi'

class File
  def self.find(dir, filename="*.*", subdirs=true)
    Dir[ subdirs ? File.join(dir.split(/\\/), "**", filename) : File.join(dir.split(/\\/), filename) ]
  end
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

def is_newer(source, target)
    if FileTest.exist?(target)
      return File.stat(source).mtime > File.stat(target).mtime
    else
      return true
    end
end

def processFile(file)
  title = author = date = key = value = ''
  lineNum = 0
  
  
  outputDir = File.dirname(file) + '/_output'
  outputFileName = File.basename(file)[0..-6]
  
  unless FileTest.directory?(outputDir)
    Dir.mkdir(outputDir)
  end
  
  outputFile = "#{outputDir}/#{outputFileName}.html"
  
  if is_newer(file, outputFile)
    
    File.open(file).collect do  |line|

      line.chomp!
      lineNum = lineNum + 1
    
      if lineNum < 3 
        if match = /%\s*([^:]*)\s*:(.*)|%(\s*)(.*)\s*/.match(line)
            key = match[1]
	  
            if match[2]
              value = CGI::escapeHTML(match[2])
            else 
              value = ''
            end
          
            if lineNum == 1
              title = value
            end
            if lineNum == 2
              author = value
            end          
            if lineNum == 2
              date = value
            end         
        else
          break
        end
      else
        if match = /%\s*([^:]*)\s*:(.*)\s*/.match(line)
          key = match[1]
        
          if match[2]
            value = CGI::escapeHTML(match[2])
          else 
            value = ''
          end
      
          if key == 'title'
            title = value
          end
        
          if key == 'author'
            author = value
          end
        
          if key == 'date'
            date = value
          end
                 
        else
          break
        end
      end
    end


    
      $header = <<END
      <!DOCTYPE html>
      <html>
      <head>
      	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      	<title>#{title}  by  #{author}</title>
      	<meta name="author" content="#{author}" />
      	<meta name="date" content="#{date}" />
      	<style type="text/css">
      	#{$inlineCSS}	
      	</style>
      </head>
      <body>
END

      headFile = File.open($header_path, 'w')
      headFile.puts $header
      headFile.close
      
      return_value = system("#{$pandoc} -B #{$header_path} -A #{$footer_path} --toc #{file} > #{outputFile}")
    
      if return_value == false
    	  puts 'please install pandoc(http://johnmacfarlane.net/pandoc/INSTALL.html)'
      end
  end
end

$rootDir = File.expand_path(File.dirname(__FILE__))

$inlineCSS = IO.read("#{$rootDir}/lib/style/comb.css")


$header_path = $rootDir + '/lib/header'

$footer_path = $rootDir + '/lib/footer'

$pandoc = 'pandoc'

if platform == 'win'
  $pandoc = File.expand_path($rootDir + "/tools/win32/pandoc")
end

def buildDir(dir)
  files = File.find(dir, "*.text")
  
  files.each { |f| 
    processFile(f)
  }  
end

build_dir = ARGV.shift || "."

if File.stat(build_dir).directory?
  buildDir(build_dir)
else
  processFile(File.expand_path(build_dir))
end
