#!/usr/bin/env ruby
#
#  Created by  nwind on 2008-07-08.

require 'cgi'
require 'erb'
      
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
      #return File.stat(source).mtime > File.stat(target).mtime
      return true
    else
      return true
    end
end

def escape_js(str)
  str.gsub!("\\", "\\\\\\")
  str.gsub!("'", "\\u0027")
  str.gsub!("\"", "\\u0022")

  return str
end

def processFile(file)
  title = author = date = key = value = ''
  lineNum = 0
  index_cache = {}
  
  outputDir = File.dirname(file) + '/_output'
  outputFileName = File.basename(file)[0..-6]
  
  unless FileTest.directory?(outputDir)
    Dir.mkdir(outputDir)
  end
  
  outputFile = "#{outputDir}/#{outputFileName}.html"
  
  if is_newer(file, outputFile)
    
    File.open(file).collect do  |line|
      summary = ''
      line.chomp!
      lineNum = lineNum + 1
    
      if lineNum <= 3
        if match = /%(\s*)(.*)\s*/.match(line)
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
            if lineNum == 3
              date = value
            end
        end
      else
        
        if /^#+(\s*)(.*)|^=+/.match(line)
          break
        else
          if /\[[^\]]*\]:.*/.match(line)
            
          else
            summary += line
          end
        end
      end
    
      #$index_cache[file]['summary'] = summary
    end
    
    $index_cache.push({
      'url' => escape_js(outputFile),
      'title' => escape_js(title),
      'author' => escape_js(author),
      'date' => escape_js(date)
    })
    
    
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

$index_cache = []

if platform == 'win'
  $pandoc = File.expand_path($rootDir + "/lib/win32/pandoc")
end

def buildDir(dir)
  files = Dir['**/*.text']
  
  files.each { |f| 
    processFile(f)
  }  
end

build_dir = ARGV.shift || "."

if build_dir == 'index_cache'
  buildDir('.')
  
  template = %q{
    var docData = [
      <% $index_cache.each do |file| %>
      {
        'url': '<%= "../" + file["url"] %>',
        'title': '<%= file["title"] %>',
        'author': '<%= file["author"] %>'
      }<%= ',' if file != $index_cache.last %>
      <% end %>
    ]
  }.gsub(/^  /, '')
  
  ERB.new(template, 0, "%<>").result
  
  output = File.open('search/Data/docData.js', 'w')
  output.puts ERB.new(template, 0, "%<>").result
  output.close
  
else
  if File.stat(build_dir).directory?
    buildDir(build_dir)
  else
    processFile(File.expand_path(build_dir))
  end
end
