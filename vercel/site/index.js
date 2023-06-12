

$.getJSON("/api/events/random", events => {

    var wrapper = $('#initial-events');        

    events.forEach(event => {

        console.log(event);
        var tagsHtml = "";
        event.tags.split(",").forEach(tag => {
            tagsHtml += `<span>`+tag+`</span>`;

        })

        var eventCardHTML = `
        <div class="col-md-4">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">`+event.category+`</h6> <span>`+event.subcategory+`</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="badgex"> `+tagsHtml+` </div>
                </div>
                <div class="mt-5">
                    <h3 class="heading">`+event.name+`</h3>
                    <div class="mt-5">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="mt-3"> <span class="text1">Difficuly: `+event.difficulty+`<span class="text2">/5</span></span> </div>
                        <div class="mt-3"> <span class="text1">Budget: `+event.budget+`<span class="text2">/5</span></span> </div>
                        <div class="mt-3"> <span class="text1">Number of guests: `+event.guest_range+`</span> </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        wrapper.append(eventCardHTML);
    })

});
