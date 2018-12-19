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
| 名称 | 描述 | 类型 | 默认值
| --- | --- | --- | ---
| routeAnimationDuration | 路由动画的持续时间 | number | 350
| history | history对象 | object | -
| wrapId | 路由容器的id | string | slide-router-wrap
| classNames | 路由动画的类名 | string | slide-router
| isRememberPosition | 是否记忆滚动位置 | bool | true
| transitionProps | react-transition-group的参数 | object | -
### disable animation：
Pass in noAnimate in state

    history.push('/your-path', { noAnimate: true })
    history.pop('/your-path', { noAnimate: true })
    history.replace('/your-path', { noAnimate: true })
