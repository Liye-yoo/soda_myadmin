const sodaDomain = {go:'soda://go',studio:'soda://studio'};
let makeUpAttr = [];
function window_open(type,paraName,ele)
{
    const url = sodaDomain[type] + '?' + paraName + '=' + $(ele).val();
    window.open(url);
}
function add_makeup_attr(key, m_id, strength)
{
    // makeUPAttr array 에 makeup 정보 세가지 저장
    makeUpAttr.push({
        'key':$(key).val(), 'm_id':$(m_id).val(),
        'strength':$(strength).val()
    });
    render_makeup_attr();

}

function del_makeup_attr(i)
{
    makeUpAttr.splice(i,1);
    render_makeup_attr();
}
// makeUPAttr의 정보를 지우고 새 그려준다.
function render_makeup_attr()
{
    $('#id_makeup_attrs').empty();
    let htmls = '';

    makeUpAttr.forEach(function (ele,i){
        htmls += `<div class="attrs">
        <span>${ele['key']}</span>
        <span>${ele['m_id']}</span>
        <span>${ele['strength']}</span>
        <span class="del" onclick="del_makeup_attr(${i})">&nbsp;x</span>
    </div>`

    });
    $('#id_makeup_attrs').append(htmls);
    console.log(makeUpAttr);
}
// makeUpAttr 정보 루프로 url을 만들어준다.
function makeup_open()
{

    let url = sodaDomain['go'] + '?makeup=';
       makeUpAttr.forEach(function (ele,i){
        url += `${ele['key']}(${ele['m_id']},${ele['strength']})&`

    });
       let res = url.slice(0,-1);
    window.open(res);
}
