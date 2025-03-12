//マップ上でのHP表示設定で「数値」を選択した場合に表示されるHPバーを細くするプラグイン
//SRPG Studio本体スクリプトのsingleton-currentmap.jsと
//公式プラグインのhighlevel-statedecoration.jsを基に作成しています。
//一部変数を変更することで表示方法を調整できます。
//利用に関する規約は下記URLのリポジトリ内にあるREADMEをご確認ください。
//https://github.com/masano-ykttz/srpgstudio_plugins
//
//注意事項
//MapHpDecoratorを書き換える他のプラグインと競合する可能性があります。
//例：公式プラグインのhighlevel-statedecoration.js 等
//導入の際にはご注意ください。競合を回避したい場合は必要な部分をコメントアウトする等で対処をお願いします。
//なお、調整の為にプラグインを改変する場合は自己責任でお願いいたします。

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
		
		this._addHp(obj, pos, this._getNumberColorIndex(hpType), pos2x, pos2y);  //数字(HP数値)の描画
	}
	else if (hpType === 1) {
		obj.addGauge(pos.x, pos.y, 1);
	}
	
	obj.endDecoration();
};

MapHpDecorator._addHp = function(obj, pos, colorIndex, dx, dy) {
    
    obj.addHp(pos.x - dx, pos.y - dy, colorIndex);  //「マップHP数字」で選択した画像で表示
    
    //ver1.310で実装されたaddByBigNumberを使用する場合、
    //上記の「obj.addHP～」をコメントアウト（行頭に「//」を追加）し、
    //下記のコメントアウト（「/*」と「*/」）を外してください。
    /*
    var list = root.getBaseData().getUIResourceList(UIType.BIGNUMBER, true);  //「リソース使用箇所 ＞ UI ＞大きい数字」の画像を取得
    var pic = list.getData(0);
    obj.addHpByBigNumber(pos.x - dx, pos.y - dy, colorIndex, pic);  //「大きい数字」で選択した画像で表示
    */
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

