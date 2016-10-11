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