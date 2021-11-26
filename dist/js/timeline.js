export function createTimeline() {
    let getContainer = document.querySelector('.timeline>.container');

    let buildTimelineE = (data) => {
        return `              <div class="timeline-item">
                                <div class="timeline-img">
                                </div>

                                <div class="timeline-content timeline-card">
                                    <div class="timeline-img-header">
                                        <img src="https://picsum.photos/1000/800/?random" alt="" srcset="">

                                        <h2>${data.name}</h2>
                                        <div class="location"> ⚐ ${data.where}</div>

                                    </div>
                                    <div class="date">${data.when}</div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor, nostrum excepturi amet in dolores. Alias, ullam.</p>
                                    ${data.link != undefined ? "<p class = 'button button--blue'><a href='"+ data.link+"'> En voir plus </a></p>" :" " }
                                </div>
                            </div> `;

    }
    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            for (const lifeEvent of data.cursus) {
                getContainer.innerHTML += buildTimelineE(lifeEvent);
            }
        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });

}