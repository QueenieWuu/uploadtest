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