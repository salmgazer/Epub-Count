var EPub = require("epub");

//create a model of sample epub file
var epub = new EPub("pg52800-images.epub", "/imagewebroot/", "/articlewebroot/");
epub.on("error", function(err){
    console.log("ERROR\n-----");
    throw err;
});

function process(){
  epub.on("end", function(err, data){
    count = 0;
    contents = "";
    epub.flow.forEach(function(chapter){
        epub.getChapterRaw(epub.spine.contents[count].id, function(err, data){
          if(err){
            console.log(err)
            return;
          }
          contents += data;
          //console.log(count+"  :  "+data.length);
          if(!epub.spine.contents[count+1]){
            console.log(contents.length);
          }
        });
        count += 1;
    });
  });
}

process();
epub.parse();
