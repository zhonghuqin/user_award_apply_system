/**
 * @description 竞赛之星页面的请求。
 * @Author: 钟胡琴
 */
import lsjRequest from '../..'

/**
 * @description 竞赛之星表单提交
 * @method post
 * @param {string} formState.entryname 参与竞赛名称
 * @param {string} formState.signuptime 竞赛报名时间
 * @param {string} formState.url 佐证材料
 * @return void
 */
export function ContestRequest(formState: { entryname: string; signuptime: string; url: string }) {
  return lsjRequest.post({
    url: '/api/stu/submitcompetition',
    data: formState
  })
}
