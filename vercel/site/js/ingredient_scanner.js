var selectedIngredients = [];

$(document).ready(function () {
    populateIngredientsAutocomplete();
    $("#findRecipesBtn").click(findRecipes);
});


function populateIngredientsAutocomplete() {
    $('#ingredientInput').autocomplete({
        onPick(el, item) {
            var ingredientPicked = $(item).html();
            selectedIngredients.push(ingredientPicked);

            var pillHTML = `
            <button type="button" class="btn btn-primary position-relative">
                `+ ingredientPicked + `
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">X</span>
            </button>`;
            $("#selectedIngredientsContainer").append(pillHTML);

            $("#ingredientInput").val("")
        }
    });
}

function findRecipes() {
    var ingCSV = selectedIngredients.join(",");
    $.getJSON("/api/recipes/query_ingredients?ing=" + ingCSV, recipes => {
        var recipesHTML = "";
        recipes.forEach(recipe => {
            recipesHTML += recipeToCardHTML(recipe);
        }); 
        console.log(recipes,"!",recipesHTML)
        $('#recipesResult').html(recipesHTML);

    });
}
