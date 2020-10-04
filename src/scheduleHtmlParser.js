/*************************************************************************************
* Author : Hedion
* last updated @ 2020/10/4 15:55
* Any question or assistances please contact: mailto:gao1021229073@163.com    
* Please add me a friend: 1021229073 (QQ), contact me if any bugs or issues occured.
* this project has been updated to Github:
** https://github.com/Holit/HEU_edusys_miui
***************************************************************************************/
    
//scheduleHtmlParser.js:Handle to source page data and create legal data structure

function scheduleHtmlParser(html) {
	//analyse the element and you will see this.
	/*
	<div id="5180478CC0C746CC94534AF06163E808-3-2" style="" class="kbcontent">
	线性代数与解析几何A<br>
	    <font title="老师">廉春波</font><br>
	    <font title="周次">4-18(周)</font><br>
	    <font title="节次">[0102节]</font><br>
	    <font title="教室">21B 502中</font><br>
	</div>

	this is the main entrance.
	*/    
    let $raw = $('#kbtable .kbcontent').toArray();
    console.info($raw);
    let courses = [];

    let name = "";
    let teacher = "";
    let weeks = "";
    let sections = "";
    let position = "";

    for (index in $raw) {
    	data = $raw[index]
        if (data.children != undefined) {
            if (data.children.length == 1) {
                continue;
            }
            name = data.children[0].data;
            //for courses includes '---------------------' which I dont understand, thier array will be longer than others, therefore we use length to flag them.
            //reminder:courses includes '---------------------' will be only different in the position, and the position is not determined until its going to begin.
            //therefore we use '[待定]' to mark them out.
            if (data.children.length == 12) {
                name = name + '[待定]';
            }

            //please notice these data are from object, therefore please check whether they are existed.
            //for rigorous, please check undefined
            teacher = data.children[2].children[0].data;
            weeks = data.children[4].children[0].data;
            sections = data.children[6].children[0].data;
            position = data.children[8].children[0].data;
            
            //replace for creating the arry
            weeks=weeks.replace('(周)', '');
            sections = sections.replace('[', '');
            sections = sections.replace('节]', '');
            //correct structure.
            let courseInfo = {
                "name": name,
                "position": position,
                "day": _get_day(index),
                "teacher": teacher,
                "sections":_get_section(sections),
                "weeks": _get_week(weeks)
            };
            courses.push(courseInfo);
        }
    }
    //optional: for debug only
    //console.info(courses);
    
    finalResult = {
        "courseInfos": courses,
        "sectionTimes": createSectionTimes()
    };
    return finalResult;
}
function _get_week(data) {
	//weeks data will be inputed as '4,7-18', to handle ,we will split them by ',' and operate seperately.
    let result = [];
    let raw = data.split(',');
    for (i in raw) {

        if (raw[i].indexOf('-') == -1) {
        	//create array
            result.push(parseInt(raw[i]));
        } else {
            let begin = raw[i].split('-')[0];
            let end = raw[i].split('-')[1];
            for (let i = parseInt(begin); i <= parseInt(end); i++) {
                result.push(i);
            }
        }
    }
    //sort the array,
    return result.sort(function (a, b) {
        return a - b
    });

}
function _create_array(rangeNum) {
	//rangeNum should be inputed as '7-18' and will output {7,8,9,10,11,12,13,14,15,16,17,18}
    let resultArray = [];
    let begin = rangeNum.split('-')[0];
    let end = rangeNum.split('-')[1];
    for (let i = Number(begin); i <= Number(end); i++) {
        resultArray.push(i);
    }
    return resultArray;
}

function _get_section(data) {
	//section info will be inputed as '01020304',we will devide them into {01,02,03,04} and then create array.
    let section = []
    let num = 0;
    let i = 0;
    do {
        num = parseInt(data.substr(i, 2));
        //this will push an array such as {section:1},{section:2}...
        section.push({"section":num});
        //jump to next number, such as
        //010203
        //|
        //  |
        i = i + 2;
    } while (i < data.length);
    return section;
}
function _get_day(num_index) {
    //day will be calculated because the index it self is formatted.
    return (num_index) % 7 + 1
}
function _clear_null(arr) {
	//to clean the char such as '&nbsp;' or ' '
    let result = []
    for (i in arr) {
        if (arr[i].length != 0) {
            result.push(arr[i]);
        }
    }
    return result
}
function createSectionTimes() {
	//this is the HEU standard section time.
	//get it on the official website.
    let sectionTimes = [{
            "section": 1,
            "startTime": "08:00",
            "endTime": "08:45"
        }, {
            "section": 2,
            "startTime": "08:50",
            "endTime": "09:35"
        }, {
            "section": 3,
            "startTime": "09:55",
            "endTime": "10:40"
        }, {
            "section": 4,
            "startTime": "10:45",
            "endTime": "11:30"
        }, {
            "section": 5,
            "startTime": "11:35",
            "endTime": "12:20"
        }, {
            "section": 6,
            "startTime": "13:30",
            "endTime": "14:15"
        }, {
            "section": 7,
            "startTime": "14:20",
            "endTime": "15:05"
        }, {
            "section": 8,
            "startTime": "15:25",
            "endTime": "16:10"
        }, {
            "section": 9,
            "startTime": "16:15",
            "endTime": "17:00"
        }, {
            "section": 10,
            "startTime": "17:05",
            "endTime": "17:50"
        }, {
            "section": 11,
            "startTime": "18:30",
            "endTime": "19:15"
        }, {
            "section": 12,
            "startTime": "19:20",
            "endTime": "20:05"
        }, {
            "section": 13,
            "startTime": "20:10",
            "endTime": "20:55"
        }
    ]
    return sectionTimes
}
