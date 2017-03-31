// 解析url参数 调试处输入window.location.search可以获取？后搜索的key
// 将 ?id=12345&a=b 转换为  Object {id:12345,a=b}
export function urlParse() {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	//['?id=12345','&a=b']
	if(arr){
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			// 考虑字符可能为中文，  js的系统函数
			// 编码函数：encodeURIComponent(URIstring )
			// 解码函数：decodeURIComponent(URIstring )
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		})
	}
	return obj;
}
