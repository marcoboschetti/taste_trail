

$.getJSON("/api/recipes/random", events => {

    var wrapper = $('#random-recipes');

    events.forEach(recipe => {

        console.log(recipe);
        var tagsHtml = "";
        recipe.tags.split(",").forEach(tag => {
            tagsHtml += `<span class="badge rounded-pill badge-secondary">` + tag + `</span>`;

        })


        var cuisineVal = "International";
        if (recipe.cuisine_type && recipe.cuisine_type != "None") {
            cuisineVal = recipe.cuisine_type;
        }

        var cuisineChipHtml = `<span class="badge rounded-pill badge-primary">` + cuisineVal + `</span>`;

        var eventCardHTML = `
        <div class="col-lg-3 col-md-6 mb-3">
        <div class="card">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" class="img-fluid" />
                <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title recipe-title">`+ recipe.name + `</h5>
                <hr class="my-4" />
                <p class="cuisine-type-chip">`+ cuisineChipHtml + `</p>
                <div class="row recipe-card-row">
                    <div class="col-4">
                        <p class="card-title">
                            <i class="fa-solid fa-money-bills" style="color: #009b29;"></i> 
                            `+ recipe.budget + `/10
                        </p>
                    </div>
                    <div class="col-8">
                        <p class="card-title">
                            <i class="fa-regular fa-clock" style="color: #3400ff;"></i>
                            `+ recipe.cooking_time + `
                        </p>
                    </div>
                </div>
                <div class="row recipe-card-row">
                    <div class="col-4">
                        <p class="card-title">
                            <i class="fa-solid fa-dumbbell" style="color: #ffbe00;"></i>
                            `+ recipe.difficulty_level + `/10
                        </p>
                    </div>
                    <div class="col-8">   
                        <p class="card-title">
                            <i class="fa-solid fa-plate-wheat" style="color: #00e1ff;"></i>
                            `+ recipe.serving_size + `
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <p class="card-text recipe-ingredients-footer">`+ recipe.ingredients + `</h5>
            </div>
        </div>
    </div>

        `;
        wrapper.append(eventCardHTML);
    })

});

