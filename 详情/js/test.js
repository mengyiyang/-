window.onload = function () {
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop);

        var height1 = document.querySelector(".jd_banner").offsetHeight;
        console.log(height1);
        if (scrollTop >= height1) {
            document.querySelector(".jd_search").style.backgroundColor = "#e92322";
        } else {
            document.querySelector(".jd_search").style.backgroundColor = "";
        }
    };
    timeBack();
    bannerEffect();

}

function timeBack() {
    var spans = document.querySelector(".jd_ms_time").querySelectorAll("span");
    var totalTime = 3700;
    timeId = setInterval(function () {
        totalTime--;
        if (totalTime < 0) {
            clearInterval(timeId);
            return;
        }

        var hour = Math.floor(totalTime / 3600);
        var min = Math.floor(totalTime % 3600 / 60);
        var sec = Math.floor(totalTime % 60);

        // spans[0].innerHTML = hour > 10 ? Math.floor(hour / 10) : 0;
        // spans[1].innerHTML = hour > 10 ? Math.floor(hour % 10) : hour;
        // spans[3].innerHTML= min > 10 ? Math.floor(min / 10) : 0;
        // spans[4].innerHTML= min > 10 ? Math.floor(min % 10) : min;
        // spans[6].innerHTML= sec > 10 ? Math.floor(sec / 10) : 0;
        // spans[7].innerHTML= sec > 10 ? Math.floor(sec % 10) : sec;

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(min / 10);
        spans[4].innerHTML = Math.floor(min % 10);
        spans[6].innerHTML = Math.floor(sec / 10);
        spans[7].innerHTML = Math.floor(sec % 10);

    }, 1000);
}

function bannerEffect() {
    var banner = document.querySelector(".jd_banner");
    var ul = document.querySelector("ul:first-of-type");
    var liF = document.querySelector("li:first-of-type");
    var liL = document.querySelector("li:last-of-type");

    ul.appendChild(liF.cloneNode(true));
    // insertBefore(元素，位置)
    ul.insertBefore(liL.cloneNode(true), ul.firstChild);


    var lis = ul.querySelectorAll("li");
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    ul.style.width = count * bannerWidth + "px";
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }

    var index = 1;
    ul.style.left = -bannerWidth + "px";
    window.onresize = function () {
        var bannerWidth = banner.offsetWidth;
        ul.style.width = count * bannerWidth + "px";
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        ul.style.left = -index * bannerWidth + "px";
    }

    var point = function (index) {
        var lis = document.querySelector(".jd_bannerPoint").querySelectorAll("li");
        console.log(lis);
        // index++;
        for (var i = 0; i < lis.length; i++) {
            li = lis[i];
            // li.classList.remove("current");
            li.style.backgroundColor = "";
            // console.log(index);
        }
        lis[index - 1].style.backgroundColor = "red";
    }

    var timeId;

    var starTime = function () {
        timeId = setInterval(function () {
            index++;
            ul.style.transition = "left 1s";
            ul.style.left = (-index * bannerWidth) + "px";
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    ul.style.transition = "none";
                    ul.style.left = (-index * bannerWidth) + "px";
                }
            }, 500)

        }, 1000);
    }
    starTime();

    ul.addEventListener("touchstart", function (e) {
        clearInterval(timeId);
        startX = e.targetTouches[0].clientX;
    });
    ul.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);

        ul.style.transition = "none";
        ul.style.left = (-index * bannerWidth) + distanceX + "px";

    });
    ul.addEventListener("touchend", function () {
        isEnd=false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            ul.style.transition = "left 1s"
            ul.style.left = (-index * bannerWidth) + "px";
        } else if (Math.abs(distanceX) > 0) {
            ul.style.transition = "left 1s"
            ul.style.left = (-index * bannerWidth) + "px";
        }

        starTime();
    });

    // ul.addEventListener("webkitTransitionEnd", function () {
    //     if (index == count - 1) {
    //         index = 1;
    //         ul.style.transition = "none";
    //         ul.style.left = -index * bannerWidth + "px";

    //     } else if (index == 0) {
    //         index = count - 2;
    //         ul.style.transition = "none";
    //         ul.style.left = -index * bannerWidth + "px";
    //     }

    // })
    // var starX, moveX, distanceX;
    // ul.addEventListener("touchstart", function (e) {
    //     clearInterval(timeId);
    //     // console.log(e.targetTouches)
    //     starX = e.targetTouches[0].clientX;
    // });

    // ul.addEventListener("touchmove", function (e) {
    //     moveX = e.targetTouches[0].clientX
    //     distanceX = moveX - starX;

    //     ul.style.transition = "none";
    //     ul.style.left = (-index * bannerWidth + distanceX) + "px";
    // });
    // ul.addEventListener("touchend", function (e) {
    //     if (Math.abs(distanceX) > 100) {
    //         if (distanceX > 0) {
    //             index--;
    //         } else {
    //             index++;
    //         }
    //         ul.style.transition = "left 0.5s ease-in-out";
    //         ul.style.left = -index * bannerWidth + "px";
    //     } else if (Math.abs(distanceX) > 0) {
    //         ul.style.transition = "left 0.5s ease-in-out";
    //         ul.style.left = -index * bannerWidth + "px";
    //     }
    //     starTime();

    // // });
    // ul.addEventListener("webkitTransitionEnd", function () {
    //     if (index == count-1) {
    //         index = 1;
    //         ul.style.transition = "none";
    //         ul.style.left = -index * bannerWidth + "px";
    //     } else if (index == 0) {
    //         index = count - 2;
    //         ul.style.transition = "none";
    //         ul.style.left = -index * bannerWidth + "px";
    //     }

    //     point(index);
    // });

}