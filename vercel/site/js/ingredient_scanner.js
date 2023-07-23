$(document).ready(function () {
    populateIngredientsAutocomplete();
    $("#findRecipesBtn").click(findRecipes);

    $('#ingredientInput').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var ingredientPicked = $("#ingredientInput").val().toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });

            addIngredientPill(ingredientPicked);
            $("#ingredientInput").val("");
        }
    });
    
});


function populateIngredientsAutocomplete() {
    $('#ingredientInput').autocomplete({
        onPick(el, item) {
            var ingredientPicked = $(item).html();
            addIngredientPill(ingredientPicked);
            $("#ingredientInput").val("")
        }
    });
}

function addIngredientPill(ingredientPicked){
    var pillHTML = `
    <div class="btn btn-primary position-relative ingredient-pill">
        <span class="ingredient">`+ ingredientPicked + `</span>
        <span class="pill-delete position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">X</span>
    </button>`;
    var pill = $(pillHTML)
    $("#selectedIngredientsContainer").append(pill);

    pill.find(".pill-delete").click(function () {
        $(this).parent().remove();
    });
}

function findRecipes() {
    $(".tt-loader").slideDown();
    $("#results-container").slideUp();
    $("#results-container").empty();

    var selectedIngredients = [];
    $(".ingredient-pill").each(function () {
        selectedIngredients.push($(this).find(".ingredient").text());
    });

    var ingCSV = selectedIngredients.join(",");
    $.getJSON("/api/recipes/query_ingredients?ing=" + ingCSV, recipes => {

        var recipesHTML;
        if (!recipes.length) {
            recipesHTML = "<h2>No recipes found. Please try with other filters</h2>"
        } else {
            recipesHTML = '<div class="row row-cols-4 text-center">';
            $.each(recipes, function (key, recipe) {
                recipesHTML += recipeToCardHTML(recipe);
                if (key == 3) {
                    recipesHTML += '</div><div class="row row-cols-4 text-center">';
                }
            })
            recipesHTML += '</div>';
        }

        $("#results-container").empty();
        $(".tt-loader").slideUp();
        $('#results-container').append(recipesHTML);
        $('#results-container').slideDown();

    });
}
