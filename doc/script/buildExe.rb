#!/usr/bin/ruby

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

def buildExe
  Dir["*.rb"].each do |file|
    file_name = File.basename(file)[0..-4]


    system("dir & exerb #{file_name}.rb")
    system("dir & mkexy #{file_name}.rb")
    system("dir & exerb #{file_name}.exy")
    system("dir & del #{file_name}.exy")

  end
end

if platform == 'win'
  Dir.chdir('..')
  buildExe
  Dir.chdir('tools')
  buildExe
else
  puts 'must run in MS-Windows'
end


