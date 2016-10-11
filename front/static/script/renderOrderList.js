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