document.addEventListener('plusready', function() {
	var userInfoList = $getItem('userInfo').info;
	var billboardH2 = $getTagName($getId('billboard'), 'h2');
	var putbillboard = $getId('putbillboard');
	var body = $getTagName('body')[0];
	var click = false;
	var allMouseNum = 0;
	var newUserInfoList = $sort(userInfoList);
	for (var t = 0; t < newUserInfoList.length; t++) {
		var p = document.createElement('p');
		var span1 = $createChirld('span', "第" + (t + 1) + '名：' + newUserInfoList[t].name);
		// var span1 = document.createElement('span');
		var span2 = $createChirld('span', '得分：' + newUserInfoList[t].cents);
		// span1.innerHTML = "第" + (t + 1) + '名：' + newUserInfoList[t].name;
		// span2.innerHTML = '得分：' + newUserInfoList[t].cents;
		putbillboard.appendChild(p)
		p.appendChild(span1);
		p.appendChild(span2);
	}
	if (newUserInfoList.length >= 3) {
		for (var j = 0; j < newUserInfoList.length; j++) {
			if (j < 3) {
				var bilSpan = $createChirld('span', '得分为：' + newUserInfoList[j].cents + '分');
				// document.createElement('span');
				// bilSpan.innerHTML = '得分为：' + newUserInfoList[j].cents + '分'
				billboardH2[j].innerHTML += newUserInfoList[j].name;
				billboardH2[j].appendChild(bilSpan);
			}
		}
	} else {
		for (var k = 0; k < 3; k++) {
			if (k < newUserInfoList.length) {
				// var bilSpan = document.createElement('span');
				// bilSpan.innerHTML = '得分为：' + newUserInfoList[k].cents + '分'
				var bilSpan = $createChirld('span', '得分为：' + newUserInfoList[k].cents + '分');
				billboardH2[k].innerHTML += newUserInfoList[k].name;
				billboardH2[k].appendChild(bilSpan);
			} else {
				billboardH2[k].innerHTML += "还未有人得此荣誉";
			}
		}
	}
	var selectP = $getClass("selectP");
	var prev = selectP[0]
	body.addEventListener('touchstart', function(e) {
		var _self = e.target;
		if (_self.className == 'selectP') {
			$removeClass(prev, 'show');
			$addClass(_self, 'show');
			prev = _self;
			click = true;
			allMouseNum = parseInt(_self.innerHTML);
		} else if (_self.id == 'billboardCheck') {
			$removeClass($getId('billboardCheck'), 'show');
		}
	})
	body.addEventListener('touchend', function(e) {
		var _self = e.target;
		if (_self.id == 'billboardBtn') {
			$addClass($getId('billboardCheck'), 'show');
		} else if (_self.id == "startGameBtn") {
			if (click) {
				var userInfo = $getItem("userInfo");
				userInfo.allMouseNum = allMouseNum;
				$setItem("userInfo", userInfo);
				$openHtml('whackAMole.html');
			} else {
				$alertTitle("请选择难度，不然怎么玩？拿头玩吗？")
			}
		} else if (_self.id == 'backBtn') {
			$openHtml("index.html");
		}
	})
})
