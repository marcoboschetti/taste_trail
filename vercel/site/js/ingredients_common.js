var totalIngredients;
var selectedIngredients = [];

function getIngredientsCount() {
    if(totalIngredients){
        return;
    }

    $.getJSON("/api/ingredients/count", ingredientsCount => {
        totalIngredients = parseInt(ingredientsCount);
    });
}

function populateIngredientsAutocomplete() {
    $('#ingredientInput').autocomplete({
        onPick(el, item) {
            var ingredientPicked = $(item).html();
            selectedIngredients.push(ingredientPicked);
            
            var pillHTML = `
            <button type="button" class="btn btn-primary position-relative">
                `+ingredientPicked+`
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">X</span>
            </button>`;
            $("#selectedIngredientsContainer").append(pillHTML);
            $("#ingredientInput").val("")
        }
    });
    
}
