#!/usr/bin/ruby
require 'iconv'

pattern = ARGV[0]

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

if platform == 'win'
	pattern = Iconv.iconv('utf-8', 'gbk', ARGV[0]).join('')
end

Dir['**/*.text'].each { |path| 
  File.open(path) do |f|
    f.each do |line|
      if (line.include? pattern)
	if platform == 'win'
	  puts path + ":\n" +  Iconv.iconv('gbk', 'utf-8', line).join('')
	else
	  puts path, ':', line
	end
        puts ''
      end
    end
  end
  #puts $` + "\033[1;31m" + $& + "\033[0m" + $' if /#{pattern}/.match(line) 
}