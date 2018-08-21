import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import Login from '@/views/Login';
import video from '@/components/video';
import videoPlay from '@/components/videoPlay';
import Register from '@/views/Register';
import Personal from '@/views/Personal';
import comment from '@/components/comment'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      redirect: 'video'
    }, {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'video',
          name: 'video',
          component: video
        },
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: 'animation',
        //   name: 'animation',
        //   component: animation
        // },
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: 'music',
        //   name: 'music',
        //   component: music
        // },
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: 'news',
        //   name: 'news',
        //   component: news
        // }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/videoPlay',
      name: 'videoPlay',
      component: videoPlay
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    }
  ]
})
