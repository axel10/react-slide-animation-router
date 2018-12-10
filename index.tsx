import { History } from 'history';
import * as React from 'react';
import { Switch } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
  TransitionChildren
} from 'react-transition-group/Transition';

interface ISlideTransitionProps {
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  addEndListener?: EndHandler;
  onEnter?: EnterHandler;
  onEntering?: EnterHandler;
  onEntered?: EnterHandler;
  onExit?: ExitHandler;
  onExiting?: ExitHandler;
  onExited?: ExitHandler;

  [prop: string]: any;

  children?: TransitionChildren;
}

export interface IProps {
  routeAnimationDuration: number;
  history: History;
  wrapId?: string;
  classNames?: string;
  isRememberPosition?: boolean;
  transitionProps?: ISlideTransitionProps;
}

const defaults = {
  wrapId: 'slide-router-wrap',
  classNames: 'slide-router'
};

export default class SlideRouter extends React.Component <IProps> {

  public componentDidMount (): void {

    const { history, routeAnimationDuration, classNames = defaults.classNames, wrapId = defaults.wrapId, isRememberPosition = true } = this.props;
    const baseStyle = document.createElement('style');
    baseStyle.innerHTML = `
      .${classNames}-enter,.${classNames}-enter-active{
    position: relative;
    opacity: 0;
    transition : left 1s;
  }
  .${classNames}-exit,.${classNames}-exit-active{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
        transition : left 1s;
  }
    `;
    document.body.appendChild(baseStyle);

    let lastPathname = history.location.pathname;
    const positionRecord = {};
    let isAnimating = false;
    let bodyOverflowX = '';
    let historyKeys = history.location.key ? [history.location.key] : [''];

    let currentHistoryPosition = historyKeys.indexOf(history.location.key);
    currentHistoryPosition = currentHistoryPosition === -1 ? 0 : currentHistoryPosition;
    history.listen((() => {
      if (lastPathname === history.location.pathname) { return; }

      if (!history.location.key) {  // 目标页为初始页
        historyKeys[0] = '';
      }
      const delay = 50; // 适当的延时以保证动画生效
      if (!isAnimating) { // 如果正在进行路由动画则不改变之前记录的bodyOverflowX
        bodyOverflowX = document.body.style.overflowX;
      }
      const routerWrap = document.getElementById(wrapId);
      const originPage = routerWrap.children[routerWrap.children.length - 1] as HTMLElement;
      const oPosition = originPage.style.position;
      setTimeout(() => { // 动画结束后还原相关属性
        document.body.style.overflowX = bodyOverflowX;
        originPage.style.position = oPosition;
        isAnimating = false;
      }, routeAnimationDuration + delay + 50); // 多50毫秒确保动画执行完毕
      document.body.style.overflowX = 'hidden'; // 防止动画导致横向滚动条出现

      if (history.location.state && history.location.state.noAnimate) { // 如果指定不要发生路由动画则让新页面直接出现
        setTimeout(() => {
          const wrap = document.getElementById(wrapId);
          const newPage = wrap.children[0] as HTMLElement;
          const oldPage = wrap.children[1] as HTMLElement;
          newPage.style.opacity = '1';
          oldPage.style.display = 'none';
        });
        return;
      }
      const { action } = history;

      const currentRouterKey = history.location.key ? history.location.key : '';
      const oldScrollTop = window.scrollY;
      originPage.style.top = -oldScrollTop + 'px'; // 防止页面滚回顶部
      originPage.style.position = 'fixed';
      setTimeout(() => { // 新页面已插入到旧页面之前
        isAnimating = true;
        const wrap = document.getElementById(wrapId);
        const newPage = wrap.children[0] as HTMLElement;
        const oldPage = wrap.children[1] as HTMLElement;
        if (!newPage || !oldPage) {
          return;
        }
        const currentPath = history.location.pathname;

        const isForward = historyKeys[currentHistoryPosition + 1] === currentRouterKey; // 判断是否是用户点击前进按钮

        if (action === 'PUSH' || isForward) {
          positionRecord[lastPathname] = oldScrollTop; // 根据之前记录的pathname来记录旧页面滚动位置
          window.scrollTo(0, 0);  // 如果是点击前进按钮或者是history.push则滚动位置归零

          if (action === 'PUSH') {
            historyKeys = historyKeys.slice(0, currentHistoryPosition + 1);
            historyKeys.push(currentRouterKey); // 如果是history.push则清除无用的key
          }
        } else {
          if (isRememberPosition) {
            window.scrollTo(0, positionRecord[currentPath]); // 滚动到之前记录的位置
          }

          // 删除滚动记录列表中所有子路由滚动记录
          for (const key in positionRecord) {
            if (key === currentPath) {
              continue;
            }
            if (key.startsWith(currentPath)) {
              delete positionRecord[key];
            }
          }
        }

        if (action === 'REPLACE') { // 如果为replace则替换当前路由key为新路由key
          historyKeys[currentHistoryPosition] = currentRouterKey;
        }
        window.sessionStorage.setItem('historyKeys', JSON.stringify(historyKeys)); // 对路径key列表historyKeys的修改完毕，存储到sessionStorage中以防刷新导致丢失。

        // 开始进行滑动动画
        newPage.style.width = '100%';
        oldPage.style.width = '100%';
        newPage.style.top = '0px';
        if (action === 'PUSH' || isForward) {
          newPage.style.left = '100%';
          oldPage.style.left = '0';

          newPage.style.transition = `left ${(routeAnimationDuration - delay) / 1000}s`;
          newPage.style.webkitTransition = `left ${(routeAnimationDuration - delay) / 1000}s`;
          oldPage.style.transition = `left ${(routeAnimationDuration - delay) / 1000}s`;
          oldPage.style.webkitTransition = `left ${(routeAnimationDuration - delay) / 1000}s`;

          setTimeout(() => {

            newPage.style.opacity = '1'; // 防止页面闪烁
            newPage.style.left = '0';
            oldPage.style.left = '-100%';

            console.log(newPage.style.left);
            console.log(oldPage.style.left);
          }, delay);
        } else {
          newPage.style.left = '-100%';
          oldPage.style.left = '0';
          setTimeout(() => {
            oldPage.style.transition = `left ${(routeAnimationDuration - delay) / 1000}s`;
            oldPage.style.webkitTransition = `left ${(routeAnimationDuration - delay) / 1000}s`;
            newPage.style.transition = `left ${(routeAnimationDuration - delay) / 1000}s`;
            newPage.style.webkitTransition = `left ${(routeAnimationDuration - delay) / 1000}s`;
            newPage.style.left = '0';
            oldPage.style.left = '100%';
            newPage.style.opacity = '1';
          }, delay);
        }
        currentHistoryPosition = historyKeys.indexOf(currentRouterKey); // 记录当前history.location.key在historyKeys中的位置
        lastPathname = history.location.pathname;// 记录当前pathname作为滚动位置的键
      });
    }));
  }

  public render () {
    const { wrapId = defaults.wrapId, classNames = defaults.classNames } = this.props;
    const { location } = this.props.history;

    return (
      <React.Fragment>
        <TransitionGroup id={wrapId}>
          <CSSTransition classNames={classNames} timeout={this.props.routeAnimationDuration}
                         key={location.key} {...this.props.transitionProps}>
            <Switch location={location}>
              {this.props.children}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </React.Fragment>
    );
  }
}
