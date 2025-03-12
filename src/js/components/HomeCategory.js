import {settings, templates} from "../setting.js";

class HomeCategory{
    constructor(element){
        const thisHomeCategory = this;
        thisHomeCategory.element = element;
        thisHomeCategory.categories = []
        thisHomeCategory.getData();
    }
    getData(){
        const thisHomeCategory = this;
        const url = settings.db.url + '/' + settings.db.songs;

        fetch(url)
            .then(response => response.json())
            .then(songs => {
                for(const category of songs){
                    for(const item of category.categories){
                        // console.log('category name', item);
                        if(thisHomeCategory.categories.indexOf(item)===-1){
                            thisHomeCategory.categories.push(item);
                        }
                    }
                }
                // console.log(thisHomeCategory.categories);
                thisHomeCategory.render();
            });
    }
    render(){
        const thisHomeCategory = this;
        thisHomeCategory.dom =  {};
        thisHomeCategory.dom.wrapper = thisHomeCategory.element;
        const generateHTML = templates.homeCategory({categories: thisHomeCategory.categories});
        // console.log(thisHomeCategory.element);
        thisHomeCategory.dom.wrapper.innerHTML = generateHTML;
    }
}

export default HomeCategory;