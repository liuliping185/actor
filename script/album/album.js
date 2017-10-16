/**
 * @author Yaohaixiao
 */
(function($){
    var PX = "px", 
	CURRENT = "current", 
	HIDE = "hide";
    
	/**
	 * Album 构造函数
	 * @constructor $.Album
	 * @param {Object} [config]                            - （可选）初始化参数
	 * @param {HTMLElement|String} [config.root]           - （可选）相册的根节点（DIV 元素），默认值：$("#album")
	 * @param {HTMLElement|String} [config.photo]          - （可选）大图片（IMG 元素），默认值：$("#album-photo")
	 * @param {HTMLElement|String} [config.photoTitle]     - （可选）大图片的标题（h3 元素），默认值：$("#album-title")
	 * @param {HTMLElement|String} [config.overLayer]      - （可选）大图片加载时的loading提示层（DIV 半透明的遮罩层），默认值：$("#album-overlayer")
	 * @param {HTMLElement|String} [config.samplesRoot]    - （可选）缩略图的滚动区域跟节点（DIV 元素），默认值：$("#album-samples-root")
	 * @param {HTMLElement|String} [config.samplesList]    - （可选）缩略图列表（UL 元素），默认值：$("#album-samples-list")
	 * @param {HTMLElement|String} [config.buttonPrev]     - （可选）上一张图片按钮（A 元素），默认值：$("#album-button-prev")
	 * @param {HTMLElement|String} [config.buttonNext]     - （可选）下一张图片按钮（IMG 元素），默认值：$("#album-button-next")
	 * @return {Object} $.Album
	 */
    $.Album = function(config){
		this.root = config && config.root ? $(config.root) : $("#album");
		// 大图片
        this.photo = config && config.photo ? $(config.photo) : $("#album-photo");
        // 大图片标题
		this.photoTitle = config && config.photoTitle ? $(config.photoTitle) : $("#album-title");
        // 大图片加载loading遮罩层
		this.overLayer = config && config.overLayer ? $(config.overLayer) : $("#album-overlayer");
        // 缩略图根节点
		this.samplesRoot = config && config.samplesRoot ? $(config.samplesRoot) : $("#album-samples-root");
        // 缩略图列表
		this.samplesList = config && config.samplesList ? $(config.samplesList) : $("#album-samples-list");
        // 下一张按钮
		this.buttonPrev = config && config.buttonPrev ? $(config.buttonPrev) : $("#album-button-prev");
        // 上一张按钮
		this.buttonNext = config && config.buttonNext ? $(config.buttonNext) : $("#album-button-next");
		// 所有的缩略图的NodeList对象
        this.items = null;
		// 被选中国的缩略图容器
        this.selectedItem = null;
		// 缩略图根节点容器的宽度
        this.samplesRootWidth = 0;
		// 单个缩略图容器的宽度
        this.sampleItemWidth = 0;
		// 当前选中的缩略图在 items 里的索引值
        this.index = 0;
		// 缩略图容器的个数
        this.length = 0;
		// 最大的可移动位置
        this.maxSteps = 0;
		// 当前的移动位置
		this.moveStep = 0;
		// 缩略图区域是否在滚动 
        this.scrolling = false;
		
		// 程序初始化
		this.init();
        
        return this;
    };
    $.Album.prototype = {
		/**
		 * 初始化程序
		 * @method init
		 * @return $.Album
		 */
		init: function(){
			var firstItem = null,
			    oneScreenItemsNumber = 0;
			
			// 获得缩略图一屏的长度
			this.samplesRootWidth = this.samplesRoot.width();
			
			// 为了处理有些情况后台程序生成缩略图列表时没有缩略图
			// 这个时候要移除掉这些没有用的缩略图
			this.samplesList.find("img").each(function(i, item){
				if (!$(item).attr("src")) {
					$(item).parent().parent().remove();
				}
			});
			
			// 获得可用的缩略图的NodeList对象
			this.items = this.samplesList.find("li");
			// 第一个缩略图元素（LI）
			firstItem = $(this.items[0]);
			// 获得单个缩略图元素的宽度
			this.sampleItemWidth = firstItem.width();
			// 一屏可以显示的 items 的个数
			oneScreenItemsNumber = this.samplesRootWidth / this.sampleItemWidth;
			// 初始化默认选中的缩略图
			this.selectedItem = firstItem;
			// 获得缩略图的个数
			this.length = this.items.length;
			// 根据实际可用的缩略图个数设置缩略图列表的长度
			this.samplesList.width(this.length * this.sampleItemWidth);
			// 获得缩略图区域最大的可滚动次数
			// 本程序默认一次滚动一个缩略图元素的距离
			// 缩略图个数大于一屏可显示的数量时，最大可滚动次数为:缩略图的个数-一屏可显示的缩略图个数,这样就保证可视区域内没有空白
			// 缩略图个数小于一屏可显示的数量时，缩略图就不滚动了
			this.maxSteps = this.length - oneScreenItemsNumber > 0 ? this.length - oneScreenItemsNumber : 0;
			
			// 绑定相册的各个组件的处理函数
			this.bindEvent();
			
			return this;
		},
		/**
		 * 更新大图片
		 * @method update
		 * @return {Object} $.Album
		 */
		update: function(){
			var album = this, 
			photo = album.photo, 
			items = album.items, 
			index = album.index, 
			// 缩略图中的链接（里面的 href和title属性是切换大图片需要使用的）
			curLink = $(items[index]).find("a:first"), 
			// 获得大图片的标题
			alt = curLink.attr("title"), 
			// 获得大图片的URL地址
			src = curLink.attr("href");
			
			// 切换缩略图的选中样式
			album.selectedItem.removeClass(CURRENT);
			$(items[index]).addClass(CURRENT);
			album.selectedItem = $(items[index]);
			// 获得当前选中缩略图(位于items中)的索引值
			album.index = index;
			
			// 图片加载完成前，显示图片加载loading图片	
			this.overLayer.removeClass(HIDE);
			
			// 更新大图片
			photo.attr({
				alt: alt,
				src: src
			});
			// 更新大图片对应的标题
			album.photoTitle.html(alt);
			
			// 由于图片IMG标签是一个站位标签，图片实际的加载如果图片比较大会比较慢
			// 并不是一更新了IMG标签的 src 属性，图片就可以立刻改变的
			// 所以，在图片加载完成后，需要关闭loading提示层
			photo.load(function(evt){
				album.overLayer.addClass(HIDE);
			});
			
			return this;
		},
		/**
		 * 滚动缩略图，更换缩略图的选中状态
		 * @method move
		 * @return {Object} $.Album
		 */
		move: function(){
			var left = "", album = this;
			
			console.log(album.moveStep);
			
			if (!album.scrolling || (album.length > album.maxSteps)) {
				left = -(album.moveStep * album.sampleItemWidth) + PX;
				
				album.scrolling = true;
				
				album.samplesList.animate({
					left: left
				}, 500, function(){
					album.scrolling = false;
					album.update();
				});
			}
			
			return this;
		},
		/**
		 * 显示上一张图片
		 * @method prev
		 * @return {Object} $.Album
		 */
		prev: function(){
			this.index -= 1;
			this.moveStep -= 1;
			
			if (this.index < 0) {
				this.index = this.length - 1;
				this.moveStep = this.maxSteps;
			}
			
			if (this.moveStep < 0) {
				if (this.index >= 0) {
					this.moveStep = 0;
				}
			}
			
			// 滚动缩略图，更换缩略图的选中状态
			this.move();
			
			return this;
		},
		/**
		 * 显示下一张图片
		 * @method next
		 * @return {Object} $.Album
		 */
		next: function(){
			this.index += 1;
			this.moveStep += 1;
			
			if (this.index >= this.length) {
				this.index = 0;
				this.moveStep = 0;
			}
			
			if (this.moveStep > this.maxSteps) {
				if (this.index < this.length) {
					this.moveStep = this.maxSteps;
				}
			}
			
			// 滚动缩略图，更换缩略图的选中状态
			this.move();
			
			return this;
		},
		/**
		 * 给相册的DOM组件绑定处理函数
		 * @method bindEvent
		 * @return {Object} $.Album
		 */
		bindEvent: function(){
			var album = this, 
			items = album.items, 
			buttonPrev = album.buttonPrev, 
			buttonNext = album.buttonNext;
			
			// 绑定上一张按钮的处理事件
			buttonPrev.click(function(evt){
				// 显示上一张图片
				album.prev();
				
				// 组织 A 标签的默认行为和事件冒泡
				evt.preventDefault();
				evt.stopPropagation();
			});
			
			// 绑定下一张按钮的处理事件
			buttonNext.click(function(evt){
				// 显示下一张图片
				album.next();
				
				// 组织 A 标签的默认行为和事件冒泡
				evt.preventDefault();
				evt.stopPropagation();
			});
			
			// 绑定缩略图事件
			items.each(function(i, item){
				$(item).click(function(evt){
					// 当前缩略图是未选中状态才触发更换图片处理
					if (!$(item).hasClass(CURRENT)) {
						// 获得当前图片的索引值
						album.index = i;
						// 切换大图片
						album.update();
					}
					
					// 组织 A 标签的默认行为和事件冒泡
					evt.preventDefault();
					evt.stopPropagation();
				});
			});
		}
	};
	
	$.fn.extend({
		album: function(options){
			return new $.Album(options);
		}
	});
})(jQuery);