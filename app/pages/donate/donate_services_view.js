services_views.service("$donateView", ["$rootScope", "$manager", "$window", "$dialogView", "$heighter", 
									function($rootScope, $manager, $window, $dialogView, $heighter){
	var self = this;

	this.manageView = function($scope, response){
		if(response.status == Constant.OK_STATUS){
			this.okView($scope, response);
		}else{
			this.errView($scope, response);
		}
		$scope.$applyAsync();
	}
	
	this.okView = function($scope, response){
		switch(response.action){
			case "store":
				this.storeOk($scope, response);
				break;
			case "getGoods":
				this.getGoodsOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "store":
				this.storeErr($scope, response);
				break;
			case "getGoods":
				this.getGoodsErr($scope, response);
				break;
		}
	}

	this.storeOk = function($scope, response){
		
	}
	
	this.storeErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_LOAD_STORE:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.getGoodsOk = function($scope, response){
		setInfo(response.data);

		// set goods
		$dialogView.showGoods(response.data.goods);
	}
	
	this.getGoodsErr = function($scope, response){
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}
	
	this.render = function(product){
		Log.o("REND", product);
		Log.d("RENDER", product.alias + " " + product.price);
		$("#"+product.id+"_name").attr("product-name", product.name);
		$("#"+product.id+"_title").text(product.alias);
		$("#"+product.id+"_price").text(product.price);

		checkUserFeatures(product);
	}

	// acces order
	this.checkOrder = function(id){
		if($("#"+id+"_price").attr("disable") != "true"){
			return true;
		}
	}

	// set content and pick out content button
	this.setDonateContent = function($scope, id){
		$("#diamSel").removeClass("donate-select-active");
		$("#premSel").removeClass("donate-select-active");
		$("#turboSel").removeClass("donate-select-active");

		$("#diamBlock").addClass("none");
		$("#premBlock").addClass("none");
		$("#turboBlock").addClass("none");

		$("#" + id + "Sel").addClass("donate-select-active");
		$("#" + id + "Block").removeClass("none");
	}

	// disable order user features if it purchased
	function checkUserFeatures(product){
		var user = $manager.instance.getUser();
		switch(product.id){
			case "premium":
				if(user.getPremium()){
					$("#"+product.id+"_price").text("OK");
					$("#"+product.id+"_price").css("opacity", "0.5");
					$("#"+product.id+"_price").attr("disable", "true");
				}
				break;
			case "turbos_1":
				if(user.getTurbo() == 1){
					$("#"+product.id+"_price").text("OK");
					$("#"+product.id+"_price").css("opacity", "0.5");
					$("#"+product.id+"_price").attr("disable", "true");
				}
				break;
			case "turbos_2":
				if(user.getTurbo() == 2){
					$("#"+product.id+"_price").text("OK");
					$("#"+product.id+"_price").css("opacity", "0.5");
					$("#"+product.id+"_price").attr("disable", "true");
				}
				break;
			case "turbos_3":
				if(user.getTurbo() == 3){
					$("#"+product.id+"_price").text("OK");
					$("#"+product.id+"_price").css("opacity", "0.5");
					$("#"+product.id+"_price").attr("disable", "true");
				}
				break;
			default:
				break;
		}
	}

	// set user's features
	function setInfo(data){
		var user = $manager.instance.getUser();

		user.setCash(data.cash);
		// set user's deposit
		$dialogView.setCash(user.getCash());

		user.setPremium(data.premium);
		user.setTurbo(data.turbo);
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".donate-content").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".donate-select-block")]));

			$(".donate-premium-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW, [$(".donate-select-block")]));

			$heighter.restructureViewSize([{elem: ".donate-content", view: Constant.DESKTOP_VIEW, params: [$(".donate-select-block")]}, 
										{elem: ".donate-premium-block", view: Constant.DESKTOP_VIEW, params: [$(".donate-select-block")]}]);

			// temp blocking
			$(".donate-nopay-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));
		}else{
			$(".donate-content").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".donate-select-block")]));

			$(".donate-premium-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW, [$(".donate-select-block")]));

			// temp blocking
			$(".donate-nopay-block").css("height", $heighter.setHeight(Constant.MAJOR_VIEW));
		}
	}

	// init all functions in view
	this.initViewParams = function(){
		// temp blocking
		if(Constant.CUR_DEVICE == Constant.IOS_DEVICE){
			$(".donate-nopay-block").removeClass("none");
		}

		setTimeout(function(){
			// hide go to earn button
			$(".goearn-but-block").css("display", "none");
			$(".goearn-but-block").removeClass("goearn-but-bottom");
		}, 200);

		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header
			$(".header").removeClass("none");
		}else{
			// show navigation bar
			$(".navigation").removeClass("none");
		}

		// set height of main content
		setContentSize();
	}
}]);