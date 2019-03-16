//セーブ番号ラベル位置調整
//screen-loadsave.jsから抜き出して改変
LoadSaveScrollbar._drawFileTitle = function(xBase, yBase, index) {
  
    //mx,myの数値を変更してラベル位置を調整してください。
    var mx = 15;   //横方向の位置
    var my = -12;  //縦方向の位置
	
    //ファイル番号の座標を追加でずらすためのパラメータ
    var numx = 0;
    var numy = 0;
 
    var textui = this._getTitleTextUI();
    var x = xBase - mx;
    var y = yBase - 42 - my;
    var width = this.getObjectWidth() - 85;
    var n = index + 1;
    var dx = n >= 10 ? 56 : 51;
	if (textui.getUIImage() === null) {
		return;
	}

	TitleRenderer.drawTitle(textui.getUIImage(), x + width, y, TitleRenderer.getTitlePartsWidth(), TitleRenderer.getTitlePartsHeight(), 1);
	NumberRenderer.drawNumberColor(x + width + dx -numx, y + 17 - numy, n, this._getNumberColorIndex(), 255);
};

//色指定（数字として設定した画像から、どの列の色を使うのか指定。このまま導入すると白い数字になります。）
LoadSaveScrollbar._getNumberColorIndex = function() {
	return 0;
};
