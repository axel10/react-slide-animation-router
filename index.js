"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_router_1 = require("react-router");
var react_transition_group_1 = require("react-transition-group");
var defaults = {
    wrapId: 'slide-router-wrap',
    classNames: 'slide-router'
};
var SlideRouter = /** @class */ (function (_super) {
    __extends(SlideRouter, _super);
    function SlideRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideRouter.prototype.componentDidMount = function () {
        var _a = this.props, history = _a.history, routeAnimationDuration = _a.routeAnimationDuration, _b = _a.classNames, classNames = _b === void 0 ? defaults.classNames : _b, _c = _a.wrapId, wrapId = _c === void 0 ? defaults.wrapId : _c, _d = _a.isRememberPosition, isRememberPosition = _d === void 0 ? true : _d;
        var baseStyle = document.createElement('style');
        baseStyle.innerHTML = "\n      ." + classNames + "-enter,." + classNames + "-enter-active{\n    position: relative;\n    opacity: 0;\n    transition : left 1s;\n  }\n  ." + classNames + "-exit,." + classNames + "-exit-active{\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 1000;\n        transition : left 1s;\n  }\n    ";
        document.body.appendChild(baseStyle);
        var lastPathname = history.location.pathname;
        var positionRecord = {};
        var isAnimating = false;
        var bodyOverflowX = '';
        var historyKeys = history.location.key ? [history.location.key] : [''];
        var currentHistoryPosition = historyKeys.indexOf(history.location.key);
        currentHistoryPosition = currentHistoryPosition === -1 ? 0 : currentHistoryPosition;
        history.listen((function () {
            if (lastPathname === history.location.pathname) {
                return;
            }
            if (!history.location.key) { // 目标页为初始页
                historyKeys[0] = '';
            }
            var delay = 50; // 适当的延时以保证动画生效
            if (!isAnimating) { // 如果正在进行路由动画则不改变之前记录的bodyOverflowX
                bodyOverflowX = document.body.style.overflowX;
            }
            var routerWrap = document.getElementById(wrapId);
            var originPage = routerWrap.children[routerWrap.children.length - 1];
            var oPosition = originPage.style.position;
            setTimeout(function () {
                document.body.style.overflowX = bodyOverflowX;
                originPage.style.position = oPosition;
                isAnimating = false;
            }, routeAnimationDuration + delay + 50); // 多50毫秒确保动画执行完毕
            document.body.style.overflowX = 'hidden'; // 防止动画导致横向滚动条出现
            if (history.location.state && history.location.state.noAnimate) { // 如果指定不要发生路由动画则让新页面直接出现
                setTimeout(function () {
                    var wrap = document.getElementById(wrapId);
                    var newPage = wrap.children[0];
                    var oldPage = wrap.children[1];
                    newPage.style.opacity = '1';
                    oldPage.style.display = 'none';
                });
                return;
            }
            var action = history.action;
            var currentRouterKey = history.location.key ? history.location.key : '';
            var oldScrollTop = window.scrollY;
            originPage.style.top = -oldScrollTop + 'px'; // 防止页面滚回顶部
            originPage.style.position = 'fixed';
            setTimeout(function () {
                isAnimating = true;
                var wrap = document.getElementById(wrapId);
                var newPage = wrap.children[0];
                var oldPage = wrap.children[1];
                if (!newPage || !oldPage) {
                    return;
                }
                var currentPath = history.location.pathname;
                var isForward = historyKeys[currentHistoryPosition + 1] === currentRouterKey; // 判断是否是用户点击前进按钮
                if (action === 'PUSH' || isForward) {
                    positionRecord[lastPathname] = oldScrollTop; // 根据之前记录的pathname来记录旧页面滚动位置
                    window.scrollTo(0, 0); // 如果是点击前进按钮或者是history.push则滚动位置归零
                    if (action === 'PUSH') {
                        historyKeys = historyKeys.slice(0, currentHistoryPosition + 1);
                        historyKeys.push(currentRouterKey); // 如果是history.push则清除无用的key
                    }
                }
                else {
                    if (isRememberPosition) {
                        window.scrollTo(0, positionRecord[currentPath]); // 滚动到之前记录的位置
                    }
                    // 删除滚动记录列表中所有子路由滚动记录
                    for (var key in positionRecord) {
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
                    newPage.style.transition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                    newPage.style.webkitTransition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                    oldPage.style.transition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                    oldPage.style.webkitTransition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                    setTimeout(function () {
                        newPage.style.opacity = '1'; // 防止页面闪烁
                        newPage.style.left = '0';
                        oldPage.style.left = '-100%';
                        console.log(newPage.style.left);
                        console.log(oldPage.style.left);
                    }, delay);
                }
                else {
                    newPage.style.left = '-100%';
                    oldPage.style.left = '0';
                    setTimeout(function () {
                        oldPage.style.transition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                        oldPage.style.webkitTransition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                        newPage.style.transition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                        newPage.style.webkitTransition = "left " + (routeAnimationDuration - delay) / 1000 + "s";
                        newPage.style.left = '0';
                        oldPage.style.left = '100%';
                        newPage.style.opacity = '1';
                    }, delay);
                }
                currentHistoryPosition = historyKeys.indexOf(currentRouterKey); // 记录当前history.location.key在historyKeys中的位置
                lastPathname = history.location.pathname; // 记录当前pathname作为滚动位置的键
            });
        }));
    };
    SlideRouter.prototype.render = function () {
        var _a = this.props, _b = _a.wrapId, wrapId = _b === void 0 ? defaults.wrapId : _b, _c = _a.classNames, classNames = _c === void 0 ? defaults.classNames : _c;
        var location = this.props.history.location;
        return (<React.Fragment>
        <react_transition_group_1.TransitionGroup id={wrapId}>
          <react_transition_group_1.CSSTransition classNames={classNames} timeout={this.props.routeAnimationDuration} key={location.key} {...this.props.transitionProps}>
            <react_router_1.Switch location={location}>
              {this.props.children}
            </react_router_1.Switch>
          </react_transition_group_1.CSSTransition>
        </react_transition_group_1.TransitionGroup>
      </React.Fragment>);
    };
    return SlideRouter;
}(React.Component));
exports["default"] = SlideRouter;
