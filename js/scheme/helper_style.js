/* button setting을 1, 2로 나누었고 분기처리한다. 나중에 이름 헷갈리면 바꿀 것,
js arguments 객체
styleArgs를 상수로 정의하고,구별을 해 줘야 하는것이 다 해제되었을 때, remove class인데,
둘 다 없을수도 있는 것이니까 또 분기를 해 준다.
예 : 첫 번째가 클릭이 되었는지 이런것들... 클래스를 추가할지 속성을 추가할지 고민함
*/

const styleArgs = {
    mainUrl: '',
    paras: {styleId: '', autoDownload: '', cameraPosition: ''}
}

// 해당 parameter 안에 값을 넣고, url을 만든다.
// main url하고 parameter를 따로 줘야되지 않나 싶어서, 이렇게 주었다.
// styleID는 별도로 한다. 바뀔 때마다 새로 만들어 주도록 한다.
// scheme에서 styldID는 무조건 들어가야 하니까...이제 위치가 필요하다.
// 따라서 set url에서 다시 조합을 해준다.

// 체크 되었을 때는 그냥 this가 무엇인지 확인만 하면 됨,
// 그런데 해제 되었을 때는 또 다시 분기를 해서 둘 다 해제되었는지 체크한다.

const schemeOption = {}
$(function () {
    $("button.btnSetting1").on('click', function () {
        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            styleArgs.paras.autoDownload = ''

        } else {
            $("button.btnSetting1").removeClass('clicked');
            $(this).addClass('clicked');
            const auto = $(this).attr('auto') // auto라는 요소를 가져온다.
            styleArgs.paras.autoDownload = auto // auto가 true인지 false인지 체크한다.
        }
        set_main_url()
        // &표시, ?표시 들어갈 것 경우의 수를 많이 뽑아내야 하는데 고민됨


    });
    $("button.btnSetting2").on('click', function () {
        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            styleArgs.paras.cameraPosition = '';
        } else {
            $("button.btnSetting2").removeClass('clicked');
            $(this).addClass('clicked');
            const pos = $(this).attr('position')
            console.log(pos);
            styleArgs.paras.cameraPosition = pos;

        }
        set_main_url();


    });
    call_style_api();


    $("#style_input").keyup(function () {
        console.log('click');
        styleArgs.paras.styleId = $(this).val();
        set_main_url();
    });


});



// 인자 result에는 서버에서 리턴해준 배열이 들어감
// 배열이 들어온 이유는 dataType속성을 JSON으로 했기 때문에 리턴되는 데이터가 텍스트더라도 내부적으로 그 데이터를
// JSON으로 해석하여 배열로 변환
// 그래서 배열에 있는 result값을 체크하면 result가 true라면 성공 이벤트 관련 로직을 출력한다.
// 서버와의 통신이 성공하면 호출되는 이벤트 핸들러인 function(result)
// result 인자에는 서버가 리턴해주는 데이터가 들어감


// style api 호출
        // url : http://soda-api.snow.me/v1/style/overview",
        // 이렇게 webpage에서 하니 허용 안되어있음...cors때문에 서버에서 호출 하는걸로 한다.
        // page에서 우리의 server로 호출한 것이다.
        // 이것을 받아서 html로 보여주어야 한다.
        // _ajax.py, urls.py

function call_style_api() {

    $.ajax({
        url: "../ajax/api/style",
        success: function (result) {
            // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.  TO-DO
            console.log(result.result);
            for (var i = 0; i < result.result.groups.length; i++) {
                const gid = result.result.groups[i].id;
                const gname = result.result.groups[i].name;
                let sub_html = ''
                for (var j = 0; j < result.result.groups[i].styleIds.length; j++) {
                    for (var k = 0; k < result.result.styles.length; k++) {
                        if (result.result.groups[i].styleIds[j] === result.result.styles[k].id) {
                            const style_id = result.result.styles[k].id;
                            const style_name = result.result.styles[k].name;
                            const style_thumb = result.result.cdnPrefix + result.result.styles[k].thumbnail;
                            sub_html += `<div class="style_block"><div>${style_id}</div>

<img src="${style_thumb}"></img>                        
<div>${style_name}</div>
</div>`;
                        }
                    }
                }
// image thumbnail 가운데 오도록 함,
// https://wiki.navercorp.com/pages/viewpage.action?pageId=586662251
// API Category List : 전체 카테고리 리스트를 내려준다.
//filter.id, filter.name, filter.thumbnail 값을 읽어와서 화면에 출력하면 된다.
//Thumbnail Url은: result.cdnPrefix + filter.thumbnail 로 사용한다.
//filter.thumbnail 이 없는 케이스도 있으니 예외 처리가 필요하다.




// console.log(sub_html)
// 자바스크립트에서 중괄호는 객체를 의미 , $ajax{}도 마찬가지이다.
// style category를 group으로 나눈다.

// 위에서 j까지 만들어 지고, 여기서부터 더해진다.
// id, name이 보이게 한다.
//


                const html = `
            <div className="contentsListContainer">
                <div className="categoryNameColumn">
                    ${gid}, ${gname}
                  
                </div>
                  <div class="style_group"> 
                    ${sub_html}
                    </div>
            </div>`
                $(".content-main").append(html);
            }

            // click했을 때 active를 준다.
            // jQuery - selector(선택자) 개념 : p170
            // 클래스 선택자 : $(".클래스명")
            // hasClass : 클래스 존재 여부 확인
            // removeClass : 클래스 삭제
            $(".style_block").click(function () {
                if ($(this).hasClass('clicked')) {
                    $(this).removeClass('clicked');
                    styleArgs.paras.styleId = ''

                } else {

                    $(".style_block").removeClass('clicked');
                    $(this).addClass('clicked');
                    var a = $(this).find('div')[0];
                    styleArgs.paras.styleId = $(a).text()
                }
                set_main_url()
            });
        },
        error: function (e) {
            console.error(e);
        }
    })
}

let qr_code = ''

function make_qr_code() {
    $("#qrcode").empty();
    $('#qrcode').qrcode({
        width: 200,
        height: 200,
        text: styleArgs.mainUrl
    });

}


//set_main_url 함수
//$("#scheme_input").val(styleArgs.mainUrl);
//함수로 mainUrl 이 정보를 scheme_input에 넣겠다 라는 것을 함수로 뺀다.
//저장한 객체로 바로 할 것이니까, mainUrl만 들어가면 될듯?

function set_main_url() {
    let main_url = styleArgs.mainUrl;
    let para = ''
    $.each(styleArgs.paras, function (key, value) {

        if (value !== '') { // value가 빈 값이 아니면 고고
            para += key + '=' + value + '&'; // 더해질 때마다 and가 들어가면 되는데, 여기서 넣고 마지막에 빼주도록 한다.
        }

    });

    //마지막 문자 가져오기
    //console.log(str.charAt(str.length-1));
    //마지막 문자 자르기
    //console.log(str.slice(0,-1));
    //마지막 문자 자르기
    //console.log(str.substr(0, str.length -1));

    para = para.substring(0, para.length - 1); // 마지막에 &요소 지워준다.
    main_url += para; // main url에다가 parameter을 더해준다.
    $("#scheme_input").val(main_url);
}

/*
* $("#scheme_input").val(styleArgs.mainUrl);
* 그래서 여기의 mainUrl에 바로 들어가면 안 되고,
* 처음 style scheme 메뉴 진입시에는 아직 선택한 style이 없으니까 처음부터 보여주지는 않도록 했다.
* $("#scheme_input").val(main_url);
* 기본값을 바꿔주지 않았으니까 아직 들어가지는 않는다.
* 방식은 key(styleID), value 방식도 있고 여러가지가 있는데 일단 이렇게 진행하였다.
* 이전에 makeup scheme 이동시에는 이렇게 실습 해보았는데, 항목이 많지가 않아..
* */