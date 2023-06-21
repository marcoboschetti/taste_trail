

$(document).ready(function () {
    loadRandomRecipes();
    populateIngredientsAutocomplete();
});

function loadRandomRecipes() {
    $.getJSON("/api/recipes/random", events => {

        var wrapper = $('#random-recipes');

        var recipesHTML = "";
        events.forEach(recipe => {
            console.log(recipe);


            var cuisineVal = "International";
            if (recipe.cuisine_type && recipe.cuisine_type != "None") {
                cuisineVal = recipe.cuisine_type;
            }

            var eventCardHTML = `
    <div class="col">
        <div class="card mb-3 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal limit-2">`+ recipe.name + `</h4>
          </div>
          <div class="card-body">
    
            <h6 class="card-subtitle mb-2 text-muted">
                <span class="badge bg-secondary">`+ cuisineVal + `</span>
            </h6>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">Check recipe</button>
          </div>
        </div>
      </div>

        `;

            recipesHTML += eventCardHTML
        })
        wrapper.html(recipesHTML);

    });

}