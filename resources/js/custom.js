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
  book.goto(firstPageUrl);
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
  book.goto(lastPageUrl, true);
}

Book.getToc().then(function(toc){
    console.log(toc);
});
