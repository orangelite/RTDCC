/**
 * New node file
 */


var CstmnLEFT = 10; // 오른쪽 여백 
var CstmnGAP1 = 0; // 위쪽 여백 
var CstmnGAP2 = 700; // 스크롤시 브라우저 위쪽과 떨어지는 거리 
var CstmnBASE = 700; // 스크롤 시작위치 
var CstmnActivateSpeed = 25; //스크롤을 인식하는 딜레이 (숫자가 클수록 느리게 인식)
var CstmnScrollSpeed = 10; //스크롤 속도 (클수록 느림)
var CstmnTimer;

function ChatRefreshStaticMenu() {
	var stmnStartPoint, stmnEndPoint;
	stmnStartPoint = parseInt(document.getElementById('STATICCHAT').style.top,
			10);
	stmnEndPoint = Math.max(document.documentElement.scrollTop,
			document.body.scrollTop)
			+ CstmnGAP2;
	if (stmnEndPoint < CstmnGAP1)
		stmnEndPoint = CstmnGAP1;
	if (stmnStartPoint != stmnEndPoint) {
		stmnScrollAmount = Math
				.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
		document.getElementById('STATICCHAT').style.top = parseInt(document
				.getElementById('STATICCHAT').style.top, 10)
				+ ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount
						: stmnScrollAmount) + 'px';
		stmnRefreshTimer = CstmnScrollSpeed;
	}
	CstmnTimer = setTimeout("ChatRefreshStaticMenu();", CstmnActivateSpeed);
	
}

function ChatInitializeStaticMenu() {
	document.getElementById('STATICCHAT').style.right = CstmnLEFT + 'px'; //처음에 오른쪽에 위치. left로 바꿔도.
	document.getElementById('STATICCHAT').style.top = document.body.scrollTop
			+ CstmnBASE + 'px';
	ChatRefreshStaticMenu();

}
