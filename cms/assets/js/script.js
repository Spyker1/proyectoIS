$(document).ready(function() {
    $(".section-button").click(function() {
        $(".section-button").removeClass("btnAct");
        var sectionId = $(this).data("section");
        $(".section-content").hide();
        $("#section" + sectionId).show();

        $(this).addClass("btnAct");
        
    });
});


$(document).ready(function() {
    $(".xd").click(function() {
        $(".xd").removeClass("btnAct");
        var Id = $(this).data("sec");
        $(".cont").hide();
        $("#sec" + Id).show();

        $(this).addClass("btnAct");
        
    });
});
