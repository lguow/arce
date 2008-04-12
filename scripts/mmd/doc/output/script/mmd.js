function isHasChinese(str){
   var nlength = str.length;
   var ch;
   for(var i = 0; i < nlength; i++) {
       ch = str.charCodeAt(I);
       if( ch > 122 || (ch >= 91 && ch <= 96) || ch == 36 || ch == 60 )
        return true;
   }
   return false;
}