$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});

$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});

$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('value'));
});

 
// $('.dropdown-menu li').click(function () {
//     var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
//     msg = '<span class="msg">Haz escogido: ';
//     $('.msg').html(msg + input + '</span>');
// });

