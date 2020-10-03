
function scheduleHtmlParser(html) {

	/*
		二氢茉莉酮酸甲酯 首次对该接口进行了开发
		
		Hedion @ 2020/10/3
		
		Chrome离线测试已通过
	*/
	
    let $raw = $('#kbtable .kbcontent').toArray();
    let class_array = [];
	let result = [];
	
    for(i in $raw){
        class_array.push($raw[i].outerText);
    }
	for(i in class_array)
	{
		//开始循环读取
		if(class_array[i] != undefined)
		{
			if(class_array[i].length != 1)
			{
				result.push(single_prase(class_array[i],_get_day(i),class_array[i].indexOf('---------------------')))
			}
		}
	}
	
	finalResult = {
        "courseInfos": result,
        "sectionTimes": createSectionTimes()
    }
	

    console.log(finalResult)
    return finalResult
}

function single_prase(data,day,isPreNeeded)
{
	let raw = []
	if(isPreNeeded)
	{
		raw = _pre_prase(data)
	}
	else
	{
		raw=data.split('\n');
	}
	
	//模块Chrome Console 单记录测试通过
	/*courseInfos
		name:String 课程名称
		position:String 教室
		teacher: String 老师
		weeks:not null array 周
		day:String 星期几
		sections:not null array 第几节
		
		str.split('↵')[0]="线性代数与解析几何A"
		str.split('↵')[1]="廉春波"
		str.split('↵')[2]="4-18(周)"
		str.split('↵')[3]="[0102节]"
		str.split('↵')[4]="21B 502中"
		str.split('↵')[5]=undefined
	*/
	/*输入案例：线性代数与解析几何A↵廉春波↵4-18(周)↵[0102节]↵21B 502中↵
		Chrome单记录测试结果：
	{name: "线性代数与解析几何A", position: "21B 502中", day: 3, teacher: "廉春波", sections: Array(2), …}
		day: 3
		name: "线性代数与解析几何A"
		position: "21B 502中"
		sections: (2) [1, 2]
		teacher: "廉春波"
		weeks: (15) [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
		__proto__: Object
	*/
	
	raw = _clear_null(raw);
	
	className = raw[0];
	classTeacher = raw[1];
	_raw_week = raw[2].replace('(周)','');
	_raw_section = raw[3].replace('[','');
	_raw_section = _raw_section.replace('节]','');
	classPosition = raw[4];
	
	let courseInfo = {
		"name": className,
		"position": classPosition,
		"day":day,
		"teacher":classTeacher
	}
	
	courseInfo.sections=_get_section(_raw_section)
	courseInfo.weeks=_get_week(_raw_week)
	
	return courseInfo
}
function _pre_prase(data)
{
	//传入纯数据，不包括星期数据
	//模块Chrome Console测试通过
	let raw = data.split('---------------------')
	let result = raw[0].split('\n');
	result = _clear_null(result)
	for(i in raw)
	{
		let raw_single = raw[i].split('\n');
		raw_single = _clear_null(raw_single);
		result = _combinate_array(result,raw_single)
	}	
	//传出待解析的数组
	return result
}
function _combinate_array(arr1,arr2)
{
	//模块Chrome Console测试通过
	//可能存在的错误：传入的不是字符串，不处理该错误，一律视为字符串处理
	let result = [];
	let larger_arr = [];
	let smaller_arr = [];
	if(arr1.length < arr2.length)
	{
		larger_arr = arr2;
		smaller_arr = arr1;
	}
	else
	{
		larger_arr = arr1;
		smaller_arr = arr2;
	}
	
	for(i in larger_arr)
	{
		if(larger_arr[i] == smaller_arr[i])
		{
			result.push(String(larger_arr[i]))
		}
		else
		{
			result.push(String(larger_arr[i]) +'/'+String(smaller_arr[i]))
		}
	}
	
	return result
}
function _get_week(data)
{
	//模块Chrome Console 测试通过
	let result = [];
	let raw = data.split(',');
	for(i in raw)
	{
		
		if(raw[i].indexOf('-') == -1)
		{
			result.push(parseInt(raw[i]));
		}
		else
		{
			let begin = raw[i].split('-')[0];
			let end = raw[i].split('-')[1];
			for(let i = parseInt(begin); i<=parseInt(end); i++){
				result.push(i);
			}
		}
	}
	//此处排了个序
	return result.sort(function(a, b){return a - b});
	
}
function _create_array(rangeNum)
{
	//模块Chrome Console测试通过
    let resultArray = [];
    let begin = rangeNum.split('-')[0];
    let end = rangeNum.split('-')[1];
    for(let i = Number(begin); i<=Number(end); i++){
        resultArray.push(i);
    }
    return resultArray;
}

function _get_section(data)
{
	//输入:01020304
	//输出：[1,2,3,4]
	//可能存在的错误：字符串不是数字或者字符串不符合要求，暂时不解决
	
	//模块Chrome Console测试通过
	let section = []
	let num = 0;
	let i =0;
	do
	{
		num = parseInt(data.substr(i,2));
		section.push(num);
		i=i+2;
	}while(i<data.length);
	return section;
}
function _get_day(num_index)
{
	
    return (num_index)%7 + 1
}
function _clear_null(arr)
{
	let result = []
	for(i in arr)
	{
		if(arr[i].length != 0)
		{
			result.push(arr[i]);
		}
	}
	return result
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