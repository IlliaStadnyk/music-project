import {settings, templates, select} from '../setting.js'
import Audio from "./Audio.js";
import appState from "./AppState.js";
class Home {
    constructor(element) {
        const thisHome = this;
        thisHome.element = element;
        thisHome.audioWrapper = select.homePage.homeAudio;
        thisHome.categoryChecked = settings.category.all;
        thisHome.getData();

    }

    getData() {
        const thisHome = this;
        const url = settings.db.url + '/' + settings.db.songs;
        console.log('url', url);
        fetch(url)
            .then(response => response.json())
            .then(songs => {
                thisHome.songs = songs;
                if(thisHome.categoryChecked && thisHome.categoryChecked !== 'All'){
                    thisHome.songs = thisHome.songs.filter(song =>
                        song.categories.includes(thisHome.categoryChecked)
                    );
                }
                thisHome.getAuthors()
            });
    }
    getAuthors(){
        const thisHome = this;
        const urlAuthors = settings.db.url + '/'+settings.db.authors;
        fetch(urlAuthors)
            .then(r => r.json())
            .then(authors => {
                thisHome.authors = authors;
                for(let song of thisHome.songs){
                    let author = thisHome.authors.find(item => item.id === song.authorId);
                    song.name = `${author.name} ${author.surname}`;
                }
                thisHome.render();
                thisHome.getElements();
                thisHome.initAudio();
                thisHome.initEventListeners();
                thisHome.initActions()
            })
    }
    render() {
        const thisHome = this;
        thisHome.dom = {};
        thisHome.dom.wrapper = thisHome.element;

        const generateHTML = templates.homePage({songs: thisHome.songs, audioWrapper: thisHome.audioWrapper});
        thisHome.dom.wrapper.innerHTML = generateHTML;

    }

    getElements() {
        const thisHome = this;

        thisHome.dom.audio = thisHome.dom.wrapper.querySelectorAll(select.homePage.audio);
        thisHome.dom.categoryWrapper = document.querySelector(select.homePage.categoryList);
        thisHome.dom.categorySelect = document.querySelectorAll(select.homePage.homeCategory);
        thisHome.dom.joinButton = thisHome.dom.wrapper.querySelector(select.homePage.subscribeJoinButton);

        thisHome.dom.joinButton.textContent = thisHome.dom.joinButton.textContent.toUpperCase();
    }
    initAudio() {
        const thisHome = this;
        // const audioElements = thisHome.dom.audio;
        new Audio(thisHome.audioWrapper);
    }
    initEventListeners() {
        const thisHome = this;
        // console.log(thisHome.dom.categorySelect);
        document.addEventListener(`customPlayEventFor${thisHome.audioWrapper}`, (event) => {
            // console.log(event.detail.audioId);
            const audioId = event.detail.audioId;
            // console.log(audioId);
            const audio = thisHome.songs.find(song => song.id === parseInt(audioId));
            for (let category of audio.categories) {
                appState.addCategory(category);
            }
            console.log("Проигрывается аудио234:", audio);
            console.log("app:", appState);
        });
    }
    initActions(){
        const thisHome = this;
        if(!thisHome.dom.categoryWrapper.dataset.listener){
            for(const item of thisHome.dom.categorySelect){
                item.addEventListener('click', (event) => {
                    thisHome.dom.categorySelect.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    const value = event.target.getAttribute('value');
                    if(thisHome.categoryChecked === value){
                        event.target.checked = false;
                        thisHome.categoryChecked = settings.category.all;
                    } else {
                        event.target.checked = true;
                        thisHome.categoryChecked = value;
                    }
                    console.log(thisHome.categoryChecked);
                    thisHome.getData();
                })
            }
        }
        thisHome.dom.categoryWrapper.dataset.listener = 'true';

        const event = new CustomEvent('join-now',{
            bubbles: true,
            detail: {
                target: thisHome.dom.joinButton
            }
        });
        if(!thisHome.dom.joinButton.dataset.listener){
            thisHome.dom.joinButton.addEventListener('click', () => {
                thisHome.dom.joinButton.dispatchEvent(event);
            })
        }
        thisHome.dom.joinButton.dataset.listener = 'true';
    }
}
export default Home;