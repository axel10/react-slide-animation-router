# React Slide Animation Router

![avatar](https://s1.ax1x.com/2018/12/10/FJCJv4.gif)

react router左右滑动动画的封装。
基于react-router 4.3.1和react-transition-group 2.4.0

The react router slides around the animation.   
Based on react-router 4.3.1 and react-transition-group 2.4.0  
    
# Usage
```bash
$ npm install react-slide-animation-router
```

```javascript
import SlideRouter from 'react-slide-animation-router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

export const routes = () => {
  return (
    <Router history={history}>
      <Route render={() => {
        return (
          <SlideRouter routeAnimationDuration={400} history={history}>
            <Route path='/' exact={true} component={Page1} />
            <Route path='/2' exact={true} component={Page2} />
            <Route path='/3' exact={true} component={Page3} />
          </SlideRouter>
        );
      }}/>
    </Router>
  );
};
```

# Api

### Props
| 名称 | 描述 | 类型 | 默认值
| --- | --- | --- | ---
| routeAnimationDuration | 路由动画的持续时间 | number | -
| history | history对象 | object | -
| wrapId | 路由容器的id | string | slide-router-wrap
| classNames | 路由动画的类名 | string | slide-router
| isRememberPosition | 是否记忆滚动位置 | bool | true
| transitionProps | react-transition-group的参数 | object | -
### 禁用动画：
state中传入noAnimate即可

    history.push('/your-path', { noAnimate: true })
    history.pop('/your-path', { noAnimate: true })
    history.replace('/your-path', { noAnimate: true })
