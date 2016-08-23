/* require epub module */
var EPub = require("epub");

/**
* loadEpub(filename, imagewebroot, articlewebroot)
*
* loads epub and creates a model of the epub file in memory for processing
*
* @param filename is the location of file on disc
* @param imagewebroot is the location of images in the epub archive
* @param articlewebroot is the location of the content in the epub archive
* @return Epub|String is an epub object or a error text
*/
function loadEpub(filename, imagewebroot, articlewebroot){
  var epub = new EPub(filename, imagewebroot, articlewebroot);
  epub.on("error", function(err){
      console.log("ERROR\n-----");
      return -1;
  });
  return epub;
}


/**
*
* process()
*
* processes an epub file and gets raw text for counting words and characters
* @param epubObject is an epubObject loaded in memory
* @return callbalck [undecided yet]
*/
function process(epubObject){
  epubObject.on("end", function(err, data){
    var count = 0;
    var contents = "";
    var chapters = epubObject.flow.length; // number of chapters in epub file
    epubObject.flow.forEach(function(chapter, count){
        epubObject.getChapterRaw(epubObject.spine.contents[count].id, function(err, data){
          if(err){
            console.log(err)
            return;
          }
          // update content with content of current chapter
          contents += data;
          //check if iteration has completed
          if(count >= chapters){
            //do convertion and counting here
            contents = clean(contents);
            words = contents.split(' ');
            wordcount = 0;
            characters = 0;
            for(i = 0; i < words.length; i++){
              if(words[i].length > 1 || words[i] === 'a'){
                wordcount++;
                characters += words[i].length;
                //console.log(words[i]);
              }
            }
            console.log(wordcount+" words, "+contents.length+" chars");
          }
        });
        //update count of chapters read
        count += 1;
    });
  });
}

/**
*
* clean(contents)
*
* remove all unwanted characters from text
* @param contents
* @return String
*/
function clean(contents){
  contents = contents.replace(/<style([\s\S]*?)<\/style>/gi, '');    // remove all <style> tags
  contents = contents.replace(/<script([\s\S]*?)<\/script>/gi, '');  // remove all <script> tags
  contents = contents.replace(/<\/div>/ig, '');                      // remove all <div> tags
  contents = contents.replace(/<\/li>/ig, '');                       // remove all <li> tags
  contents = contents.replace(/<\/ul>/ig, '');                       // remove all <ul> tags
  contents = contents.replace(/<\/p>/ig, '');                        // remove all <p> tags
  contents = contents.replace(/<br\s*[\/]?>/gi, ' ');                // remove <br> tags
  contents = contents.replace(/<[^>]+>/ig, '');
  contents = contents.replace(/[0-9]/g, '');                         // remove all numbers
  contents = contents.replace(/\,/g, '');                            // remove all commas
  contents = contents.replace(/&nbsp;/gi,'');                        // remove all special html characters
  contents = contents.replace(/&amp;/gi,'');
  contents = contents.replace(/&quot;/gi,'');
  contents = contents.replace(/&lt;/gi,'');
  contents = contents.replace(/&gt;/gi,'');
  contents = contents.replace(/&gt;/gi,'');                          // end remove all special html characters
  contents = contents.replace(/\n/gi, ' ');                          // remove newline
  contents = contents.replace(/\./gim, '');                          // remove period
  contents = contents.replace(/\:/gim, '');                          // remove colon
  contents = contents.replace(/\;/gim, '');                          // remove semi-colons
  contents = contents.replace(/\s\s+/g, ' ');                        // remove apostrophe
  contents = contents.replace(/<(?:.|\s)*?>/g, '');
  contents = contents.replace(/\$/g, '');                            // remove dollar sign
  contents = contents.replace(/[{()}]/g, '');                        // remove brackets
  contents = contents.replace(/[^a-zA-Z ]/g, "");                    // remove everything that is not an alphabet
  contents = contents.replace(/[ ]{2,}/gi," ");                      // convert 2> spaces to 1
  contents = contents.replace(/(^\s*)|(\s*$)/gi,"");                 //exclude  start and end white-space
  contents = contents.replace(/\n/," ");                             // exclude newline with a start spacing
  return contents;
}

function extractWords(contents){
    //do convertion and counting here
    contents = clean(contents);
    words = contents.split(' ');
    wordcount = 0;
    characters = 0;
    for(i = 0; i < words.length; i++){
      if(words[i].length > 1 || words[i] === 'a'){
        wordcount++;
        characters += words[i].length;
      }
    }
    return wordcount;
}

 //do some testing here
//myepub = loadEpub("./files/pg52800-images.epub", "/imagewebroot/", "/articlewebroot/");
//myepub.parse();
//process(myepub);
