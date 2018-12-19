import Page1 from "@/example/pages/Page1";
import Page2 from "@/example/pages/Page2";
import Page3 from "@/example/pages/Page3";
import SlideRouter, { initSlideRouter } from '@/index';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Router } from 'react-router-dom';

const history = createBrowserHistory();
// 必须在创建路由之前调用initSlideRouter
initSlideRouter();

const renderRouter = () => {
  return (
    <SlideRouter routeAnimationDuration={350} history={history}>
      <Route path={'/'} component={Page1} exact={true}/>
      <Route path={'/p2'} component={Page2} exact={true}/>
      <Route path={'/p3'} component={Page3} exact={true}/>
    </SlideRouter>
  );
};

ReactDOM.render(
  <React.Fragment>
    <Router history={history}>
      <React.Fragment>
        <Link to={'/'}>page1</Link>
        <Link to={'/p2'}>page2</Link>
        <Link to={'/p3'}>page3</Link>
        <Route render={renderRouter}/>
      </React.Fragment>
    </Router>
  </React.Fragment>, document.getElementById('root'));
