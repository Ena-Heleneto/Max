<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-03 01:56:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-09 19:33:51
 * @FilePath: \big-screen\src\layouts\screen.vue
 * @Description: 页面layout
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
/**
 * @description: 菜单对象
 */
const menuInfo = menuStore()

/**
 * @description: 自定义菜单类名字典
 */
const menuMap = new Map().set(4, 'averageOutput').set(6, 'publicOpinionMonitoring')

const isOpen = ref<boolean>(false)
const input = ref<string>('')

const chatList = ref<{ send: string; content: string }[]>([
  { send: 'ai', content: '你好，我是AI助手，请问有什么可以帮助你的吗？' },
  { send: 'user', content: '你好，AI助手，我想了解一下你能做些什么？' },
  { send: 'ai', content: '我可以帮助你获取信息、回答问题、提供建议等。' },
  { send: 'user', content: '那你能帮我做什么具体的事情吗？' },
  { send: 'ai', content: '当然可以，我可以帮助你查询天气、新闻、百科知识等。' },
  { send: 'user', content: '好的，那请帮我查询一下今天的天气。' },
  { send: 'ai', content: '好的，请稍等，我正在为您查询今天的天气信息。' },

])

const { userCode, token } = storeToRefs(useUserStore())

async function handleSend() {
  if (!input.value.trim())
    return

  try {
    chatList.value.push({ send: 'user', content: input.value })
    input.value = ''

    const submitid = new Date().getTime()

    const res = await aids({ submitid, usercode: userCode.value, sign: hexMD5(submitid + userCode.value + token.value), question: input.value })

    consola.info('AI Response:', res)
  }
  catch (error) {
    console.error('Error sending message:', error)
    console.error(error)

    chatList.value.push({ send: 'ai', content: error })
  }
  finally {
    // 清理输入框
    input.value = ''
  }
}
</script>

<template>
  <div class="layout-box" :class="menuMap.get(menuInfo.menuIndex)" layouts box-center>
    <the-header />

    <the-bar />

    <main hPE-80 wPE-100 mt-20 flex-1 pl-34 pr-34>
      <RouterView />
    </main>

    <div class="fixed bottom-70px right-70px z-50 cursor-pointer">
      <transition name="el-fade-in-linear">
        <div v-if="isOpen" class="w-400px  overflow-hidden bg-#ffffff absolute bottom-[120%] right-0 rounded-lg">
          <div class="w-100 h-100px bg-purple-700 flex justify-around items-center">
            <div class="flex items-center gap-10px">
              <el-avatar :icon="UserFilled" />
              <div class="flex flex-col">
                <span class="font-semibold text-20px text-white">AI在线助手</span>
                <span class="text-14px text-purple-100">在线 • 通常立即回复</span>
              </div>
            </div>

            <div class="flex items-center gap-15px">
              <!-- <div class=" p-5px rounded-full bg-purple-500/0 hover:bg-purple-500 transition-all duration-300 group">
                <div
                  i-majesticons:minimize
                  class="text-20px text-#ffffff group-hover:text-#333 transition-all duration-300"
                />
              </div> -->

              <div
                class="p-5px rounded-full bg-purple-500/0 hover:bg-purple-500 transition-all duration-300 group"
                @click="isOpen = false"
              >
                <div i-ic:outline-close class="text-20px text-#ffffff group-hover:text-#333" />
              </div>
            </div>
          </div>
          <div class="w-100 h-500px bg-#ffffff flex flex-col min-h-0">
            <div class="flex-1  w-100 flex flex-col min-h-0">
              <div class="w-full flex-1 overflow-y-auto px-10px">
                <div v-for="(item, index) in chatList" :key="index">
                  <Item :item="item" />
                </div>
              </div>

              <div class="bg-gray-50/50 p-12px w-100 border-t-1px border-#333/50 relative flex items-center">
                <textarea
                  id="input"
                  v-model.trim="input" rows="1" type="textarea" autosize
                  class="block w-100 pr-30px text-20px leading-20px rounded-full bg-white text-gray-900  py-7px px-10px placeholder:text-gray-400 placeholder:text-20px border-1px border-purple-600 outline-none overflow-hidden"
                  placeholder="请输入你的问题" @keydown.enter.prevent="handleSend"
                />

                <button
                  size="sm"
                  class="absolute right-16px top-1/2 -translate-y-1/2 p-4px rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg"
                >
                  <div i-lets-icons:send-fill class="text-18px text-#ffffff" @click="handleSend" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="relative" @click="isOpen = !isOpen">
        <div class="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
        <div class="absolute inset-0 rounded-full bg-purple-400 animate-pulse opacity-30" />

        <div
          class="relative h-56px w-70px rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-2 border-white group"
        >
          <div class="relative h-100 flex justify-center items-center">
            <div i-mingcute:chat-2-fill class="w-24px h-24px text-#ffffff" />
            <div
              class="absolute top-12px right-12px w-12px h-12px bg-red-500 rounded-full border-2 border-white animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-box {

  &.averageOutput {

    background: no-repeat url("~/assets/image/averageOutput/averageOutputBg.png");
    background-size: 100% 100%;
  }

  &.publicOpinionMonitoring {
    background-image: url("~/assets/image/publicOpinionMonitoring/publicOpinionMonitoringBg.png");
    background-size: 100% 100%;
  }

  ul,
  li {
    list-style: none
  }

  background: no-repeat url("~/assets/image/common/background.jpg");
  background-size: 100% 100%;
}

// :deep(.chat-input) {}
// ::v-deep .chat-input{
:deep(.chat-input) {
  // background:red;
  // width: 100%;

  // background-color: #ffffff;

  // outline: none;

  // resize: none;
  // overflow: hidden;

  .el-textarea__inner {
    // transition: border-color 0.3s ease;

    // border: 1px solid #6b7280;
    // padding: 7px 30px 7px 10px;
    // font-size: 16px;
    // line-height: 20px;
    // color: #1f2937;

    // border-radius: 20px;
  }

}
</style>
