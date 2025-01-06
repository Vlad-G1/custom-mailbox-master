function search() {
    setTimeout(() => {
        const searchIncomingItems = document.querySelectorAll('.js-incoming-letters-list .js-letter-item'),
            searchSentItems = document.querySelectorAll('.js-sent-letters-list .js-letter-item'),
            searchInput = document.querySelector('.js-search-input'),
            noResultsText = document.querySelector('.js-not-found-text'),
            tabs = document.querySelectorAll('.letters-types__list-item');
        let activeList = 'incoming';

        for (let tab of tabs) {
            tab.addEventListener('click', ()=> {
                searchInput.value = '';
                noResultsText.classList.add('disable');
                searchIncomingItems.forEach((searchItem) => {
                    searchItem.classList.remove('disable');
                });
                searchSentItems.forEach((searchItem) => {
                    searchItem.classList.remove('disable');
                });
                if (tab.classList.contains('js-tab-sent')) {
                    activeList = 'sent';
                } else activeList = 'incoming';
                document.querySelector(`.js-${activeList}-letters-list`).classList.remove('disable');
            })
        }

        searchInput.addEventListener('input', (event) => {
            const searchText = event.target.value.toLowerCase();
            let isAnyItemVisible = false;

            if (activeList === 'incoming') {
                searchIncomingItems.forEach((searchItem) => {
                    const lettersSection = searchItem.closest('.js-incoming-letters-list');
                    const nameText = searchItem.querySelector('.letters-list__letter-title').textContent.toLowerCase();

                    if (nameText.includes(searchText)) {
                        searchItem.classList.remove('disable');
                        isAnyItemVisible = true;
                    } else {
                        searchItem.classList.add('disable');
                    }

                    if (lettersSection) {
                        const hasVisibleItems = Array.from(lettersSection.querySelectorAll('.js-letter-item')).some(
                            item => !item.classList.contains('disable')
                        );
                        if (!hasVisibleItems) {
                            lettersSection.classList.add('disable');
                        } else {
                            lettersSection.classList.remove('disable');
                        }
                    }
                });
            }
            else {
                searchSentItems.forEach((searchItem) => {
                    const lettersSection = searchItem.closest('.js-sent-letters-list');
                    const nameText = searchItem.querySelector('.letters-list__letter-title').textContent.toLowerCase();

                    if (nameText.includes(searchText)) {
                        searchItem.classList.remove('disable');
                        isAnyItemVisible = true;
                    } else {
                        searchItem.classList.add('disable');
                    }

                    if (lettersSection) {
                        const hasVisibleItems = Array.from(lettersSection.querySelectorAll('.js-letter-item')).some(
                            item => !item.classList.contains('disable')
                        );
                        if (!hasVisibleItems) {
                            lettersSection.classList.add('disable');
                        } else {
                            lettersSection.classList.remove('disable');
                        }
                    }
                });
            }
            if (isAnyItemVisible) {
                noResultsText.classList.add('disable');
            } else {
                noResultsText.classList.remove('disable');
            }
        });

    }, 2000)
}

export default search;