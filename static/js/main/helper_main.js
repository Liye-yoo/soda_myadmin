const appData = {
    app:""

    /*
    $(document).ready(function(){ }); 와 $(function(){ }); 는 동일한 의미
    */
}

// jQuery click했을 때 이벤트 발생시키기
// https://eunyoe.tistory.com/entry/jQuery-if%EB%AC%B8%EC%9D%84-%ED%86%B5%ED%95%9C-class-%EC%A1%B4%EC%9E%AC-%EC%97%AC%EB%B6%80-%ED%99%95%EC%9D%B8-hasClass

$(function (){
    $("input").on('click', function(){
    if ($(this).hasClass('clicked'))
    {
        $(this).removeClass('clicked');
    }
    else
    {
        $("input").removeClass('clicked');
        $(this).addClass('clicked');
        const appD = $(this).attr('data-app')
        appData.app = appD;
    }
});

});

function click_scheme(url_para)
{

        location.href = '/sodabeta/' + appData.app + '/' + url_para;

}

// location.href : 새로운 페이지로 이동되는 속성
// location.replace : 기존 페이지를 새로운 페이지로 변경시키는 메서드