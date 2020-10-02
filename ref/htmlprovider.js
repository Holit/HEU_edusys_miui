function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  // 模拟请求登录态
  let http = new XMLHttpRequest()
  http.open("POST", '/Logon.do?method=logonBySSO', false) // 使用同步方法
  http.send()

  // 请求课表页面
  http = new XMLHttpRequest()
  http.open('GET', '/tkglAction.do?method=goListKbByXs&istsxx=no&xnxqh=', false)  // 使用同步方法
  http.send()

  // 返回请求到的课表页面
  return http.responseText
}