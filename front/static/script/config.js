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