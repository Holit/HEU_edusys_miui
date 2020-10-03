function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
	
    let $raw = $('#kbtable .kbcontent').toArray();
    let class_array = [];

    for(i in $raw){
            class_array.push($raw[i].outerText);
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
	
	for(let i=0;i
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
	finalResult = {
        "courseInfos": result,
        "sectionTimes": createSectionTimes()
    }
	

    console.log(finalResult)
    return finalResult
}

function singlePrase(data,weeks)
{

	/*
	输出示例
	{
    "courseInfos": [
      {
        "name": "数学",
        "position": "教学楼1",
        "teacher": "张三",
        "weeks": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ],
        "day": 3,
        "sections": [
          {
            "section": 2,
            "startTime": "08:00",//可不填
            "endTime": "08:50"//可不填
          }
        ],
      },
      {
        "name": "语文",
        "position": "基础楼",
        "teacher": "荆州",
        "weeks": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ],
        "day": 2,
        "sections": [
          {
            "section": 2,
            "startTime": "08:00",//可不填
            "endTime": "08:50"//可不填
          },
          {
            "section": 3,
            "startTime": "09:00",//可不填
            "endTime": "09:50"//可不填
          }
        ],
      }
    ],
    "sectionTimes": [
      {
        "section": 1,
        "startTime": "07:00",
        "endTime": "07:50"
      },
      {
        "section": 2,
        "startTime": "08:00",
        "endTime": "08:50"
      },
      {
        "section": 3,
        "startTime": "09:00",
        "endTime": "09:50"
      },
      {
        "section": 4,
        "startTime": "10:10",
        "endTime": "11:00"
      },
      {
        "section": 5,
        "startTime": "11:10",
        "endTime": "12:00"
      },
      {
        "section": 6,
        "startTime": "13:00",
        "endTime": "13:50"
      },
      {
        "section": 7,
        "startTime": "14:00",
        "endTime": "14:50"
      },
      {
        "section": 8,
        "startTime": "15:10",
        "endTime": "16:00"
      },
      {
        "section": 9,
        "startTime": "16:10",
        "endTime": "17:00"
      },
      {
        "section": 10,
        "startTime": "17:10",
        "endTime": "18:00"
      },
      {
        "section": 11,
        "startTime": "18:40",
        "endTime": "19:30"
      },
      {
        "section": 12,
        "startTime": "19:40",
        "endTime": "20:30"
      },
      {
        "section": 13,
        "startTime": "20:40",
        "endTime": "21:30"
      }
    ]
  }
	*/
	let singleClass = [];
	/*
	courseInfos
		name:String 课程名称
		position:String 教室
		teacher: String 老师
		weeks:not null array 周
		day:String 星期几
		sections:not null array 第几节
	*/
	/*
		str.split('↵')[0]="线性代数与解析几何A"
		str.split('↵')[1]="廉春波"
		str.split('↵')[2]="4-18(周)"
		str.split('↵')[3]="[0102节]"
		str.split('↵')[4]="21B 502中"
		str.split('↵')[5]=undefined
	*/
	let raw=data.split('↵');
	className = raw[0];
	classTeacher = raw[1];
	_raw_week = raw[2].replace('(周)','');
	_raw_section = raw[3].repalce('[','');
	_raw_section = _raw_section.replace('节]','');
	classPosition = raw[4];
	
	let courseInfo = {
		"name": className,
		"position": classPosition,
		"day":day
	}
	
	courseInfo.sections=[]
	sections = createArray()
}

function createArray(rangeNum){
    let resultArray = []
    let begin = rangeNum.split('-')[0]
    let end = rangeNum.split('-')[1]
    for(let i = Number(begin); i<=Number(end); i++){
        resultArray.push(i)
    }
    return resultArray
}
function _get_section(data)
{
	//输入:01020304
	//输出：[1,2,3,4]
	
	
}
function _get_week(num_index)
{
	/*
	三、星期文段截取
		星期是由数组的索引映射得到的文段，根据raw_list索引，给出如下星期循环
			星期		一	二	三	四	五	六	日
			第一大节：	0 	1 	2 	3 	4 	5 	6
			第二大节:	7 	8 	9 	10 	11 	12 	13
			第三大节：	14 	15 	16 	17 	18 	19 	20
			第四大节：	21 	22 	23 	24 	25 	26 	27
			第五大节：	28 	29 	30 	31 	32 	33 	34
			
	故而利用mod函数求解余数即可
	*/
    return (num_index+1)%7
}

function createSectionTimes(){
    let sectionTimes = [
        {
            "section": 1, "startTime": "08:00", "endTime": "08:45"
        },{
            "section": 2, "startTime": "08:50", "endTime": "09:35"
        },{
            "section": 3, "startTime": "09:55", "endTime": "10:40"
        },{
            "section": 4, "startTime": "10:45", "endTime": "11:30"
        },{
            "section": 5, "startTime": "11:35", "endTime": "12:20"
        },{
            "section": 6, "startTime": "13:30", "endTime": "14:15"
        },{
            "section": 7, "startTime": "14:20", "endTime": "15:05"
        },{
            "section": 8, "startTime": "15:25", "endTime": "16:10"
        },{
            "section": 9, "startTime": "16:15", "endTime": "17:00"
        },{
            "section": 10, "startTime": "17:05", "endTime": "17:50"
        },{
            "section": 11, "startTime": "18:30", "endTime": "19:15"
        },{
            "section": 12, "startTime": "19:20", "endTime": "20:05"
        },{
            "section": 13, "startTime": "20:10", "endTime": "20:55"
        }
    ]
    return sectionTimes
}