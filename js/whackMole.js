 document.addEventListener('plusready', function() {
	// 在下面要用到的元素，因为会多次用到同一个，所以直接在上面一次性拿取，避免多次声明浪费性能。
	// 本来性能就不好........
	var putMouse = $getId('putMouse');
	var allMouseNum = $getItem("userInfo").allMouseNum;
	var body = $getTagName('body')[0];
	var nowGetCents = $getId('nowGetCents');
	var nowTime = $getId('time');
	var putbillboard = $getId('putbillboard');
	var status = $getItem("userInfo").status;
	var userInfo = $getItem("userInfo")
	// 得到所有老鼠数量，然后动态生成老鼠
	for (var i = 0; i < allMouseNum; i++) {
		var div = document.createElement('div');
		var mole = document.createElement('div');
		var hammer = document.createElement('div');
		$addClass(mole, 'mole');
		// 在老鼠上自定义一个属性，为了下面点击它的时候出现相对应的老鼠
		mole.index = i;
		$addClass(hammer, 'hammer');
		if (allMouseNum == 6) {
			$addClass(div, 'six-mouse');
		} else if (allMouseNum == 8) {
			$addClass(div, 'eight-mouse');
		} else if (allMouseNum == 10) {
			$addClass(div, 'ten-mouse');
		} else if (allMouseNum == 12) {
			$addClass(div, 'twelve-mouse');
		}
		div.appendChild(mole);
		div.appendChild(hammer);
		putMouse.appendChild(div);
	}
	var closeTime;
	//获取了老鼠和锤子的元素数组
	var mouse = $getClass($getId('putMouse'), 'mole');
	var hammer = $getClass($getId('putMouse'), 'hammer');
	clearInterval(closeTime);
	//下面的思路，就是通过间歇调用中的延时调用去判断每次mouse元素数组中的项的className有没有
	//showMole这一个，如果有的话，就将判断变量judgeTime++；然后在剩余次数上将次数减去这个判断数。
	//如果最后剩余次数为0；则将接卸调用清除，结束游戏。
	var setInTime = 1500;
	closeTime = setInterval(function() {
		clearTimeout(setTime);
		//randomNum就是随机出现的老鼠数量。后面的setRandom，第一个参数是最大老鼠数量，第二个参数是最小老鼠数量。
		var randomNum = $setRandom(4, 2);
		if (Number($getId('nowGetCents').innerText) < 30) {
			randomNum = $setRandom(2, 1);
		} else if (Number($getId('nowGetCents').innerText) < 60) {
			randomNum = $setRandom(4, 2);
			setInTime = 1000;
		} else if (Number($getId('nowGetCents').innerText) < 120) {
			randomNum = $setRandom(5, 1);
			setInTime = 800;
		} else if (Number($getId('nowGetCents').innerText) < 200) {
			randomNum = $setRandom(6, 1);
			setInTime = 300;
		}
		// 将所有的老鼠和锤子初始化
		for (var z = 0; z < allMouseNum; z++) {
			$removeClass(mouse[z], 'showMole');
			$removeClass(hammer[z], 'hammerRota');
		}
		// 按照老鼠随机数，随机出现老鼠
		for (var j = 0; j < randomNum; j++) {
			var randomIndex = $setRandom(allMouseNum);
			$addClass(mouse[randomIndex], 'showMole');
		}
		//延时调用
		var setTime = setTimeout(function() {
			var judgeTime = 0;
			var mouseList = [];
			//获取所有className中包含着showMole的老鼠数量
			for (var ti = 0; ti < allMouseNum; ti++) {
				mouseList.push(mouse[ti]);
				if (mouse[ti].className.indexOf('showMole') != -1) {
					judgeTime++;
				}
			}
			var nowSetTime = Number(nowTime.innerText) - judgeTime;
			nowTime.innerText = nowSetTime;
			//进度条变化
			var scroll = '';
			if (nowSetTime < 0) {
				scroll = 0 + '%';
				nowTime.innerText = 0;
			} else {
				scroll = ((nowSetTime / 30) * 100) + '%';
			}
			//下面这个是去除右边的边角border-radius
			$removeClass($getId('scroll'), 'all-scroll');
			$getId('scroll').style.width = scroll;
			if (Number(nowTime.innerText) <= 0) {
				
				clearInterval(closeTime)
				var nowIndex = $getIndex(userInfo.info, "name", status);
				oldInfo = {
					'name': userInfo.info[nowIndex].name,
					'img': userInfo.info[nowIndex].img,
					'cents': userInfo.info[nowIndex].cents,
					'password': userInfo.info[nowIndex].password
				}
				userInfo.info[nowIndex].cents = Number(nowGetCents.innerText);
				userInfo.info[userInfo.info.length] = oldInfo;
				var newUserInfoList = $sort(userInfo.info);
				var newIndex = $getIndex(newUserInfoList, "name", status, 'cents', Number(nowGetCents.innerText));
				$getId('putCents').innerText = nowGetCents.innerText;
				$getId('nowBill').innerText = newIndex + 1;
				$addClass($getId('billboardCheck'), 'show');
				$setItem("userInfo", userInfo)
			}
		}, setInTime * 0.9)
	}, setInTime)
	body.addEventListener('touchstart', function(e) {
		var _self = e.target;
		if (_self.className.indexOf('showMole') != -1) {
			$getId('music').load();
			$getId('music').play();
			$removeClass(_self, 'showMole');
			nowGetCents.innerText = Number(nowGetCents.innerText) + 1;
			$addClass(hammer[_self.index], 'hammerRota')
		}
	})
	body.addEventListener('touchend', function(e) {
		var _self = e.target;
		if (_self.id == 'endGame') {
			$openHtml('playGame.html')
		} else if (_self.id == 'startAgain') {
			$openHtml("whackAMole.html");
		} else if (_self.id == 'backBtn') {
			$openHtml('playGame.html');
			clearInterval(closeTime);
		}
	})
})
