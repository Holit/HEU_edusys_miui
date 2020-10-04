/*************************************************************************************
* Author : Hedion
* last updated @ 2020/10/4 15:55
* Any question or assistances please contact: mailto:gao1021229073@163.com    
* Please add me a friend: 1021229073 (QQ), contact me if any bugs or issues occured.
* this project has been updated to Github:
** https://github.com/Holit/HEU_edusys_miui
***************************************************************************************/
//scheduleHtmlProvider.js:get html data from the website and pass them to parse
function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  let http = new XMLHttpRequest()
  http.open('GET', '/jsxsd/xskb/xskb_list.do?Ves632DSdyV=NEW_XSD_PYGL', false)
  http.send()
  return http.responseText
}