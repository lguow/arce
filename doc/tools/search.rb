#!/usr/bin/ruby

require 'iconv'
require 'readline'
require "#{File.dirname(__FILE__)}/../lib/base"

$file_cache = {}
$line = 0


def init_cache
  puts 'building cache...'
  
  Dir.chdir(File.dirname(__FILE__) + '/..')
  
  Dir['**/*.text'].each { |path| 
    $file_cache[path] = File.open(path).to_a
  }
  
  puts 'input the keyword to search:'
  wait_input
end

def wait_input
  
  print '>> '
  
  #keyword = gets.chomp
  keyword = Readline.readline('%.3d> ' % $line, true)
  
  $line += 1
   
	if platform == 'win'
	  keyword = Iconv.iconv('utf-8', 'gbk', keyword).join('')
	end
	
	
	do_search(keyword)
end

def do_search(keyword)
  if keyword == 'quit'
    return
  end
  
  find_something = false
  
  $file_cache.each do |path, content|
    this_file_has = false
    line_num = 0
    
    content.each do |line|
      line_num += 1
      
      if (line.include? keyword)
        
        find_something = true
        
        if !this_file_has
          puts "\n", path + ':'
          this_file_has = true
        end
        
      	if platform == 'win'
      	  puts "[#{line_num}] " + Iconv.iconv('gbk', 'utf-8', line).join('')
      	else
      	  puts "[#{line_num}] " + line
      	end
      end
    end
  end
  
  if find_something
    if platform == 'win'
      puts Iconv.iconv('gbk', 'utf-8', keyword.center(60, "-")).join('')
    else
      puts keyword.center(60, "-")
    end
  else
    puts 'No Results Found'
  end
  
  
  wait_input
end

trap("INT") do
  puts "Bye"
  exit
end

init_cache