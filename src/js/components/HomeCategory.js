import {templates} from "../setting.js";

class HomeCategory{
    constructor(element, songs){
        const thisHomeCategory = this;
        thisHomeCategory.element = element;
        thisHomeCategory.categories = []
        thisHomeCategory.songs = songs;
        console.log(thisHomeCategory.songs);
        thisHomeCategory.initCategory()
        thisHomeCategory.render()
    }
    initCategory(){
        const thisHomeCategory = this;
        for(const category of thisHomeCategory.songs){
            for(const item of category.categories){
                if(thisHomeCategory.categories.indexOf(item)===-1){
                    thisHomeCategory.categories.push(item);
                }
            }
        }
    }
    render(){
        const thisHomeCategory = this;
        thisHomeCategory.dom =  {};
        thisHomeCategory.dom.wrapper = thisHomeCategory.element;
        const generateHTML = templates.homeCategory({categories: thisHomeCategory.categories});
        thisHomeCategory.dom.wrapper.innerHTML = generateHTML;
    }
}

export default HomeCategory;