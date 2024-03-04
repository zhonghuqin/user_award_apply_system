/**
 * @description 科研之星报名 —— 软件著作页面的请求。
 * @Author: 钟胡琴
 */
import lsjRequest from '../..'

/**
 * @description 方法描述
 * @param {} formState 收集表单数据的对象
 * @param {string} formState.sciname 软著名称
 * @param {string} formState.scigrade 颁发单位
 * @param {string} formState.signuptime 获批时间
 * @param {string} formState.scitype 标题：软件著作权
 * @param {string} formState.ranking 排名/总人数
 * @param {string} formState.url 佐证材料
 * @method post
 * @return void
 */
export function zhqsoftwareRequest(formState: {
  sciname: string
  scigrade: string
  signuptime: string
  scitype: string
  ranking: string
  url: string
}) {
  return lsjRequest.post({
    url: '/api/stu/commitsci',
    data: formState
  })
}
