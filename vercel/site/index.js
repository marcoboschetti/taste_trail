

$.getJSON("/api/recipes/random", events => {

    var wrapper = $('#random-recipes');

    events.forEach(recipe => {

        console.log(recipe);
        var tagsHtml = "";
        recipe.tags.split(",").forEach(tag => {
            tagsHtml += `<span>` + tag + `</span>`;

        })

        var eventCardHTML = `
        <div class="col-lg-4 col-md-12 mb-4">
        <div class="card">
            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" class="img-fluid" />
                <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
                </a>
            </div>
            <div class="card-body">
                <h5 class="card-title">`+ recipe.name + `</h5>
                <hr class="my-4" />

                <h5 class="card-title">
                    <i class="fa-solid fa-money-bills" style="color: #005cfa;"></i> 
                    `+recipe.budget+ `/5
                </h5>

                <h5 class="card-title">
                    <i class="fa-regular fa-clock"></i>
                    `+recipe.cooking_time+ `
                </h5>
                <h5 class="card-title">
                    <span class="badge rounded-pill badge-primary">
                        `+recipe.cuisine_type+ `
                    </span>
                </h5>
                <h5 class="card-title">dietary_restrictions: `+recipe.dietary_restrictions+ `</h5>
                <h5 class="card-title">difficulty_level: `+recipe.difficulty_level+ `</h5>
                <h5 class="card-title">id: `+recipe.id+ `</h5>
                <h5 class="card-title">preparation_time: `+recipe.preparation_time+ `</h5>
                <h5 class="card-title">serving_size: `+recipe.serving_size+ `</h5>
                <h5 class="card-title">tags: `+recipe.tags+ `</h5>

            </div>
        </div>
    </div>

        `;
        wrapper.append(eventCardHTML);
    })

});

