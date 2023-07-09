$(document).ready(function () {
    window.onhashchange = function () {
        var page = document.location.hash.substring(1);
        moveToPage(page);
    };

    loadPageFromHash();
});

function loadPageFromHash(){
    var page = document.location.hash;
    if(page){
        page = page.substring(1);
    }
    moveToPage(page);
}

function moveToPage(page){
    if(!page){
        page = "homepage";
    }

    $(".sidebar-item.active").removeClass("active");
    $('a[href="#'+page+'"]').first().closest('.sidebar-item').addClass("active");
    page = page.split("?")[0];
    $("#page_content").load("/site/pages/" + page + ".html");
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
