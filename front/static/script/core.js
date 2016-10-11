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