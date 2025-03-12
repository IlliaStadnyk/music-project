// import * as Handlebars from "sass";

const musicItemTemplate = document.getElementById("template-music-item").innerHTML;

export const select={
    templatesOf: {
        homePage: '#template-home-page',
        discoverPage: '#template-discover-page',
        searchPage: '#template-search-page',
        searchInputPage: '#template-search-credentials',
        homeCategoryPage: '#template-home-category',
    },
    containerOf: {
        homePage: '.home__wrapper',
        searchPage: '.search__results_wrapper',
        discoverPage: '.discover__wrapper',
        pages: '#pages',
        searchInput: '.search__input',
        homeCategoryPage: '.home__category__wrapper',
    },
    nav: {
        links: '.main__nav a',
    },
    homePage: {
        audio: 'audio',
        homeAudio: 'homeAudio',
        homeCategory: '.home__category__item',
        categoryList: '.home__category__list',
        subscribeJoinButton:'.subscribe__button__button'
    },
    searchPage:{
        searchForm: '.search__input__name .search__form',
        inputSearch: '.search__form input',
        selectSearch: '.search__form select',
        audio: 'audio',
        searchAudio: 'searchAudio'
    },
    discoverPage:{
        discoverAudio: 'discoverAudio',
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
        url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
        songs: 'songs',
        authors: 'authors',
    },
    category: {
        all: 'All'
    }
}

export const templates = {
    homePage: Handlebars.compile(document.querySelector(select.templatesOf.homePage).innerHTML),
    searchPage: Handlebars.compile(document.querySelector(select.templatesOf.searchPage).innerHTML),
    discoverPage: Handlebars.compile(document.querySelector(select.templatesOf.discoverPage).innerHTML),
    searchInput: Handlebars.compile(document.querySelector(select.templatesOf.searchInputPage).innerHTML),
    homeCategory: Handlebars.compile(document.querySelector(select.templatesOf.homeCategoryPage).innerHTML),
}

export const partials ={
    audio: Handlebars.registerPartial("music-item", musicItemTemplate)
}