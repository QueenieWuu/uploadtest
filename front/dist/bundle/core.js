var GY = {};

//GY.host = 'http://10.10.10.167:8080/';
GY.path = '/o2oOperationCenter/front/';

GY.interface = {
	url: {
			user: 'user.do',
			order: 'order.do',
			report: 'report.do',
			area: 'areaManage.do',
			product: 'storeProduct.do'
		},
		/*io参数*/
		method: {
			storename: 'storename',
			userstore: 'userstore',
			getshopuser: 'getshopuser',
			shopuserdel: 'shopuserdel',
			shopusersearch: 'shopusersearch',
			shopuseradd: 'shopuseradd',
			shopusersave: 'shopusersave',
			storetype: 'storetype',
			shopsave: 'shopsave',
			messagecount: 'messagecount',
			todayIndicators: 'todayIndicators',
			getIndicatorsInfo: 'toGetIndicatorsInfo',
			storesFans: 'storesFans',
			orderCount: 'orderCount',
			orderInfoList: 'getOrderInfoList',
			orderInfo: 'getOrderInfoByOrderId',
			updateOrder: 'toOperateOrder',
			getProvinceList: 'getProvinceInfo',
			getCityList: 'getSelectCityList',
			getDistrictList: 'getDistrictInfo',
			getMessage: 'unreadmessage',
			messagedel: 'messagedel',
			storeproduct: 'storeProduct',
			allOnUnder: 'allOnUnder',
			updateSalePrice: 'modifySalePrice',
			allDele: 'allDele'

		}
};

GY.step = {
	/*配送步骤*/
	normal: [{
		t: '待接单',
		c: 'spacer3',
		s: 1
	}, {
		t: '准备药品',
		c: 'spacer4',
		s: 2
	}, {
		t: '等待配送',
		c: 'spacer4',
		s: 3
	}, {
		t: '配送中',
		c: 'spacer3',
		s: 4
	}, {
		t: '完成',
		c: '',
		s: 5
	}],
	/*自提步骤*/
	self: [{
		t: '待接单',
		c: 'spacer3',
		s: 1
	}, {
		t: '准备药品',
		c: 'spacer4',
		s: 2
	}, {
		t: '等待自提',
		c: 'spacer4',
		s: 10
	}, {
		t: '完成',
		c: '',
		s: 5
	}]
};

GY.reason = {
	'商品修改': '因商品缺失，经协商更换商品，请输入修改方案，如：健胃消食片（儿童）￥8.20替换为“健胃消食片（成人）￥8.50，支付总额为￥8.50',
	'价格修改': '因订单中商品价格有误，经协商更改价格，请输入修改方案，如：健胃消食片（儿童）￥8.20 价格修改为 ￥8.50，支付总额为￥8.50',
	'其他': '请输入其他修改方案'
};

GY.template = {
	/*左边导航*/
	nav: function() {
		var html = [];

		html.push('<div class="logo"></div>');
		html.push('<ul class="nav">');
		html.push('<li data-index><a href="index.html"><i class="nav-ico1"></i><p>首页</p></a><b></b></li>');
		html.push('<li data-orders><a href="orders.html?status=1"><i class="nav-ico2"></i><p>订单管理</p></a><span id="todoCount" class="f-white bg-red">0</span><b></b></li>');
		html.push('<li data-medicine><a href="medicine.html"><i class="nav-ico3"></i><p>药品管理</p></a><b></b></li>');
		html.push('<li data-assistant><a href="assistant.html"><i class="nav-ico4"></i><p>店员管理</p></a><b></b></li>');
		html.push('<li data-members><a href="members.html"><i class="nav-ico5"></i><p>会员管理</p></a><b></b></li>');
		html.push('</ul>');

		return html.join('');
	},
	/*首页药店信息*/
	store: function(data) {
		var html = [];

		html.push('<div data-sid="' + data.id + '" class="bg-white mb10 cf index-info-box" title="进入药店详情">');
		html.push('<img src="' + data.img + '" class="fl img100">');
		html.push('<div class="fl index-info">');
		html.push('<div data-msg class="msg f-white" title="信息箱">');
		html.push('<i></i> <span class="pop-num"><b></b><em id="msgCount">0</em></span>');
		html.push('</div>');
		html.push('<p class="f16 f-black">' + data.name + '</p>');
		html.push('<p class="f15 f-gray">' + data.addr + '</p>');
		html.push('</div>');
		html.push('<div data-status="' + data.status + '" class="' + data.statusClass + ' fr" title="营业状态切换"></div>');
		html.push('</div>');
		return html.join('');
	},
	/*药店详情页*/
	storeDetail: function(data) {
		var formUrl = GY.path + GY.interface.url.user + '?method=' + GY.interface.method.shopsave,
			html = [];
		html.push('<form id="form" action="' + formUrl + '" method="post" enctype="multipart/form-data">');
		html.push('<div class="cf"><div class="fl">');
		html.push('<p><span>药店名称：</span><i class="f-black">' + data.name + '</i></p>');
		html.push('<div data-preview class="shop-photo"><img src="' + data.img + '" class="img100" title="更换店铺图片"></div>');
		html.push('<p class="phone-num"><span class="label-top">联系电话：</span>');
		html.push('<input name="preTel" type="text" class="form contact-l" value="' + data.preTel + '"/>&nbsp-&nbsp');
		html.push('<input name="sufTel" type="text" class="form contact-r" value="' + data.sufTel + '" /></p>')
		html.push('<p><span class="label-top">营业时间：</span>');
		html.push('<input name="workStartTime" type="text" class="form time-ipt" value="' + data.startTime + '" />&nbsp;至&nbsp;');
		html.push('<input name="workEndTime" type="text" class="form time-ipt" value="' + data.endTime + '" /></p>');
		html.push('<p><span class="label-top">联系人：</span><input name="contactPerson" type="text" class="form contact" value="' + data.contactPerson + '" /></p>');
		html.push('<p><i>联系人手机号：</i><input name="contactMoblie" type="text" class="form tel-ipt" value="' + data.contactMoblie + '" /></p>');
		if (data.ifDtp === 1) {
			html.push('<p><i>是否dtp药房：</i><label data-switch class="switch-on" id="ifdtp" for="ipt-ifdtp">YES<i></i></label><input class="hide" type="text" value="1" id="ipt-ifdtp" name="ifDtp"/>');
		} else {
			html.push('<p><i>是否dtp药房：</i><label data-switch class="switch-off" id="ifdtp" for="inp-ifdtp">NO<i></i></label><input class="hide" type="text" value="0" id="ipt-ifdtp" name="ifDtp"/>');
		}
		if (data.ifYibao === 1) {
			html.push('<i>是否医保：</i><label data-switch class="switch-on" id="ifyibao" for="inp-ifyibao">YES<i></i></label><input class="hide" type="text" value="1" id="ipt-ifyibao" name="ifYibao"/></p>');
		} else {
			html.push('<i>是否医保：</i><label data-switch class="switch-off" id="ifyibao for="inp-ifyibao">NO<i></i></label><input class="hide" type="text" value="0" id="ipt-ifyibao" name="ifYibao"/></p>');
		}
		if (data.ifNight === 1) {
			html.push('<p><i>是否支持夜间售药：</i><label data-switch class="switch-on" id="ifnight" for="inp-ifnight">YES<i></i></label><input class="hide" type="text" id="inp-ifnight" value="1" name="ifNight"/></p>');

		} else {
			html.push('<p><i>是否支持夜间售药：</i><label data-switch class="switch-off" id="ifnight for="inp-ifnight">NO<i></i></label><input class="hide" type="text" id="inp-ifnight" value="0" name="ifNight"/></p>');

		}
		html.push('<p class="dispatch-title f16">配送设置</p>');
		html.push('<p class="dispatch"><span>配送费用设定：</span>');
		html.push('<input name="distributionPrice" type="text" class="form" readonly value="' + data.distributionPrice + '"/>元</p>');
		html.push('<p class="dispatch"><span>配送范围设定：</span>');
		html.push('<input name="distributionScope" type="number" class="form" value="' + data.distributionScope + '"/>m</p>');
		/*html.push('<p class="dispatch"><span>起送费设定：</span>');*/
		/*html.push('<input name="distributionStartPrice" type="text" class="form" value="' + data.distributionStartPrice + '"/>元</p>');*/
		html.push('</div><div class="fr"><p>');
		html.push('<span class="r-span">药店地址：</span>');
		html.push('<select name="provinceId" class="form f-black"><option value="default">请选择</option></select>&nbsp;&nbsp;省&nbsp;&nbsp;');
		html.push('<select name="cityId" class="form f-black"><option value="default">请选择</option></select>&nbsp;&nbsp;市</p>');
		html.push('<p class="area">');
		html.push('<select name="districtId" class="form f-black"><option value="default">请选择</option></select>&nbsp;&nbsp;区/县</p>');
		html.push('<p class="cf ">');
		html.push('<span data-position class="fr loc-btn bg-green"><i></i><em class="f-white">地图定位获取</em></span>');
		html.push('<textarea name="address" class="form fr detail-add">' + data.addr + '</textarea>');
		html.push('<span class="r-span fr">具体地址信息:</span></p>');
		html.push('<div id="map" class="map"></div></p>');
		html.push('<div class="fr btn-box">');
		if (data.changes === 1) {
			$('.store-status').html('审核中');
		}
		if (data.changes === 0) {
			$('.store-status').html('已审核');
		}
		html.push('<div data-submit class="btn btn-orange btn-lg">保存</div>');
		html.push('</div>');
		html.push('</div></div>');
		html.push('<input id="uploadImg" name="storeImage" type="file" class="hide" />');
		html.push('<input name="id" type="hidden" value="' + data.id + '" />');
		html.push('<input name="longitude" type="hidden" value="' + data.longitude + '" />');
		html.push('<input name="latitude" type="hidden" value="' + data.latitude + '" />');
		html.push('</form>');
		return html.join('');
	},
	/*店员*/
	membersList: function(data) {
		var html = [];
		html.push('<li class="cf"><div class="fl p1 assistant-photo">');
		html.push('<span class="assistant-photo-default">');
		html.push('<img src="' + data.img + '" class="img100">');
		html.push('</span></div>');
		html.push('<div class="fl p2">' + data.name + '</div>');
		html.push('<div class="fl p3">' + data.sex + '</div>');
		html.push('<div class="fl p4">' + data.phone + '</div>');
		html.push('<div class="fl p5">' + data.jobs + '</div>');
		html.push('<div class="fl p6"><span class="f-red f24">' + data.score + '</span>分</div>');
		html.push('<div class="fl p7">');
		html.push('<span data-delete data-aid="' + data.id + '" class="btn btn-white-outline">删除</span>');
		html.push('<span data-update data-aid="' + data.id + '" class="btn btn-orange">修改</span>');
		html.push('</div></li>');
		return html.join('');
	},
	/*订单列表*/
	orderList: function(data) {
		var html = [];
		html.push('<li data-oid="' + data.id + '" data-status="' + data.status.status + '" class="cf">');
		html.push('<div class="fl ' + data.status.class + ' orders-states"></div>');
		html.push('<div class="f-black fl p8"><p class="f16">' + data.status.text + '</p>');
		if (data.status.status === 1) {
			html.push('<p class="f12">剩余1：30</p>');
		};
		html.push('</div>');
		html.push('<div class="fl f-gray">');
		html.push('<p>配送至：' + data.user.name + ' ' + data.user.phone + '</p>');
		html.push('<p>' + data.user.addr + '</p>');
		if (data.status.status === 1 || data.status.status === 2 || data.status.status === 3 || data.status.status === 4 || data.status.status === 10 || data.status.status === 14) {
			html.push('<p class="f-black">距离：' + data.distance + '<span class="f-red ml1">&yen;<i class="f24">' + data.price + '</i></span></p>');
		};
		html.push('</div>');
		if (data.status.status === 1 || data.status.status === 2 || data.status.status === 3 || data.status.status === 4 || data.status.status === 10 || data.status.status === 14) {
			html.push(GY.template.orderStep(data.step.category, data.step.type));
		} else {
			html.push('<div class="fr failure-price">');
			html.push('<span class="f-black">距离：' + data.distance + '</span>');
			html.push('<span class="f-red ml1">&yen;<em class="f24">' + data.price + '</em></span>');
			html.push('</div>');
		};
		html.push('</li>');

		return html.join('');
	},
	/*订单详情*/
	orderDetail: function(data) {
		var html = [];

		html.push(GY.template.orderStep(data.step.category, data.step.type));
		/*待处理*/
		if (data.status === 1) {
			html.push('<div class="order-detail-tip cf">');
			html.push('<div class="fl time f24"><i></i>');
			html.push('<span class="f-white bg-red minute_show">10</span>');
			html.push('<span class="f-black">:</span>');
			html.push('<span class="f-white bg-red second_show">00</span>');
			html.push('</div><p class="fl f-red">后将自动放弃订单，注意放弃订单将影响药店的接单率及最后的奖金发放，请尽快处理!');
			html.push('</p></div>');
			var sysStr = (data.sysTime).replace(/-/g, "/");
			var creatStr = (data.orderTime).replace(/-/g, "/");
			var sysDate = new Date(sysStr); //将字符串转化为时间
			var creatDate = new Date(creatStr);
			var intDiff = parseInt(600 - ((sysDate - creatDate) / 1000)); //倒计时总秒数量
			function timer(intDiff) {
				setInterval(function() {
					var minute = 0,
						second = 0; //时间默认值		
					if (intDiff > 0) {
						minute = Math.floor(intDiff / 60);
						second = Math.floor(intDiff) - (minute * 60);
					}
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					$('.minute_show').html(minute);
					$('.second_show').html(second);
					intDiff--;
				}, 1000);
			}
			timer(intDiff);
		};
		/*准备药品*/
		if (data.status === 2) {
			html.push('<div class="order-detail-tip cf">');
			html.push('<div id="addNote" class="btn btn-green-outline add-remark fl">');
			html.push('<span class="f-red">*</span>添加备注</div>');
			html.push('<div id="selectAll" class="f-black fr">全选 ');
			html.push('<div class="select select-green"><span></span>');
			html.push('</div></div></div>');
		};
		/*已完成*/
		if (data.status === 5 || data.status === 6) {
			html.push('<div class="finish-tip cf f-green"><i></i>');
			html.push('<p><span>订单编号：' + data.orderCode + '</span></p>');
			html.push('<p><span>发货时间：' + data.readyForDelivery + '</span>');
			html.push('<span>配送完成时间：' + data.orderFinish + '</span>');
			html.push('<span>用户完成订单：' + data.orderFinish + '</span></p></div>');
		}
		/*已失效(商家放弃 订单超时)*/
		if (data.status === 7 || data.status === 9) {
			html.push('<div class="order-detail-tip cf">');
			html.push('<div class="fl failure"><i></i>');
			html.push('<p class="f-gray">订单编号：' + data.orderCode + '</p>')

			/*html.push('<span class="f-gray">订单已失效</span>');*/
			html.push('<p><span class="f-gray">失效时间：' + data.cancelDate + '</span></p>');
			html.push('</div></div>');
		};
		if (data.status === 11) {
			html.push('<div class="order-detail-tip failure cf">');
			html.push('<div class="fl failure time f15"><i></i>');
			html.push('<span class="f-gray">订单退款中</span>');
			html.push('</div></div>');
		};
		if (data.status === 2) {
			html.push('<ul class="medicine-list select-items">');
		} else {
			html.push('<ul class="medicine-list">');
		};
		$.each(data.product, function(i, item) {
			html.push(GY.template.orderProduct(item));
		});
		html.push('</ul>')
		html.push('<div class="cf contact-info">');
		if (data.status === 2) {
			html.push('<p class="tip hide"></p>');
		}
		if (data.remark) {
			html.push('<p class="tip">');
			html.push('<span class="f-red">*</span>' + data.remark + '</p>');
		}
		html.push('<div class="fl">');
		console.log(data.step.type);
		if (data.step.type == 'normal') {
			html.push('<p class="f-gray">');
			html.push(data.user.name + ' ' + data.user.phone + ' 配送至：' + data.user.addr);
			html.push('</p><p>');
			if (data.urgent == 0) {
				html.push('配送费：<span class="f-red">+&yen;' + data.freight + '</span>');
			} else {
				html.push('加急：<span class="f-red">+&yen;' + data.urgent + '</span>');
			}


		} else {
			html.push('<p>');
		}

		html.push('优惠：<span class="f-green">-&yen;' + data.preferential + '</span>');
		html.push('支付金额：<span class="f-red">&yen;</span><span class="f-red f24">' + data.price + '</span>');
		html.push('</p></div>');
		if (data.status === 1) {
			html.push('<div data-update="1" class="btn btn-orange btn-lg fr">接单</div>');
			html.push('<div data-update="6" class="btn btn-white-outline btn-lg fr">放弃</div>');
		};
		if (data.status === 2) {
			html.push('<div data-update="2" class="btn btn-orange btn-lg fr">准备完毕</div>');
		};
		if (data.status === 3) {
			html.push('<div data-update="3" class="btn btn-yellow btn-lg fr">确定配送</div>');
		};
		if (data.status === 4) {
			html.push('<div data-update="5" class="btn btn-orange btn-lg fr">配送成功</div>');
		};
		if (data.status === 10 || data.status === 14) {
			html.push('<div data-update="4" class="btn btn-orange btn-lg fr">自提</div>');
		};
		if (data.status === 11) {
			html.push('<div data-update="7" class="btn btn-orange btn-lg fr">退款</div>');
			html.push('<div data-update="8" class="btn btn-white-outline btn-lg fr">拒绝</div>');
		};
		html.push('</div>');

		return html.join('');
	},
	/*药品信息*/
	orderProduct: function(data, orderStatus) {
		var html = [];

		html.push('<li class="cf">');
		html.push('<div class="medicine-img fl">');
		html.push('<img src="' + data.sampleImage + '" class="img100">');
		html.push('</div><div class="fl medicine-info">');
		html.push('<p class="f-black">' + data.productName + ' <span class="f18 f-green"> x'+data.count+'</span>');
		html.push('</p><p class="f-gray">规格：' + data.productStandard + '</p>');
		html.push('<p class="f-gray">生产厂家：' + data.factory + '</p></div>');
		html.push('<p class="fr f-red price">&yen; <span class="f24">' + data.price + '</span>');
		html.push('</p><div class="check">');
		html.push('<em></em><span><i></i></span>');
		html.push('</div></li>');

		return html.join('');
	},
	/*药品管理*/
	medicineList: function(data) {
		var html = [];
		html.push('<li class="cf" data-id="' + data.id + '" data-pid="' + data.productId + '"><div class="fl p3">');
		html.push('<p class="select select-orange"><span></span></p></div>');
		html.push('<div class="fl p7">' + data.productName + '</div>');
		html.push('<div class="fl p2">' + data.productStandard + '</div>');
		html.push('<div class="fl p3">' + data.brand + '</div>');
		html.push('<div class="fl p7">' + data.factory + '</div>');
		html.push('<div class="fl p3 ">' + '<input class="form price border-none" type="number" value="' + data.salePrice.toFixed(2) + '" disabled />' + '</div>');
		html.push('<div class="fl p5"><span class="btn btn-white-outline edit-btn">修改</span><span class="btn btn-orange hide save-btn">保存</span><i class="up-btn" data-top></i></div></li>');
		//data-edit 0修改   1  保存
		return html.join('');
	},
	/*两种步骤条*/
	orderStep: function(category, type) {
		var html = [];

		if (category === 'point') {
			html.push('<ul class="step-point fr">');
			$.each(GY.step[type], function(i, item) {
				html.push('<li data-step="' + item.s + '">');
				html.push('<div class="tag"><span></span><i></i></div>');
				html.push('<p class="' + item.c + '">' + item.t + '</p>');
				html.push('<div class="line"></div>');
				html.push('</li>');
			});
			html.push('</ul>');
		} else {
			console.log(category + ' / ' + type)
			html.push('<ul class="step">');
			$.each(GY.step[type], function(i, item) {
				html.push('<li data-step="' + item.s + '">');
				html.push('<div class="tag"><span></span><i></i></div>');
				html.push('<p>' + item.t + '</p>');
				html.push('<div class="step-arrow"><em></em><span></span></div>');
				html.push('</li>');
			});
			html.push('</ul>');
		};

		return html.join('');
	},
	/*消息列表*/
	msgList: function(data) {
		var html = [];
		var realTime = new Date(parseInt(data.sendTime.time)).toLocaleString().replace(/:\d{1,2}$/, ' ');
		html.push('<li data-mid="' + data.id + '" class="' + status + '">');
		html.push('<span class="msg-date">' + realTime + '</span>')
		html.push('<p><i class="' + data.icon + '"></i>&nbsp;&nbsp;');
		html.push(data.title + '<i data-delete class="close"></i></p>');
		html.push('<p class="msg-content">' + data.content);
		html.push('<a target="_blank" href="https://' + data.url + '">' + data.url + '</a> </p>');
		/*<p class="msg-content">
		content
		<a href="url"></a>
		</p>*/
		html.push('</li>');

		return html.join('');
	},
	/*添加/编辑 店员*/
	dialogMembers: function(did, aid) {
		var formUrl = GY.path + GY.interface.url.user + '?method=' + GY.interface.method.shopusersave,
			html = [];

		html.push('<div class="dialog-wrap members">');
		html.push('<div class="dialog-header">');
		if (aid !== undefined) {
			html.push('<h3>编辑店员</h3>');
		} else {
			html.push('<h3>添加店员</h3>');
		};
		html.push('<span data-cancel data-did="' + did + '" class="closed"></span>');
		html.push('</div><div class="dialog-body">');
		html.push('<form id="update-' + did + '" action="' + formUrl + '" method="post" enctype="multipart/form-data"><dl>');
		html.push('<dt>用户姓名：</dt><dd><input name="compellation" maxlength="10" type="text" class="form" /></dd>');
		html.push('<dt>性别：</dt><dd><select name="gender" class="form">');
		html.push('<option>请选择</option><option>男</option><option>女</option>');
		html.push('</select></dd>');
		html.push('<dt>岗位：</dt><dd>');
		html.push('<select name="jobsname" class="form"><option>请选择</option></select>');
		html.push('<input class="hide" name="jobid" type="text" />')
		/*html.push('<input');*/
		html.push('</dd>');
		html.push('<dt>手机号：</dt>');
		html.push('<dd><input name="tel" type="text" class="form" /></dd></dl>');
		html.push('<div data-preview class="upload"><img src="images/user_gray.png" /></div>');
		html.push('<input id="uploadImg" name="userImage" type="file" />');
		if (aid !== undefined) {
			html.push('<input name="id" type="hidden" />');
		};
		html.push('</from></div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel data-did="' + did + '" class="btn btn-green-outline btn-wide">取消</div>');
		html.push('<div data-submit data-did="' + did + '" class="btn btn-green btn-wide">确定</div>');
		html.push('</div></div>');

		return html.join('');
	},
	/*取消订单原因*/
	dialogDropOrder: function(did) {
		var html = [];

		html.push('<div class="dialog-wrap drop-order">');
		html.push('<div class="dialog-header">');
		html.push('<h3>取消原因</h3>');
		html.push('<span data-cancel data-did="' + did + '" class="closed"></span>');
		html.push('</div><div class="dialog-body">');
		html.push('<ul><li data-select>');
		html.push('<div data-text="text" class="select select-point active"><span></span></div><em>没有用户需要的货品</em>');
		html.push('</li><li data-select>');
		html.push('<div data-text="text" class="select select-point"><span></span></div><em>无人配送</em>');
		html.push('</li><li data-select>');
		html.push('<div data-text="textarea" class="select select-point"><span></span></div><em>其他理由</em>');
		html.push('</li><li><textarea class="form" rows="6"></textarea></li></ul>');
		html.push('<p>放弃订单将影响药店的接单率及最后的奖金发放，确认放弃订单吗？</p>');
		html.push('</div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel data-did="' + did + '" class="btn btn-green-outline btn-wide">再想想</div>');
		html.push('<div data-submit data-did="' + did + '" class="btn btn-green btn-wide">确认放弃</div>');
		html.push('</div></div>');

		return html.join('');
	},
	/*添加备注*/
	dialogAddNote: function(did) {
		var html = [];

		html.push('<div class="dialog-wrap note">');
		html.push('<div class="dialog-header">');
		html.push('<h3>添加备注</h3>');
		html.push('<span data-cancel data-did="' + did + '" class="closed"></span>');
		html.push('</div><div class="dialog-body">');
		html.push('<div id="reason" class="reason">');
		$.each(GY.reason, function(i, item) {
			html.push('<div class="items">');
			html.push('<div class="select select-green"><span></span></div> ' + i + '</div>');
		});
		html.push('</div><div class="text">');
		html.push('<textarea id="reasonText" class="form" rows="6" placeholder=""></textarea>');
		html.push('</div></div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel data-did="' + did + '" class="btn btn-green-outline btn-wide">取消</div>');
		html.push('<div data-submit data-did="' + did + '" class="btn btn-green btn-wide">确定</div>');
		html.push('</div></div>');

		return html.join('');
	},
	/*退款金额*/
	dialogInputMoney: function(did) {
		var html = [];

		html.push('<div class="dialog-wrap input-money">');
		html.push('<div class="dialog-header">');
		html.push('<h3>输入退款金额</h3>');
		html.push('<span data-cancel data-did="' + did + '" class="closed"></span>');
		html.push('</div><div class="dialog-body">');
		html.push('<div class="text">');
		html.push('<input type="text" class="form" />');
		html.push('</div></div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel data-did="' + did + '" class="btn btn-green-outline btn-wide">取消</div>');
		html.push('<div data-submit data-did="' + did + '" class="btn btn-green btn-wide">确定</div>');
		html.push('</div></div>');

		return html.join('');
	},
	/*选择店员*/
	dialogSelectMembers: function(did) {
		var html = [];

		html.push('<div class="dialog-wrap select-members">');
		html.push('<div class="dialog-header">');
		html.push('<h3>选择店员</h3><span data-cancel data-did="' + did + '" class="closed"></span>');
		html.push('</div><div class="dialog-body">');
		html.push('<ul class="thead"><li>');
		html.push('<div class="col selected">选择</div>');
		html.push('<div class="col name">姓名</div>');
		html.push('<div class="col sex">性别</div>');
		html.push('<div class="col phone">手机</div>');
		html.push('<div class="col jobs">岗位</div>');
		html.push('</li></ul>');
		html.push('<ul id="membersList" class="list"></ul>');
		html.push('</div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel data-did="' + did + '" class="btn btn-green-outline btn-wide">取消</div>');
		html.push('<div data-submit data-did="' + did + '" class="btn btn-green btn-wide">确定</div>');
		html.push('</div></div>');

		return html.join('');
	},
	/*提示框*/
	dialogInfo: function(text) {
		var html = [];

		html.push('<div id="dialogInfo" class="dialog">');
		html.push('<div class="mask"></div>');
		html.push('<div class="dialog-wrap info">');
		html.push('<div class="dialog-header">');
		html.push('<h3>提示</h3><span data-cancel class="closed"></span>');
		html.push('</div>');
		html.push('<div class="dialog-body"><p>' + text + '</p></div>');
		html.push('<div class="dialog-action">');
		html.push('<div data-cancel class="btn btn-green-outline btn-wide">取消</div>');
		html.push('<div data-enter class="btn btn-green btn-wide">确定</div>');
		html.push('</div></div></div>');

		return html.join('');
	}
};
! function(w, j, g) {

	j.extend(g, {
		io: function(url, query, callback){
			$.ajax({
				url: GY.path + url,
				dataType: 'jsonp',
				data: query
			}).done(function(data){
				console.dir(data);
				if(data.code === '0'){
					callback(data.data);
				};
				if(data.code === '-1'){
					window.location.href = 'login.html';
				};
				if(data.code === '-2'){
					g.dialogInfo('[ '+ data.code +' ] - '+ data.msg);
				};
			}).fail(function(jqXHR, textStatus){
				g.dialogInfo('[ '+ jqXHR.status +' ] - 服务器连接异常！');
			});
		},
		/*file:///G:/o2o_business/dist/orders.html?status=2*/
		getUrlQuery: function(query){
			/*name=abc&pp=cde&...*/
			var reg = new RegExp("(^|&)"+ query +"=([^&]*)(&|$)"),
				/*status=2来匹配*/
		        r = window.location.search.substr(1).match(reg);

		    if (r != null){
		    	/*r[2] ：status的值*/
		        return decodeURIComponent(r[2]);
		    }else{
		        return null;
		    };
		},
		defaultScope: function(){
			var today = new Date(),
				start = new Date();

			start = new Date(start.setDate(today.getDate() - 7));
			
			return {
				start: formatDate(start),
				end: formatDate(today)
			};

			function formatDate(date){

				var yy = date.getFullYear(),
					mm = date.getMonth() + 1,
					dd = date.getDate();

				return yy +'-'+ mm + '-' + dd;
			};
		},
		dialog: function(closed){
			function editMembers(callback, target, aid){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.shopuseradd},
					query4update = {
						method: GY.interface.method.getshopuser,
						userId: aid
					};

				renderDialog('members', callback, target, aid);
				g.io(url, query, function(data){
					j.each(data, function(i, item){
						j('[name=jobsname]').append('<option data-jobid="'+item.id+'">'+ item.remark +'</option>');
						/*j('[name=jobid]').val(item.id);*/
					});
					if(aid !== undefined){
						g.io(url, query4update, function(data){
							var previewUrl = (data.userHeadImage === 'default') ? 'images/user_gray.png' : data.userHeadImage;

							j('[name=id]').val(aid);
							j('[name=compellation]').val(data.compellation);
							j('[name=gender]').val(data.gender);
							j('[name=jobsname]').val(data.jobsname);
							
							/*if(j('[name=jobsname]').val)*/
							j('[name=tel]').val(data.tel);
							j('[data-preview]').html('<img src="'+ previewUrl +'" />');
						});
					};
				});
			};

			function dropOrder(callback, target){
				renderDialog('dropOrder', callback, target);
			};

			function inputMoney(callback, target){
				renderDialog('inputMoney', callback, target);
			};

			function addNote(callback, target){
				renderDialog('addNote', callback, target);
				j('#reason').find('.items').eq(0).trigger('click');
			};

			function selectMembers(callback, target){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.shopusersearch};

				renderDialog('selectMembers', callback, target);
				g.io(url, query, function(data){
					var list = [];

					j.each(data, function(i, item){
						list.push('<li data-aid="'+ item.id +'">');
						list.push('<div class="col selected"><div class="select select-orange">');
						list.push('<span></span></div></div>');
						list.push('<div class="col name">'+ item.compellation +'</div>');
						list.push('<div class="col sex">'+ item.gender +'</div>');
						list.push('<div class="col phone">'+ item.tel +'</div>');
						list.push('<div class="col jobs">'+ item.jobsname +'</div>');
						list.push('</li>');
					});

					j('#membersList').html(list.join(''));
				});
			};

			function renderDialog(type, callback, target, aid){
				var did = 'dialog'+ new Date().getTime(),
					html = [];

				if(closed !== 'detach'){
					j(target).data('did', did);
				};
				html.push('<div id="'+ did +'" class="dialog">');
				html.push('<div class="mask"></div>');
				if(type === 'members'){
					if(aid === undefined){
						html.push(g.template.dialogMembers(did));
					}else{
						html.push(g.template.dialogMembers(did, aid));
					};
				};
				if(type === 'dropOrder'){
					html.push(g.template.dialogDropOrder(did));
				};
				if(type === 'inputMoney'){
					html.push(g.template.dialogInputMoney(did));
				};
				if(type === 'addNote'){
					html.push(g.template.dialogAddNote(did));
				};
				if(type === 'selectMembers'){
					html.push(g.template.dialogSelectMembers(did));
				};
				html.push('</div>');

				j('body').append(html.join(''));
				j('#'+ did)
					.on('click', '[data-preview]', uploadPanel)
					.on('click', '[data-select]', itemSelect)
					.on('click', '#membersList li', membersSelect)
					.on('click', '#reason .items', reasonSelect)
					.on('click', '[data-cancel]', dialogClosed)
					.on('click', '[data-submit]', function(){
						callback(did);
					});
			};

			function dialogClosed(){
				var did = j(this).data('did');

				if(closed === 'detach'){
					j('#'+ did).detach();
				}else{
					j('#'+ did).hide();
				};
			};

			function itemSelect(){
				j(this).find('.select').addClass('active').end()
					.siblings('[data-select]').find('.select').removeClass('active');
			};

			function membersSelect(){
				j(this).find('.select').addClass('active').end()
					.siblings().find('.select').removeClass('active');
			};

			function reasonSelect(){
				j(this).find('.select').addClass('active').end()
					.siblings().find('.select').removeClass('active');
				j('#reasonText').attr('placeholder', g.reason[j.trim(j(this).text())]);
			};

			function uploadPanel(){
				j('#uploadImg')
					.off()
					.click()
					.change(preview);

				function preview(){
					var elem = this,
						reader = new FileReader(),
						file = j(elem).get(0).files[0];

					reader.onloadend = function(evt){
						j('<img src="'+ evt.target.result +'" />')
							.appendTo('[data-preview]')
							.one('click', function(e){
								j(this).detach();
								j(elem).val('');
								e.stopPropagation();
							});
					};
					reader.readAsDataURL(file);
				};
			};

			return {
				editMembers: editMembers,
				dropOrder: dropOrder,
				selectMembers: selectMembers,
				addNote: addNote,
				inputMoney: inputMoney
			};
		},
		dialogInfo: function(text, callback){
			if(j('#dialogInfo').length > 0) return;
			j('body').append(g.template.dialogInfo(text));
			j('#dialogInfo')
				.on('click', '[data-enter]', enter)
				.on('click', '[data-cancel]', closed);

			function closed(){
				j('#dialogInfo').detach();
			};

			function enter(){
				if(callback){
					callback(j('#dialogInfo'));
				}else{
					closed();
				};
			};
		},
		chart: function(data){
			require.config({
	            paths: {
	                echarts: 'lib/echarts'
	            }
	        });

	        renderChart();

			function renderChart(){
				var xData = [], yData = [];

				$.each(data, function(i, item){
					$.each(item, function(key, value){
						xData.push(key);
						yData.push(value);
					});
				});
				require(['echarts', 'echarts/chart/line'], function (ec){
					var chart = ec.init(document.getElementById('chart')),
						option = {
							title: false,
							tooltip: {
								trigger: 'item',
								formatter: function(params){
						            return '日期：'+ params.name +'<br />数值：'+ params.data;
								}
							},
							legend: false,
							toolbox: {
								show : false,
							},
							xAxis : [{
								type : 'category',
					            boundaryGap : false,
					            data : xData
							}],
							yAxis: [{
								type : 'value'
							}],
							series: [{
								type: 'line',
								smooth: true,
								itemStyle: {normal: {
									areaStyle: {type: 'default'}
								}},
								data: yData
							}]
						};

					chart.setOption(option);
				});
			};
		},
		pageInit: function(back){
			var header = j('header'),
				nav = j('nav');

			getNavBar(getTodoCount);
			getStoreName();

			function getNavBar(callback){
				var url = document.createElement('a'),
					target;

				url.href = window.location.href;
				/*路径中是否有'index.html'*/
				if(url.pathname.indexOf('index.html') > 0) target = 'index';
				if(url.pathname.indexOf('store.html') > 0) target = 'index';
				if(url.pathname.indexOf('message.html') > 0) target = 'index';
				if(url.pathname.indexOf('orders.html') > 0) target = 'orders';
				if(url.pathname.indexOf('order_detail.html') > 0) target = 'orders';
				if(url.pathname.indexOf('medicine.html') > 0) target = 'medicine';
				if(url.pathname.indexOf('assistant.html') > 0) target = 'assistant';
				if(url.pathname.indexOf('members.html') > 0) target = 'members';

				nav
					.html(g.template.nav())
					.find('[data-'+ target +']').addClass('active');

				callback();
			};
			function getStoreName(){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.storename},
					headerHtml;

				g.io(url, query, function(data){
					if(back){
						headerHtml = '<a href="javascript:window.history.back();" class="f-white back-orders f16">'+
									 '<span class="f30">&lt;</span>返回'+
									 '</a>'+ data;
					}else{
						headerHtml = data;
					};
					header.html(headerHtml);
				});
			};
			/*设置订单管理值=待处理+处理中*/
			function getTodoCount(){
				var todo = j('#todoCount'),
					url = GY.interface.url.order,
					query = {method: GY.interface.method.orderCount};

				g.io(url, query, function(data){
					todo.html(data.daichuli_count + data.chulizhong_count);
				});
			};
		},
		/*
		@d: true:起始结束日期为空
			false:start:当前日期-7
			      end:当前日期
		*/
		dateInit: function(start, end, d){
			var defaultDate = {};

			if(d){
				defaultDate.start = '';
				defaultDate.end = '';
			}else{
				defaultDate.start = g.defaultScope().start;
				defaultDate.end = g.defaultScope().end;
			};
			start
				.val(defaultDate.start)
				.datepicker({
					dateFormat: 'yy-mm-dd',
					regional: 'zh-CN',
					maxDate: new Date(),
					onClose: function(selectedDate) {
		                end.datepicker('option', 'minDate', selectedDate);
		            }
				});
			end
				.val(defaultDate.end)
				.datepicker({
					dateFormat: 'yy-mm-dd',
					regional: 'zh-CN',
					maxDate: new Date(),
					onClose: function(selectedDate) {
		                start.datepicker('option', 'maxDate', selectedDate);
		            }
				});
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderAssistant: function(){
			var add = j('#add'),
				list = j('#list');

			if(g.getUrlQuery('err') !== null){
				if(g.getUrlQuery('err') === '0'){
					g.dialogInfo('操作成功！', function(d){
						history.pushState('', '', 'assistant.html');
						d.detach();
					});
				}
				else if (g.getUrlQuery('err') === '2'){
					g.dialogInfo('手机号码重复！', function(d){
						history.pushState('', '', 'assistant.html');
						d.detach();
					});
				}
				else{
					g.dialogInfo('操作失败！', function(d){
						history.pushState('', '', 'assistant.html');
						d.detach();
					});
				};
			};
			renderList();
			g.pageInit();

			add.click(editAssistant);
			list.on('click', '[data-delete]', delAssistant)
				.on('click', '[data-update]', editAssistant);

			function renderList(){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.shopusersearch},
					listHtml = [];

				g.io(url, query, function(data){
					if(data.length === 0){
						list.html('<li>无数据</li>');
						return;
					};
					$.each(data, function(i, item){
						listHtml.push(g.template.membersList({
							id: item.id,
							img: (item.userHeadImage === 'default') ? 'images/assistant-photo-default.png' : item.userHeadImage,
							name: item.compellation,
							sex: item.gender,
							phone: item.tel,
							jobs: item.jobsname,
							score: item.employeesScore
						}));
					});
					list.html(listHtml.join(''));
				});
			};

			function editAssistant(){
				var aid = j(this).data('aid');

				if(aid === undefined){
					g.dialog('detach').editMembers(function(did){
						var form = j('#update-'+ did);

						if(checkFrom(form)){
							form.submit();
						};
					}, this);
				}else{
					g.dialog('detach').editMembers(function(did){
						var form = j('#update-'+ did);

						if(checkFrom(form)){
							form.submit();
						};
					}, this, aid);
				};

				function checkFrom(elem){
					var compellation = elem.find('[name=compellation]').val(),
						gender = elem.find('[name=gender]').val(),
						jobsname = elem.find('[name=jobsname]').val(),
						tel = elem.find('[name=tel]').val(),
						testTel = /^(\d{11})?$/;
					console.log(elem.find('[name=jobsname] option:selected').data('jobid'));
					j('[name=jobid]').val(elem.find('[name=jobsname] option:selected').data('jobid'));
					if(compellation === ''){
						g.dialogInfo('请填写用户姓名！');
						return false;
					};
					if(gender === '请选择'){
						g.dialogInfo('请选择性别！');
						return false;
					};
					if(jobsname === '请选择'){
						g.dialogInfo('请选择岗位！');
						return false;
					};
					if(tel === ''){
						g.dialogInfo('请填写手机号！');
						return false;
					};
					if(testTel.test(tel) === false){
						g.dialogInfo('填写手机号格式有误！');
						return false;
					};

					return true;
				};
			};

			function delAssistant(){
				var elem = j(this).parents('li'),
					url = GY.interface.url.user,
					query = {
						method: GY.interface.method.shopuserdel,
						userId: j(this).data('aid')
					};

				g.io(url, query, function(data){
					elem.detach();
				});
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderIndex: function(){
			var store = j('#store'),
				salesIndicators = j('#salesIndicators'),
				focusIndicators = j('#focusIndicators'),
				orderIndicators = j('#orderIndicators'),
				praiseIndicators = j('#praiseIndicators'),
				startDate = j('#startDate'),
				endDate = j('#endDate'),
				searchBtn = j('#search'),
				searchArgs = j('#args');

			g.dateInit(startDate, endDate);
			searchBtn.click(chart).trigger('click');
			/*图表*/
			searchArgs.on('click', 'li', function(){
				j(this).addClass('active').siblings().removeClass('active');
				chart();
			});
			/*药店*/
			store.click(function(){
				window.location.href = 'store.html?sid='+ j(this).find('[data-sid]').data('sid');
			});
			renderStore();
			msgCount();
			todayIndicators();
			g.pageInit();

			function renderStore(){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.userstore};

				g.io(url, query, function(data){
					store.html(GY.template.store({
						id: data.id,
						img: (data.image === 'default') ? 'images/store-default.png' : data.image,
						name:data.name,
						addr: data.address,
						status: data.ifOpen,
						statusClass: (data.ifOpen === 0 ) ? 'store-off' : 'store-on'
					}))
					.on('click', '[data-status]', changeStoreStatus)
					.on('click', '[data-msg]', function(evt){
						evt.stopPropagation();
						window.location.href = 'message.html';
					});
				});

				function changeStoreStatus(evt){
					var elem = this,
						status = $(elem).data('status'),
						url = GY.interface.url.user,
						query = {
							method: GY.interface.method.storetype,
							ifOpen: status
						};

					g.io(url, query, function(data){
						if(status === 0){
							$(elem).removeClass('store-off').addClass('store-on');
							$(elem).data('status', 1);
						}else{
							$(elem).removeClass('store-on').addClass('store-off');
							$(elem).data('status', 0);
						};
					});
					/*阻止当前事件向祖辈元素的冒泡传递*/
					evt.stopPropagation();
				};
			};

			function msgCount(){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.messagecount};

				g.io(url, query, function(data){
					$('#msgCount').html(data);
				});
			};

			function todayIndicators(){
				var url = GY.interface.url.order,
					query = {method: GY.interface.method.todayIndicators};

				g.io(url, query, function(data){
					salesIndicators.html(data.totalPrice);
					focusIndicators.html(data.fans);
					orderIndicators.html(data.orderCount);
					praiseIndicators.html(data.praise +'%');
				});
			};

			function chart(){
				var url = GY.interface.url.order,
					query = {
						method: GY.interface.method.getIndicatorsInfo,
						start: startDate.val(),
						end: endDate.val(),
						args: searchArgs.find('.active').data('args')
					};

				g.io(url, query, function(data){
					g.chart(data.rows);
				});
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {
	j.extend(g, {
		renderMedicineList: function() {
			var list = j('#medicine-item')
			productName = j('#product-name')
			productStatus = j('#productStatus');
			j('.medicine')
				.on('click', '.medicine-item .select', medicineListSelect)
				.on('click', '#medicineSelectAll', medicineListSelectAll)
				.on('click', '#search-medicine', medicineSearch)
				/*.on('click', '.price-up', priceUpSort)
				.on('click', '.price-down', priceDownSort)*/
				.on('click', '[data-shelves]', onOffShelves)
				.on('click', '.save-btn', savePrice)
				.on('click', '.edit-btn', editPrice)
				.on('click', '#del', delAll)
				.on('click', '[data-top]', toTop)
				.on('click', '[data-page]', pagination)
				.on('click', '#first-page', firstPage)
				.on('click', '#last-page', lastPage)
				.on('click', '.l-btn', leftPage)
				.on('click', '.r-btn', rightPage);


			renderMedicine();
			g.pageInit();

			function renderMedicine() {
				var query = {
					page: 1
				};
				getMedicineList(query);
			};

			function medicineListSelect() {
				if (j(this).hasClass('active')) {
					j(this).removeClass('active');
					j(this).parents('li').removeClass('on');
				} else {
					j(this).addClass('active');
					j(this).parents('li').addClass('on');
				};
			};

			function medicineListSelectAll() {
				if (j('#medicineSelectAll').hasClass('active')) {
					j('#medicineSelectAll').removeClass('active');
					list.find('li').removeClass('on');
					j('.medicine-item .select').removeClass('active');
				} else {
					j('#medicineSelectAll').addClass('active');
					list.find('li').addClass('on');
					j('.medicine-item .select').addClass('active');
				}
			};

			function getMedicineList(query,page) {
				var records = 0;
				listHtml = [],
					query = query,
					url = g.interface.url.product;
				query.method = g.interface.method.storeproduct;
				g.io(url, query, function(data) {
					if (data[0].list.length === 0) {
						list.html('<li>无数据</li>');
						j('.pagination').addClass('hide');
						return;
					};
					records = data[0].records;
					j.each(data[0].list, function(i, item) {
						listHtml.push(g.template.medicineList({
							productName: item.productName,
							productStandard: item.productStandard,
							salePrice: item.salePrice,
							factory: item.factory,
							brand: item.brand,
							productId: item.productId,
							id: item.id
						}));
					});
					list.html(listHtml.join(''));
					if(!(page > 0) ){
						paginateInit(records);
					}
					
				});

			};


			function medicineSearch() {
				var ind = productStatus.find("option:selected").attr("value");
				var query = {
					page: 1
				};
				if (productName.val() !== '') {
					query.productName = productName.val();
					/*productStatus = ;*/
				}
				if (ind === '0') {
					query.productSale = '';
				} else {
					query.productSale = ind;
				}

				getMedicineList(query);
			};
			function onOffShelves() {
				var url = g.interface.url.product,
					productId = [];
				query = {
					method: g.interface.method.allOnUnder
				};
				j.each(j('#medicine-item li'), function() {
					if (j(this).hasClass('on')) {
						productId.push(j(this).data('pid'));
					}
				});
				query.productIds = productId.join(',');

				if (j(this).data('shelves') == 'on') {
					query.productSale = 1;
				}
				if (j(this).data('shelves') == 'off') {
					query.productSale = 2;
				}
				g.io(url, query, function(data) {
					g.dialogInfo('操作成功');
				});
			};

			function editPrice() {
				j(this).siblings('.save-btn').removeClass('hide');
				j(this).addClass('hide');
				j(this).parents('li').find('.price').removeAttr('disabled');
				j(this).parents('li').find('.price').removeClass('border-none');
			};

			function savePrice() {
				console.log("baocun");
				j(this).parents('li').find('.price').attr('disabled', 'disabled');
				j(this).parents('li').find('.price').addClass('border-none');
				j(this).siblings('.edit-btn').removeClass('hide');
				j(this).addClass('hide');

				var price = j(this).parents('li').find('.price').val();
					url = g.interface.url.product,
					query = {
						method: g.interface.method.updateSalePrice,
						productId: j(this).parents('li').data('pid'),
						salePrice: price
					};
				if(price < 0){
					g.dialogInfo('商品价格不能为负');
					return;
				}
				g.io(url, query, function(data) {
					g.dialogInfo('操作成功');
				});
			};

			function delAll() {
				var url = g.interface.url.product,
					productId = [],
					query = {
						method: g.interface.method.allDele
					};
				j.each(j('#medicine-item li'), function() {
					if (j(this).hasClass('on')) {
						console.log(j(this).data('pid'));
						productId.push(j(this).data('pid'));
						j(this).remove();
					}
				});
				query.productIds = productId.join(',');
				g.io(url, query, function(data) {
					g.dialogInfo('操作成功');
				});
			};

			function toTop() {
				var url = g.interface.url.product,
					query = {
						method: g.interface.method.storeproduct,

					};
				query.id = j(this).parents('li').data('id');
				g.io(url, query, function(data) {
					/*g.dialogInfo('操作成功');*/
					window.location.reload();
				});
			};
			/*分页*/
			function paginateInit(count) {
				console.log(count);
				if (count < 11) {
					j('.pagination').addClass('hide');
					return;
				}
				j('.pagination').removeClass('hide');
				var pageCount = Math.ceil(count / 10);
				var pagelist = [];
				pagelist.push('<span class="page-btn" id="first-page">首页</span>');
				pagelist.push('<span class="l-btn" id="l-btn">&lt&lt</span>');
				pagelist.push('<div class="page-wrap"><ul class="page cf" style="width:' + pageCount*33 + 'px">');
				for (i = 1; i < pageCount + 1; i++) {
					pagelist.push('<li data-page="' + i + '">' + i + '</li>');
				}
				pagelist.push('</ul></div>');
				pagelist.push('<span class="r-btn">&gt&gt</span>');
				pagelist.push('<span class="page-btn" id="last-page">尾页</span>');
				j('.pagination').html(pagelist.join(''));
				j('[data-page="1"]').addClass('active').siblings().removeClass('active');

			};

			function pagination() {
				var query = {};
				j(this).addClass('active').siblings().removeClass('active');
				var page = query.page = j(this).data('page');
				getMedicineList(query,page);
			};

			function firstPage() {
				j('[data-page="1"]').click();
				j('.page').css('left', '0');
			}

			function lastPage() {
				var last=j('.page li').eq(j('.page li').length - 1);
				var right = j('.page li').length;
				console.log(right);
				last.click();

				$('.page').css('left', -(right*25)+'px');

			}

			function leftPage() {

				/*j('.page').scrollLeft(j('.page').scrollLeft() +1);*/
				var left = parseInt($('.page').css('left'));

				if ((j('.page').width() > j('.page-wrap').width()) && (left < 0)) {
					console.log('left');
					left = parseInt(left) + 45;
					j('.page').css('left', left + 'px');
					if (left >= 0) {
						j('.page').css('left', '0');

					}
				}
			}

			function rightPage() {
				//超出10页
				var right = j('.page li').length;
				if (j('.page').width() > j('.page-wrap').width()) {
					var left = j('.page').css('left');
					left = parseInt(left) - 45;
					$('.page').css('left', left + 'px');

					var w = ($('.page').width()) - ($('.page-wrap').width());
					console.log(w+'...'+left);
					if ((-left) >= w) {
						/*$('.page').css('left', '0');
						$('.page').css('right', '0');*/
						$('.page').css('left', -(right*25)+'px');

					}
				}

			}
		}
	});
}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderMembers: function(){
			var startDate = j('#startDate'),
				endDate = j('#endDate'),
				searchBtn = j('#search'),
				focus = j('#focus'),
				focusPercent = j('#focusPercent'),
				order = j('#order'),
				focusSum = j('#focusSum'),
				focusToday = j('#focusToday');

			g.dateInit(startDate, endDate);
			searchBtn.click(chart).trigger('click');
			g.pageInit();

			function chart(){
				var url = GY.interface.url.report,
					query = {
						method: GY.interface.method.storesFans,
						start: startDate.val(),
						end: endDate.val()
					};

				g.io(url, query, function(data){
					g.chart(data.rows);
					focus.html(data.fans.fansCount);
					focusPercent.html(data.fans.percent);
					order.html(data.fans.orderCount);
					focusSum.html(data.fans.totalNum);
					focusToday.html(data.fans.todayFans);
				});
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderMsg: function(){
			var list = j('#list');

			list.on('click', '[data-delete]', msgDelete)
			getData();
			g.pageInit(true);

			function getData(){
				var url = GY.interface.url.user,
					query = {method: GY.interface.method.getMessage},
					listHtml = [];

				g.io(url, query, function(data){
					if(data.length === 0){
						list.html('<li>无数据</li>');
						return;
					};
					j.each(data, function(i, item){
						listHtml.push(g.template.msgList({
							id: item.id,
							sendTime:item.sendTime,
							status: (item.messageStatus === 0) ? 'f-red' : '',
							icon: (item.messageStatus === 0) ? 'tip-ico1' : 'tip-ico2',
							title: item.messageTitle,
							content: item.messageInfo,
							url:item.url
						}));
					});
					list.html(listHtml.join(''));
				});
			};

			function msgDelete(){
				var elem = j(this).parents('li'),
					url = GY.interface.url.user,
					query = {
						method: GY.interface.method.messagedel,
						messageId: j(this).parents('li').data('mid')
					};

				g.io(url, query, function(data){
					elem.detach();
				});
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderOrderDetail: function(){
			var wrap = j('#orderDetail'),
				selectAll = j('#selectAll'),
				reason;
			
			wrap.on('click', '[data-update]', orderUpdate)
				.on('click', '#addNote', orderAddNote)
				.on('click', '#selectAll', orderProductSelectAll)
				.on('click', '.select-items li', orderProductSelect);

			getData();
			/*初始化header nav*/
			g.pageInit(true);

			function orderProductSelect(){
				if(j(this).hasClass('active')){
					j(this).removeClass('active');
				}else{
					j(this).addClass('active');
				};
			};

			function orderProductSelectAll(){
				j('.select-items').find('li').addClass('active');
			};
			/*添加备注*/
			function orderAddNote(){
				if(j(this).data('did') !== undefined){
					j('#'+ j(this).data('did')).show();
					return;
				};
				g.dialog().addNote(function(did){
					j('#'+ did).hide();
					reason = '['+ j.trim(j('#reason').find('.active').parent().text()) +'] - '+ j('#reasonText').val();
				}, this);
			};
			function orderUpdate(){
				var updateType = j(this).data('update'),
					url = GY.interface.url.order,
					query = {
						method: GY.interface.method.updateOrder,
						orderId: g.getUrlQuery('oid'),
						type: updateType
					};
					/*接单/自提/配送成功/拒绝 刷新页面*/
				if(updateType === 1 || updateType === 4 || updateType === 5 || updateType === 8){
					action();
				};
				/*准备完毕*/
				if(updateType === 2){
					/*药品全部选中*/
					if(j('.select-items li').length === j('.select-items li.active').length){
						if(reason !== undefined){
							query.remark = reason;
						};
						action();
					};
				};
				/*确定配送*/
				if(updateType === 3){
					if(j(this).data('did') !== undefined){
						j('#'+ j(this).data('did')).show();
						return;
					};
					g.dialog().selectMembers(function(did){
						if(j('#membersList').find('.active').length === 0) return;
						query.userId = j('#membersList').find('.active').parents('li').data('aid');
						action();
					}, this);
				};
				/*放弃*/
				if(updateType === 6){
					if(j(this).data('did') !== undefined){
						j('#'+ j(this).data('did')).show();
						return;
					};
					g.dialog().dropOrder(function(did){
						if(j('#'+ did).find('.select.active').data('text') === 'text'){
							query.abandonReason = j('#'+ did).find('.select.active').siblings('em').html();
							action();
						}else{
							if(j('#'+ did).find('textarea').val()){
								query.abandonReason = j('#'+ did).find('textarea').val();
								action();
							}
							else{
								g.dialogInfo('请填写放弃理由！');
							}
						};
						
					}, this);
				};
				/*退款*/
				if(updateType === 7){
					
					if(j(this).data('did') !== undefined){
						j('#'+ j(this).data('did')).show();
						return;
					};
					g.dialog().inputMoney(function(did){
						var money = j('#'+ did).find('input').val(),
							testMoney = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
							
						if(testMoney.test(money) === false){
							g.dialogInfo('请填写退款金额，或金额填写不正确！');
							return;
						};
						query.refundMoney = money;
						action();
					}, this);
				};
			
				function action(){
					console.dir({
						updateType: updateType,
						query: query
					})
					g.io(url, query, function(data){
						if(data.result === true){
							window.location.reload();
						};
					});
				};
			};

			function getData(){
				var url = GY.interface.url.order,
					query = {
						method: GY.interface.method.orderInfo,
						id: g.getUrlQuery('oid')
					},
					templateQuery = {};

				g.io(url, query, function(data){
					templateQuery.id = data.orderInfo.id;
					templateQuery.step = formatStep(data.orderInfo.deliveryType);
					templateQuery.status = data.orderInfo.status;
					templateQuery.product = data.rows;
					templateQuery.user = {
						name: data.orderInfo.reciver,
						phone: data.orderInfo.reciverPhone,
						addr: data.orderInfo.orderAddress
					};
					templateQuery.urgent = data.orderInfo.urgentMoney;
					templateQuery.preferential = data.orderInfo.preferentialMoney;;
					templateQuery.price = data.orderInfo.payMoney;
					templateQuery.sysTime = data.orderInfo.sysTime;
					templateQuery.orderTime = data.orderInfo.orderTime;
					templateQuery.freight= data.orderInfo.freight;
					templateQuery.orderCode= data.orderInfo.orderCode;
					templateQuery.readyForDelivery= data.orderInfo.readyForDelivery;
					templateQuery.orderFinish= data.orderInfo.orderFinish;
					templateQuery.orderFinish= data.orderInfo.orderFinish;
					if(data.orderInfo.status === 7 || data.orderInfo.status === 9){
						templateQuery.cancelDate = data.orderInfo.cancelTime;
					};
					wrap.html(g.template.orderDetail(templateQuery));
					if(data.orderInfo.status === 7 || data.orderInfo.status === 9 || data.orderInfo.status === 11){
						wrap.find('[data-step='+ data.orderInfo.abandonStatus +']')
								.addClass('failure').prevAll('li').addClass('finish').end()
								.nextAll('li').hide();
					}else{
						wrap.find('[data-step='+ data.orderInfo.status +']')
								.addClass('cur').prevAll('li').addClass('finish');
					};
				});

				function formatStep(type){
					var temp = {};
					temp.category = 'normal';
					if(type === 1) temp.type = 'normal';
					if(type === 2) temp.type = 'self';
					console.log(temp)
					return temp;
				};
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderOrderList: function(){
			var tabs = j('#orderTabs'),
				search = j('#searchBox'),
				startDate = j('#startDate'),
				endDate = j('#endDate'),
				searchText = j('#text'),
				searchBtn = j('#search'),
				list = j('#list');

			listInit();
			g.pageInit();

			g.dateInit(startDate, endDate, true);
			searchBtn.click(searchList);
			tabs.on('click', 'li', function(){
				window.location.href = 'orders.html?status='+ j(this).data('status');
			});
			list.on('click', 'li', function(){
				window.location.href = 'order_detail.html?oid='+ j(this).data('oid');
			});
			/*
			根据url中status初始化订单列表，默认为待处理
			*/
			function listInit(){
				var status = g.getUrlQuery('status') || 1;
				tabs.find('[data-status='+ status +']').addClass('active');
				/*
				状态为已完成时显示搜索区域
				*/
				if(status === '2'){
					search.removeClass('hide');
				}else{
					search.addClass('hide');
				};
				/*参数：订单列表类型-操作类型  拼接请求参数*/
				getList({opStatus: status});
				getCount();
			};
			/*
			显示各个状态的订单数
			*/
			function getCount(){
				var url = GY.interface.url.order,
					query = {method: GY.interface.method.orderCount};

				g.io(url, query, function(data){
					j('#todo').html('<b></b>'+ data.daichuli_count);
					j('#process').html('<b></b>'+ data.chulizhong_count);
					j('#finish').html('<b></b>'+ data.yiwancheng_count);
					j('#fail').html('<b></b>'+ data.yishixiao_count);
					j('#cancel').html('<b></b>'+ data.quxiao_count);
				});
			};
			/*
			显示日期搜索范围内订单
			*/
			function searchList(){
				var query = {};

				list.html('');
				query.opStatus = tabs.find('.active').data('status');
				if(startDate.val() !== ''){
					query.start = startDate.val();
				};
				if(endDate.val() !== ''){
					query.end = endDate.val();
				};
				query.orderCode = searchText.val();
				getList(query);
			};
			/*
			显示订单列表
			*/
			function getList(query){
				var url = g.interface.url.order,
					query = query,
					listHtml = [];

				query.method = g.interface.method.orderInfoList;
				g.io(url, query, function(data){
					if(data.rows.length === 0){
						list.html('<li>无数据</li>');
						return;
					};
					j.each(data.rows, function(i, item){
						listHtml.push(g.template.orderList({
							id: item.id,
							status: formatStatus(item.status),
							user: {
								name: item.reciver,
								phone: item.reciverPhone,
								addr: item.orderAddress
							},
							distance: formatDistance(item.distance),
							price: item.totalPrice,
							step: formatStep(item.deliveryType)
						}));
						list.html(listHtml.join(''));
					});
					/*查询‘待处理’ ‘处理中’ 时，将‘退款中’和‘已完成’ 的step置为完成*/
					if(query.opStatus === '1' || query.opStatus === '4'){
						list.find('li').each(function(){
							var status = j(this).data('status');
							if(status === '5' || status === '6'){
								status = '5';
							};
							console.log(j(this).find('[data-step='+ status +']').length)
							j(this).find('[data-step='+ status +']').addClass('cur')
								.prevAll('li').addClass('finish');
						});
					};
				});
				/*
				@state 1-11
				返回temp.text = '待接单';
					temp.class = 'order-state1';
				*/
				function formatStatus(status){
					var temp = {};

					temp.status = status;
					switch(status){
						case 1:
							temp.text = '待接单';
							temp.class = 'order-state1';
							break;
						case 2:
							temp.text = '准备药品';
							temp.class = 'order-state2';
							break;
						case 3:
							temp.text = '等待配送';
							temp.class = 'order-state3';
							break;
						case 4:
							temp.text = '配送中';
							temp.class = 'order-state4';
							break;
						case 5:
							temp.text = '已完成';
							temp.class = 'order-state6';
							break;
						case 6:
							temp.text = '已完成';
							temp.class = 'order-state6';
							break;
						case 7:
							temp.text = '已放弃';
							temp.class = 'order-state5';
							break;
						case 8:
							temp.text = '已取消';
							temp.class = 'order-state5';
							break;
						case 9:
							temp.text = '已失效';
							temp.class = 'order-state5';
							break;
						case 10:
							temp.text = '等待自提';
							temp.class = 'order-state3';
							break;
						case 11:
							temp.text = '退款中';
							temp.class = 'order-state5';
							break;
						default:
							temp.text = '未知状态';
							temp.class = 'order-state5';
							break;
					};

					return temp;
				};
				/*距离保留两位小数，km*/
				function formatDistance(distance){
					if('--' == distance){
						return '--';
					}
					var temp;
					temp = distance / 1000;
					return temp.toFixed(2) + 'km';
				};
				/*
				category:进度样式
				@type:配送/自提
				*/
				function formatStep(type){
					var temp = {};
					temp.category = 'point';
					if(type === 1) temp.type = 'normal';
					if(type === 2) temp.type = 'self';
					return temp;
				};
			};
		}
	});

}(window, jQuery, GY);
! function(w, j, g) {

	j.extend(g, {
		renderStore: function(){
			var store = j('#store'),
				map;
				
			if(g.getUrlQuery('err') !== null){
				if(g.getUrlQuery('err') === '0'){
					g.dialogInfo('操作成功！', function(d){
						/*添加到历史记录中*/ 
						history.pushState('', '', 'store.html?sid='+ g.getUrlQuery('sid'));
						d.detach();
					});
				}else{
					g.dialogInfo('操作失败！', function(d){
						history.pushState('', '', 'store.html?sid='+ g.getUrlQuery('sid'));
						d.detach();
					});
				};
			};
			store
				.on('click', '[data-preview]', uploadPanel)
				.on('click', '[data-position]', searchPosition)
				.on('click', '[data-submit]', storeUpdate)
				.on('click', '[data-switch]', switchChange)

			renderStore();
			g.pageInit(true);

			function renderStore(){
				var url = g.interface.url.user,
					query = {method: g.interface.method.userstore};

				g.io(url, query, function(data){
					store.html(g.template.storeDetail({
						id: data.id,
						img: (data.image === 'default') ? 'images/store-default.png' : data.image,
						name: data.name,
						preTel:data.preTel,
						sufTel:data.sufTel,
						phone: data.tel,
						addr: data.address,
						startTime: data.workStartTime,
						endTime: data.workEndTime,
						contactPerson: data.contactPerson,
						contactMoblie: data.contactMoblie,
						longitude: data.longitude,
						latitude: data.latitude,
						distributionPrice:data.distributionPrice,
						distributionScope:data.distributionScope,
						ifDtp:data.ifDtp,
						ifYibao:data.ifYibao,
						ifNight:data.ifNight

					}));
					map = new qq.maps.Map(document.getElementById("map"));
					if(data.longitude !=='' && data.latitude !== ''){
						renderMap({
							longitude: data.longitude,
							latitude: data.latitude
						});
					};
					renderArea({
						province: data.provinceId,
						city: data.cityId,
						district: data.districtId
					});
				});
			};
			/*省市区*/
			function renderArea(select){
				var province = j('[name=provinceId]'),
					city = j('[name=cityId]'),
					district = j('[name=districtId]'),
					url = g.interface.url.user,
					query = {method: g.interface.method.getProvinceList};

				province.change(function(){
					getCity(j(this).val());
					district.val('default');
					
				});
				city.change(function(){
					getDistrict(j(this).val());
				});
				g.io(url, query, function(data){
					j.each(data, function(i, item){
						province.append('<option value="'+ item.id +'">'+ item.provinceName +'</option>');
					});
					setDefaultArea();
				});

				function setDefaultArea(){
					province.val(select.province);
					getCity(select.province, function(){
						city.val(select.city);
						getDistrict(select.city, function(){
							district.val(select.district);
						});
					});
				};

				function getCity(pid, callback){
					var cityQuery;

					if(pid === 'default') return;

					cityQuery = {
						method: g.interface.method.getCityList,
						provinceId: pid
					};
					g.io(url, cityQuery, function(data){
						var option = [];

						option.push('<option value="default">请选择</option>');
						j.each(data, function(i, item){
							option.push('<option value="'+ item.id +'">'+ item.cityName +'</option>');
						});
						city.html(option.join(''));
						if(callback) callback();
					});
				};

				function getDistrict(cid, callback){
					var districtQuery;

					if(cid === 'default') return;

					districtQuery = {
						method: g.interface.method.getDistrictList,
						cityId: cid
					};
					g.io(url, districtQuery, function(data){
						var option = [];

						option.push('<option value="default">请选择</option>');
						j.each(data, function(i, item){
							option.push('<option value="'+ item.id +'">'+ item.districtName +'</option>');
						});
						district.html(option.join(''));
						if(callback) callback();
					});
				};
			};

			function searchPosition(){
				var mapQuery;

				mapQuery = j('[name=provinceId]').find(':selected').text() +','+
						   j('[name=cityId]').find(':selected').text() +','+
						   j('[name=districtId]').find(':selected').text() +','+
						   j('[name=address]').val();
  
				renderMap(mapQuery);
			};

			function renderMap(mapQuery){
				var marker = false;
				
				getPosition(function(point){
					/*平滑移至新中心点*/
					map.panTo(point);
					/*地图级别*/
					map.zoomTo(13);

					if(marker === false){
						marker = new qq.maps.Marker({
					        position: point,
					        draggable: true,
					        map: map
					    });
					}else{
						marker.setPosition(point);
					};
					/*经纬度*/
					j('[name=longitude]').val(marker.getPosition().lng);
				    j('[name=latitude]').val(marker.getPosition().lat);
				    /*地图被拖动*/
				    qq.maps.event.addListener(marker, 'dragend', function() {
				    	console.log(marker.getPosition().lng)
				    	j('[name=longitude]').val(marker.getPosition().lng);
				    	j('[name=latitude]').val(marker.getPosition().lat);
				    });
				});
				
				function getPosition(callback){
					var geocoder, temp;

					if(typeof mapQuery === 'object'){
						temp = new qq.maps.LatLng(mapQuery.latitude, mapQuery.longitude);
						callback(temp);
					}else{
						geocoder = new qq.maps.Geocoder({
							complete: function(position){
								callback(position.detail.location);
							}
						});
						console.log(mapQuery)
						geocoder.getLocation(mapQuery);
					};
				};
			};

			function uploadPanel(){
				j('#uploadImg')
					.off()
					.click()
					.change(preview);

				function preview(){
					var elem = this,
						reader = new FileReader(),
						file = j(elem).get(0).files[0];

					reader.onloadend = function(evt){
						j('<img src="'+ evt.target.result +'" />')
							.appendTo('[data-preview]')
							.one('click', function(e){
								j(this).detach();
								j(elem).val('');
								e.stopPropagation();
							});
					};
					reader.readAsDataURL(file);
				};
			};

			function storeUpdate(){
				console.dir({
					id: j('[name=id]').val(),
					longitude: j('[name=longitude]').val(),
					latitude: j('[name=latitude]').val(),
					storeImage: j('[name=storeImage]').val(),
					address: j('[name=address]').val(),
					provinceId: j('[name=provinceId]').val(),
					cityId: j('[name=cityId]').val(),
					districtId: j('[name=districtId]').val(),
					contactPerson: j('[name=contactPerson]').val(),
					contactMoblie: j('[name=contactMoblie]').val(),
					workStartTime: j('[name=workStartTime]').val(),
					workEndTime: j('[name=workEndTime]').val(),
					tel: j('[name=tel]').val()
				})
				j('#form').submit();
			};

			function switchChange(){
				if(j(this).hasClass('switch-on')){
					j(this).removeClass('switch-on').addClass('switch-off');
					j(this).html('NO<i></i>');
					j(this).next().val('0');
				}
				else{
					j(this).removeClass('switch-off').addClass('switch-on');
					j(this).html('YES<i></i>');
					j(this).next().val('1');
				}
				
			}
		}
	});

}(window, jQuery, GY);