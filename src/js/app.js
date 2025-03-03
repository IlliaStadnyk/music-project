import {select, classNames} from './setting.js'
import Home from './components/Home.js';
import Search from "./components/Search.js";
const app = {
    initPages(){
        const thisApp = this;
        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        thisApp.links = document.querySelectorAll(select.nav.links);
        // console.log(thisApp.pages);
        const idFromHash = window.location.hash.replace('#/','');

        let pageMatchingHash = thisApp.pages[0].id;
        for (let page of thisApp.pages) {
            if(page.id === idFromHash) {
                pageMatchingHash = page.id;
                break;
            }
        }
        thisApp.activatePage(pageMatchingHash);
        for (let item of thisApp.links) {
            item.addEventListener("click", function(event) {
                const clickedElement = this;
                event.preventDefault();
                const id = clickedElement.getAttribute("href").replace('#','');
                // console.log(id);
                thisApp.activatePage(id);
                // change URL hash
                window.location.hash = '#/'+id;
            })
        }
    },
    activatePage: function(pageId)  {
        const thisApp = this;

        for(let page of thisApp.pages) {
            page.classList.toggle(classNames.pages.active, page.id === pageId);
        }

        for(let link of thisApp.links) {
            link.classList.toggle(classNames.nav.active, link.getAttribute('href') === '#'+pageId);
        }
    },
    initHome: function(){
        const thisApp = this;
        thisApp.homePage = document.querySelector(select.containerOf.homePage);
        console.log('home',thisApp.homePage);
        new Home(thisApp.homePage);
    },
    initSearch: function(){
        const thisApp = this;
        thisApp.searchPage = document.querySelector(select.containerOf.searchPage);
        new Search(thisApp.searchPage);
    },
    initDiscover: function(){},
    init: function(){
        const thisApp=this;
        thisApp.initPages()
        thisApp.initHome();
        thisApp.initSearch();
        thisApp.initDiscover();
    }
}

app.init();