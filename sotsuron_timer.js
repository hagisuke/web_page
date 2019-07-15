const initialGraduateYear = 2020;
let graduateYear = initialGraduateYear;
let anyDate = new Date(`${graduateYear}/2/1 12:00:00`);
let tweetText = "";
let forceRefresh = false;
let manualDarkMode = null;

const refreshTweetText = text => {
    const twitterContainer = document.getElementById("twitter_container");
    twitterContainer.innerHTML = '<a class="twitter-share-button" id="tweet_button" href="https://twitter.com/intent/tweet" data-hashtags="機械卒論タイマー" data-size="large">';
    twitterContainer.getElementsByTagName("a")[0].setAttribute("data-text", text);
    twttr.widgets.load();
};

const ryuunen = () => {
    anyDate = new Date(`${++graduateYear}/2/1 12:00:00`);
    forceRefresh = true;
}

const toggleDarkMode = (dark, manual) => {
    if(dark)
        document.getElementById('container').classList.add('dark');
    else
        document.getElementById('container').classList.remove('dark');
    if(manual) manualDarkMode = dark;
    else document.getElementById('toggle_dark_mode').checked = dark;
}

const isDayTime = (h, morning) => (morning <= h && h < morning + 12);

var options = {
  width: 2,             // number of digits
  format: null,         // options for jquery.numberformatter, if loaded
  align: 'right',       // aligns values to the left or right of display
  padding: '&nbsp;',    // value to use for padding
  chars: null,          // array of characters that Flapper can display
  chars_preset: 'num',  // 'num', 'hexnum', 'alpha' or 'alphanum'
  timing: 100,          // the maximum timing for digit animation
  min_timing: 10,       // the minimum timing for digit animation
  threshhold: 40,      // the point at which Flapper will switch from
                        // simple to detailed animations
  transform: true,       // Flapper automatically detects the jquery.transform
                        // plugin. Set this to false if you want to force
                        // transform to off
  on_anim_start: null,   // Callback for start of animation
  on_anim_end: null     // Callback for end of animation
}

function dateCounter() {
    var timer = setInterval(function() {
    var nowDate = new Date();
    var daysBetween = Math.ceil((anyDate - nowDate)/(1000*60*60*24)) - 1;
    var ms = (anyDate - nowDate);
    forceRefresh = forceRefresh || tweetText === "";
    // check dark mode
    const dayTime = isDayTime(nowDate.getHours(), 6);
    console.log(manualDarkMode);
    toggleDarkMode(manualDarkMode !== null ? manualDarkMode : !dayTime, false);
    var $seconds = $("#seconds");
    var $minutes = $("#minutes");
    var $hours = $("#hours");
    var $days = $("#days");

    if (ms >= 0) {
        var h = Math.floor(ms / 3600000);
        var _h = h % 24;
        var m = Math.floor((ms - h * 3600000) / 60000);
        var s = Math.round((ms - h * 3600000 - m * 60000) / 1000);
        $seconds.val(s).change();
        $minutes.val(m).change();
        $hours.val(_h).change();
        $days.val(daysBetween).change();

        tweetText = `卒業論文提出まで残り${daysBetween}日${_h}時間${m}分（多分）`;
        if(graduateYear - initialGraduateYear > 0)
            tweetText += `（${graduateYear - initialGraduateYear}回時間を増やしました！）`;
    }else{
        alert("時間です！");
        clearInterval(timer);
        element.textContent = "残り0日と0時間0分0秒";
        tweetText = "卒業論文提出締め切りを過ぎました";
    }
    if(forceRefresh || Math.abs(ms % 60000) <= 1000) refreshTweetText(tweetText); // every 1 minute
    forceRefresh = false;
    }, 1000);
}

window.onload = () => {
    toggleDarkMode(!isDayTime(new Date().getHours(), 6), false);
}
$(document).ready(function(){
    // attach Flapper
    $('#seconds').flapper(options);
    $('#minutes').flapper(options);
    $('#hours').flapper(options);
    options.width = 3
    $("#days").flapper(options).change();
});

dateCounter();
