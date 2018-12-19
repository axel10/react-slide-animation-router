import { mount, shallow } from 'enzyme';
import { createMemoryHistory } from "history";
import * as React from 'react';
import { Route, Router } from "react-router-dom";
import Page1 from "../src/example/pages/Page1";
import SlideRouter from "../src/index";

const history = createMemoryHistory();

describe('A suite', () => {
  it('should true', () => {
    expect(true).toBe(true);
  });

  const slideRouter = (
    <Router history={history}>
      <Route render={() => {
        return (
          <SlideRouter history={history}>
            <Route component={Page1} path={'/'} exact={true}/>
          </SlideRouter>
        );
      }}/>
    </Router>
  );


  const routeWrap = mount(slideRouter).find('div#slide-router-wrap');
  it('should exist route wrap', () => {
    expect(routeWrap.length).toEqual(1);
  });

  it('should has route page', () => {
    expect(routeWrap.childAt(0).text().length>0).toBe(true);
  });

  console.log(routeWrap.childAt(0).text());
});
