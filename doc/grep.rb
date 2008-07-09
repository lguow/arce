#!/usr/bin/ruby
pattern = ARGV[0]


Dir['**/*.text'].each { |path| 
  File.open(path) do |f|
    f.each do |line|
      if line.include? pattern
        puts path, ':' line
      end
    end
  end
  #puts $` + "\033[1;31m" + $& + "\033[0m" + $' if /#{pattern}/.match(line) 
}