/**
 * New node file
 */


var stmnLEFT = 10; // ������ ���� 
var stmnGAP1 = 0; // ���� ���� 
var stmnGAP2 = 150; // ��ũ�ѽ� ������ ���ʰ� �������� �Ÿ� 
var stmnBASE = 150; // ��ũ�� ������ġ 
var stmnActivateSpeed = 25; //��ũ���� �ν��ϴ� ������ (���ڰ� Ŭ���� ������ �ν�)
var stmnScrollSpeed = 10; //��ũ�� �ӵ� (Ŭ���� ����)
var stmnTimer;

function RefreshStaticMenu() {
	var stmnStartPoint, stmnEndPoint;
	stmnStartPoint = parseInt(document.getElementById('STATICMENU').style.top,
			10);
	stmnEndPoint = Math.max(document.documentElement.scrollTop,
			document.body.scrollTop)
			+ stmnGAP2;
	if (stmnEndPoint < stmnGAP1)
		stmnEndPoint = stmnGAP1;
	if (stmnStartPoint != stmnEndPoint) {
		stmnScrollAmount = Math
				.ceil(Math.abs(stmnEndPoint - stmnStartPoint) / 15);
		document.getElementById('STATICMENU').style.top = parseInt(document
				.getElementById('STATICMENU').style.top, 10)
				+ ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount
						: stmnScrollAmount) + 'px';
		stmnRefreshTimer = stmnScrollSpeed;
	}
	stmnTimer = setTimeout("RefreshStaticMenu();", stmnActivateSpeed);
}

function InitializeStaticMenu() {
	document.getElementById('STATICMENU').style.right = stmnLEFT + 'px'; //ó���� �����ʿ� ��ġ. left�� �ٲ㵵.
	document.getElementById('STATICMENU').style.top = document.body.scrollTop
			+ stmnBASE + 'px';
	RefreshStaticMenu();
}
