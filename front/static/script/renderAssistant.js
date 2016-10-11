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