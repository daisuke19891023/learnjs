describe('LearnJS', () => {
    it('can show problem view', () => {
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    })
    it('show the landing page view when there is no hash', () => {
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    })
    it('passes the hash view parameter to the view function', () => {
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    })
})

describe('problem view 1', () => {
    beforeAll(() => {
        let view = learnjs.problemView('1');
        this.view = view
    })
    it('has a  title that includes the problem number', () => {
        expect(view.find('.title').text()).toEqual('Problem #1');

    })
    it('show the desicription', () => {
        expect(view.find('[data-name="description"]').text()).toEqual('What is truth?');
    })
    it('show the desicription', () => {
        expect(view.find('[data-name="code"]').text()).toEqual('function problem() { return __; }');
    })

})

describe('problem view 2', () => {
    beforeAll(() => {
        let view = learnjs.problemView('2');
        this.view = view
    })
    it('has a  title that includes the problem number', () => {
        expect(view.find('.title').text()).toEqual('Problem #2');

    })
    it('show the desicription', () => {
        expect(view.find('[data-name="description"]').text()).toEqual('Simple Math');
    })
    it('show the desicription', () => {
        expect(view.find('[data-name="code"]').text()).toEqual('function problem() { return 42 === 6 * __; }');
    })

})
describe('test onready', () => {
    it('invokes therouterwhen loaded', () => {
        spyOn(learnjs, 'showView');
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    })
    it('subscribe to the hash change event', () => {

        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    })
})
describe('answer selection', () => {
    beforeAll(() => {
        let view = learnjs.problemView('1');
        this.view = view
    })
    it('can check a correct answer by hitting a button', () => {
        view.find('.answer').val('true');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Correct!');
    })
    it('rejects an incorrect answer', () => {
        view.find('.answer').val('false');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Incorrect!');
    })
})