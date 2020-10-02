function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    let $raw = $('#kbtable .kbcontent').toArray();
    let raw_list = [];

    for(i in $raw){
            raw_list.push($raw[i].outerText);
    }
    //所有课表数据将会保存在这个数组里，
    let result = []
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

    return { courseInfos: result }
}

function analyze_single(data)
{

}

function _get_week(data)
{
    
}