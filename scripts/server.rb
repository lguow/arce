#!/usr/bin/env ruby

require 'webrick'
include WEBrick

Dir.chdir("..")

s = HTTPServer.new(
  :Port            => 2000,
  :DocumentRoot    => Dir::pwd
)


trap("INT"){ s.shutdown }
s.start