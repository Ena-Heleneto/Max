/*
 * @Author: By
 * @Date: 2022-08-18 16:24:55
 * @LastEditTime: 2023-01-11 11:52:13
 * @LastEditors: BY by15242952083@outlook.com
 * @Description:
 * @FilePath: \big-screen\src\api\api.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/** *****
 * @description: 登录
 * @param {*} param 参数
 */
export const xtdl = (param: any) => loginPost('/xtdl.aspx', param)

/** *****
 * @description: 企业画像
 * @param {*} param 参数
 */
export const qyhx = (param: any) => post('/qyhx.aspx', param)

// 2、园区总揽
export const yqzl = (param: any) => post('/yqzl.aspx', param)

// 3、产业图鉴
export const cytj = (param: any) => post('/cytj.aspx', param)

// 4、双碳监测
export const stjc = (param: any) => post('/stjc.aspx', param)

// 4、双碳监测
export const yqjk = (param: any) => post('/yqjk.aspx', param)

// 验证登录
export const yzdx = (param: any) => post('/fsdx.aspx', param)

// 获取地区adcode
export const getAdCode = (param: any) => gaoDeWebApi('https://restapi.amap.com/v3/geocode/geo', param)

// 获取地图数据
export const getMapdata = (param: any) => post('/getmapdata.aspx', param)

// 找回密码
export const zhmm = (param: any) => post('/zhmm.aspx', param)

// 项目投资
export const xmtz = (param: any) => post('/xmtz.aspx', param)
// 亩均产值
export const mjcz = (param: any) => post('/mjcz.aspx', param)

// 注册
export const zcyh = (param: any) => post('/zcyh.aspx', param)

// 获取行政区划
export const district = (param: any) => gaoDeWebApi('https://restapi.amap.com/v3/config/district', param)

// 获取园区图像
export const getimg = (param: any) => post('/getimg.aspx', param)

// 获取二维码code
export const loginWxBack = (param: any) => post('/loginwxback.aspx', param)

// 资料录入
export const userinfoinput = (param: any) => post('/userinfoinput.aspx', param)

// 获取扫码结果
export const scanloginchk = (param: any) => scanloginchkPost('/scanloginchk.aspx', param)

export const aids = (param: any) => post('/aids.aspx', param)
