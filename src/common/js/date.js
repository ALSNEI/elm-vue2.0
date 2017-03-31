export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		// 分组捕获RegExp.$1匹配到yyyy,(date.getFullYear() + '')转换为字符串，substr（start，length/可选）截取字符串
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};
// 补零
function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
