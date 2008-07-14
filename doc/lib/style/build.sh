cd source
cat base.css base-extra.css mmd.css zTable.css > comb.css
csstidy comb.css --template=high --compress_colors=true --timestamp=true --optimise_shorthands=2 --sort_properties=true tmp.css
mv tmp.css ../comb.css
