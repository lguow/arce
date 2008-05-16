#TODO:fix path

require "../scripts/libs"
require "../scripts/px2em"
require "find"
require 'ftools'


def template(design)
  
  html_header = IO.read("_Template/html_header")
  html_footer = IO.read("_Template/html_footer")
  treeData = []
  treeData.push('var treeData = {text:"tree", children:[')
  
  tidy = "../../tools/tidy/#{platform}/tidy"
  tidy_conf = "../../tools/tidy/indent.conf"
  
  pngout = "../../../tools/pngout/#{platform}/pngout"

  # get all directories
  pageDirs = Dir["[!_]*"]

  pageDirs.each do |d|
  
    unless FileTest.directory?("#{d}")
      next
    end
    dirName = d.to_s
    treeData.push("{text:'#{dirName}', children:[")
    
    Dir.chdir(d)
    
    # get all templates
    files = Dir["*.tmpl"]
    
    unless FileTest.directory?("output")
      Dir.mkdir("output")
    end

    unless FileTest.directory?("output/style")
      Dir.mkdir("output/style")
    end
    
    
    # use pngout to optimize png files
    if design == "design"
      if FileTest.directory?("Design")
      
        Dir.chdir("Design")
      
        designFiles = Dir["*.png"]
      

        designFiles.each do |f|
          outputDir = "../output/style/#{f[0..-5]}"
          unless FileTest.directory?(outputDir)
            Dir.mkdir(outputDir)
          end
          File.copy(f, outputDir)
          system("#{pngout} -b256 #{outputDir}/#{f}")
        end

        Dir.chdir("..")
      
      end
    end
    

    files.each do |f|
      fileName = f.to_s.split(".")[0..-2].join("")
      
      treeData.push("{text:'#{fileName}', leaf:true}")
      
      treeData.push(',') if f != files.last
      
      outPutFile = File.open("output/#{fileName}.html", 'w')

      #TODO: fix bug in Conditional comments
      
      styles = IO.read(f).scan(/<style(?:"[^"]*"|'[^']*'|[^'">])*>([\S\s]*)<\/style>/im)[0]
      
      if styles != nil
        styles = styles.join("")
      else
        styles = false
      end
      
      linkStyle = "<link rel=\"stylesheet\" type=\"text/css\" media=\"screen, projection\"  href=\"style/#{fileName}.css\" />"
      
      # replace variable with page
      tmpArray = File.open("#{f}").collect do |line|
        
        if match = /_\$.*\$_/.match(line)
          line.scan(/_\$.*\$_/).each do |ma|
            next if ma[2..-3] == ""
            line.sub!(/_\$#{Regexp.escape(ma[2..-3])}\$_/, IO.read("../_Template/#{ma[2..-3]}"))
          end 
        end
        line
      end
      
      tmpArray = tmpArray.join("")
      
      # remove <style> in html
      if tmpArray =~ /<style[^>]*>[\S\s]*<\/style>/im
        tmpArray.gsub!(/<style[^>]*>[\S\s]*<\/style>/im, "")
      end

      
      outPutFile.puts  html_header + linkStyle + tmpArray + html_footer
      outPutFile.close
      
      if styles
        outPutStyle = File.open("output/style/#{fileName}.css", 'w')
        outPutStyle.puts styles
        outPutStyle.close
        #px2em("output/style/#{fileName}.css")
      end

          
      if platform
        puts "#{d}/#{fileName}.tmpl".center(60, "-")
        #system("#{tidy} -config #{tidy_conf} output/#{fileName}.html")
        puts ""
      else
        puts "sorry, your platform can't use tidy"
      end
    
    end
    
    treeData.push(']}')
    
    treeData.push(',') if d != pageDirs.last
    
    Dir.chdir("..")
  end
  
  treeData.push(']}')
  outPutData = File.open("treeData.js", 'w')
  outPutData.puts treeData.join('')
end