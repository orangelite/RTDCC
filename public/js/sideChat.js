/**
 * New node file
 */


var CstmnLEFT = 10; // ������ ���� 
var CstmnGAP1 = 0; // ���� ���� 
var CstmnGAP2 = 700; // ��ũ�ѽ� ������ ���ʰ� �������� �Ÿ� 
var CstmnBASE = 700; // ��ũ�� ������ġ 
var CstmnActivateSpeed = 25; //��ũ���� �ν��ϴ� ������ (���ڰ� Ŭ���� ������ �ν�)
var CstmnScrollSpeed = 10; //��ũ�� �ӵ� (Ŭ���� ����)
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
	document.getElementById('STATICCHAT').style.right = CstmnLEFT + 'px'; //ó���� �����ʿ� ��ġ. left�� �ٲ㵵.
	document.getElementById('STATICCHAT').style.top = document.body.scrollTop
			+ CstmnBASE + 'px';
	ChatRefreshStaticMenu();

}
