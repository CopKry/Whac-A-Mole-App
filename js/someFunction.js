function $getId(id) {
	return document.getElementById(id);
}

function $getClass() {
	if (arguments.length === 1) {
		return document.getElementsByClassName(arguments[0]);
	} else {
		return arguments[0].getElementsByClassName(arguments[1]);
	}
}

function $getTagName() {
	if (arguments.length === 1) {
		return document.getElementsByTagName(arguments[0]);
	} else {
		return arguments[0].getElementsByTagName(arguments[1]);
	}
}

function $alertTitle(string) {
	plus.nativeUI.toast(string)
}

function $openHtml(url, slide) {
	slide = slide == undefined ? 'slide-in-right' : slide;
	plus.webview.open(url, 'new', {}, slide, 200);
}

function $back() {
	var _self = this;
	// 先存一个this指向构造函数对象
	var webiew = plus.webview.currentWebview()
	// 把一个plus对象赋值给webview常量
	var backButtonPress = 0;
	plus.key.addEventListener('backbutton', function() {
		// backbutton  事件 是指的手机上面的物理按健
		backButtonPress++
		if (backButtonPress > 1) {
			webiew.back();
		} else {
			webiew.close()
		}
	})
}

function $setItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function $getItem(key) {
	return JSON.parse(localStorage.getItem(key));
}

function $addClass() {
	if (arguments.length === 2) {
		arguments[0].classList.add(arguments[1]);
	} else {
		arguments[0].classList.add(arguments[1]);
		arguments[2].classList.add(arguments[3]);
	}
}

function $removeClass() {
	if (arguments.length === 2) {
		arguments[0].classList.remove(arguments[1]);
	} else {
		arguments[0].classList.remove(arguments[1]);
		arguments[2].classList.remove(arguments[3]);
	}
}

function judge() {
	var username = arguments[0];
	if (arguments.length == 3) {
		var password = arguments[1];
		var userInfo = arguments[2];
		var result = userInfo.info.filter(
			function(value, index) {
				return value.name == username && value.password == password
			});
		return result;
	} else {
		var result = arguments[1].info.filter(
			function(value, index) {
				return value.name == username
			});
		return result;
	}
}

function $registerUser(userInfo, registerUserName, registerPassWord, selectImg) {
	userInfo.info.push({
		name: registerUserName,
		password: registerPassWord,
		cents: 0,
		img: selectImg
	})
	return userInfo;
}

function $registerTiao(userInfo, registerUserName, registerPassWord, loginUserName, loginPassWord, register,
	registerTab, login, loginTab, selectImg) {
	userInfo = $registerUser(userInfo, registerUserName.value, registerPassWord.value, selectImg);
	$setItem('userInfo', userInfo);
	loginUserName.value = registerUserName.value;
	registerUserName.value = '';
	registerPassWord.value = ''
	loginPassWord.value = '';
	$removeClass(register, 'show', registerTab, 'show');
	$addClass(login, 'show', loginTab, 'show');
	$alertTitle('注册成功，皇帝登基')
}

function $sort(userInfoList) {
	var newUserInfoList = userInfoList.sort(function(value1, value2) {
		if (value1.cents > value2.cents) {
			return -1;
		} else if (value1.cents < value2.cents) {
			return 1;
		} else {
			return 0;
		}
	})
	return newUserInfoList;
}

function $getIndex(status,userInfoList) {
	for (var l = 0; l < userInfoList.length; l++) {
		if (status == userInfoList[l].name) {
			return l;
		}
	}
}
function $createChirld(elType,string){
	var el=document.createElement(elType);
	el.innerHTML=string;
	return el;
}