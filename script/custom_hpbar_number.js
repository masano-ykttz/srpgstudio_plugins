//マップ上でのHP表示設定で「数値」を選択した場合に表示されるHPバーを細くするプラグイン
//公式のsingleton-currentmap.js参照
//一部変数を変更することで表示方法を調整できます。
//利用に関する規約は下記URLのリポジトリ内にあるREADMEをご確認ください。
//https://github.com/masano-ykttz/srpgstudio_plugins

MapHpDecorator._setupDecorationFromType = function(type) {
	var obj = root.getHpDecoration(type);
        var pos = this._getPos();  //表示位置取得
	
	/*****************************  調整可能箇所ここから  ******************************/
	var width = 32; //HPゲージの横幅指定
	var height = 4;  //HPゲージの高さ指定（本来の高さは10）
	/*****************************  調整可能箇所ここまで  *****************************/
	
	var color = this._getColor(type);  //色取得
	var alpha = this._getAlpha(type);  //透明度取得
	
	/*****************************  調整可能箇所ここから  ******************************/
	var strokeColor = 0xff;            //ゲージの外枠の色指定（初期値0xff）
	var strokeAlpha = 255;             //ゲージの外枠の透明度指定。値が小さいほど透明になります。（初期値255）
	/*****************************  調整可能箇所ここまで  *****************************/
	
	var hpType = EnvironmentControl.getMapUnitHpType();
	obj.beginDecoration();
	
	if (hpType === 0) {
		// addRectangleを呼び出す前に色と輪郭を設定しておく
		obj.setFillColor(color, alpha);
		obj.setStrokeInfo(strokeColor, strokeAlpha, 1, true);
		obj.addRectangle(pos.x, pos.y, width, height); //四角の描画
		
		/*****************************  調整可能箇所ここから  ******************************/
		//数値の表示をずらすとき用パラメータ
		var pos2x = 0; //数値のx座標をずらす。数値が大きいほど右にずれる
		var pos2y = 4; //数値のy座標をずらす。数値が大きいほど下にずれる
		/*****************************  調整可能箇所ここまで  *****************************/
		
		obj.addHp(pos.x - pos2x, pos.y - pos2y, this._getNumberColorIndex(hpType));  //数字(HP数値)の描画
	}
	else if (hpType === 1) {
		obj.addGauge(pos.x, pos.y, 1);
	}
	
	obj.endDecoration();
};

MapHpDecorator._getColor = function(type) {
  //残りHPの割合によるゲージの色を指定します。
  //[HP全回復時の色,HP少し減少時の色,HPそこそこ減少時の色,残りHPが少ない時の色]の順に指定できます。
  //0xの後の6桁を0~Fで指定。0x[R][G][B]となる
  //RGBについては「RGB 数値」とかで検索すればどの数値でどの色になるか分かります。
  //HPの割合による色指定(0xの後の6桁を0~Fで指定。0x[R][G][B]となる)
  var arr = [0x00ffff, 0x00ff00, 0xffff00, 0xff0000];

  //var arr = [0x00ffff, 0x00ff00, 0xffff00, 0xff0000];  //初期値（バックアップ用）
	
  return arr[type];
};
	
MapHpDecorator._getAlpha = function(type) {
  //透明度指定（初期値204、値が小さいほど透明になる）
  return 204;
};

MapHpDecorator._getNumberColorIndex = function(type) {
  //表示される数字の色を指定。
  //初期値は0（白）。色の順番についてはSRPGStudio公式ユーザー・マニュアルの素材規格を参照してください。
  //なお数字の画像はSRPGStudio本体の「リソース＞リソース使用箇所」からUIタブを選択し、
  //「マップHP数字」を選んで画像を設定してください。
  return 0;
};

//表示位置の指定。
MapHpDecorator._getPos = function() {
  var x = 1;   //x座標、大きいほど右に移動
  var y = 28;  //y座標、大きいほど下に移動（SRPGStudio本来の初期値は20）

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

