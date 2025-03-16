import {templates} from "../setting.js";

class SearchInput{
    constructor(element, songs){
        const thisSearchInput = this;
        thisSearchInput.element = element;
        thisSearchInput.songs = songs;
        thisSearchInput.categories =['All'];
        thisSearchInput.prepareCategories();
        thisSearchInput.render();
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