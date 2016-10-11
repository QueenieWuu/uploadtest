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