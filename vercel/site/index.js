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
    }else{
        page = "homepage";
    }
    moveToPage(page);
}

function moveToPage(page){
    $(".sidebar-item.active").removeClass("active");
    $('a[href="#'+page+'"]').first().closest('.sidebar-item').addClass("active");
    page = page.split("?")[0];
    $("#page_content").load("/site/pages/" + page + ".html");
}
