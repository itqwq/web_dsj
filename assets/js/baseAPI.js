//注意：每次调用$.get()或 $.post() 或$.aiax() 的时候，
//会先调用 ajaxPrefilter 这个函数
//在这个函数中， 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
   console.log(options.url);
   //在真正发起的 ajax 请求之前，统一拼接请求的根路径
   options.url = 'http://www.liulongbin.top:3007' + options.url
   console.log(options.url);
})