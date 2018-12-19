# React Slide Animation Router

![avatar](https://s1.ax1x.com/2018/12/10/FJCJv4.gif)

react router左右滑动动画的封装。

The react router slides around the animation.   
    
# Usage
```bash
$ npm install react-slide-animation-router
```

```javascript
import { Route, Router } from 'react-router-dom'
import SlideRouter, { initSlideRouter } from 'react-slide-animation-router'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

// 必须在创建路由之前调用initSlideRouter
// The initSlideRouter must be called before the route is created
initSlideRouter({
  history,
  routeAnimationDuration: 350
})

const renderRouter = () => {
  return (
    <SlideRouter>
      <Route path={'/'} component={Page1} exact={true}/>
      <Route path={'/p2'} component={Page2} exact={true}/>
      <Route path={'/p3'} component={Page3} exact={true}/>
    </SlideRouter>
  )
}
```

# Api

### initSlideRouter options
| key | detail | type | default
| --- | --- | --- | ---
| routeAnimationDuration | The duration of the route animation | number | 350
| history | history object | object | -
| wrapId | router container id | string | slide-router-wrap
| classNames | router animation class name | string | slide-router
| isRememberPosition | whether to remember the scroll position | bool | true
| transitionProps | react-transition-group parameters | object | -
### disable animation：
Pass in noAnimate in state

    history.push('/your-path', { noAnimate: true })
    history.pop('/your-path', { noAnimate: true })
    history.replace('/your-path', { noAnimate: true })
