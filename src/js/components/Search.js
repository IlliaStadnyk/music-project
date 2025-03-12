import {settings, templates, select} from "../setting.js";
import Audio from "./Audio.js";
import appState from "./AppState.js";
class Search {
    constructor(element) {
        const thisSearch = this;
        thisSearch.element = element;
        thisSearch.audioWrapper = select.searchPage.searchAudio
        thisSearch.getData();
    }
    getData(){
        const thisSearch = this;
        const urlSongs = settings.db.url + '/' + settings.db.songs;
        fetch(urlSongs)
            .then(response => response.json())
            .then(songs => {
                thisSearch.songs = songs;
                if(thisSearch.searchValue){
                    thisSearch.songs = thisSearch.songs.filter(song => song.title.toLowerCase().includes(thisSearch.searchValue.toLowerCase()));
                }
                if(thisSearch.selectedCategoryValue && thisSearch.selectedCategoryValue !== 'All'){
                    thisSearch.songs = thisSearch.songs.filter(song =>
                        song.categories.includes(thisSearch.selectedCategoryValue)
                    );
                }
                thisSearch.getAuthors();
            });
    }
    getAuthors(){
        const thisSearch = this;
        const urlAuthors = settings.db.url + '/'+settings.db.authors;
        fetch(urlAuthors)
            .then(r => r.json())
            .then(authors => {
                thisSearch.authors = authors;
                for(let song of thisSearch.songs){
                    let author = thisSearch.authors.find(item => item.id === song.authorId);
                    song.name = `${author.name} ${author.surname}`;
                }
                thisSearch.renderResult();
                thisSearch.getElements();
                thisSearch.initAction();
                thisSearch.initAudio();
                thisSearch.initEventListeners();
            })
    }
    renderResult(){
        const thisSearch = this;
        thisSearch.dom = {};
        thisSearch.dom.wrapper = thisSearch.element;
        const generateHTML = templates.searchPage({songs: thisSearch.songs, audioWrapper: thisSearch.audioWrapper});
        thisSearch.dom.wrapper.innerHTML = generateHTML;
    }
    getElements(){
        const thisSearch = this;

        thisSearch.dom ={}
        thisSearch.dom.wrapper = thisSearch.element;

        thisSearch.dom.searchForm = document.querySelector(select.searchPage.searchForm);
        thisSearch.dom.inputSearch = document.querySelector(select.searchPage.inputSearch);
        thisSearch.dom.selectSearch = document.querySelector(select.searchPage.selectSearch);
        thisSearch.dom.audio = thisSearch.dom.wrapper.querySelectorAll(select.searchPage.audio);
        // console.log(thisSearch.dom.wrapper);
    }
    initAction(){
        const thisSearch = this;
        if(!thisSearch.dom.searchForm.dataset.listener){
            thisSearch.dom.searchForm.addEventListener("submit", function (event) {
                event.preventDefault();
                thisSearch.selectedCategoryValue = thisSearch.dom.selectSearch.value;
                thisSearch.searchValue = thisSearch.dom.inputSearch.value;
                thisSearch.getData();
            });
            thisSearch.dom.searchForm.dataset.listener = "true";
        }

    }
    initAudio(){
        const thisSearch = this;
        // const audioElements = thisSearch.dom.audio;

        new Audio(thisSearch.audioWrapper);
    }
    initEventListeners() {
        const thisSearch = this;
        document.addEventListener(`customPlayEventFor${thisSearch.audioWrapper}`, (event) => {
            const audioId = event.detail.audioId;
            const audio = thisSearch.songs.find(song => song.id === parseInt(audioId));
            for (let category of audio.categories) {
                appState.addCategory(category);
            }

        });
    }
}

export default Search;