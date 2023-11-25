$(document).ready(function () {
    const oAudio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    const oButton = $("button");

    oButton.on("click", function () {
        oAudio.play();
    });

    $(document).ready(function () {
        $('#carouselExample').carousel({
            interval: 2000
        });

        $('#strategie-bereich li').click(function () {
            $(this).animate({opacity: 0.5}, 500, function () {
                $(this).animate({opacity: 1}, 500);
            });
        });
    });
});