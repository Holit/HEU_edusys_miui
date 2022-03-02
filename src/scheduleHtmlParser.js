/*************************************************************************************
 * Author : Hedion
 * last updated @ 2022/3/2
 * last updated contents:	Reconstruction of old code using dom.
 *							Simple conflict handling
 * Any question or assistances please contact: gao1021229073@163.com
 * this project has been updated to Github:
 ** https://github.com/Holit/HEU_edusys_miui
 ***************************************************************************************/

//scheduleHtmlParser.js:Parse the correct data from the original html
function scheduleHtmlParser(html)
{
	//html = decodeURIComponent(_atob(html));
	let i = 0;
	let dict = html.split('$$');
	//Data is obtained by traversing horizontally from the table
	// etc. 0,1,2,3,4,5,6,7
	//		8,9,...
	let courses = [];
	let coursesInfo;
	for (i = 0; i < dict.length; i++)
	{
		coursesInfo = _praseW_(dict[i], i);
		if (coursesInfo != null)
		{
			for (let ci = 0; ci < coursesInfo.length; ci++)
			{
				if (coursesInfo[ci] != null)
				{
					courses.push(coursesInfo[ci]);
				}
			}
		}
	}
	return courses;
}
function _get_week(data)
{
	//weeks data will be inputed as '4,7-18', to handle ,we will split them by ',' and operate seperately.
	let result = [];
	let raw = data.split(',');
	for (i in raw)
	{
		if (raw[i].indexOf('-') == -1)
		{
			//create array
			result.push(parseInt(raw[i]));
		}
		else
		{
			let begin = raw[i].split('-')[0];
			let end = raw[i].split('-')[1];
			for (let i = parseInt(begin); i <= parseInt(end); i++)
			{
				result.push(i);
			}
		}
	}
	//sort the array,
	return result.sort(function (a, b)
	{
		return a - b;
	}
	)

}
function _get_section(data)
{
	//section info will be inputed as '01020304',we will devide them into {01,02,03,04} and then create array.
	data = data.replace('[', '');
	data = data.replace(']', '');
	data = data.replace('节', '');
	let section = [];
	let num = 0;
	let i = 0;
	do
	{
		num = parseInt(data.substr(i, 2));
		section.push(num);
		//jump to next number, such as
		//010203
		//|
		//  |
		i = i + 2;
	}
	while (i < data.length);
	return section;
}
function _get_day(num_index)
{
	//day will be calculated because the index it self is formatted.
	return (num_index) % 7 + 1;
}

function _praseW_(data, index)
{
	let coursesInfo = [];
	//data examples:
	//" "
	//"汇编语言程序设计\n李晋\n17(周)\n[0304节]\n计算中心475室\n"
	//"形势与政策\n胡泊\n2,4,8,12(周)\n[0607节]\n11#0133中\n---------------------\n东方文学史（网络）\n唐晓伟\n11,13(周)\n[0607节]\n11#0145中\n"
	//"计算机网络\n冯光升\n1-8(周)\n[080910节]\n\n---------------------\n计算机网络\n李冰洋\n1-8(周)\n[080910节]\n11#0142中研究生\n"
	//Note that the fourth information is incomplete
	let splitStr1 = '---------------------';
	let splitStr2 = '\n';

	if (data.length == 1)
	{
		return null;
	}

	let coursesInBox = data.split(splitStr1);
	let ci = 0;
	for (ci = 0; ci < coursesInBox.length; ci++)
	{
		let infoDict = coursesInBox[ci].split(splitStr2);
		while (infoDict[0].length == 0)
		{
			infoDict = infoDict.slice(1, infoDict.length);
		}
		let sections = [];
		let weeks = [];
		for (let fi = 0; fi != infoDict.length; fi++)
		{
			if (infoDict[fi].includes("节"))
			{
				//navigating to correct part.
				sections = _get_section(infoDict[fi]);
				continue;
			}
			if (infoDict[fi].includes("周"))
			{
				weeks = _get_week(infoDict[fi]);
				continue;
			}
		}
		let courseInfo =
		{
			//data example:
			//0: "毛泽东思想和中国特色社会主义理论体系概论"
			//1: "袁洪君"
			//2: "1-8,10-17(周)"
			//3: "[0102节]"
			//4: "11#0144中"
			//5: ""
			"name": (infoDict[0] != undefined) ? infoDict[0] : "未知",
			"position": (infoDict[4] != undefined) ? infoDict[4].replace(' ', '') : "未知",
			"day": _get_day(index),
			"teacher": (infoDict[1] != undefined) ? infoDict[1].replace(' ', '') : "未知",
			"sections": sections,
			"weeks": weeks
		};
		coursesInfo.push(courseInfo);
	}
	coursesInfo = conflict_handling(coursesInfo);
	return coursesInfo;
}

function _array_equals(arr1, arr2)
{
	if (arr1.length != arr2.length)
	{
		return false;
	}
	arr1 = arr1.sort(function (a, b)
	{
		return a - b
	}
		);
	arr2 = arr2.sort(function (a, b)
	{
		return a - b
	}
		);
	for (let i = 0; i < arr1.length; i++)
	{
		if (arr1[i] != arr2[i])
		{
			return false;
		}
	}
	return true;
}
function _array_intersection(arr1, arr2)
{
	return (Array.from(new Set(arr1.concat(arr2))).length < arr1.length + arr2.length)
}
function _array_remove(arr, data)
{
	return arr.filter(function (v)
	{
		return v != data
	}
	);
}
function _bytes_count(str)
{
	let c = 0;
	for (let i = 0; i < str.length; i++)
	{
		cnt += (/^[\u0000-\u00ff]$/.test(str.charAt(i))) ? 1 : 2
	}
	return c;
}

function _utf8_decode(utftext)
{
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	if (utftext == undefined)
	{
		return utftext;
	}
	while (i < utftext.length)
	{
		c = utftext.charCodeAt(i);
		if (c < 128)
		{
			string += String.fromCharCode(c);
			i++;
		}
		else if ((c > 191) && (c < 224))
		{
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else
		{
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
function _atob(input)
{
	let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	let output = "";
	let chr1;
	let chr2;
	let chr3;
	let enc1;
	let enc2;
	let enc3;
	let enc4;
	let i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length)
	{
		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64)
		{
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64)
		{
			output = output + String.fromCharCode(chr3);
		}
	}
	output = _utf8_decode(output);
	return output;
}
function _atom_conflict_handling_(data)
{
	let retdata = []
	if (data.length == 2)
	{
		if (_array_intersection(data[0].sections, data[1].sections) && _array_intersection(data[0].weeks, data[1].weeks))
		{
			if (_array_equals(data[0].sections, data[1].sections) && _array_equals(data[0].weeks, data[1].weeks))
			{
				let sections = data[0].sections;
				let weeks = data[0].weeks;
				let name = data[0].name;
				let teacher = data[0].teacher;
				let position = data[0].position;
				let day = data[0].day;

				if (name != data[1].name)
				{
					name = name + '|' + data[1].name;
				}
				if (teacher != data[1].teacher)
				{
					teacher = teacher + ',' + data[1].teacher;
				}
				if (position != data[1].position)
				{
					//too complicated, only operate possibile case.
					if (position == '')
					{
						position = data[1].position;
					}
					else
					{
						position = position + '或' + data[1].position;
					}
				}
				retdata.push(
				{
					"name": name,
					"position": position,
					"teacher": teacher,
					"weeks": weeks,
					"day": day,
					"sections": sections
				}
				)
				return retdata;
			}
			/************************************
			conflict handling is not finished yet, this may needs platform to changing its strategy on conflict,
			to detect and modify the conflicting courses is too hard for me, waiting for next developer to finishe it.
			2022/3/2
			 ************************************/
			/*this code is not usable.
			else
		{
			//create new lesson for conflict
			let sections = data[0].sections.filter(function (v)
		{
			return data[1].sections.includes(v)
			}
			);
			for (let ci = 0; ci < sections.length; ci++)
		{
			data[0].sections = _array_remove(data[0].sections, sections[ci]);
			data[1].sections = _array_remove(data[1].sections, sections[ci]);
			}

			let weeks = data[0].weeks.filter(function (v)
		{
			return data[1].weeks.includes(v)
			}
			);
			for (let ci = 0; ci < weeks.length; ci++)
		{
			data[0].weeks = _array_remove(data[0].weeks, weeks[ci]);
			data[1].weeks = _array_remove(data[1].weeks, weeks[ci]);
			}

			let name = '[冲突]' + data[0].name + '|' + data[1].name;
			let teacher = data[0].teacher + '|' + data[1].teacher;
			let position = data[0].position + '|' + data[1].position;
			retdata.push(
		{
			"name": name,
			"position": position,
			"teacher": teacher,
			"weeks": weeks,
			"day": data[0].day,
			"sections": sections
			}
			);
			retdata.push(data[0]);
			retdata.push(data[1])
			return retdata;
			}
			 */
		}
	}
	return data;
}
function conflict_handling(data)
{
	//will not create conflict
	if (data == undefined)
	{
		return data;
	}
	if (data.length <= 1)
	{
		return data
	}
	if (data.length == 2)
	{
		return _atom_conflict_handling_(data);
	}
	/*
	Conflict: Courses scheduled within one class hour with the same number of weeks
	1. The same course name, the same number of sections: teachers use commas to superimpose,
	take a week number and section number, and use "or" for the location to superimpose
	2. The same course name, different number of sections: the course name is marked with "conflict",
	the teacher superimposes it with a comma, take a week number, the number of sections,
	and the location is superimposed with "or"
	3. Different course names, the same number of weeks, and the same number of sections:
	the course name is marked with "conflict", the teacher is superimposed with a comma,
	the longest number of weeks, the number of sections, and the location are superimposed with "conflict on"

	Note: Courses with different course names, different week numbers and no conflict between week numbers will not be processed.
	 */
	return data
}
