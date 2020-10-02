function getTime(time) {
  let flag = 0;
  let t = time.split('周[');
  let week = []
  let weekStr = t[0].replace('，', ',');
  if (weekStr.search('单') != -1) {
      flag = 1;
      weekStr = weekStr.replace('单', '');
  }
  if (weekStr.search('双') != -1) {
      flag = 2;
      weekStr = weekStr.replace('双', '');
  }
  if (flag == 1) {
    week = weekStr2IntList(weekStr).filter(v => v % 2 != 0);
  } else if (flag == 2) {
    week = weekStr2IntList(weekStr).filter(v => v % 2 == 0);
  } else {
    week = weekStr2IntList(weekStr);
  }

  let jc;
  let start = 0;
  let end = 0;
  try {
      jc = t[1].replace('节]', '').split('-');
      start = parseInt(jc[0]);
      end = parseInt(jc[jc.length - 1]);
  } catch (e) {
      console.log(e);
  }
  let sections = []

  for (let i = start; i <= end; i++) {
    sections.push({ section: i })
  }

  return [week, sections];
}

function weekStr2IntList(week) {
  // 将全角逗号替换为半角逗号
  let reg = new RegExp("，", "g");
  week.replace(reg, ',');
  let weeks = [];

  // 以逗号为界分割字符串，遍历分割的字符串
  week.split(",").forEach(w => {
      if (w.search('-') != -1) {
          let range = w.split("-");
          let start = parseInt(range[0]);
          let end = parseInt(range[1]);
          for (let i = start; i <= end; i++) {
              if (!weeks.includes(i)) {
                  weeks.push(i);
              }
          }
      } else if (w.length != 0) {
          let v = parseInt(w);
          if (!weeks.includes(v)) {
              weeks.push(v);
          }
      }
  });
  return weeks;
}

function scheduleHtmlParser(html) {
  var $ = cheerio.load(html, { decodeEntities: false });
  let result = []
  const reg = new RegExp(/(?<=>)[^<>]+(?=<)/g)

  try {
    $('#kbtable').find('tr').each(function (row, _) {
      if (row != 0) {
        $(this).find('td').each(function (col, _) {
          if (col != 0) {
            let info = $(this).html().match(reg)
            if (info != null) {
              info = info.slice(2, info.length - 1)
              if (info.length >= 5) {
                info = info.map((str) => str.trim())
                let hasNext = true
                let index = 0
                while (hasNext) {
                  let [week, sections] = getTime(info[index + 3])
                  let course = {
                    name: info[index],
                    position: info[index + 4],
                    teacher: info[index + 2],
                    weeks: week,
                    day: col,
                    sections: sections,
                  }
                  console.log(course)
                  result.push(course)

                  if (info[index + 5] == undefined) {
                    hasNext = false
                  } else {
                    index += 5
                  }
                }
              }
            }
          }
        })
      }
    })
  } catch (e) {
    console.log(e)
  }

  return { courseInfos: result }
}