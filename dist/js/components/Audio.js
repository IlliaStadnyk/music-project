/* global GreenAudioPlayer */

class Audio {
    constructor(audioWrapper) {
        const thisAudio = this;
        thisAudio.audioWrapper = audioWrapper;

        this.initAudio();
    }
    initAudio() {
        const thisAudio = this;

        GreenAudioPlayer.init({
            selector: `.player_${thisAudio.audioWrapper}`,
            stopOthersOnPlay: true
        });
        console.log();

        requestAnimationFrame(() => {
            setTimeout(() => {
                const audioElements = document.querySelectorAll(`.player_${thisAudio.audioWrapper} audio`);
                audioElements.forEach(audioElement => {
                    audioElement.addEventListener('play', () => {
                        console.log(audioElement);

                        const customEvent = new CustomEvent(`customPlayEventFor${thisAudio.audioWrapper}`, {
                            bubbles: true,
                            detail: { audioId: audioElement.id }
                        });

                        document.dispatchEvent(customEvent);
                    });
                });
            }, 50);
        });
    }
}
export default Audio;