'use strict';
let learnjs = {};
learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() { return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 === 6 * __; }"
    }
]

learnjs.tempate = (name) => $('.templates .' + name).clone();

learnjs.landingView = () => learnjs.tempate('landing-view')

learnjs.problemView = (data) => {
    const problemNumber = parseInt(data, 10);
    const view = $('.templates .problem-view').clone();
    const problemData = learnjs.problems[problemNumber - 1];
    const resultFlash = view.find('.result');

    const checkAnswer = () => {
        const answer = view.find('.answer').val();
        const test = problemData.code.replace('__', answer) + '; problem();';
        return eval(test)
    }
    const checkAnswerClick = () => {
        if (checkAnswer()) {
            const correctFlash = learnjs.buildCorrectFlash(problemNumber)
            learnjs.flashElement(resultFlash, correctFlash);
        } else {
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false
    }
    if (problemNumber < learnjs.problems.length) {
        const buttonItem = learnjs.tempate('skip-btn');
        buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
        $('.nav-list').append(buttonItem);
        view.bind('removingView', () => {
            buttonItem.remove();
        })
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData, view)
    return view
}
learnjs.showView = (hash) => {
    const routes = {
        '#problem': learnjs.problemView,
        '': learnjs.landingView,
        '#': learnjs.landingView
    };
    const hashParts = hash.split('-');
    const viewFn = routes[hashParts[0]];
    if (viewFn) {
        learnjs.triggerEvent('removingView', []);
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }


}


learnjs.buildCorrectFlash = (problemNumber) => {
    const correctFlash = learnjs.tempate('correct-flash');
    let link = correctFlash.find('a');
    if (problemNumber < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNumber + 1));
    } else {
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash
}

learnjs.appOnReady = () => {
    window.onhashchange = () => {
        learnjs.showView(window.location.hash);
    }

    learnjs.showView(window.location.hash)
}

learnjs.applyObject = (obj, elem) => {
    for (let key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key])
    }
}

learnjs.flashElement = (elem, content) => {
    elem.fadeOut('fast', () => {
        elem.html(content);
        elem.fadeIn();
    })
}

learnjs.triggerEvent = (name, args) => {
    $('.view-container>*').trigger(name, args)
}