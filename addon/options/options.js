const HOST_APPLICATION = "com.kiwidude.calibre_search"
const TEST_CONNECTIVITY_ACTION = 'TEST_CONNECTIVITY';

const eNativeAppSuccess = document.getElementById('nativeAppSuccess');
const eNativeAppError = document.getElementById('nativeAppError');
const eLibraryName = document.getElementById("libraryName");
const eReplaceExpressions = document.getElementById("replaceExpressions");
const eHelpLinkUrl = document.getElementById("helpLinkUrl")
const eSaveStatus = document.getElementById('saveStatus');

function restoreOptions() {
	eHelpLinkUrl.href = "/_locales/" + browser.i18n.getMessage("help_locale") + "/help.html";

	let gettingOptions = browser.storage.sync.get({
		libraryName: 'Calibre Library',
		replaceExpressions: ''
	});

	gettingOptions.then((response) => {
		eLibraryName.value = response.libraryName;
		eReplaceExpressions.value = response.replaceExpressions;
	});
}

function sanitizeExpressions(expr) {
	const nonEmptyItems = expr.split('\n').filter(x => x.trim(x)).map(x => x.trim());
	return nonEmptyItems.join('\n');
}

function saveOptions() {
	const data = {
		libraryName: eLibraryName.value.trim(),
		replaceExpressions: sanitizeExpressions(eReplaceExpressions.value),
	}
	// Update the controls on screen with the sanitized expressions
	eLibraryName.value = data.libraryName;
	eReplaceExpressions.value = data.replaceExpressions;

	browser.storage.sync.set(data, function () {
		eSaveStatus.style.visibility = 'visible';
		setTimeout(function () {
			eSaveStatus.style.visibility = 'hidden';
		}, 5000);
	});
}

function appConnectionTest() {
	const testConnectivityPayload = {
		action: TEST_CONNECTIVITY_ACTION
	};
    eNativeAppSuccess.style.display = "none";
    eNativeAppError.style.display = "none";
	const sending = browser.runtime.sendNativeMessage(HOST_APPLICATION, testConnectivityPayload);
	sending.then(function (response) {
		// Python script sends JSON that needs parsing. Golang exe sends an immediate JSON object.
		let responseObject = response;
		if (typeof response == 'string') {
			responseObject = JSON.parse(response);
		}
		if (responseObject.status === 'Success') {
			eNativeAppSuccess.style.display = "block";
			eNativeAppError.style.display = "none";
			document.getElementById('nativeAppVersion').innerText = browser.i18n.getMessage("info_appVersion") + ': ' + responseObject.version;
			console.log('calibre-search: Successfully tested communication between native application and webextension.');
		}
	}, function (error) {
		eNativeAppSuccess.style.display = "none";
		eNativeAppError.style.display = "block";
		console.log('calibre-search: Error communicating between the native application and web extension.');
		console.log(error);
	});
}

document.addEventListener("DOMContentLoaded", restoreOptions);
eSaveStatus.style.visibility = 'hidden';
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('appTest').addEventListener('click', appConnectionTest);

appConnectionTest();
