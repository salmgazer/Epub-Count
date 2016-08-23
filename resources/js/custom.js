//url to first page -- to be loaded from disk as attribute of book
var firstPageUrl = '@public@vhost@g@gutenberg@html@files@52800@52800-h@52800-h-6.htm.html#pgepubid00004';
//url to last page -- to be loaded from disk as attribute of book
var lastPageUrl  = '@public@vhost@g@gutenberg@html@files@52800@52800-h@52800-h-57.htm.html#pgepubid01563';


/**
*
* startOfBook(Book)
*
* Navigates to the start of content of book
*
* @param book is an epub Book objct
* @return Object|bool returns promise object after rendering to page 1 or false on failure
*/
function startOfBook(book){
  Book.goto(firstPageUrl);
}

/**
*
* endOfBook(Book)
*
* Navigates to the end of content of book
*
* @param book is an epub Book objct
* @return Object|bool returns promise object after rendering to last or false on failure
*/
function endOfBook(book){
  Book.goto(lastPageUrl, true);
}


/*Book.getToc().then(function(toc){
    console.log(toc);
});*/

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



/*Book.on('renderer:locationChanged', function(locationCfi){
	//var currentContent = Book.element.getElementsByTagName('iframe')[0].contentDocument.activeElement.innerHTML;
	var currentContent = document.getElementsByTagName('iframe')[0].contentDocument.activeElement.innerHTML;
	currentContent = clean(currentContent);
    alert(currentContent);
});*/

/*book.spine.forEach(function(spineItem) {
    book.chapter(spineItem.href).render().then(function(html)
	 { 
		 console.log(html);
	  });
});*/

/*var book_spine = book.spine;
for(var i = 0; i < book_spine.length; i++){
	console.log(book_spine[i].href);
}
*/

// A $( document ).ready() block.
/*$( document ).ready(function() {
	Book.ready.all.then(function(){
		var raw_content = "";
		for(var i = 0; i < Book.spine.length; i++){
			Book.chapter(Book.spine[i].href).render().then(function(html){
				raw_content += html;
			});
		}
	});
    
});*/
Book.ready.all.then(function(){
	//alert(Book.metadata.bookTitle);
	//alert(Book.spine.length);
	/*Book.spine.forEach(function(spineItem){
		Book.chapter(spineItem.href).render().then(function(html){
			alert(html);
		});
	});*/
	
	/*for(var i = 0; i < Book.spine.length; i++){
		EPUBJS.Chapter(Book.spine[i], Book.store).render().then(function(contents){
			alert(contents);
		});
	}*/
});

