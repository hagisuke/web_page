const initialGraduateYear = 2019;
let graduateYear = initialGraduateYear;
let anyDate = new Date(`${graduateYear}/2/1 12:00:00`);
let tweetText = "";
let forceRefresh = false;

const refreshTweetText = text => {
    const twitterContainer = document.getElementById("twitter_container");
    twitterContainer.innerHTML = '<a class="twitter-share-button" id="tweet_button" href="https://twitter.com/intent/tweet" data-hashtags="機械卒論タイマー" data-size="large">';
    twitterContainer.getElementsByTagName("a")[0].setAttribute("data-text", text);
    twttr.widgets.load();
};

function dateCounter() {
    var timer = setInterval(function() {
    var nowDate = new Date();
    var daysBetween = Math.ceil((anyDate - nowDate)/(1000*60*60*24)) - 1;
    var ms = (anyDate - nowDate);
    var element = document.getElementById("countOutput");
    forceRefresh = forceRefresh || tweetText === "";

    if (ms >= 0) {
        var h = Math.floor(ms / 3600000);
        var _h = h % 24;
        var m = Math.floor((ms - h * 3600000) / 60000);
        var s = Math.round((ms - h * 3600000 - m * 60000) / 1000);
        element.textContent = "残り" +daysBetween + "日と" +_h + "時間" + m + "分" +s + "秒";

        tweetText = `卒業論文提出締め切りまで残り${daysBetween}日${_h}時間${m}分`;
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

const ryuunen = () => {
    anyDate = new Date(`${++graduateYear}/2/1 12:00:00`);
    forceRefresh = true;
}
dateCounter();
