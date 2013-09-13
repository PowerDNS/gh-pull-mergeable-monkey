// ==UserScript==
// @name       github pull request merge status
// @namespace  http://7bits.nl/
// @version    0.1
// @description  shows whether a pull can be merged automatically, even if you don't have push access
// @match      https://github.com/*/*/pull/*
// @copyright  2013, Peter van Dijk
// ==/UserScript==

var parts=window.location.pathname.split('/');
if(parts[3] == 'pull') {
    var url='https://api.github.com/repos/'+parts[1]+'/'+parts[2]+'/pulls/'+parts[4];
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        ignoreCache: true,
        onload: function(res) {
            var pullinfo=$.parseJSON(res.responseText);
            if(!pullinfo.merged) {
                $('#discussion_bucket .discussion-sidebar .discussion-stats').append('<p>can '+(pullinfo.mergeable ? '' : 'NOT ')+'be merged</p>');
            }
        }
    });
    
}