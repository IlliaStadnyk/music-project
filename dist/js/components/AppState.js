class AppState {
    constructor() {
        // Храним категории как объект
        const savedState = this.loadState();
        this.listenedCategories = savedState ? savedState.listenedCategories : {};

        this.state = savedState || { listenedCategories: {} };
    }

    saveState() {
        localStorage.setItem("appState", JSON.stringify(this.state));
    }

    loadState() {
        const savedState = localStorage.getItem("appState");
        return savedState ? JSON.parse(savedState) : null;
    }

    addCategory(category) {
        if (!this.listenedCategories[category]) {
            this.listenedCategories[category] = 1;
        } else {
            this.listenedCategories[category]++;
        }
        this.saveState();
    }

    getMostListenedCategory() {
        return Object.keys(this.listenedCategories).reduce((a, b) =>
            this.listenedCategories[a] > this.listenedCategories[b] ? a : b, null
        );
    }


}
export default new AppState();
