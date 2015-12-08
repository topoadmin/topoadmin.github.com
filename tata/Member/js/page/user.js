(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require, exports, module);
	} else {
		factory();
	}
}(this, function(require, exports, module) {
	require(["amazeui", "formValid"], function(amazeui) {　　
		addOption(150, 200, "#sel-height");
		addOption(40, 90, "#kg-height");

		// 绑定form验证
		var $formArr = $("form");
		$formArr.each(function(i) {
			var $this = $(this);
			$this.formValidator();
			$this.on("submit", function() {
				var $formJson = $this.serialize();
				if ($this.data("isdata")) {
					console.log("提交这段数据吧["+$formJson+"]");
				}
				return false;
			})
		})

		// 验证真实信息
		$("#checkinfo").on("click", function(e) {
			var $this = $(this),
				$form = $this.parents("form");
			if($form.validator('isFormValid')){
				$.getJSON('data/checkinfo.json', function(data) {
					$form.setForm(data.user);
					$("#my-checkinfo").modal().find(".my-modal-centen").text(JSON.stringify(data.user));
				});
			}
		})

		// 地区选择
		var citySel = $("#city-sel");
		if (citySel.length > 0) {
			require(["citySelect"], function(countUp) {　　
				citySel.citySelect({
					prov: "北京",
					city: "东城区",
					nodata: "none"
				});
			});
		}
	});

}));

/**
 * 添加下拉框选项
 * @param {min} 开始数
 * @param {max} 结束数
 * @param {elm} select 节点
 */
function addOption(min, max, elm) {
	var _html = "",
		$elm = $(elm),
		value = $elm.attr("data-value") || $elm.data("value");
	for (var i = parseInt(min); i < parseInt(max); i++) {
		_html += "<option value='" + i + "'" + ((value == i) ? ' selected="selected"' : '') + ">" + i + "</option>"
	}
	$elm.html(_html)
}