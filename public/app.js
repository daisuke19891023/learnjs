'use strict';
let learnjs = {};
learnjs.problemView = (problemNumber) => {
    const title = 'Problem #' + problemNumber + ' Coming soon!'
    return $('<div class="problem-view">').text(title)
}
learnjs.showView = (hash) => {
    const routes = {
        '#problem': learnjs.problemView
    };
    const hashParts = hash.split('-');
    const viewFn = routes[hashParts[0]];
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

learnjs.appOnReady = () => {
    window.onhashchange = () => {
        learnjs.showView(window.location.hash);
    }

    learnjs.showView(window.location.hash)
}