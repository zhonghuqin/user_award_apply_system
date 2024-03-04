/**
 * @description 科研之星报名 —— 科研项目页面的请求。
 * @Author: 钟胡琴
 */
import lsjRequest from '../..'

/**
 * @description 方法描述
 * @param {} formState 收集表单数据的对象
 * @param {string} formState.sciname 项目名称
 * @param {string} formState.scigrade 项目级别
 * @param {string} formState.signuptime 立项时间
 * @param {string} formState.scitype 标题：科研项目
 * @param {string} formState.ranking 排名/总人数
 * @param {string} formState.url 佐证材料
 * @method post
 * @return void
 */
export function zhqresearchRequest(formState: {
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
