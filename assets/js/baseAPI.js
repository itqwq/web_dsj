//注意：每次调用$.get()或 $.post() 或$.aiax() 的时候，
//会先调用 ajaxPrefilter 这个函数
//在这个函数中， 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
//    console.log(options.url);
   //在真正发起的 ajax 请求之前，统一拼接请求的根路径
   options.url = 'http://www.liulongbin.top:3007' + options.url
   // console.log(options.url);
   // 统一设置有权限的接口 设置请求头 indexOf()是判断的方法
   if(options.url.indexOf('/my/') !== -1 ){
   options.headers = {
   Authorization: localStorage.getItem('token')
       }
   }
  //全局挂在complete
   options.complete = function(res){
   // console.log(res);
   //在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应的数据
   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
   //1.清空存储数据
   localStorage.removeItem('token')
   //强制跳转登录页面
   location.href='./login.html'
       }
    }
  
})