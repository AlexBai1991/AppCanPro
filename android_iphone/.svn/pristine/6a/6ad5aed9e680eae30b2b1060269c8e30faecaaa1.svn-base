/**
 * 图片切换切换与滚动与切换效果
 * @param {Object} picId 切换块元素id
 * @param {Object} dir 切换方向
 * @param {Object} autoFlip 是否自动切换
 * @param {Object} intervalTime 自动切换时间
 */
var zkqwySlide = function(picId,dir,autoFlip,intervalTime) {
	var dir = dir || 'H';
	var autoFlip = autoFlip || false;
//	var intervalTime = intervalTime || 2000;
	var intervalTime = 3000;
	var newsPicSlide = new zySlide(picId,dir,function(){},false,function(e){
		if(autoFlip) {
			jq('#circle span').filter('.cur').removeClass('cur');
			jq('#circle span').eq(this.currentPoint).addClass('cur');
		}
	}); 
	
	if(autoFlip) {
		setInterval(function(){
			if(newsPicSlide.hasNext()) {
				newsPicSlide.toNext();
			} else {
				newsPicSlide.moveToPoint(0);
				
			}
		},intervalTime);
	}
	
	return newsPicSlide;
} 
	
	
