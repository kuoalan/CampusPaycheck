function getFormData() {
	var monthlyProduction = document.getElementById("monthlyProduction").value;
	var daysWorked = document.getElementById("daysWorked").value;
	var invisalignCases = document.getElementById("invisalignCases").value;
	var surgicalThirds = document.getElementById("surgicalThirds").value;
	var simpleThirds = document.getElementById("simpleThirds").value;
	var healthReimbursement = document.getElementById("healthReimbursement").value;
	var adjustments = document.getElementById("adjustments").value;
	calculatePaycheck(monthlyProduction, invisalignCases, surgicalThirds, simpleThirds, daysWorked, healthReimbursement, adjustments);
}

function calculatePaycheck(monthlyProduction, invisalign, surgicalThirds, simpleThirds, daysWorked, healthReimbursement, adjustments) {
	for (var i = 0; i < 7; i++) {
		if (!arguments[i]) {
			if (i == 4) {
				arguments[i] = 1;
			}
			else {
				arguments[i] = 0;
			}

		}
	}
	var adjustedProduction = (monthlyProduction - invisalign*1500 - (surgicalThirds * 140) - (simpleThirds * 86));
	var adjustedDailyProduction = adjustedProduction/daysWorked
	var topTier = Math.max(0, adjustedDailyProduction - 3500);
	var midTier = Math.max(0, adjustedDailyProduction - topTier - 2500);
	var lowTier = Math.max(0, adjustedDailyProduction - topTier - midTier);
	var thirdsProduction = ((simpleThirds * 86 * 0.4)/daysWorked) + ((surgicalThirds * 140 * 0.4)/daysWorked);
	var regProduction = (topTier * 0.4 + midTier*0.35 + lowTier*0.3)
	var dailyPay = (Math.max((regProduction + thirdsProduction), 800.00));
	var monthlyPaycheck = ((dailyPay*daysWorked) + parseFloat(healthReimbursement) + parseFloat(adjustments))
	document.getElementById("dailyProduction").value = dailyPay.toFixed(2)
	document.getElementById("monthlyPaycheck").value = monthlyPaycheck.toFixed(2)
	document.getElementById("yearlyPay").value = (monthlyPaycheck * 12).toFixed(2)
	var rawProduction = (monthlyProduction/daysWorked).toFixed(2);
	document.getElementById("rawProduction").value = rawProduction
	document.getElementById("thirdsPay").value = (thirdsProduction*daysWorked).toFixed(2)
	document.getElementById("regPay").value = (regProduction*daysWorked).toFixed(2)
}

function resetForm() {
	const ids = ["monthlyProduction", "invisalignCases", "surgicalThirds", "simpleThirds", "adjustments"]
	ids.forEach(function(item, index) {
		document.getElementById(item).value=0
	});
	document.getElementById("daysWorked").value = 1
	document.getElementById("healthReimbursement").value = 900;

}

function calculateTakeHome() {

}