/*************************************************************************************
 * Author : Hedion
 * last updated @ 2022/2/28
 * last updated contents: removed timer function from old JavaScript
 * Any question or assistances please contact: gao1021229073@163.com
 * this project has been updated to Github:
 ** https://github.com/Holit/HEU_edusys_miui
 ***************************************************************************************/
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
							// 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 20, 			// 总周数：[1, 30]之间的整数
    startSemester: '', 		// 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, 		// 是否显示周末
    forenoon: 5, 			// 上午课程节数：[1, 10]之间的整数
    afternoon: 5, 			// 下午课程节数：[0, 10]之间的整数
    night: 3, 				// 晚间课程节数：[0, 10]之间的整数
    sections: [
        {
            "section": 1,
            "startTime": "08:00",
            "endTime": "08:45"
        },
        {
            "section": 2,
            "startTime": "08:50",
            "endTime": "09:35"
        },
        {
            "section": 3,
            "startTime": "09:55",
            "endTime": "10:40"
        },
        {
            "section": 4,
            "startTime": "10:45",
            "endTime": "11:30"
        },
        {
            "section": 5,
            "startTime": "11:35",
            "endTime": "12:20"
        },
        {
            "section": 6,
            "startTime": "13:30",
            "endTime": "14:15"
        },
        {
            "section": 7,
            "startTime": "14:20",
            "endTime": "15:05"
        },
        {
            "section": 8,
            "startTime": "15:25",
            "endTime": "16:10"
        },
        {
            "section": 9,
            "startTime": "16:15",
            "endTime": "17:00"
        },
        {
            "section": 10,
            "startTime": "17:05",
            "endTime": "17:50"
        },
        {
            "section": 11,
            "startTime": "18:30",
            "endTime": "19:15"
        },
        {
            "section": 12,
            "startTime": "19:20",
            "endTime": "20:05"
        },
        {
            "section": 13,
            "startTime": "20:10",
            "endTime": "20:55"
        }
    ], 
  }
}