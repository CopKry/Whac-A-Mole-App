document.addEventListener('plusready', function() {
	var putMouse = $getId('putMouse');
	var allMouseNum = $getItem("userInfo").allMouseNum;
	var body = $getTagName('body')[0];
	var nowGetCents = $getId('nowGetCents');
	var nowTime = $getId('time');
	var putbillboard = $getId('putbillboard');
	for (var i = 0; i < allMouseNum; i++) {
		var div = document.createElement('div');
		var mole = document.createElement('div');
		var hammer = document.createElement('div');
		$addClass(mole, 'mole');
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
	var mouse = $getClass($getId('putMouse'), 'mole');
	var hammer = $getClass($getId('putMouse'), 'hammer');
	clearInterval(closeTime);
	// 我想想.间歇调用里面弄个延时调用,去判断有着class:mouse这个的长度
	// 如果大于0;说明有一个没有点到.那么剩余次数就扣个一.
	// 再在间歇调用中去判断分数
	var setInTime = 1000;
	closeTime = setInterval(function() {
		var randomNum = Math.floor(Math.random() * 4 + 2);
		if (Number($getId('nowGetCents').innerText) < 30) {
			randomNum = Math.floor(Math.random() * 2 + 1);
		} else if (Number($getId('nowGetCents').innerText) < 60) {
			randomNum = Math.floor(Math.random() * 4 + 2);
			setInTime = 900;
		} else if (Number($getId('nowGetCents').innerText) < 120) {
			randomNum = Math.floor(Math.random() * 5 + 1);
			setInTime = 800;
		} else if (Number($getId('nowGetCents').innerText) < 200) {
			randomNum = Math.floor(Math.random() * 6 + 1);
			setInTime = 300;
		}
		for (var z = 0; z < allMouseNum; z++) {
			$removeClass(mouse[z], 'showMole');
			$removeClass(hammer[z], 'hammerRota');
		}
		for (var j = 0; j < randomNum; j++) {
			var randomIndex = Math.floor(Math.random() * allMouseNum);
			$addClass(mouse[randomIndex], 'showMole');
		}
		setTimeout(function() {
			var judgeTime = 0;
			var mouseList = [];
			for (var ti = 0; ti < allMouseNum; ti++) {
				mouseList.push(mouse[ti]);
				if (mouse[ti].className.indexOf('showMole') != -1) {
					judgeTime++;
				}
			}
			var nowSetTime = Number(nowTime.innerText) - judgeTime;
			nowTime.innerText = nowSetTime;
			var scroll = '';
			if (nowSetTime < 0) {
				scroll = 0 + '%';
				nowTime.innerText = 0;
			} else {
				scroll = ((nowSetTime / 30) * 100) + '%';
			}
			$removeClass($getId('scroll'), 'all-scroll');
			$getId('scroll').style.width = scroll;
			if (Number(nowTime.innerText) <= 0) {
				clearInterval(closeTime)
				var status = $getItem("userInfo").status;
				var userInfo = $getItem("userInfo")
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
	for (var h = 0; h < mouse.length; h++) {
		mouse[h].h = h;
		mouse[h].ontouchstart = function() {
			if (this.className.indexOf('showMole') != -1) {
				$getId('music').load();
				$getId('music').play();
				$removeClass(this, 'showMole');
				nowGetCents.innerText = Number(nowGetCents.innerText) + 1;
				$addClass(hammer[this.h], 'hammerRota')
			}
		}
	}
	body.addEventListener('touchstart', function(e) {
		var _self = e.target;
		if (_self.className.indexOf('showMole') != -1) {
			$getId('music').load();
			$getId('music').play();
			$removeClass(_self, 'showMole');
			nowGetCents.innerText = Number(nowGetCents.innerText) + 1;
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
