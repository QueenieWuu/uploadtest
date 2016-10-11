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