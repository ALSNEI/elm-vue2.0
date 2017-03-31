// 通用型的数据存储与读取
// 存储数据
export function saveTolLocal(id,key,value){
	// localStorage只有在浏览器window环境下才有，node是没有的，所以window.localStorage
	let seller = window.localStorage.__seller__;
	// 第一次是没有seller对象
	if(!seller){
		seller={};
		seller[id] = {};
	}else {
		// 利用JSON.parse()解析这个对象
		seller=JSON.parse(seller);
		// 储存了一个商家ID后又换了另外一个商家的判断
		if(!seller[id]){
			seller[id] = {};
		}
	}
	seller[id][key] = value;
	// localStorage不允许直接存储对象的，利用JSON.stringify()解析为字符串
	window.localStorage.__seller__ = JSON.stringify(seller);
};

// 读取数据
export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	}
	// 取不到ID
	seller = JSON.parse(seller)[id];
	if(!seller){
		return def;
	}
	let ret = seller[key];
	return ret || def;
}