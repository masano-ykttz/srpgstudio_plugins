/*-------------------------------------------------------------------------------------
   
  ゲーム画面解像度が800×600のとき、リアル戦闘画面の横幅を画面端まで広げる用スクリプト

--------------------------------------------------------------------------------------*/

var addBuiX = 0 //Xずらし用
var addBuiY = 0 //Yずらし用

//リアル戦闘画面の広さ
RealBattleArea = {
	WIDTH: 800,
	HEIGHT: 480
};

//戦闘上部・戦闘下部の位置調整
UIBattleLayout._drawFrame = function(isTop) {
	var x, y, graphicsHandle;
	var dx = this._getIntervalX();
	
	
	if (isTop) {
		this._drawLifeGadget(339 + dx, 0, this._battlerRight);
		this._drawLifeGadget(220 + dx, 0, this._battlerLeft);
		
		x = dx;
		//x=0; //横800pxにした戦闘上部画像を使用する場合はこちらのコメントアウトを外す。
		y = 0;
		graphicsHandle = this._getTopGraphicsHandle();
	}
	else {
		x = dx;
		//x=0; //横800pxにした戦闘下部画像を使用する場合はこちらのコメントアウトを外す。
		y = 367;
		graphicsHandle = this._getBottomGraphicsHandle();
	}
	
	if (graphicsHandle !== null) {
		GraphicsRenderer.drawImage(x, y, graphicsHandle, GraphicsType.PICTURE);
	}
};

//HP表示関連
UIBattleLayout._drawHpArea = function(unit, isRight) {
	var x, gauge, hp, xNumber, yNumber;
	var y = 40;
	var dx = 70 + this._getIntervalX();
	var dyNumber = 12;
	
	var pic = root.queryUI('battle_gauge');
	//var pic = root.queryUI('unit_gauge'); //ユニットHPゲージと共有させる場合はこちらを使用
	
	//HPゲージの幅を増やす（使う場合はコメントアウト外す）
	//this._gaugeLeft.setPartsCount(18);
	//this._gaugeRight.setPartsCount(18);
	
	if (isRight) {
		x = this._getBattleAreaWidth() - this._gaugeRight.getGaugeWidth() - dx;
		gauge = this._gaugeRight;
		hp = this._gaugeRight.getBalancer().getCurrentValue();
		
		xNumber = 380 + this._getIntervalX();
		yNumber = y - dyNumber;
		
	}
	else {
		x = dx;
		gauge = this._gaugeLeft;
		hp = this._gaugeLeft.getBalancer().getCurrentValue();
		
		xNumber = 260 + this._getIntervalX();
		yNumber = y - dyNumber;
	}
	
	gauge.drawGaugeBar(x, y, pic);
	
	NumberRenderer.drawAttackNumberCenter(xNumber, yNumber, hp);
};

//命中情報など
UIBattleLayout._drawInfoArea = function(unit, isRight) {
	var x, y, arr;
	var dx = 10 + this._getIntervalX();
	var color = ColorValue.KEYWORD;
	var font = TextRenderer.getDefaultFont();
	
	if (isRight) {
		x = this._getBattleAreaWidth() - 205 - dx;
		arr = this._statusRight;
	}
	else {
		x = dx;
		arr = this._statusLeft;
	}
	
	y = 65;
	StatusRenderer.drawAttackStatus(x, y, arr, color, font, 15);
};

//名前表示
UIBattleLayout._drawNameArea= function(unit, isRight) {
	var x, y, range;
	var text = unit.getName();
	var color = ColorValue.DEFAULT;
	var font = TextRenderer.getDefaultFont();
	var dx = this._getIntervalX();
	
	if (isRight) {
		x = 330 + dx;
		//y = 385 + addBuiY;
		y = 385;
	}
	else {
		x = 115 + dx;
		//y = 385 + addBuiY;
		y = 385;
	}
	
	range = createRangeObject(x, y, 185, 25);
	TextRenderer.drawRangeText(range, TextFormat.CENTER, text, -1, color, font);
};

//武器表示
UIBattleLayout._drawWeaponArea= function (unit, isRight) {
	var x, y, width, height, item, text;
	var color = ColorValue.DEFAULT;
	var font = TextRenderer.getDefaultFont();
	var dx = this._getIntervalX();
	
	if (isRight) {
		item = this._itemRight;
	}
	else {
		item = this._itemLeft;
	}
	
	if (item === null) {
		return;
	}
	
	text = item.getName();
	width = TextRenderer.getTextWidth(text, font) + GraphicsFormat.ICON_WIDTH;
	height = 25;
	
	if (isRight) {
		x = 330 + dx;
		y = 417 + addBuiY;
		
	}
	else {
		x = 115 + dx;
		y = 417 + addBuiY;
	}
	
	x += (185 - width) / 2;
	y = Math.floor((y + (y + height)) / 2);
	
	if (item !== null) {
		ItemRenderer.drawItem(x, y, item, color, font, false);
	}
};

//顔グラフィック表示
UIBattleLayout._drawFaceArea= function(unit, isRight) {
	var x, y;
	var dx = this._getIntervalX() + 20;
	var isReverse = false;
	
	if (isRight) {
		x = this._getBattleAreaWidth() - GraphicsFormat.FACE_WIDTH - dx;
	}
	else {
		x = 0 + dx;
		isReverse = true;
	}
	
	y = (0 + this._getBattleAreaHeight()) - GraphicsFormat.FACE_HEIGHT - 15;
	//y = (0 + this._getBattleAreaHeight()) - GraphicsFormat.FACE_HEIGHT - 15 + addBuiY;
	
	
	ContentRenderer.drawUnitFace(x, y, unit, isReverse, 255);
};
