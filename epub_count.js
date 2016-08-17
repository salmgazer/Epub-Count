/* require epub resource */
var EPub = require("./epub");

/* create a model of sample epub file */
var epub = new EPub("./files/pg52800-images.epub", "/imagewebroot/", "/articlewebroot/");
epub.on("error", function(err){
    console.log("ERROR\n-----");
    throw err;
});

/**
*
* process()
*
* processes an epub file and gets raw text for counting words and characters
* @return callbalck [undecided yet]
*/
function process(){
  epub.on("end", function(err, data){
    count = 0;
    contents = "";
    chapters = epub.flow.length; // number of chapters in epub file
    epub.flow.forEach(function(chapter, count){
        epub.getChapterRaw(epub.spine.contents[count].id, function(err, data){
          if(err){
            console.log(err)
            return;
          }
          // update content with content of current chapter
          contents += data;
          //check if iteration has completed
          if(count >= chapters){
            console.log(contents);
            //do convertion and counting here
            return;
          }
        });
        //update count of chapters read
        count += 1;
    });
  });
}

process();
epub.parse();
