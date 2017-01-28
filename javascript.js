$(document).ready(function() {
    
    var channel_IDs = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var closedAcc_Pic = "https://web-cdn.ttvnw.net/images/xarth/dead_glitch.png";
    
    function displayTwitchtv() {
        for (i = 0; i < channel_IDs.length; i++) {(function(i){  
                var channel = channel_IDs[i];
                var cb = '?client_id=g1a42ix3f73s30q9ox5mb9snbrma1sq&callback=?'; 
    
                var APIRoot_Streams = "https://api.twitch.tv/kraken/streams/" + channel + cb;

                $.getJSON(APIRoot_Streams, function(response) {
                    var streamInfo = response.stream;
                    if (streamInfo === null) { // If ture = user offline.
                        var APIRoot_Users = "https://api.twitch.tv/kraken/users/" + channel + cb;
                        $.getJSON(APIRoot_Users, function(response) {
                            var thumbnail     = response.logo == null ? closedAcc_Pic : response.logo; 
                            var channelLink   = "http://www.twitch.tv/" + channel;
                           
                            var markup_img    = '<img src="' + thumbnail + '">';
                            var markup_name   = '<span class="name">' + channel + '</span>';
                            var markup_status = '<p><i class="fa fa-times-circle"></i> Offline</p>';
                            var markup_URL    = '<a href="http://www.twitch.tv/' + channel + '" target="_blank">' + markup_img + markup_name + markup_status + '</a>';
                            var markup_full   = '<li class="offline">' + markup_URL + '</li>';
                            $("#streamers-Con").append(markup_full);
                        }); 
                    }
                    else if (streamInfo === undefined) { 
                        var thumbnail     = closedAcc_Pic;
                        var channelLink   = "http://www.twitch.tv/" + channel;
                        var markup_img    = '<img src="' + thumbnail + '">';
                        var markup_name   = '<span class="name">' + channel + '</span>';
                        var markup_status = '<p><i class="fa fa-times-circle"></i> Account closed</p>';
                        var markup_URL    = '<a href="http://www.twitch.tv/' + channel + '" target="_blank">' + markup_img + markup_name + markup_status + '</a>';
                        var markup_full   = '<li class="offline">' + markup_URL + '</li>';
                        setTimeout(function () { $("#streamers-Con").delay(5000).append(markup_full)}, 400); 
                    }
                    else {
                        var thumbnail     = response.stream.channel.logo == null ? closedAcc_Pic : response.stream.channel.logo; 
                        var channelLink   = "http://www.twitch.tv/" + channel;
                        var status        = response.stream.channel.status;
                        var markup_img    = '<img src="' + thumbnail + '">';
                        var markup_name   = '<span class="name">' + channel + '</span>';
                        var markup_status = '<p><i class="fa fa-twitch"></i> ' + status + '</p>';
                        var markup_URL    = '<a href="http://www.twitch.tv/' + channel + '" target="_blank">' + markup_img + markup_name + markup_status + '</a>';
                        var markup_full   = '<li class="online">' + markup_URL + '</li>';
                        $("#streamers-Con").append(markup_full)
                    }; 
                }); 
            })(i);
        }; 
    };
    $(".displayHere").ready(displayTwitchtv()); 
    
    function navBarEvents() {
        $(".all-users").click(function () {
            $("li").removeClass("hidden active");
            $(this).addClass("active"); 
        });
        $(".offline-users").click(function () {
            $("li").removeClass("active");
            $("li").filter(".online").addClass("hidden");
            $(this).addClass("active");
            $("li").filter(".offline").removeClass("hidden");
        });
        $(".online-users").click(function () {
            $("li").removeClass("active");
            $("li").filter(".online").removeClass("hidden");
            $(this).addClass("active");
            $("li").filter(".offline").addClass("hidden");
        });
    };
    $(".navBar").ready(navBarEvents());
   
});  
  
