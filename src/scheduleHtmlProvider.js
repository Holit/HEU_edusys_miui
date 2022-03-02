/*************************************************************************************
* Author : Hedion
* last updated @ 2022/3/2
* Any question or assistances please contact: mailto:gao1021229073@163.com    
* Please add me a friend: 1021229073 (QQ), contact me if any bugs or issues occured.
* this project has been updated to Github:
** https://github.com/Holit/HEU_edusys_miui
***************************************************************************************/
//scheduleHtmlProvider.js:get html data from the website and pass them to parse
async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {

	await loadTool('AIScheduleTools');
	await AIScheduleAlert({
		titleText: '开发者的话',
		contentText: '请您知悉：尽管开发者已做了大量适配学校教务系统格式的工作，仍可能存在解析错误。对于无法获取到的字段将使用“未知”标记，您可以手动修改。如仍不能解决问题，请通过gao1021229073@163.com详细反馈。感谢您的使用，顺祝学安。\n Made by Jerry \n\n Last Updated:2022/3/1',
		confirmText: '我知道了',
	});
	//we using on-device detection, which allows simplifying the fetch operations
	// this may caused come insecurity actions, the transmitting contents could be easy to be captured.
	raw = document.getElementsByClassName('kbcontent');
	let dict = [];
	for (i = 0; i < raw.length; i++)
	{
		dict.push(raw[i].innerText);
	}
	fmtData = dict.join('$$');	//specialized divider
	//to avoid this possibile detect, we using weak-encoding to ensure the security of transmission
	//we do not using strong encryption such as AES, in order to quicken the process.
	//return btoa(encodeURIComponent(fmtData));
	return fmtData;//I quit! qwq
}