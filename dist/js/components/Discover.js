import appState from "./AppState.js";
import {select, settings, templates} from "../setting.js";
import Audio from "./Audio.js";
class Discover {
    constructor(element) {
        const thisDiscover = this
        thisDiscover.element = element;
        thisDiscover.audioWrapper = select.discoverPage.discoverAudio;
        thisDiscover.mostListenedCategory = appState.getMostListenedCategory();
        // console.log(appState);
        // console.log(thisDiscover.mostListenedCategory);
        thisDiscover.getData();
    }
    getData() {
        const thisDiscover = this;
        const url = settings.db.url + '/' + settings.db.songs;

        fetch(url)
            .then(response => response.json())
            .then(songs => {
                thisDiscover.songs = songs;
                if(thisDiscover.mostListenedCategory){
                    thisDiscover.songs = thisDiscover.songs.filter(song => song.categories.includes(thisDiscover.mostListenedCategory));
                }
                // console.log(thisDiscover.songs);
                thisDiscover.getAuthors();
            });
    }
    getAuthors(){
        const thisDiscover = this;
        const urlAuthors = settings.db.url + '/'+settings.db.authors;
        fetch(urlAuthors)
            .then(r => r.json())
            .then(authors => {
                thisDiscover.authors = authors;
                for(let song of thisDiscover.songs){
                    let author = thisDiscover.authors.find(item => item.id === song.authorId);
                    song.name = `${author.name} ${author.surname}`;
                }
                thisDiscover.renderResult();
                thisDiscover.getElements();
                thisDiscover.initAudio();
                thisDiscover.initEventListeners();
            })
    }
    renderResult() {
        const thisDiscover = this;
        thisDiscover.dom = {};
        thisDiscover.dom.wrapper = thisDiscover.element;
        const generateHTML = templates.discoverPage({songs: thisDiscover.songs, audioWrapper: thisDiscover.audioWrapper});
        // console.log(generateHTML);
        thisDiscover.dom.wrapper.innerHTML = generateHTML;
    }

    getElements() {
        // const thisDiscover = this;
        // thisDiscover.dom.audio = thisDiscover.dom.wrapper.querySelectorAll(select.homePage.audio);
    }
    initAudio() {
        const thisDiscover = this;
        // const audioElements = thisHome.dom.audio;
        new Audio(thisDiscover.audioWrapper);
    }
    initEventListeners() {
        const thisDiscover = this;
        document.addEventListener(`customPlayEventFor${thisDiscover.audioWrapper}`, (event) => {
            // console.log(event.detail.audioId);
            const audioId = event.detail.audioId;
            // console.log(audioId);
            const audio = thisDiscover.songs.find(song => song.id === parseInt(audioId));
            for (let category of audio.categories) {
                appState.addCategory(category);
            }
            console.log("Проигрывается аудио234:", audio);
            console.log("app:", appState);
        });
    }
}

export default Discover;