var totalIngredients;

function getIngredientsCount() {
    if(totalIngredients){
        return;
    }

    $.getJSON("/api/ingredients/count", ingredientsCount => {
        totalIngredients = parseInt(ingredientsCount);
    });
}
