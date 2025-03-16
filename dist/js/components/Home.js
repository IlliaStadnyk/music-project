import {settings, templates, select, classNames} from '../setting.js'
import Audio from "./Audio.js";
import appState from "./AppState.js";
class Home {
    constructor(element, songs, authors) {
        const thisHome = this;
        thisHome.element = element;
        thisHome.songs = songs;
        thisHome.authors = authors;
        thisHome.audioWrapper = select.homePage.homeAudio;
        thisHome.categoryChecked = settings.category.all;
        thisHome.render();
        thisHome.getElements();
        thisHome.initAudio();
        thisHome.initEventListeners();
        thisHome.initActions()
    }


    render() {
        const thisHome = this;
        thisHome.dom = {};
        thisHome.dom.wrapper = thisHome.element;
        for(let song of thisHome.songs){
            let author = thisHome.authors.find(item => item.id === song.authorId);
            song.name = `${author.name} ${author.surname}`}

        const generateHTML = templates.homePage({songs: thisHome.songs, audioWrapper: thisHome.audioWrapper});
        thisHome.dom.wrapper.innerHTML = generateHTML;

    }

    getElements() {
        const thisHome = this;

        thisHome.dom.audio = thisHome.dom.wrapper.querySelectorAll(select.homePage.audio);
        thisHome.dom.categoryWrapper = document.querySelector(select.homePage.categoryList);
        thisHome.dom.categorySelect = document.querySelectorAll(select.homePage.homeCategory);
        thisHome.dom.joinButton = thisHome.dom.wrapper.querySelector(select.homePage.subscribeJoinButton);
        thisHome.dom.musicWrapper = thisHome.dom.wrapper.querySelectorAll(select.music.musicWrapper);
        console.log(thisHome.dom.musicWrapper);

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
    renderByCategory(){
        const thisHome = this;
        for(const song of thisHome.dom.musicWrapper){
            const categories = song.querySelector(select.music.songCategory);
           if (thisHome.categoryChecked === settings.category.all){
               song.classList.remove(classNames.song.hidden)
           }else {
               if(!categories.textContent.includes(thisHome.categoryChecked)){
                   song.classList.add(classNames.song.hidden);
               } else {
                   song.classList.remove(classNames.song.hidden);
               }
           }

        }
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
                    thisHome.renderByCategory()
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