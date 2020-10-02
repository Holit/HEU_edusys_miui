function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
	
	/*
	课程时间表
	根据军工精神定义了这个时间表
	
	对接属性：
		sectionTimes
			section:Number 第几节
			startTime: String 开始时间
			endTime: String 结束时间
	
	思路：使用下述const数组，利用索引填充section
	*/
	const startTime=['08:30',"09:20","10:20","11:10","14:00","14:50",
                    "15:50","16:40","18:50","19:40","20:20","21:10"]
    const endTime=["09:10","10:00","11:00","11:50","14:40","15:30"
                    ,"16:30","17:20","19:30","20:10","21:00","21:40"]
	//未完工的sectionTime
	sectionTimes =[{}.{}]
    let $raw = $('#kbtable .kbcontent').toArray();
    let raw_list = [];

    for(i in $raw){
            raw_list.push($raw[i].outerText);
    }
    //所有课表数据将会保存在这个数组里，
	/*
	格式说明
	*************************
	目前没有解决星期问题
	*************************
	一、主要文段分割成属性文段
		常规的，raw_list表内应当存在如下形式的文段
		
		线性代数与解析几何A↵廉春波↵4-18(周)↵[0102节]↵21B 502中
		
		注意其中的"↵"，应当使用str.split('↵')[0]分割字符串
		按照常规顺序，字符串分割之后为以下内容
		str.split('↵')[0]="线性代数与解析几何A"
		str.split('↵')[1]="廉春波"
		str.split('↵')[2]="4-18(周)"
		str.split('↵')[3]="[0102节]"
		str.split('↵')[4]="21B 502中"
		str.split('↵')[5]=undefined
		
		这是一节课的情况，如果存在平行课程，例如（奇葩的）
		"计算思维（一）
		郭江鸿
		9-11(周)
		[030405节]
		计算中心379室
		---------------------
		计算思维（一）
		郭江鸿
		9-11(周)
		[030405节]
		计算中心381-1室
		"
		这种的话，我的建议是使用str.split('---------------------')[0]获取第一节课的消息，仅获取课程名称并提示用户自己更改。
	二、属性文段分割为属性
		观察五个属性，即上述文段里的0~4的几个数组值
		对接属性：
			courseInfos
				name:String 课程名称
				position:String 教室
				teacher: String 老师
				weeks:not null array 周
				day:String 星期几
				sections:not null array 第几节
		0.课程名称
			完全截取
		1.教师
			完全截取
		2.周
			首相去除符号“(周)”
			周具有几种形式，这里应当再次调用split函数，即
				weeks = weeks.split(',')
			根据课表，周定义为n,a-b，其中n为单列的某一周，a-b代表包含a、b的周区间
		3。节数
			节数去除符号"[节]"之后（利用两次replace）按照两个数字进行分组，得到基础节数
		4.教室位置
			完全截取
	*/
    let result = []
	/*
    let bbb = $('#table1 .timetable_con')
    for (let u = 0; u < bbb.length; u++) {
        let re = { sections: [], weeks: [] }
        let aaa = $(bbb[u]).find('span')
        let week = $(bbb[u]).parent('td')[0].attribs.id
        if (week) {
            re.day = week.split('-')[0]
        }
        for (let i = 0; i < aaa.length; i++) {

            if (aaa[i].attribs.title == '上课地点') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.position = $(aaa[i]).next()[0].children[j].data
                }
            }
            if (aaa[i].attribs.title == '节/周') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {

                    let lesson = $(aaa[i]).next()[0].children[j].data
                    for (let a = Number(lesson.split(')')[0].split('(')[1].split('-')[0]); a < Number(lesson.split(')')[0].split('(')[1].split('-')[1].split('节')[0]) + 1; a++) {

                        re.sections.push({ section: a })
                    }
                    for (let a = Number(lesson.split(')')[1].split('-')[0]); a < Number(lesson.split(')')[1].split('-')[1].split('周')[0]) + 1; a++) {

                        re.weeks.push(a)
                    }
                }
            }

            if (aaa[i].attribs.title == '教师') {

                for (let j = 0; j < $(aaa[i]).next()[0].children.length; j++) {
                    re.teacher = $(aaa[i]).next()[0].children[j].data
                }
            }

            if (aaa[i].attribs.class == 'title') {

                for (let j = 0; j < $(aaa[i]).children()[0].children.length; j++) {
                    re.name = $(aaa[i]).children()[0].children[j].data

                }
            }

        }
        result.push(re)
    }
    console.log(result)
	*/

    return { courseInfos: result }
}

function analyze_single(data)
{

}

function _get_week(data)
{
    
}