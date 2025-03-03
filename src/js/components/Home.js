import {settings, templates, select} from '../setting.js'

class Home {
    constructor(element) {
        const thisHome = this;
        thisHome.element = element;
        // console.log(thisHome.element)
        thisHome.getData();
    }

    getData() {
        const thisHome = this;
        const url = settings.db.url + '/' + settings.db.songs;

        fetch(url)
            .then(response => response.json())
            .then(songs => {
                thisHome.songs = songs;
                thisHome.render();
                thisHome.getElements();
                thisHome.initAudio();
            });
    }

    render() {
        const thisHome = this;
        thisHome.dom = {};
        thisHome.dom.wrapper = thisHome.element;

        // console.log({songs: thisHome.songs});
        const generateHTML = templates.homePage({songs: thisHome.songs});
        thisHome.dom.wrapper.innerHTML = generateHTML;
        // console.log(generateHTML);
    }

    getElements() {
        const thisHome = this;
        // console.log(thisHome.dom.wrapper);
        thisHome.dom.audio = thisHome.dom.wrapper.querySelectorAll(select.homePage.audio);
    }
    initAudio() {
        const thisHome = this;
        const audioElements = thisHome.dom.audio; // Получаем список всех аудиоплееров
        // console.log(audioElements);
        audioElements.forEach(audio => {
            audio.addEventListener('play', function () {
                console.log(audio);
                audioElements.forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.currentTime = 0;
                        otherAudio.pause();
                    }
                });
            });
        });
    }
}
export default Home;