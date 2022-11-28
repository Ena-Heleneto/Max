/*
 * @Author: By
 * @Date: 2022-06-16 10:00:26
 * @LastEditTime: 2022-11-28 21:30:58
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\main.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { ViteSSG } from 'vite-ssg'

import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'
import 'normalize.css/normalize.css'
import '@unocss/reset/tailwind.css'
import 'nprogress/nprogress.css'
import 'uno.css'

import 'swiper/css'
import 'swiper/css/autoplay'

import './assets/css/main.css'

setDomFontSize()

// const generatedRoutesTemp = generatedRoutes.filter(e => e.name === 'login')
const generatedRoutesTemp = generatedRoutes
const routes = setupLayouts(generatedRoutesTemp)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    consola.info(ctx)
    ctx.router.beforeEach(async (to) => {
      if (!useUserStore().hasToken && to.path !== '/login')
        return { path: '/login' }
    })
    Object.values(import.meta.globEager('./modules/*.ts')).forEach((i: any) => i.install?.(ctx))
    ctx.app.config.globalProperties.router = ctx.router
  },
)

// export const app = createApp()
// consola.info(app)
