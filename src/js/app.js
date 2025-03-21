import {select, classNames, settings} from './setting.js'
import Home from './components/Home.js';
import Search from "./components/Search.js";
import Discover from "./components/Discover.js";
import SearchInput from "./components/SearchInput.js";
import HomeCategory from "./components/HomeCategory.js";
const app = {
    getData(){
        const thisApp =this
        const urlSongs = settings.db.url + '/' + settings.db.songs;
        const urlAuthors = settings.db.url + '/'+settings.db.authors;

        Promise.all([
            fetch(urlSongs),
            fetch(urlAuthors),
        ])
            .then(function(allResponse){
                const songs = allResponse[0];
                const authors = allResponse[1];
                return Promise.all([
                    songs.json(),
                    authors.json(),
                ]);
            })
            .then(function([songs, authors]){
                thisApp.songs = songs;
                thisApp.authors = authors;
                thisApp.init();
            })
    },
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
            item.addEventListener("click", function (event) {
                const clickedElement = this;
                event.preventDefault();
                const id = clickedElement.getAttribute("href").replace('#', '');
                // console.log(id);
                thisApp.activatePage(id);
                // change URL hash
                window.location.hash = '#/' + id;
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
        new Home(thisApp.homePage ,thisApp.songs, thisApp.authors);
    },
    initSearch: function(){
        const thisApp = this;
        thisApp.searchPage = document.querySelector(select.containerOf.searchPage);
        new Search(thisApp.searchPage, thisApp.songs, thisApp.authors);
    },
    initSearchInput: function(){
        const thisApp = this;
        thisApp.searchInput = document.querySelector(select.containerOf.searchInput);
        new SearchInput(thisApp.searchInput, thisApp.songs);
    },
    initDiscover: function(){
        const thisApp = this;
        thisApp.discoverPage = document.querySelector(select.containerOf.discoverPage);
        new Discover(thisApp.discoverPage);

    },
    initHomeCategory(){
        const thisApp = this;
        thisApp.homeCategory = document.querySelector(select.containerOf.homeCategoryPage);
        new HomeCategory(thisApp.homeCategory, thisApp.songs);
    },
    initActions(){
        const thisApp = this;
        document.querySelector(select.containerOf.homePage).addEventListener('join-now', (event) => {
            const id = event.target.getAttribute('id');
            thisApp.activatePage(id);
            window.location.hash = '#/' + id;
        })
    },
    init: function(){
        const thisApp=this;
        thisApp.initPages();
        thisApp.initHomeCategory();
        thisApp.initHome();
        thisApp.initSearchInput();
        thisApp.initSearch();
        thisApp.initDiscover();
        thisApp.initActions()
    }
}

app.getData();