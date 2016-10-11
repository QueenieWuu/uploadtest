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