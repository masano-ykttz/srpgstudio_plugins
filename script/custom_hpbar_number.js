//マップ上でのHP表示設定で「数値」を選択した場合に表示されるHPバーの改変
//公式のsingleton-currentmap.js参照

MapHpDecorator._setupDecorationFromType = function(type) {
	var obj = root.getHpDecoration(type);
  var pos = this._getPos();  //表示位置取得
  
  var width = 32; //横幅指定
	var height = 10;  //高さ指定
		
	var color = this._getColor(type);  //色取得
	var alpha = this._getAlpha(type);  //透明度取得
	var strokeColor = 0xff;
	var strokeAlpha = 255;
	var hpType = EnvironmentControl.getMapUnitHpType();
	
	obj.beginDecoration();
	
	if (hpType === 0) {
		// addRectangleを呼び出す前に色と輪郭を設定しておく
		obj.setFillColor(color, alpha);
		obj.setStrokeInfo(strokeColor, strokeAlpha, 1, true);
		obj.addRectangle(pos.x, pos.y, width, height); //四角の描画
		
		obj.addHp(pos.x, pos.y, this._getNumberColorIndex(hpType));  //数字(HP数値)の描画
	}
	else if (hpType === 1) {
		obj.addGauge(pos.x, pos.y, 1);
	}
	
	obj.endDecoration();
};

MapHpDecorator._getColor: function(type) {
  //HPの割合による色指定(0xの後の6桁を0~Fで指定。0x[R][G][B]となる)
  var arr = [0x00ffff, 0x00ff00, 0xffff00, 0xff0000];

  return arr[type];
};
	
MapHpDecorator._getAlpha: function(type) {
  //透明度指定（初期値204、値が小さいほど透明になる）
  return 204;
};

MapHpDecorator._getNumberColorIndex: function(type) {
  return 0;
};

//表示位置の指定。
MapHpDecorator._getPos: function() {
  var x = 1;   //x座標、大きいほど右に寄る
  var y = 20;  //y座標、大きいほど下に寄る

  //mapchipの1マスが32x32(px)でないときの調整用
  if (GraphicsFormat.MAPCHIP_WIDTH !== 32 || GraphicsFormat.MAPCHIP_HEIGHT !== 32) {
    x += 8;
    y += 8;
  }

  return {
    x: x,
    y: y
  }
 };

