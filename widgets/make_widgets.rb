#!/usr/bin/env ruby
#
#  Created by  on 2007-12-27.

Dir.chdir(File.dirname(__FILE__))

require "../scripts/libs"
require "../scripts/template"

if ARGV.size == 1
  if ARGV[0] == "d"
    template("design")
  end
end
template("nodesign")
