import { createTimeline } from './timeline.js';
import { fromContactSubmit } from './contact.js';
import { createPopupProject } from './popup.js';

let _string = (string) => {
    string = string.replace(/\s+/g, '-').normalize('NFKD').replace(/[\u0300-\u036F\u1DC0-\u1DFF\u1AB0-\u1AFF]+/g, '')
    return string
};

function creatSkill() {
    let getContainer = document.querySelector('.skill__table');

    let buildSkill = (data) => {
        return `              <div class="skill__element skill__element--${data.type}" data-type="${data.type}"data-skill="${data.name}" data-mastered="${data.mastered}">
                                    <div class="skill__element-container">
                                        <div class="skill__element-info">
                                            <span>${data.project.length}</span>
                                            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14 0L17.1432 9.67376H27.3148L19.0858 15.6525L22.229 25.3262L14 19.3475L5.77101 25.3262L8.9142 15.6525L0.685208 9.67376H10.8568L14 0Z"
                                                    fill = "${data.mastered ? '#F0D70C' : '#C4C4C4'}" / >
                                            </svg>
                                        </div>
                                        <figure>
                                            <img src="./Assets/imgs/logos_lib/${data.img}">
                                            <figcaption>
                                                ${data.name}
                                            </figcaption>
                                        </figure>
                                    </div>
                               </div> `;

    }
    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            for (const skill of data.skill) {
                getContainer.innerHTML += buildSkill(skill);
            }
        }).then(result => {
            let collection = document.querySelector(".skill__table");
            let collection2 = Array.prototype.slice.call(collection.children);
            collection.innerHTML = "";
            collection2.sort(function(a, b) {
                let getvala = a.classList.value;
                let getvalb = b.classList.value;
                if (getvala < getvalb) {
                    return 1
                }
                if (getvala > getvalb) {
                    return -1
                }
                return 0
            })
            for (const card of collection2) {
                getContainer.appendChild(card);
            }
            gridResponsive();
        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });

}

function creatProject() {
    let getContainer = document.querySelector('.project__list');

    let buildProject = (data) => {
        return `  <li class="project__item " data-id="${data.id}"data-type="${data.type}">
                    <div class="project__item-container">
                        <div class="project__item--deco"> </div>
                            <figure>
                                <img src = "./Assets/imgs/${data.background}" alt = "" >
                                <figcaption>
                                    <h5> ${data.name} </h5> 
                                    <p> ${data.description} </p>
                                </figcaption>
                            </figure> 
                        <div class="project__item--deco"> </div>
                    </div>
                  </li> `;
    }
    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            for (const project of data.projet.projets) {
                getContainer.innerHTML += buildProject(project);
            }
        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });

}

function creatSoftSkill() {
    let getContainer = document.querySelector('.skill__table--soft');

    let buildSoftSkill = (data) => {
        return `              <div class="skill__element skill__element--soft" data-type="${data.type}"data-skill="${data.name}" data-mastered="${data.mastered}">
                                    <div class="skill__element-container">
                                        <div class="skill__element-info">
                            
                                        </div>
                                        <figure>
                                            <img src="./Assets/imgs/logos_lib/${data.img}">
                                            <figcaption>
                                                ${data.name}
                                            </figcaption>
                                        </figure>
                                    </div>
                               </div> `;

    }
    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            for (const softSkill of data.softSkills) {
                getContainer.innerHTML += buildSoftSkill(softSkill);
            }
        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });

}

function creatProjectFilter() {
    let getContainer = document.querySelector('.project__button-container');

    let buildButton = (data) => {
        return ` <li data-type="${_string(data)}" class="button button--${ _string(data)}">
                    <span> <a href="${_string(data)}">${data[0].toUpperCase() + data.slice(1)}</a> </span>
                </li>`;

    }
    window.fetch("./Assets/json/skill.json")
        .then(r => r.json())
        .then(data => {
            for (const filter of data.projet.type) {
                getContainer.innerHTML += buildButton(filter);
            }
        }).catch(function(error) {
            console.log("-----------------");
            console.log(error);
        });

}
creatSkill();
creatProject();
creatSoftSkill();
creatProjectFilter();
createTimeline();
(function() {
    let formSubmit = document.forms['Contact'];
    let projectList = document.querySelector('.project__list');
    let popupClose = document.querySelector('#popup');
    document.addEventListener("click", function(e) {
        let target = e.target
        if (target.className != '.popup__close') {
            e.preventDefault();
            console.log("nop")
            return
        }
    })
    window.addEventListener('resize', gridResponsive);
    projectList.onclick = function(e) {
        let target = e.target.closest('.project__item');
        console.log('----', target);
        createPopupProject(target.dataset.id);
    }
    formSubmit.addEventListener('submit', fromContactSubmit);
    window.addEventListener('load', e => {
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            document.querySelector('html').dataset.theme = 'dark';
            let target = document.querySelector('.menu-bar__list-items:last-of-type ul li:last-of-type i');
            target.removeAttribute('class', 'fa-moon-o');
            target.setAttribute('class', 'fa fa-sun-o');
        }
    })
})()

function gridResponsive() {
    let screenWidth = window.screen.availWidth,
        column = 2,
        selectorItem = document.querySelector('.skill__table').children;

    let nbrProject = selectorItem.length;
    let dimensionItem = selectorItem[3].offsetWidth;
    dimensionItem += 92;
    column = Math.ceil(screenWidth / dimensionItem);
    if (screenWidth >= 768) {
        nbrProject += 10;
    }

    if (screenWidth > 1300) {
        column = 8

    }
    let nbrRow = Math.ceil((nbrProject) / column);
    document.documentElement.style.setProperty('--grid-row', nbrRow);
    document.documentElement.style.setProperty('--grid-column', column);
}