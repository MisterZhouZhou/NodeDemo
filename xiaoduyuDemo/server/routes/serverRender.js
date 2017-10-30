/**
 * Created by chengfei on 2017/10/24.
 */
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import axios from 'axios'
import DocumentMeta from 'react-document-meta'

import configureStore from '../../src/store/configureStore'
import { getInitialState } from '../../src/reducers'
import crateRoutes from '../../src/routes'

const serverRender = express.Router()

import config from '../../config'

// 在服务端加载数据
function loadData(props, store, userinfo, callback) {

    // 壳组件，每个 container 组件，都是套在壳组件里面
    let shellComponent = props.components[props.components.length - 1].WrappedComponent
    // 容器组件，组装 components 里面各种小组件
    let containerComponent = shellComponent.defaultProps.component

    // 如果有服务器预加载，那么执行回调
    if (!containerComponent.loadData) {
        callback()
        return
    }

    if (process.env.NODE_ENV == 'development') {
        console.log('开始获取数据')
    }

    containerComponent.loadData({ store, props }, (notFound, desc)=>{

        if (process.env.NODE_ENV == 'development') {
        console.log('获取成功')
    }

    callback(notFound, desc)
})

}

const authAccessToken = (accessToken, callback)=> {

    if (!accessToken) {
        callback(null)
        return
    }

    let option = {
        url: config.api_url + '/' + config.api_verstion + '/user',
        method: 'post',
        data: {
            access_token: accessToken
        }
    }

    axios(option).then(resp => {

        const result = resp.data

        if (result.success) {
        callback(result.data)
    } else {
        callback(null)
    }

})
.catch(function (error) {
        callback(null)
    })

}

serverRender.route('*').get((req, res) => {

    const accessToken = req.cookies[config.auth_cookie_name] || null,
    expires = req.cookies[''] || null,
    history = createMemoryHistory(),
    store = configureStore(getInitialState())

authAccessToken(accessToken, (userinfo)=>{

    if (userinfo) {
        // 如果获取到用户信息，那么说明token是有效的，因此将用户信息添加到store
        store.dispatch({ type: 'ADD_ACCESS_TOKEN', access_token: accessToken, expires: expires })
        store.dispatch({ type: 'SET_USER', userinfo })
    } else {
        // 如果无效，则删除token
        res.clearCookie(config.auth_cookie_name)
}

let routes = crateRoutes(history, userinfo ? userinfo : null)

if (process.env.NODE_ENV == 'development') console.log('请求地址:' + req.originalUrl)

match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);

    } else if (error) {
        res.send(500, error.message);

    } else if (!renderProps) {
    res.status(404);
    res.redirect('/not-found');

} else if (renderProps) {

    loadData(renderProps, store, userinfo, (httpStatusCode, desc) => {

        if (httpStatusCode && httpStatusCode == 403) {
        res.status(403);
        res.redirect('/notice?notice='+desc)
        return

    } else if (httpStatusCode) {
        res.status(404);
        res.redirect('/not-found');
        return
    }

    let reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
    const html = renderToString(<Provider store={store}>{<RouterContext {...renderProps} />}</Provider>)

    // 获取页面的meta，嵌套到模版中
    let meta = DocumentMeta.renderAsHTML()

    res.render('../dist/index.ejs', { meta, html, reduxState });

    if (process.env.NODE_ENV == 'development') console.log('页面渲染完成')

})

}
})

})

})

export default serverRender;
