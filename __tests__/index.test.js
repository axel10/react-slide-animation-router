import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import Page1 from '../src/example/pages/Page1';
import SlideRouter, { initSlideRouter } from '../src/index';
const history = createMemoryHistory();
describe('A suite', () => {
    it('should true', () => {
        expect(true).toBe(true);
    });
    initSlideRouter({ history });
    const slideRouter = (React.createElement(Router, { history: history },
        React.createElement(Route, { render: () => {
                return (React.createElement(SlideRouter, null,
                    React.createElement(Route, { component: Page1, path: '/', exact: true })));
            } })));
    const routeWrap = mount(slideRouter).find('div#slide-router-wrap');
    it('should exist route wrap', () => {
        expect(routeWrap.length).toEqual(1);
    });
    it('should has route page', () => {
        expect(routeWrap.childAt(0).text().length > 0).toBe(true);
    });
    console.log(routeWrap.childAt(0).text());
});
//# sourceMappingURL=index.test.js.map