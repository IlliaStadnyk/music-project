// import * as Handlebars from "sass";

export const select={
    templatesOf: {
        homePage: '#template-home-page',
        discoverPage: '#template-discover-page',
        searchPage: '#template-search-page',
    },
    containerOf: {
        homePage: '.home__wrapper',
        searchPage: '.search__wrapper',
        discoverPage: '.discover__wrapper',
        pages: '#pages'
    },
    nav: {
        links: '.main__nav a',
    },
    homePage: {
        audio: 'audio'
    },
    searchPage:{
        searchForm: '.search__input .search__form',
    }
}

export const classNames= {
    page:{
        pageActivate: 'active',
    },
    nav: {
        active: 'active',
    },
    pages: {
        active: 'active',
    }
}

export const settings = {
    db:{
        url: '//localhost:3131',
        songs: 'songs'
    }
}

export const templates = {
    homePage: Handlebars.compile(document.querySelector(select.templatesOf.homePage).innerHTML),
    searchPage: Handlebars.compile(document.querySelector(select.templatesOf.searchPage).innerHTML),
    discoverPage: Handlebars.compile(document.querySelector(select.templatesOf.discoverPage).innerHTML),
}