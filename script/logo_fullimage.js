/*
 画面解像度800×600の時、画面いっぱいにしたタイトル画像をタイトル画面にかぶせたいとき用スクリプト
*/

TitleScene._drawLogo=function() {
	var x, y;
	var pic = root.queryUI('gamelogo_frame');
	
	if (pic !== null) {
		x = LayoutControl.getRelativeY(8) - 75;
		y = LayoutControl.getRelativeY(6) -100;
		pic.draw(x, y);
	}
};
