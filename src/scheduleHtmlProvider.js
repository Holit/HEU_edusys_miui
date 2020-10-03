function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    let http = new XMLHttpRequest()
  http.open('GET', '/jsxsd/xskb/xskb_list.do?Ves632DSdyV=NEW_XSD_PYGL', false)  // 使用同步方法
  http.send()

  // 返回请求到的课表页面
  return http.responseText
}