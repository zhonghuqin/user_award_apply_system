/**
 * @description 报名表单管理 —— 双创之星报名管理页面的请求。
 * @Author: 蒋雯绘
 */
import lsjRequest from '../..'

/**
 * @description 进入双创页面就发起的请求
 * @param {any} Authorization token
 * @method get
 */
export function JWHgetdoubleRequest(Authorization:any) {
  return lsjRequest.get({
    url: '/api/stu/getcompany',
    headers: { Authorization }
  })
}

/**
 * @description 修改双创之星。
 * @param {string} companyname 注册公司名称
 * @param {string} vp 虚拟/实体
 * @param {string} ranking 申报人排名
 * @param {string} signuptime 注册时间
 * @param {string} scale 公司规模
 * @param {string} url 佐证材料
 * @param {string} id key
 * @method post
 */
export function JWHeditRequest(companyname:string,vp:string,ranking:string,signuptime:string,scale:string,url:any,id:string) {
  return lsjRequest.post({
    url: '/api/stu/editcompany',
    data: { companyname,vp,ranking,signuptime,scale,url,id }
  })
}
/**
 * @description 删除双创之星。
 * @param {string} form_id 编号
 * @method post
 */
export function JWHdeleteRequest(form_id:string) {
  return lsjRequest.post({
    url: '/api/stu/deleteShuangc',
    data: { form_id }
  })
}
/**
 * @description 上传双创之星文件。
 * @param {file} file 文件
 * @method post
 */
export function JWHupfileRequest(file:File,Authorization:any) {
  // console.log(file)
  // console.log(Authorization)
  const formData = new FormData();
  formData.append('file', file);
  return lsjRequest.post({
    url: '/api/stu/OssUpdate',
    data:formData,
    headers: { Authorization, 'Content-Type': 'multipart/form-data'  } //加请求头
  })
}

