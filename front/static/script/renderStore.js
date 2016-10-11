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