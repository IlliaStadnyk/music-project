import {settings, templates} from "../setting.js";

class SearchInput{
    constructor(element){
        const thisSearchInput = this;
        thisSearchInput.element = element;
        thisSearchInput.categories =['All'];
        thisSearchInput.getData();
    }
    getData(){
        const thisSearchInput = this;
        const urlSongs = settings.db.url + '/' + settings.db.songs;
        fetch(urlSongs)
            .then(response => response.json())
            .then(songs => {
                thisSearchInput.songs = songs;
                // console.log(songs);
                thisSearchInput.prepareCategories();
                thisSearchInput.render();
            });
    }
    prepareCategories(){
        const thisSearchInput = this;
        for(const category of thisSearchInput.songs){
            for(const item of category.categories){
                // console.log('category name', item);
                if(thisSearchInput.categories.indexOf(item)===-1){
                    thisSearchInput.categories.push(item);
                }
            }
        }
    }
    render(){
        const thisSearchInput = this;
        thisSearchInput.dom ={};
        thisSearchInput.dom.wrapper = thisSearchInput.element
        const generateHTML = templates.searchInput( {categories: thisSearchInput.categories});
        thisSearchInput.dom.wrapper.innerHTML = generateHTML;
    }
}

export default SearchInput;