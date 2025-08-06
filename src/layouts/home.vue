<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-09 18:53:36
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @LastEditTime: 2023-06-07 10:21:00
 * @FilePath: \Max\src\layouts\home.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const videoRef = $ref<HTMLVideoElement>()
onMounted(() => {
  const promise = videoRef?.play()
  if (promise !== undefined) {
    promise.catch((_error) => { })
      .then(() => { })
  }
})

// const isOpen = ref<boolean>(false)
// const input = ref<string>('')

// const chatList = ref<{ send: string; content: string }[]>([])

const { userCode, token } = storeToRefs(useUserStore())

// const loading = ref<boolean>(true)
// async function handleSend() {
//   if (!input.value.trim())
//     return

//   try {
//     loading.value = true
//     const submitid = new Date().getTime()

//     const res = await aids({ submitid, usercode: userCode.value, sign: hexMD5(submitid + userCode.value + token.value), question: input.value })

//     const _res = JSON.parse(res)
//     consola.info('AI Response:', res)
//     chatList.value.push({ send: 'user', content: input.value })
//     chatList.value.push({ send: 'ai', content: res.data })
//   }
//   catch (error) {
//     console.error('Error sending message:', error)
//     console.error(error)

//     chatList.value.push({ send: 'ai', content: error })
//   }
//   finally {
//     // 清理输入框
//     input.value = ''
//     loading.value = false
//   }
// }
</script>

<template>
  <div po-r class="home-box" wPE-100 hPE-100 flex-column-start>
    <the-header />
    <video ref="videoRef" autoplay po-a z-0 wPE-100 hPE-100 controls>
      <source :src="`http://www.maxrongbigdata.com:8700/video.aspx?usercode=${userCode}`" type="video/mp4">
      <p>您的浏览器不支持 HTML5 视频 </p>
    </video>
    <the-bar />
    <main style="pointer-events: none;" h-74 po-a potPE-16 z-10 wPE-100 potPE-21 flex-1 pl-34 pr-34>
      <RouterView />
    </main>
    <!--
    <div class="fixed bottom-70px right-70px z-50 cursor-pointer">
      <transition name="el-fade-in-linear">
        <div v-if="isOpen" class="w-400px  overflow-hidden bg-#ffffff absolute bottom-[120%] right-0 rounded-lg">
          <div class="w-100 h-100px bg-purple-700 flex justify-around items-center">
            <div class="flex items-center gap-10px">
              <el-avatar :icon="UserFilled" />
              <div class="flex flex-col">
                <span class="font-semibold text-20px text-white">AI在线小麦</span>
                <span class="text-14px text-purple-100">在线 • 通常立即回复</span>
              </div>
            </div>

            <div class="flex items-center gap-15px">
             <div class=" p-5px rounded-full bg-purple-500/0 hover:bg-purple-500 transition-all duration-300 group">
                <div
                  i-majesticons:minimize
                  class="text-20px text-#ffffff group-hover:text-#333 transition-all duration-300"
                />
              </div>

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
                  v-loading="loading"
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
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.home-box {
  .index-bg {
    height: 92%;
    position: absolute;
    top: 8%;
    left: 0;
    width: 100%;
  }

  :deep(.bar-box) {
    margin-top: 30px;
  }
}
</style>
