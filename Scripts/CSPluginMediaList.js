jQuery(function ($) {

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /// jQuery Plugin to display a Media List with Bootstrap style
    ///       useful for displaying blog comments, comment threads, articles lists, Tweets, or any list 
    ///       featuring a left aligned image and textual content.
    ///
    /// 
    /// opts = { data : JSobject, url : "MyJSONData.js" }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    jQuery.fn.mediaList = function (opts) {

        var $this = $(this);
        var $container = $("<div/>", { class: "jumbotron" }).appendTo($this);
        var $list = $("<ul/>", { id: "media_List", class: "media-list" }).appendTo($container);

        if (opts === undefined || (opts.data === undefined && opts.url === undefined)) {
            opts = { data: null, url: "Scripts/MediaList.js" };
            fnSendAjaxRequest(opts);
        }
        else if (opts.data === undefined) {
            fnSendAjaxRequest(opts);
        }
        else if (opts.url === undefined) {
            fnLoadData(opts.data);
        }
        else {
            fnLoadData(opts.data);
            fnSendAjaxRequest(opts);
        }

        return $this;



        /////////////  Send Ajax Request ///////////////////////////////////////////////////////////////
        function fnSendAjaxRequest(opts) {

            $.getJSON(opts.url, fnLoadData, function (msg) {

                alert("An Error has been thrown : " + msg);
            });
        }


        ///////////// Create Media List  ////////////////////////////////////////////////////////////////
        function fnLoadData(data) {

            $.each(data, function (index, obj) {
                var $li = $("<li/>", { class: "media row" }).appendTo($list);
                var $media = $("<div />", { class: "col-xp-12 col-lg-4" }).appendTo($li);
                var $a = $("<a/>", { href: obj.Url }).appendTo($media);
                $("<img/>", { class: "media-object responsive img-rounded", src: obj.Image, alt: obj.Title }).appendTo($a);
                var $body = $("<div />", { class: "col-xp-12 col-lg-8" }).appendTo($li);
                $("<h3/>", { class: "media-heading media-right", text: obj.Title }).appendTo($body);
                $("<div/>", { class: "media-content media-right" }).appendTo($body)
                .html(obj.Text);

            });

        }        
    }
});
