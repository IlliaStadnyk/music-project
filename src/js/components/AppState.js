class AppState {
    constructor() {
        // Храним категории как объект
        const savedState = this.loadState();
        this.listenedCategories = savedState ? savedState.listenedCategories : {}; // Загружаем из localStorage, если есть

        this.state = savedState || { listenedCategories: {} }; // Если нет данных, то создаём новый объект
        // localStorage.removeItem('appState');
    }

    saveState() {
        localStorage.setItem("appState", JSON.stringify(this.state));
    }

    loadState() {
        const savedState = localStorage.getItem("appState");
        return savedState ? JSON.parse(savedState) : null;
    }

    // Добавление категории в объект
    addCategory(category) {
        if (!this.listenedCategories[category]) {
            this.listenedCategories[category] = 1;
        } else {
            this.listenedCategories[category]++;
        }
        this.saveState();
    }

    // Получение самой популярной категории
    getMostListenedCategory() {
        return Object.keys(this.listenedCategories).reduce((a, b) =>
            this.listenedCategories[a] > this.listenedCategories[b] ? a : b, null
        );
    }

    // Получить все прослушанные категории
    getCategories() {
        return Object.keys(this.listenedCategories);
    }
}

// Экспортируем класс, чтобы использовать его в других частях приложения
export default new AppState();
