$(document).ready(function () {
    loadRandomRecipes();
});

function loadRandomRecipes() {
    $.getJSON("/api/recipes/random", events => {

        var recipesHTML = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 text-center">';
        $.each(events, function(key, recipe) {
            recipesHTML += recipeToCardHTML(recipe);
            if(key == 3){
                recipesHTML +='</div><div class="row row-cols-4 text-center">' ;
            }
        })
        recipesHTML +='</div>';
        $('#random-recipes').html(recipesHTML);
    });
}