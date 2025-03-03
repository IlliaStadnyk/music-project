import {settings, templates, select} from "../setting.js";

class Search {
    constructor(element) {
        const thisSearch = this;
        thisSearch.element = element;
        thisSearch.getData();
        // thisSearch.render();
    }
    getData(){
        const thisSearch = this;
        // console.log(thisSearch.dom);
        if(!thisSearch.dom){
            const url = settings.db.url + '/' + settings.db.songs;
            fetch(url)
                .then(response => response.json())
                .then(songs => {
                    thisSearch.songs = songs;
                    thisSearch.render();
                    thisSearch.getElements();
                    thisSearch.initAction();
                    // thisSearch.initAudio();
                });
        } else {
            // console.log('2',thisSearch.dom.searchForm);
            const input = thisSearch.dom.searchForm.querySelector('[name="song_name"]');
            console.log(input.value);
            thisSearch.render();
        }
    }
    render(){
        const thisSearch = this;
        thisSearch.dom = {};
        thisSearch.dom.wrapper = thisSearch.element;
        console.log(thisSearch.songs);
        const generateHTML = templates.searchPage({songs: thisSearch.songs});
        thisSearch.dom.wrapper.innerHTML = generateHTML;
    }
    getElements(){
        const thisSearch = this;

        thisSearch.dom ={}
        thisSearch.dom.wrapper = thisSearch.element;

        thisSearch.dom.searchForm = thisSearch.dom.wrapper.querySelector(select.searchPage.searchForm)
    }
    initAction(){
        const thisSearch = this;
        console.log(thisSearch.dom.searchForm);
        thisSearch.dom.searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log('1',thisSearch.dom.searchForm);
            thisSearch.getData();
        });
    }
}

export default Search;