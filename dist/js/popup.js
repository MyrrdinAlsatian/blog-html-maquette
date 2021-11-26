export function createPopupProject(project) {
    //1. get npm du projet
    //2. build popup project html
    //2.1 add interaction
    //3.get data
    //4.append 
    let popup = document.querySelector('#popup');

    let buildPopup = (data) => {
        console.log(data.image);
        return `
        <div class = "popup" id="popup">
            <div class="popup__content">
                <div class="popup__left">
                    <img src = "./Assets/imgs/${data.image[0].name}"
                    alt="${data.image[0].alt}"
                    class="popup__img" >
                    <img src="./Assets/imgs/${data.image[1].name} "
                    alt="${data.name} image"
                    class="popup__img" >
                </div> 
                <div class = "popup__right">
                    <a href="javascript.void(0)" id="closePopup" class="popup__close" >&times;</a>
                    <h2 class="heading-secondary u-margin-bottom-small" > ${data.name}</h2>
                    <h3 class="heading-tertiary u-margin-bottom-small" > ${data.techno}</h3>
                    <p class = "popup__text">
                      ${data.description}  
                    </p>
                    <a href = "#" class="button button--blue" > Book now </a>
                </div>
            </div>
        </div>
        `
    }

    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            let popContent = data.projet.projets.find(projet => projet.id == project);
            console.log(popup);
            console.log(popContent);

        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });
}