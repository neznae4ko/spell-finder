const queryInput = document.getElementById('query-input');
const langSelect = document.getElementById('lang-select');
const widgetContainer = document.getElementById('widget-container');
const loadingIndicator = document.getElementById('loading-indicator');
const emptyState = document.getElementById('empty-state');

let widget = null;
let resizeTimeout = null;

function updateWidgetSize() {
    if (widget) {
        const rect = widgetContainer.getBoundingClientRect();
        const w = Math.floor(rect.width);
        const h = Math.floor(rect.height);
        if (w > 0 && h > 0) {
            console.log("Sidepanel: Resizing to", w, h);
            widget.resize(w, h);
        }
    }
}

const resizeObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateWidgetSize, 150);
});

resizeObserver.observe(widgetContainer);

function performSearch(query, lang) {
    if (!query) return;

    const selectedLang = lang || langSelect.value;
    queryInput.value = query;

    emptyState.style.display = 'none';
    loadingIndicator.style.display = 'block';
    widgetContainer.style.visibility = 'visible';

    // Ждем следующего кадра анимации, чтобы браузер обновил размеры
    requestAnimationFrame(() => {
        const rect = widgetContainer.getBoundingClientRect();
        const w = Math.floor(rect.width) || 350;
        const h = Math.floor(rect.height) || 500;

        console.log("Sidepanel: Search init size", w, h);

        try {
            if (!widget) {
                widget = new YG.Widget("widget-container", {
                    width: w,
                    height: h,
                    components: 255,
                    backgroundColor: '#000000',
                    events: {
                        'onFetchDone': (e) => {
                            loadingIndicator.style.display = 'none';
                            if (e.totalResult === 0) {
                                alert("Ничего не найдено");
                                widgetContainer.style.visibility = 'hidden';
                                emptyState.style.display = 'block';
                            }
                        }
                    }
                });
            } else {
                widget.resize(w, h);
            }
            widget.fetch(query, selectedLang);
        } catch (err) {
            console.error("Search error:", err);
        }
    });
}

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && (changes.lastQuery || changes.timestamp)) {
        chrome.storage.local.get(['lastQuery'], (result) => {
            if (result.lastQuery) performSearch(result.lastQuery);
        });
    }
});

chrome.storage.local.get(['lastQuery'], (result) => {
    if (result.lastQuery) performSearch(result.lastQuery);
});

queryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch(queryInput.value);
});

langSelect.addEventListener('change', () => {
    performSearch(queryInput.value);
});
