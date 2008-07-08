#!/usr/bin/env ruby
#
#  Created by  nwind on 2008-7-4.


Dir.chdir('docs');

Dir["**/**"].sort.each { |x| 
  puts x 
} 