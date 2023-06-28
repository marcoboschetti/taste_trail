$(document).ready(function () {
    loadRandomRecipes();
});

function loadRandomRecipes() {
    $.getJSON("/api/recipes/random", events => {

        var recipesHTML = "";
        events.forEach(recipe => {
            recipesHTML += recipeToCardHTML(recipe);
        })
        $('#random-recipes').html(recipesHTML);

    });

}