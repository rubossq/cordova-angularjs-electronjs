services_views.service("$liqpayView", ["$dialogView", "$navView", "$heighter", function($dialogView, $navView, $heighter){
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
			case "getEmbed":
				this.getEmbedOk($scope, response);
				break;
		}
	}
	
	this.errView = function($scope, response){
		switch(response.action){
			case "getEmbed":
				this.getEmbedErr($scope, response);
				break;
		}
	}

	this.getEmbedOk = function($scope, response){
		$(".liqpay-frame").attr("src", "http://instagram.starfamous.ru/liqpay/pay_iframe/?cancel_secure=1&session_id=" + response.data.session_id);
		$('.liqpay-frame').on('load', function(){
			$(".liqpay-frame").contents().find("iframe").contents().find("head").append("<style>"
															+ ".widget{"
															+ "width: auto !important;"
															+ "min-width: 320px;"
															+ "max-width: 450px;"
														+ "}"

														+ ".container__block__left__amountinfo{"
															+ "margin: 18px 18px 0 18px !important;"
														+ "}"

														+ ".container__block__right__form{"
															+ "margin: 18px !important;"
														+ "}"

														+ ".form:last-child{"
															+ "float: right !important;"
															+ "margint-left: 0 !important;"
														    + "margin-right: 70px !important;"
														+ "}"
														+ "</style>");

			$dialogView.hideLoading();
		});
	}

	this.getEmbedErr = function($scope, response){
		$dialogView.hideLoading();
		switch(response.data.errorCode){
			case Constant.ERR_CODE_CONNECTOR_INFO:
				$dialogView.showToast($dialogView.strings.readErr);
				break;
			case Constant.ERR_CODE_CONNECTOR_CONNECTION:
				$dialogView.showToast($dialogView.strings.connectErr);
				break;
		}
	}

	this.setName = function($scope, name){
		$scope.backText = name;
	}

	function setContentSize(){
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			$(".liqpay-block").css("height", $heighter.setHeight(Constant.DESKTOP_VIEW));

			$heighter.restructureViewSize([{elem: ".liqpay-block", view: Constant.DESKTOP_VIEW, params: ""}]);
		}else{
			$(".liqpay-block").css("height", $heighter.setHeight(Constant.MINOR_VIEW));
		}
	}

	//init all functions in view
	this.initViewParams = function(){
		// hide go to earn button
		$(".goearn-but-block").css("display", "none");
		
		if(Constant.CUR_DEVICE == Constant.WINDOWS_DEVICE || Constant.CUR_DEVICE == Constant.MAC_DEVICE){
			// show header and navbar
			$(".header").addClass("none");

			// reset active nav bar
			$navView.inactiveState();
		}else{
			// show navigation bar
			$(".navigation").addClass("none");
		}
		// set height of main content
		setContentSize();
	}
}]);