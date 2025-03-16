import {templates, select, classNames, settings} from "../setting.js";
import Audio from "./Audio.js";
import appState from "./AppState.js";
class Search {
    constructor(element, songs, authors) {
        const thisSearch = this;
        thisSearch.element = element;
        thisSearch.songs = songs;
        thisSearch.authors = authors;
        thisSearch.audioWrapper = select.searchPage.searchAudio
        thisSearch.render();
        thisSearch.getElements();
        thisSearch.initAction();
        thisSearch.initAudio();
        thisSearch.initEventListeners();
    }

    render(){
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
        thisSearch.dom.mussicWrapper = thisSearch.dom.wrapper.querySelectorAll(select.music.musicWrapper);
        // console.log(thisSearch.dom.wrapper);
    }
    initAction(){
        const thisSearch = this;
        if(!thisSearch.dom.searchForm.dataset.listener){
            thisSearch.dom.searchForm.addEventListener("submit", function (event) {
                event.preventDefault();
                thisSearch.selectedCategoryValue = thisSearch.dom.selectSearch.value;
                thisSearch.searchNameValue = thisSearch.dom.inputSearch.value.toLowerCase();
                thisSearch.renderBySearch();
            });
            thisSearch.dom.searchForm.dataset.listener = "true";
        }

    }
    renderBySearch(){
        const thisSearch = this;

        for (const song of thisSearch.dom.mussicWrapper){
            const name = song.querySelector(select.music.songName).textContent.toLowerCase();
            const categories = song.querySelector(select.music.songCategory).textContent;
            if(!name.includes(thisSearch.searchNameValue)){

                song.classList.add(classNames.song.hidden);
            } else {
                if(thisSearch.selectedCategoryValue === settings.category.all){
                    song.classList.remove(classNames.song.hidden)
                } else {
                    if(!categories.includes(thisSearch.selectedCategoryValue)){
                        song.classList.add(classNames.song.hidden)
                    }else {
                        song.classList.remove(classNames.song.hidden)
                    }
                }
            }
        }
    }
    initAudio(){
        const thisSearch = this;

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