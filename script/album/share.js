(function($){
    var HOME_PAGE = 'http://www.yaohaixiao.com', 
	    doc = document, 
		isIE = $.browser.msie, 
		version = $.browser.version, // Share Article
        shareArticle = function(siteName, siteURL){
            var link = encodeURIComponent(doc.location), title = encodeURIComponent(doc.title.substring(0, 76)), source = encodeURIComponent(siteName), WINDOW_NAME = 'share';
            site = siteURL, getParamsOfShareWindow = function(width, height){
                return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=', (screen.width - width) / 2, ',top=', (screen.height - height) / 2].join('');
            }, FBShare = $('#facebook-share'), TTShare = $('#twitter-share'), DShare = $('#delicious-share'), KXShare = $('#kaixin001-share'), RRShare = $('#renren-share'), DBShare = $('#douban-share'), SNShare = $('#sina-share'), NEShare = $('#netease-share'), QQShare = $('#tencent-share');
            
            if (FBShare[0]) {
                $(FBShare).click(function(){
                    var url = 'http://facebook.com/share.php?u=' + link + '&t=' + title;
                    var params = getParamsOfShareWindow(626, 436);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (TTShare[0]) {
                $(TTShare).click(function(){
                    var url = 'http://twitter.com/share?url=' + link + '&text=' + title;
                    var params = getParamsOfShareWindow(500, 375);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (DShare[0]) {
                $(DShare).click(function(){
                    var url = 'http://delicious.com/post?url=' + link + '&title=' + title;
                    var params = getParamsOfShareWindow(550, 550);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (KXShare[0]) {
                $(KXShare).click(function(){
                    var url = 'http://www.kaixin001.com/repaste/share.php?rurl=' + link + '&rcontent=' + link + '&rtitle=' + title;
                    var params = getParamsOfShareWindow(540, 342);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (RRShare[0]) {
                $(RRShare).click(function(){
                    var url = 'http://share.renren.com/share/buttonshare?link=' + link + '&title=' + title;
                    var params = getParamsOfShareWindow(626, 436);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (DBShare[0]) {
                $(DBShare).click(function(){
                    var url = 'http://www.douban.com/recommend/?url=' + link + '&title=' + title;
                    var params = getParamsOfShareWindow(450, 350);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (SNShare[0]) {
                $(SNShare).click(function(){
                    var url = 'http://v.t.sina.com.cn/share/share.php?url=' + link + '&title=' + title;
                    var params = getParamsOfShareWindow(607, 523);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (NEShare[0]) {
                $(NEShare).click(function(){
                    var url = 'http://t.163.com/article/user/checkLogin.do?link=' + link + 'source=' + source + '&info=' + title + ' ' + link;
                    var params = getParamsOfShareWindow(642, 468);
                    window.open(url, WINDOW_NAME, params);
                });
            }
            if (QQShare[0]) {
                $(QQShare).click(function(){
                    var url = 'http://v.t.qq.com/share/share.php?title=' + title + '&url=' + link + '&site=' + site;
                    var params = getParamsOfShareWindow(634, 668);
                    window.open(url, WINDOW_NAME, params);
                });
            }
        };
		shareArticle('YAOHAIXIAO.COM', HOME_PAGE);
})(jQuery);	