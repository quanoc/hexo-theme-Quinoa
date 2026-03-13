(function($){
    var toTop = ($('#sidebar').height() - $(window).height()) + 60;
    
    // 动态加载 lightgallery CSS
    function loadLightGalleryCSS() {
        if (document.getElementById('lightgallery-css')) return;
        var link = document.createElement('link');
        link.id = 'lightgallery-css';
        link.rel = 'stylesheet';
        link.href = '/libs/lightgallery/css/lightgallery.min.css';
        document.head.appendChild(link);
    }
    
    // 动态加载 lightgallery JS
    function loadLightGalleryJS(callback) {
        if (window.lightGallery) {
            callback();
            return;
        }
        
        var scripts = [
            '/libs/lightgallery/js/lightgallery.min.js',
            '/libs/lightgallery/js/lg-thumbnail.min.js',
            '/libs/lightgallery/js/lg-pager.min.js',
            '/libs/lightgallery/js/lg-autoplay.min.js',
            '/libs/lightgallery/js/lg-fullscreen.min.js',
            '/libs/lightgallery/js/lg-zoom.min.js'
        ];
        
        var loaded = 0;
        scripts.forEach(function(src) {
            var script = document.createElement('script');
            script.src = src;
            script.async = false; // 按顺序加载
            script.onload = function() {
                loaded++;
                if (loaded === scripts.length && callback) {
                    callback();
                }
            };
            document.head.appendChild(script);
        });
    }
    
    // 初始化 lightgallery
    function initLightGallery() {
        var $articleEntry = $('.article-entry');
        var $articleGallery = $('.article-gallery');
        
        // 检查是否有图片需要画廊功能
        var hasImages = $articleEntry.find('img').length > 0 || $articleGallery.length > 0;
        
        if (!hasImages) return;
        
        // 为图片添加画廊链接
        $articleEntry.each(function(i) {
            $(this).find('img').each(function() {
                if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                    $(this).after('<span class="caption">' + this.alt + '</span>');
                }
                // 对于已经包含在链接内的图片不适用lightGallery
                if ($(this).parent().prop("tagName") !== 'A') {
                    $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
                }
            });
        });
        
        // 动态加载并初始化
        loadLightGalleryCSS();
        loadLightGalleryJS(function() {
            var options = { selector: '.gallery-item' };
            $articleEntry.each(function(i, entry) {
                lightGallery(entry, options);
            });
            if ($articleGallery.length) {
                lightGallery($articleGallery[0], options);
            }
        });
    }
    
    // 页面加载时初始化
    initLightGallery();

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    // To Top
    if ($('#sidebar').length) {
        $(document).on('scroll', function () {
            if ($(document).width() >= 800) {
                if(($(this).scrollTop() > toTop) && ($(this).scrollTop() > 0)) {
                    $('#toTop').fadeIn();
                    $('#toTop').css('right', '52px');
                } else {
                    $('#toTop').fadeOut();
                }
            } else {
                $('#toTop').fadeOut();
            }
        }).on('click', '#toTop', function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }
       
    // Task lists in markdown
    $('ul > li').each(function() {
        var taskList = {
            field: this.textContent.substring(0, 2),
            check: function(str) {
                var re = new RegExp(str);
                return this.field.match(re);
            }
        }
        var string = ["[ ]", ["[x]", "checked"]];
        var checked = taskList.check(string[1][0]);
        var unchecked = taskList.check(string[0]);
        var $current = $(this);
        function update(str, check) {
            var click = ["disabled", ""];
            $current.html($current.html().replace(
              str, "<input type='checkbox' " + check + " " + click[1] + " >")
            )
        }
        if (checked || unchecked) {
            this.classList.add("task-list");
            if (checked) {
                update(string[1][0], string[1][1]);
                this.classList.add("check");
            } else {
                update(string[0], "");
            }
        }
    })
    $(document).on('click', 'input[type="checkbox"]', function (event) {
        event.preventDefault();
    });

    const sidebarToggle = function() {
        // 判断是否是移动端小屏幕 (mq-mini: max-width: 559px)
        const isMiniScreen = $(window).width() <= 559;
        
        if (isMiniScreen) {
            // 小屏幕下使用 expanded 类来控制侧边栏显示/隐藏
            $('#sidebar').toggleClass('expanded');
        } else {
            // 其他屏幕使用 collapsed 类
            $('#main').toggleClass('collapsed');
            $('#sidebar').toggleClass('collapsed');
            $('.page-indent').toggleClass('collapsed');
            $('.article-meta').toggleClass('collapsed');
            $('.article-more-link').toggleClass('collapsed');
        }
        $('#toggle-sidebar-btn').toggleClass('fa-angle-left').toggleClass('fa-angle-right');
    }

    $(document).ready(function() {
        // 根据屏幕宽度初始化箭头方向
        const isMiniScreen = $(window).width() <= 559;
        if (isMiniScreen) {
            // 小屏幕下侧边栏默认隐藏，箭头应指向右（表示可展开）
            $('#toggle-sidebar-btn').removeClass('fa-angle-left').addClass('fa-angle-right');
        }
        
        $('#toggle-sidebar').on('click', function() {
            sidebarToggle()
        });
        
        // 小屏幕下点击页面其他区域关闭侧边栏
        $(document).on('click', function(e) {
            const isMiniScreen = $(window).width() <= 559;
            if (isMiniScreen) {
                const $sidebar = $('#sidebar');
                const $toggleBtn = $('#toggle-sidebar');
                // 如果点击的不是侧边栏内部且不是切换按钮，则关闭侧边栏
                if ($sidebar.hasClass('expanded') && 
                    !$sidebar.is(e.target) && $sidebar.has(e.target).length === 0 &&
                    !$toggleBtn.is(e.target) && $toggleBtn.has(e.target).length === 0) {
                    $sidebar.removeClass('expanded');
                    $('#toggle-sidebar-btn').removeClass('fa-angle-left').addClass('fa-angle-right');
                }
            }
        });
    });

    $(document).ready(function () {
        if ($('#music-player-fade').is(':visible') && $('#music-player').length > 0) {
            $('#music-player-fade').on('click', function () {
                $('#music-player-container').show()
                const musicPlayer = $('#music-player');
                const src = musicPlayer.data('src');

                // 获取 iframe 的 HTML 内容
                const iframeDocument = document.getElementById('music-player').contentDocument;
                if (iframeDocument === null) { 
                    // 如果为空 则展示
                    musicPlayer.show()
                    $('#music-player-fade').hide()
                    return;
                }
                const iframeHTML = iframeDocument.documentElement.outerHTML;
                if ('<html><head></head><body></body></html>' === iframeHTML) {
                    musicPlayer.attr('src', src); // 动态设置src
                }
                
                musicPlayer.show()
                $('#music-player-fade').hide()
            });
            $('#music-player-container').on('click', function () {
                $('#music-player').hide()
                $('#music-player-fade').show()
                $('#music-player-container').hide()
            });
            $('#music-player-container').on('dblclick', function () {
                $('#music-player-fade').show()
                $('#music-player-container').hide()
            });
        } else {
            console.log("要操作的元素不存在，请检查页面布局或元素生成逻辑");
        }
    });
})(jQuery);
