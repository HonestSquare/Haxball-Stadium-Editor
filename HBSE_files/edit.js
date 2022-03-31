// AtnNn's HBS Editor
//
// Copyright 2011 Etienne Laurin
// All rights reserved

var test_me;

// TODO:
// when looking for mirrors, segments aren't found
// cut/delete in mirror mode: delete enabled mirrors, save enabled directions list in snippet
// paste in mirror mode: paste in all enabled directions from snippet
// TODO: automatic mirroring of property edits
// TODO: snap curves and segments to same tangent as other curves and segments on the vertex
// TODO: add default values when completing
// TODO: remove property from object
// TODO: pasting a snippet with a segment whose vertex is not snipped should reconnect the segment with that vertex
// TODO: snap vertex to circle formed by tangents of its segments
// TODO: snap begin point of move,scale or rotate to disc, vertex or plane inside the selection
// TODO: snap end point of move, scale or rotate to objects and snap points outside the selection
// TODO: snap both points of other tool to snap points
// TODO: custom ui for each type or property
// TODO: window.onerror catch exceptions and log them on server
//
// TODO: initial position of players is wrong if there are planes involved
// TODO: lines in hockey stadium have different color and are dashed
// TODO: simple mode with only trait and color as properties (with a list of pre-made traits)
// TODO: sometimes the canvas or the stadium property page doesnt show. resizing the window fixes it
// TODO: after load, scroll the canvas_div to the center of the stadium
// TODO: full screen mode
// TODO: group and lock
// TODO: hover text on buttons and properties
// TODO: save stadium to local browser cache
// TODO: change layers
// TODO: set center tool for multiple selected curved segments
// TODO: add 'create trait', 'save trait' and 'load trait' button to properties tab's trait input box
// TODO: don't set properties if they ara the same in the trait
// TODO: anti-aliasing and zoom
// TODO: split segment at any point, and possibility to merge to adjacent points
// TODO: properties of stadium (including traits and background)
// TODO: color picker with palette of common haxball colors
// TODO: better source editor (highlighting, intergrated consistency check, color picker, autocompletion, etc..)
// TODO: comment and organise code
// TODO: import stadiums from hbr files
// TODO: don't use relative difference when moving.. snap the cursor to the object
// TODO: style the scrollbars to be like haxball
// TODO: edit traits
// TODO: color palette: clicking on color changes color of selection
// TODO: advanced tool for editing background
// TODO: there is a minimum to the visible height and width
// TODO: auto lift common properties as traits
// TODO: replace magic numbers with constants
// TODO: commmon x and y property for vertex.{x, y}, disc.pos and goal.{p0, p1}
// TODO: tool to swap vertices of a segment
// TODO: copy properties/paste properties


$('.btn-example').click(function(){
    var $href = $(this).attr('href');
    layer_popup($href);
});

function layer_popup(el){
    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    switch($el){
        case 'layer_lang': return openPop_lang($el);
        case 'layer_exit': return openPop_txtovs($el);
    }
}

function openPop_lang(el){
    el.find('button.button_lang_ko').click(function(){
        setLanguage("ko");
        //$('#table').fadeIn();
        //$('#table').show();
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut();
        return false;
    });

    el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });
}

function openPop_txtovs(el){
    el.find('button.button_yes').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 아니오
        return false;
    });
    el.find('button.button_no').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 아니오
        return false;
    });
    el.find('a.btn-layerYes').click(function(){
        confirm("yes");
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 예
        return true;
    });
    el.find('a.btn-layerNo').click(function(){
        confirm("no");
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 아니오
        return false;
    });
}

function closePop(el){              // 팝업 닫기
    $(el).fadeOut();
}

// 언어팩 선언
var currentLang;
var newLine = "\n";
$.lang = {};

//  한국어
$.lang.ko = {
    // 공통
    0: "HaxPuck(오프라인)",
    1: "v1.19(베타) " + newLine + "2022년 3월 18일 최종 업데이트",
    2: "언어를 선택하십시오",
    3: "알림", 4: "주의", 5: "경고",
    6: "Haxball Stadium Editor를 닫을까요?",
    7: "파일을 내보내는 도중 오류가 발생하였습니다. 나중에 다시 시도하십시오.",
    8: "오브젝트의 수가 너무 많아서 저장할 수 없습니다.",

    // 상단 퀵툴
    10: "게임 업데이트 페이지입니다.",
    11: "게임에 바로 접속할 수 있습니다. 맵 테스트를 위해 빠른 이동이 가능합니다.",
    12: "게임 소개 페이지입니다.",
    13: "전세계에 있는 커뮤니티 목록입니다.",
    14: "플래시 기반의 구버전으로 접속이 가능합니다. 단 호환성에 문제가 있을 수 있습니다.",
    15: "봇방을 생성할 수 있습니다. 코드는 기본적으로 제공하지 않으므로 코드 파일이 따로 있어야 합니다.",
    16: "버그 제보ㆍ문의",

    // 하단 퀵툴
    17: "실행 취소", 
    18: "다시 실행", 
    19: "복사", 
    20: "붙여넣기", 
    21: "지우기", 
    22: "모두 선택", 
    23: "선택 취소", 
    24: "선택 영역 반전", 
    25: "복사하여 붙여넣기", 
    26: "잘라내기", 

    // 우측 하단부 버튼
    30: "선택",     31: "회전",     32: "크기 조정",
    33: "세그먼트", 34: "버텍스",   35: "디스크",
    36: "골 영역",  37: "플레인",   38: "조인트",

    // 좌측 하단부 버튼
    40: "속성",         41: "도구",
    42: "거울 복사",    43: "미리 보기",
    44: "Find an Object by Index",

    // 경기장 이름
    50: "새 경기장",

    // 텍스트 모드 내부 버튼
    110: "텍스트 모드",
    111: "시각 모드", 112: "저장", 113: "모두 선택", 114: "모두 지우기", 115: "좌표 이동",
    120: "변경 내용을 저장하지 않고 시각 모드로 돌아가겠습니까?",
    121: "정말로 모든 내용을 지우겠습니까?",
    122: "찾아 갈 좌표 위치를 입력하세요.",
    123: "초과한 오브젝트의 수: ",

    // 도움말 내부 버튼
    130: "도움말",  131: "버전 정보",

    // 설정
    140: "설정",

    // 경기장 속성
    220: "경기장 속성",
    221: "일반",                    // --------------------------
    222: "스폰 거리 간격",
    223: "가로 × 세로",
    225: "가로 × 세로(카메라)",
    227: "최대 시야 너비",
    228: "저장 명령어",
    229: "카메라 시점",
    230: "백그라운드",              // --------------------------
    231: "테마",
    232: "가로 × 세로",
    234: "코너 반경", 235: "킥오프 반경",
    236: "색상",
    237: "기본", 238: "잔디", 239: "하키", 
    240: "플레이어 피직스",         // --------------------------
    241: "중력",
    242: "반경",
    243: "바운스",    244: "역질량",    245: "제동",
    246: "충돌 그룹",
    247: "가속",
    250: "플레이어 피직스(킥)",     // --------------------------
    251: "킥 가속",   252: "킥 제동",   253: "킥 강도",   254: "킥 반동",
    260: "디스크 피직스",           // --------------------------
    261: "중력",
    262: "반경",
    263: "바운스",    264: "역질량",    265: "제동",
    266: "색상",
    267: "충돌 마스크",   268: "충돌 그룹",
    269: "킥오프 초기화",
    
    270: "실험 기능",               // --------------------------
    271: "사용자 지정 색상",
    272: "색 미리보기 1", 273: "색 미리보기 2", 274: "색 미리보기 3", 275: "색 미리보기 4", 276: "색 미리보기 5",
    
    280: "환경 설정",               // --------------------------
    281: "언어 변경",
    282: "오브젝트 진단",
    283: "Object List",

    // 기타
    300: "열기", 301: "저장", 302: "닫기", 303: "내보내기",
    304: "예", 305: "아니오", 306: "취소", 307: "확인",
    310: "활성화", 311: "비활성화",
    315: "볼", 316: "플레이어",
    317: "최소", 318: "최대",

    // 언어
    400: "영어", 401: "한국어",

    // 속성 객체
    500: "바운스",
    501: "중력",
    502: "속도",
    503: "충돌 마스크",
    504: "충돌 그룹",
    505: "프리셋",
    506: "x", 
    507: "y",
    508: "0번째 버텍스", 
    509: "1번째 버텍스",
    510: "곡률",
    511: "곡률F",
    512: "충돌 방향",
    513: "시각화",
    514: "색상",
    515: "방향 벡터",
    516: "거리",
    517: "반경", 
    518: "역질량",
    519: "좌표",
    520: "0번째 좌표", 
    521: "1번째 좌표",
    522: "팀",
    523: "제동",
    524: "0번째 디스크",
    525: "1번째 디스크",
    526: "길이",
    527: "강도",

    600: "선택할 대상을 클릭하여 선택하십시오."
    + newLine + "여러 개를 선택하려면 Shift를 누른 상태에서 클릭하십시오."
    + newLine + "여러 개를 선택하려면 클릭한 상태에서 드래그하십시오."
    + newLine + "곡선을 그리려면 세그먼트를 클릭한 상태에서 끌고 가십시오."
    + newLine + "돌리려면 클릭하고 드래그하여 이동하십시오."
    + newLine + "이동하려면 세그먼트를 클릭하여 선택한 다음 버텍스를 끌어다 놓으십시오.",
    610: "회전 중심을 배치하려면 클릭하십시오."
    + newLine + "대상을 회전하려면 클릭하고 드래그 하십시오.",
    620: "크기 조정점을 배치하려면 클릭하십시오."
    + newLine + "크기를 조정하거나 변경하려면 클릭하고 드래그 하십시오."
    + newLine + "몇몇 오브젝트는 조절이 잘 되지 않습니다."
    + newLine + "디스크와 곡선 세그먼트는 수직 또는 수평으로 스케일을 조절할 때 타원형 모양으로 두는 게 균형이 맞습니다."
    + newLine + "Haxball이 타원을 지원하지 않아서 형태를 정확하게 맞춰야 합니다."
    + newLine + "디스크는 크기 조정했을 때 균형적인 영역을 가집니다."
    + newLine + "곡선 세그먼트는 첫 번째 점에서 동일한 접선을 유지합니다."
    + newLine + "세그먼트, 버텍스, 플레인은 완벽하게 조정됩니다.",
    630: "세그먼트는 두 버텍스를 연결합니다. 장식이나 벽으로 쓸 수 있습니다."
    + newLine + "세그먼트를 추가하려면 클릭하고 드래그 하십시오."
    + newLine + "세그먼트를 연결하려면 양끝의 두 버텍스를 클릭하십시오.",
    640: "버텍스는 특별한 속성을 가질 수 있는 꼭짓점입니다."
    + newLine + "버텍스를 배치하려면 클릭하십시오.",
    650: "디스크는 움직일 수있는 공과 플레이어를 제외한 유일한 오브젝트입니다."
    + newLine + "장식으로 꾸미거나 다른 오브젝트와 충돌시킬 수 있습니다."
    + newLine + "임의의 크기로 디스크를 생성하려면 클릭하고 드래그 하십시오.."
    + newLine + "임의의 크기로 디스크를 생성하려면 클릭하고 드래그 하십시오.",
    660: "골 영역에 디스크가 들어가면 상대팀이 득점을 얻습니다."
    + newLine + "골 영역을 배치하려면 클릭하고 드래그 하십시오."
    + newLine + "레드팀은 왼쪽, 블루팀은 오른쪽에 두는 게 일반적입니다."
    + newLine + "레드팀과 블루팀의 골 영역에 골이 판정되면 각각 블루팀과 레드팀이 득점합니다.",
    670: "플레인은 길이 제한이 없는 투명한 벽입니다."
    + newLine + "플레인을 배치하려면 클릭하십시오. 경기장 중앙을 향합니다.",
    680: "Joints are physical connections between two Discs."
    + newLine + "joint_content.",
    681: "반전 복사 기능입니다.",
    682: "게임 플레이에 보이는 맵의 모습입니다.",

    700: "오브젝트의 튕김 수준입니다.",
    701: "gravity", 
    702: "디스크의 초기 속도입니다. 기본값은 (0, 0) 입니다.",
    703: "대상이 충돌하는 그룹 목록입니다."
    + newLine + "플레이어, 공은 \"ball, red, blue, wall\"의 마스크를 가지고 있습니다."
    + newLine + "레드팀 킥오프 중에 모든 플레이어는 \"redKO\"라는 추가적인 충돌 마스크(cMask)를 갖습니다."
    + newLine + "블루팀 킥오프 중에 모든 플레이어는 \"blueKO\"라는 추가적인 충돌 마스크(cMask)를 갖습니다.",
    704: "오브젝트가 속한 그룹입니다."
    + newLine + "ball - the puck"
    + newLine + "red - 레드팀 플레이어"
    + newLine + "blue - 블루팀 플레이어"
    + newLine + "wall - 벽입니다."
    + newLine + "redKO - 레드팀 킥오프 벽입니다."
    + newLine + "blueKO - 레드팀 킥오프 벽입니다."
    + newLine + "all - 특별한 역할은 없는 임의의 속성입니다."
    + newLine + "c0~c3 - 특별한 역할은 없는 임의의 속성입니다.",
    705: "오브젝트 공통 속성입니다.", 
    706: "x축, 가로 위치입니다.",
    707: "y축, 세로 위치입니다.",
    708: "Index of a vertex in the stadium vertex list to be used as first point of the segment.", 
    709: "Index of a vertex in the stadium vertex list to be used as the second point of the segment.", 
    710: "세그먼트의 곡선 각도입니다. -340~340의 범위에서 수치값을 입력할 수 있습니다.",
    711: "세그먼트의 곡률을 대체하는 속성입니다. 값이 있으면 기존의 곡률 값은 무시됩니다.",
    712: "값에 따라 세그먼트가 충돌 처리 방향이나 세그먼트의 두께를 결정합니다.",
    713: "오브젝트를 보이거나 숨길 수 있습니다.",
    714: "세그먼트와 디스크의 색상입니다. 16진수 헥스 코드로 값을 줄 수 있습니다.",
    715: "플레인이 향하는 방향입니다.",
    716: "맵 중앙을 기준으로 한 거리입니다.",
    717: "디스크의 반지름입니다.",
    718: "디스크의 역질량입니다. 값이 0이면 움직이지 않습니다."
    + newLine + "값을 높일수록 디스크의 무게가 가벼워집니다."
    + newLine + "값이 0 미만으로 둘 때는 주의가 필요합니다."
    + newLine + "디스크의 기본값은 0입니다.",
    719: "디스크의 중심 x, y 좌표입니다.",
    720: "골대 한 쪽 끝의 좌표입니다.",
    721: "골대 반대쪽 끝의 좌표입니다.",
    722: "레드팀, 블루팀. 이렇게 두 팀밖에 없는데 뭘 바라세요?",
    723: "디스크의 감속률입니다. 1은 감속이 없으며, 기본값은 0.99입니다.",
    724: "Index of one of the two discs connected by the joint.", 
    725: "Index of one of the two discs connected by the joint.", 
    726: "조인트의 길이입니다.",
    727: "strength makes that the joint acts like a solid or spring.",
    
    822: "두 팀이 경기장 중앙에서 얼마나 멀리 떨어져야 할까요?",
    823: "경기장의 크기입니다.",
    824: "레드팀 킥오프에 사용하는 스폰 지점 목록입니다.",
    826: "블루팀 킥오프에 사용하는 스폰 지점 목록입니다.",
    827: "최대 너비의 정도입니다."
    + newLine + "플레이시 화면이 최대 시야 너비의 값보다 넓으면, 화면도 거기에 맞게 확대됩니다.",
    828: "게임 내 명령어 활성화 여부를 설정합니다.",
    829: "카메라가 향할 시점을 지정합니다.",
    831: "백그라운드 테마입니다.",
    832: "백그라운드 크기입니다.",
    847: "일반적으로 움직일 때의 가속도입니다.",
    851: "킥 상태에서의 가속입니다.",
    852: "킥 상태에서의 제동입니다.",
    853: "킥 상태에서의 강도입니다.",
    869: "\"최대\" or \"최소\"로 지정할 수 있습니다.",

    // 도움말 세부
    1000: "소스 코드", 1001: "정보", 1002: "업데이트 내역", 
    1003: "HaxPuck의 소스 코드는 github에서 사용할 수 있습니다.",
    1100: "저장",
    1101: "내보내기 버튼으로 맵을 파일로 저장할 수 있습니다.",
    1200: "도구",
    1201: "한 맵에 최대 255개까지의 오브젝트를 둘 수 있습니다." + newLine + "괄호 안은 단축키입니다.",
    1300: "속성 편집기",
    1301: "특정 대상을 선택하면 해당 공통 속성이 왼쪽 하단의 속성 탭에 나열됩니다."
    + newLine + "여기서 하나가 바뀌면 선택된 대상 모두에 적용됩니다."
    + newLine + "새로 만들어진 오트젝트의 속성은 해당 대상에 적용됩니다.",
    1400: "속성",
    1500: "상단 퀵툴",
    1501: "상단 퀵툴을 통해 맵 테스트를 위해 게임에 바로 접속하거나 버그 제보 및 문의도 할 수 있습니다.",
    1550: "하단 퀵툴",
    1551: "하단 퀵툴을 통해 빠른 작업 동작이 가능합니다." + newLine + "괄호 안은 단축키입니다.",
    1600: "키보드 단축키",
    1601: "일부 웹 브라우저 플러그인은 단축키와 호환되지 않습니다.",
    1700: "텍스트 모드",
    1701: "텍스트 편집기는 어떻게 보면 메모장보다 간단하지만, Haxball Statium Editor만의 특장점을 지니고 있습니다.",
    1702: "코드는 쉽게 편집할 수 있도록 포맷되어 있습니다."
    + newLine + "버텍스는 주석으로 번호를 달았습니다."
    + newLine + "시각 모드에서 선택한 개체는 코드에 표시됩니다."
    + newLine + "텍스트 모드를 사용하면 시각 모드에서 맵을 바로 미리 볼 수 있습니다."
    + newLine + "좌표 찾기를 통해 빠르게 코드 위치를 찾을 수 있습니다.",
    1800: "경기장 속성",
    1801: "괄호 안은 기본값입니다.",
    1900: "요구사항",
    1901: "Haxball Stadium Editor는 구글 크롬과 그 외 비슷한 여타 최신 브라우저도 작동합니다.",
    1902: "HaxBall은 basro가 개발한 온라인 멀티플레이 게임입니다.",

    // 업데이트 내역
    // 2011.12.19
    2070: "Fixed many bugs" + newLine + "Added more information in the help file." + newLine + "Added Automatic Mirror Mode" + newLine + "Switched to HaxPuck.com",
    // 2011.12.29
    2080: "New parameters from the official HaxBall update" + newLine + "User accounts" + newLine + "Save button" + newLine + "Download Button" + newLine + "Library" + newLine + "Fixed some bugs",
    // 2012.02.02
    2090: "Order keys in text mode",
    // 2019-08-09 
    2100: "2019-08-09 업데이트",
    2101: "haxpuck.com이 만료되었습니다. 계정 및 라이브러리는 더 이상 사용이 불가합니다." + newLine + "기반 버전은 2012-02-02입니다.",
    2102: "본 업데이트는 여기서 쓸 수 있습니다.",
    2103: "이 에디터는 AtnNm 원작인 AtnNn's Haxball Stadium Editor에서 2차 수정하였습니다.",
    // (2019-03-23) v1.04 
    2111: "상단 바로가기 창이 제거되었습니다. " + newLine + "로그인 및 회원가입이 이제 더 이상 작동되지 않습니다. " + newLine + "테마가 업데이트되었습니다. " + newLine + "Haxball Stadium Editor가 한국어를 지원합니다.",
    // (2019-03-23) v1.05 
    2121: "[속성] → [백그라운드] → [색상] 기능이 추가되었습니다. " + newLine + "[텍스트 모드]에서 [시각 모드]로 돌아갈 때 메시지가 추가되었습니다. " + newLine + "[편집] → [사본]의 명칭을 [복사하여 붙여넣기]로 변경되었습니다. " + newLine + "일부 번역이 개선되었습니다. " + newLine + "상단에 haxball UseMap cafe 바로가기 아이콘이 추가되었습니다.",
    // (2019-03-24) v1.06 
    2131: "디자인이 개선되었습니다.", 2132: "편집 탭의 위치가 하단으로 조정되었습니다. " + newLine + "속성 탭이 작동되지 않던 문제가 해결되었습니다. " + newLine + "일부 번역이 개선되었습니다.",
    // (2019-03-30) v1.07 
    2141: "[속성] > [백그라운드] > [최대 시야 너비] 기능이 추가되었습니다. " + newLine + "[속성] > [백그라운드] > [카메라 시점] 기능이 추가되었습니다. " + newLine + "[속성] > [백그라운드] > [테마]에서 [잔디] 또는 [하키]로 설정했을 때 맵이 공백으로 뜨는 문제가 해결되었습니다. " + newLine + "일부 번역이 개선되었습니다.",
    // (2019-04-06) v1.08 
    2151: "상단바를 HaxBall과 유사하게 개편 및 추가되었습니다. " + newLine + "작업대 아이콘이 추가되었습니다. " + newLine + "일부 번역이 개선되었습니다.",
    // (2019-04-13) v1.09 
    2161: "[도움말] > [파일 추출하기] 목록이 추가되었습니다. " + newLine + "[도구] > [미리보기]의 팀 색상이 일부 조정되었습니다. " + newLine + "[버그 제보ㆍ문의]의 경로가 이전되었습니다. " + newLine + "[속성]의 작업 목록이 이중으로 나오던 문제가 해결되었습니다.",
    // (2019-05-04) v1.10 
    2171: "상단 퀵툴에 [HaxBall 호스트]가 추가되었습니다. " + newLine + "도움말이 갱신되었습니다. " + newLine + "Google Chrome에서 일부 버튼이 잘리는 문제가 해결되었습니다. " + newLine + "일부 번역이 개선되었습니다.",
    // (2019-05-11) v1.11 
    2181: "[상단 퀵툴]에 아이콘이 추가되었습니다. " + newLine + "[경기장 속성]에 실험 기능 탭이 추가되었습니다. " + newLine + "[도움말]이 갱신되었습니다. " + newLine + "도움말 UI가 개선되었습니다. " + newLine + "[버그 제보ㆍ문의]의 경로가 이전되었습니다. " + newLine + "일부 번역이 개선되었습니다.", 
    // (2019-06-06) v1.12 
    2191: "커서 드래그 색상이 변경되었습니다.",
    // (2019-07-29) v1.13 
    2201: "[속성] > [일반]에서 [카메로 세로], [카메라 가로], [maxViewWidth], [저장 명령어]가 추가되었습니다. " + newLine + "충돌 마스크(cMask) 및 충돌 그룹(cGroup)에 일부 지원 기능이 추가되었습니다." + newLine + "-kick, score, c0, c1, c2, c3" + newLine + "도움말이 일부 업데이트되었습니다.",
    // (2019-11-02) v1.14
    2211: "[속성] > [플레이어 피직스]에서 [반경]이 추가되었습니다." 
    + newLine + "[속성] > [플레이어 피직스]에서 [킥 반동]이 추가되었습니다." 
    + newLine + "[속성] > [플레이어 피직스]에서 [중력]이 추가되었습니다." 
    + newLine + "[속성] > [디스크 피직스]에서 [중력]이 추가되었습니다." 
    + newLine + "[도구] > [오토메틱 미러]에서 아이콘이 추가되었습니다." 
    + newLine + "[도구] > [미리보기]에서 아이콘이 추가되었습니다." 
    + newLine + "[텍스트 모드] > [지우기]가 [모두 지우기]로 변경되었습니다." 
    + newLine + "[텍스트 모드] > [모두 지우기]를 클릭했을 때 경고 창이 추가되었습니다." 
    + newLine + "[상단 퀵툴] > [버그 제보ㆍ문의]에서 아이콘이 변경되었습니다.",
    // (2019-12-28) v1.15
    2221: "[상단 퀵툴] > [정보]가 추가되었습니다." 
    + newLine + "[상단 퀵툴] > [커뮤니티]가 추가되었습니다." 
    + newLine + "[상단 퀵툴] > [플레이(플래시)]가 추가되었습니다." 
    + newLine + "[상단 퀵툴]의 일부 탭의 아이콘이 변경되었습니다." 
    + newLine + "[상단 퀵툴]의 목록 정렬을 통해 시인성이 개선되었습니다." 
    + newLine + "[도움말]이 갱신되었습니다." 
    + newLine + "일부 항목에 연결된 링크가 갱신되었습니다." 
    + newLine + "일부 번역이 개선되었습니다.",
    // (2020-02-06) v1.16
    2231: "곡률(curveF) 기능이 추가되었습니다." 
    + newLine + "충돌 방향(bias) 기능이 추가되었습니다." 
    + newLine + "중력의 값을 소수점까지 입력하지 못하던 문제가 개선되었습니다." 
    + newLine + "[도움말]이 갱신되었습니다." 
    + newLine + "일부 항목에 연결된 링크가 갱신되었습니다." 
    + newLine + "일부 번역이 개선되었습니다.",
    // (2022.02.06) v1.17
    2241: "미리보기 기능이 개선되었습니다."
    + newLine + "파일 저장 기능이 추가되었습니다."
    + newLine + "[설정]이 추가되었습니다."
    + newLine + "[속성] > [일반] > [킥오프 초기화]가 추가되었습니다."
    + newLine + "[속성] > [백그라운드] > [색상] 값에 따라 미리보기도 적용되는 구조가 추가되었습니다."
    + newLine + "[속성] > [일반]에서 [저장 명령어]가 작동되지 않던 문제가 해결되었습니다."
    + newLine + "[속성]에서 [중력] 값을 편집할 수 없었던 문제가 해결되었습니다."
    + newLine + "일부 상황에서 창 크기를 조절하면 불필요하게 여백이 생기던 문제가 해결되었습니다."
    + newLine + "가독성 및 시인성이 개선되었습니다."
    + newLine + "전반적인 인터페이스가 개선되었습니다."
    + newLine + "일부 번역이 개선되었습니다.",
    // (2022.02.15) v1.18
    2251: "[텍스트 모드]에서 [내보내기] 버튼이 추가되었습니다."
    + newLine + "[텍스트 모드] 진입 직후 곧바로 [시각 모드] 버튼을 클릭하면 불필요한 알림이 뜨던 구조가 개선되었습니다."
    + newLine + "세그먼트가 특정 상황에서 색상이 올바르지 않게 나오던 문제가 해결되었습니다.",
    // (2022.03.18) v1.19
    2261: "상태 표시줄 최소화 기능이 추가되었습니다."
    + newLine + "[도움말]이 갱신되었습니다."
    + newLine + "마우스를 드래그 할 때 표시되는 선택 박스의 시인성이 향상되었습니다."
    + newLine + "사용성이 향상되었습니다.",
};
//  영어
$.lang.en = {
    // Common
    0: "HaxPuck(OFFLINE)",
    1: "v1.19(Beta); " + newLine + "This software was updated on 18th Mar, 2022",
    2: "Select your language",
    3: "Confirm", 4: "Alert", 5: "Warning",
    6: "Are you sure want to leave from HBSE?",
    7: "Error during exporting process of the file. Please try again later.",
    8: "Failed to save the file due to too many objects!",

    // Top quick-tool
    10: "the game version update page.",
    11: "You can access the game right away. Fast movement is possible for map testing.",
    12: "the game introduction page.",
    13: "a community list page around the world.",
    14: "an old version based on flash. do not visit this even though if you got a curse that must have no web browsers except IE on your PC.",
    15: "a page where you can run a script with Headless Host. to host a script, you need a separate file as Code is not provided by HBS.",
    16: "Report a bug",

    // Bottom qiuck-tool
    17: "UNDO", 
    18: "REDO", 
    19: "COPY", 
    20: "PASTE", 
    21: "DELECT", 
    22: "SELECT ALL", 
    23: "SELECT NONE", 
    24: "INVERT SELECTION", 
    25: "DUPLICATE", 
    26: "CUT",

    // 우측 하단부 버튼
    30: "Select",   31: "Rotate",   32: "Sclae",
    33: "Segment",  34: "Vertex",   35: "Disc",
    36: "Goal",     37: "Plane",    38: "Joint",

    // 좌측 하단부 버튼
    40: "Properties",          41: "Tools",
    42: "Automatic Mirror",    43: "Preview",
    44: "Find an Object by Index",

    // a name of defalut stadium
    50: "New Stadium",

    // in Text Mode
    110: "Text Mode",
    111: "Visual Mode", 112: "Save", 113: "Select All", 114: "Clear All", 115: "Goto Character",
    120: "Are you sure want to back to visual mode without saving?",
    121: "Clear all data?",
    122: "Character Position?",
    123: "Overflowed: ",

    // 도움말 내부 버튼
    130: "Help",  131: "Info",

    // Settings
    140: "Settings",

    // Stadium Properties
    220: "Stadium Properties",
    221: "General",                // --------------------------
    222: "Spawn Distance: ",
    223: "Height × Width: ",
    224: "redSpawnPoints: ",
    225: "H × W(Camera): ",
    226: "blueSpawnPoints: ",
    227: "maxViewWidth: ",
    228: "CanBeStored: ",
    229: "CameraFollow: ",
    230: "Background",             // --------------------------
    231: "Type: ",
    232: "Height × Width: ",
    234: "Corner Radius: ", 235: "Kick-off Radius: ",
    236: "Color: ",
    237: "None", 238: "Glass", 239: "Hockey", 
    240: "Player Physics",         // --------------------------
    241: "Gravity",
    242: "Radius",
    243: "Bounce",    244: "Inverse Mass",    245: "Damping",
    246: "Collision Group",
    247: "Acceleration: ",
    250: "Player Physics(Kick)",   // --------------------------
    251: "Kicking Acceleration",   252: "Kicking Damping",   253: "Kick Strength",   254: "Kickback",
    260: "Ball Physics",           // --------------------------
    261: "Gravity",
    262: "Radius",
    263: "Bounce",    264: "Inverse Mass",    265: "Damping",
    266: "Color",
    267: "Collision Mask",   268: "Collision Group",
    269: "kickOffReset",
    
    270: "Lab+",       // --------------------------
    271: "Custom Color",
    272: "#1: ", 273: "#2: ", 274: "#3: ", 275: "#4: ", 276: "#5: ", 
    
    280: "Preferences",               // --------------------------
    281: "Change language",
    282: "Object diagnosis",
    283: "Object List",

    // ETC
    300: "Open", 301: "Save", 302: "Close", 303: "Download",
    304: "Yes", 305: "No", 306: "Cancel", 307: "OK",
    310: "Enable", 311: "Disable",
    315: "Ball", 316: "Player",
    317: "Partial", 318: "Full",

    // Languages
    400: "English", 401: "Korean",

    // Indexs of Properties
    500: "bCoef", 
    501: "gravity", 
    502: "speed",
    503: "cMask", 
    504: "cGroup", 
    505: "trait", 
    506: "x", 
    507: "y", 
    508: "v0", 
    509: "v1", 
    510: "curve", 
    511: "curveF", 
    512: "bias", 
    513: "vis", 
    514: "color", 
    515: "normal", 
    516: "dist", 
    517: "radius", 
    518: "invMass", 
    519: "pos", 
    520: "p0", 
    521: "p1", 
    522: "team", 
    523: "damping",
    524: "d0", 
    525: "d1", 
    526: "length", 
    527: "strength",

    600: "Click on objects to select them."
    + newLine + "Shift-click to select multiple objects."
    + newLine + "Click and drag to select multiple objects."
    + newLine + "Click and drag on segments to curve them."
    + newLine + "Click and drag on selected objects to move them around."
    + newLine + "To move segment, first click on it to select it, then drag its vertices.",
    610: "Click to place the center of rotation."
    + newLine + "Click and drag to rotate the selected objects.",
    620: "Click to place the center of transformation."
    + newLine + "Click and drag to scale or flip the selected objects."
    + newLine + "Some types of objects do not scale well."
    + newLine + "Ideally, discs and curved segments become oval-shaped when scaled vertically or horizontally."
    + newLine + "Haxball does not support ovals, so their image needs to be approximated."
    + newLine + "A scaled disc will have the same area as it's ideal oval."
    + newLine + "A curved segment will keep the same tangent on it's first point."
    + newLine + "Segments, vertices, planes and goals scale perfectly.",
    630: "A segment connects two vertices. They can be used as decorations or as walls."
    + newLine + "Click and drag to create segments."
    + newLine + "Click on existing vertices to connect segments to them.",
    640: "A vertex is a point on the stadium that can have special properties."
    + newLine + "Click to place a new vertex.",
    650: "Discs are the only object apart from the puck and the players that can be made to move."
    + newLine + "They can be used as decorations or be allowed to collide with other objects."
    + newLine + "Click to create normal-sized discs."
    + newLine + "Click and drag to create custom-sized discs.",
    660: "When the puck crosses a goal, the opposite team scores a point."
    + newLine + "Click and drag to place a goal."
    + newLine + "Left side goals will start out red, right side goals will start out blue."
    + newLine + "Blue players score in the red goal, and vice-versa.",
    670: "Planes are invisible walls of infinite length."
    + newLine + "Click to place a plane. The plane will face the center of the stadium (it will have a negative dist).",
    680: "Joints are physical connections between two Discs."
    + newLine + "joint_content.",
    681: "Most edits are mirrored horizontally and vertically to help design symmetrical stadiums.",
    682: "Preview the stadium without any invisible shapes.",

    700: "How much bounce an object has."
    + newLine + "Officially, this is a number between 0 and 1. Values below 0 and above 1 can also be used with care (and haxketball nets)."
    + newLine + "The standard value for walls is 1."
    + newLine + "The standard value for goal nets is 0.1.",
    701: "gravity", 
    702: "The initial speed of a disc. The default value is 0,0.",
    703: "A list of groups that the object collides with."
    + newLine + "The puck and the players have a cMask of \"ball, red, blue, wall\"."
    + newLine + "During a red kick-off, all players have an additional cMask of \"redKO\"."
    + newLine + "During the blue kick-off, all players have an additional cMask of \"blueKO\".",
    704: "The groups that an object belongs to"
    + newLine + "ball - the puck"
    + newLine + "red - red players"
    + newLine + "blue - blue players"
    + newLine + "wall - walls"
    + newLine + "redKO - kick-off barriers for red's kick-off"
    + newLine + "blueKO - kick-off barriers for blue's kick-off"
    + newLine + "all - all of the above"
    + newLine + "c0 to c3 - Has no special meaning and can be used for any purpose.",
    705: "A named set of properties common to many objects.", 
    706: "The horizontal position of a vertex.", 
    707: "The vertical position of a vertex.", 
    708: "Index of a vertex in the stadium vertex list to be used as first point of the segment.", 
    709: "Index of a vertex in the stadium vertex list to be used as the second point of the segment.", 
    710: "The angle (in degrees) at which a segment curves. Possible values are between -340 and 340.",
    711: "Alternative representation of the segment's curve. If this value is present the curve value will be ignored.",
    712: "The bias can be useful to create boundaries that small and fast moving balls are unable to pass through.",
    713: "true or false. Is this object visible?",
    714: "The color of segments and discs. Specified as a 6-character hexidecimal string.", 
    715: "The direction faced by a plane.",
    716: "The distance of a plane from the center of the stadium. When it is positive, it keeps objects away from the center."
    + newLine + "When it is negative it keeps object close to the center.",
    717: "The half-size of a disc.",
    718: "The inverse mass of an disc. 0 means that the disc doesn't move."
    + newLine + "The higher the invMass, the lighter the disc."
    + newLine + "Values below 0 are possible but must be used with care (and bobsleds)."
    + newLine + "The default for discs is 1.",
    719: "The x and y coordinates of the center of a disc.",
    720: "The coordinates of one end of a goal.",
    721: "The coordinates of the other end of a goal.",
    722: "The team whose goal it is, either blue or red.",
    723: "The deceleration rate of a disc. 1 means no deceleration. The default value is 0.99.",
    724: "Index of one of the two discs connected by the joint.", 
    725: "Index of one of the two discs connected by the joint.", 
    726: "the length of the joint.",
    727: "strength makes that the joint acts like a solid or spring.",
    
    822: "How far to the right and left of the center should the players start?",
    823: "The half size of the stadium.",
    824: "List of spawn points used for the red team kickoff.",
    826: "List of spawn points used for the blue team kickoff.",
    827: "The maximum allowed width viewable width for the level." 
    + newLine +"If the player screen were wide enough for him to see more width than maxViewWidth then the the game will zoom in to prevent that.",
    828: "This value defines whether this stadium can be stored with the /store command.",
    829: "Changes the camera following behaviour.",
    831: "The style of backgroud to use, either grass or hockey.",
    832: "The half size of the background.",
    847: "Acceleration when moving normally.",
    851: "Acceleration when trying to kick.",
    852: "Damping while trying to kick.",
    853: "Strength of kicks.",
    869: "Can be set to either \"full\" or \"partial\".",

    // Help contents
    1000: "Source Code", 1001: "About", 1002: "What's new",
    1003: "The source code for HaxPuck is available on github.",
    1100: "Save",
    1101: "The Download button allows you to download the stadium to your computer.",
    1200: "Tools",
    1201: "A stadium can have a maximum of 255 of each type of object." + newLine + "numbers in parenthesis represent the keyboard shortcut.",
    1300: "Property Editor",
    1301: "When objects are selected, their common properties are listed in the properties tab on the bottom left."
    + newLine + "When one of these properties is changed, it will be applied to all the selected objects."
    + newLine + "When a new object is created, the properties will be applied to it.",
    1400: "Properties",
    1500: "Top quick-tool",
    1501: "Some actions may need a process via this bar.",
    1550: "Bottom quick-tool",
    1551: "Some actions may need a process via this bar." + newLine + "numbers in parenthesis represent the keyboard shortcut.",
    1600: "Keyboard Shortcuts",
    1601: "Some browser plugins are not compatible with keyboard shortcuts.",
    1700: "Text Mode",
    1701: "The text editor is simpler than notepad in some ways, but has some HBS-specific features.",
    1702: "The code is formatted for easy editing."
    + newLine + "Vertexes are annotated with their index number."
    + newLine + "Objects selected in the visual editor are marked in the code."
    + newLine + "The Import button lets you instantly preview your stadium in the visual editor."
    + newLine + "The Goto Character button allows you to quickly find a position in the file. This can be the position of an error reported by Haxball.",
    1800: "Stadium Properties",
    1801: "Default Values are in parenthesis.",
    1900: "Requirements",
    1901: "This editor works in Google Chrome and possibly other modern browsers.",
    1902: "HaxBall is an online multiplayer game created by basro.",

    // 2011.12.19
    2070: "Fixed many bugs" + newLine + "Added more information in the help file." + newLine + "Added Automatic Mirror Mode" + newLine + "Switched to HaxPuck.com",
    // 2011.12.29
    2080: "New parameters from the official HaxBall update" + newLine + "User accounts" + newLine + "Save button" + newLine + "Download Button" + newLine + "Library" + newLine + "Fixed some bugs",
    // 2012.02.02
    2090: "Order keys in text mode",
    // Update Notes
    2100: "Update 2019-08-09",
    2101: "haxpuck.com has expired. Accounts and libraries are no longer available." + newLine + "This is the version released on 2012-02-02.",
    2102: "the Update is now available here.",
    2103: "This Editor edited by HonestSquare from AtnNn\'s Haxball Stadium Editor created by AtnNn.",
    // v1.04(2019-03-23) 
    2111: "Removed the top shortcut window. " + newLine + "Accounts and libraries are no longer available " + newLine + "Updated theme.",
    // v1.05(2019-03-23) 
    2121: "Added [color] of [Background] in [Stadium Properties]." + newLine + "Added a confirm when [Visual Mode] button selected in [Text Mode].",
    // v1.06(2019-03-24) 
    2131: "Enhanced GUI.", 2132: "Improved some structures." + newLine + "Fixed a problem that [Properties] did not working.",
    // v1.07(2019-03-30) 
    2141: "Added [maxViewWidth] of [Background] in [Stadium Properties]." + newLine + "Add [CameraFollow] of [Background] in [Stadium Properties]." + newLine + "Fixed a problem that nothing was shown in [Visual Mode] after [Type] of [Background] in [Stadium Properties] applies the value: [Grass] or [Hockey].",
    // v1.08(2019-04-06) 
    2151: "Enhanced GUI as HaxBall." + newLine + "Add all actions' icons of [Bottom quick-tool].",
    // v1.09(2019-04-13) 
    2161: "Add the content of [How to Export a File] in [Help]. " + newLine + "changed team colors when [Preview] is activating in [Tools]." + newLine + "Fixed a problem that the [Stadium Properties] window shows double.",
    // v1.10(2019-05-04) 
    2171: "Added a shortcut links Headless Host in [Top quick-tool]." + newLine + "Updated contents of [Help]." + newLine + "Fixed a problem that a glitch causes in Google Chrome.",
    // v1.11(2019-05-11) 
    2181: "Added icons of shortcuts in [Top quick-tool]." + newLine + "Added [Lab+] in [Stadium Properties]. " + newLine + "Updated contents of [Help].", 
    // v1.12(2019-06-06) 
    2191: "Selection Box has applied the new color.",
    // v1.13(2019-07-29) 
    2201: "Added [H × W(Camera)] and [CanBeStored] of [General] in [Stadium Properties]." + newLine + "Added new flags of cMask and cGroup:" + newLine + "-kick, score, c0, c1, c2, c3" + newLine + "Updated contents of [Help].",
    // v1.14(2019-11-02)
    2211: "Added [radius] in [Player Physics] of [Stadium Properties]."
    + newLine + "Added [Kickback] of [Player Physics] in [Stadium Properties]." 
    + newLine + "Added [Gravity] of [Player Physics] in [Stadium Properties]." 
    + newLine + "Added [Gravity] of [Disc Physics] in [Stadium Properties]." 
    + newLine + "Added an icon of [Automatic Mirror] in [Tools]." 
    + newLine + "Added an icon of [Preview] in [Tools]."
    + newLine + "Added pop-up on click [Clear All] button in [Text Mode].",
    // v1.15(2019-12-28)
    2221: "Added [About] in [Top quick-tool]." 
    + newLine + "Added [Community] in [Top quick-tool]." 
    + newLine + "Added [Flash] in [Top quick-tool]." 
    + newLine + "Updated contents of [Help].",
    // v1.16(2020-02-06)
    2231: "Added curveF from properties" 
    + newLine + "Added bias from properties."
    + newLine + "Fixed the bug that could not input the value of gravity to decimal point." 
    + newLine + "Updated contents of [Help].",
    // v1.17(2022.02.06)
    2241: "Enhanced Preview feature"
    + newLine + "Added Download feature that save stadium data to export a file into Local Storage."
    + newLine + "Added Settings menu."
    + newLine + "Added [kickOffReset] of [General] in [Stadium Properties]."
    + newLine + "Added a structure that background color applying as by the value of [Color] of [Background] in [Stadium Properties] automatically."
    + newLine + "Fixed a problem that [canBeStored] of [General] in [Stadium Properties] did not working."
    + newLine + "Fixed a problem that the value of [Gravity] in [Stadium Properties] won't edit or sync."
    + newLine + "Fixed a problem that needless margin had been appeared during a window resize in some situations."
    + newLine + "enhanced readability/visibility."
    + newLine + "the new enhanced UI is now available.",
    // (2022.02.15) v1.18
    2251: "Add [download] button in [Text Mode]."
    + newLine + "Fixed a problem that a confirm window always shown at every time when you try to open [Visual Mode] in [Text Mode]."
    + newLine + "Fixed a problem that a segment couldn't render some color.",
    // (2022.03.18) v1.19
    2261: "Added a feature minimize a Status Window."
    + newLine + "Updated contents of [Help]."
    + newLine + "Updated a Mouse Selection Box."
    + newLine + "Enchaned and Improved UX.",
};

/**
* setLanguage 
* use $.lang[currentLanguage][languageNumber]
*/

function setLanguage(currentLanguage) {
    console.log('setLanguage', arguments);
    if(currentLanguage == "ko")
        $('#umIntro').removeClass('hidden');
    else
        $('#umIntro').addClass('hidden');
    
    $('[data-langNum]').each(function() {
      var $this = $(this); 
      $this.html($.lang[currentLanguage][$this.data('langnum')]); 
    });
    currentLang = currentLanguage;
}  

// 언어 변경
//$('button').click(function() {
//    setLanguage($(this).data('lang'));
//});

// 팝업 창 내용 변경
function setContext(str){
    let dialog = document.getElementById("dialog_context");
    if(!str) return false;
    dialog.innerText = $.lang[getLang()][str];
    return true;
}

// DEBUG
console={log:function(){}};
function tracef(name, f){
    return function(){
        var ret = f.apply(this, arguments);
        console.log(name, arguments, ret);
        return ret;
    };
}

//===== Config Variables
// extra border around the stadium inside the canvas
var margin = 0;

// minimum distance before a click becomes a drag
var minimum_drag_distance = 4;

// maximum distance from which an object can be clicked
var maximum_click_distance = 5;

// distance from which to snap to nearby objects
var snap_distance = 5;

// number of undo savepoints to keep
var undo_levels = 500;

// colors of objects that invisible in haxball
var colors = {
    selected: 'rgba(256,256,0,0.8)',
    vertex: 'rgba(256,0,256,1)',
    invisible_thick: 'rgba(255,255,255,0.8)',
    invisible_thin: 'rgba(0,0,0,0.8)',
    plane_thick: 'rgba(0,0,0,0.8)',
    plane_thin: 'rgba(255,255,255,0.8)',
    red: {thick: 'rgba(255,127,127,1)',
          thin: 'rgba(255,0,0,0.8)'},
    blue:{thick: 'rgba(127,127,255,1)',
          thin: 'rgba(0,0,255,0.8)'},
    selection_box:{
        bgc: 'rgba(71,126,154,0.5)',
        bdr: 'rgba(47,94,133,0.5)'
    }
};

//===== Haxball Values

// values harcoded in haxball
var haxball = {
    hockey: {
        bg_color: 'rgb(85, 85, 85)',
        border_color: 'rgb(233,204,110)'
    },
    grass: {
        bg_color: 'rgb(113,140,90)',
        border_color: 'rgb(199,230,189)'
    },
    segment_color: 'rgb(0,0,0)',
    disc_color: 'rgb(255,255,255)',
    default_disc_radius: 10,
    default_player_radius: 15
};

var properties = (function(p){return {
    bCoef:      p($.lang[getLang()][500], false, 'number'),
    gravity:    p($.lang[getLang()][501], false, 'point'),
    speed:      p($.lang[getLang()][502], false, 'point'),
    cMask:      p($.lang[getLang()][503], false, 'layers'),
    cGroup:     p($.lang[getLang()][504], false, 'layers'),
    trait:      p($.lang[getLang()][505], false, 'trait'),
    x:          p($.lang[getLang()][506], true, 'number', true),
    y:          p($.lang[getLang()][507], true, 'number', true),
    v0:         p($.lang[getLang()][508], true, 'ref', true),
    v1:         p($.lang[getLang()][509], true, 'ref', true),
    curve:      p($.lang[getLang()][510], true, 'number'),
    curveF:     p($.lang[getLang()][511], true, 'number'),
    bias :      p($.lang[getLang()][512], true, 'number'),
    vis:        p($.lang[getLang()][513], false, 'bool'),
    color:      p($.lang[getLang()][514], false, 'color'),
    normal:     p($.lang[getLang()][515], true, 'point', true),
    dist:       p($.lang[getLang()][516], true, 'number', true),
    radius:     p($.lang[getLang()][517], false, 'number'),
    invMass:    p($.lang[getLang()][518], false, 'number'),
    pos:        p($.lang[getLang()][519], true, 'point'),
    p0:         p($.lang[getLang()][520], true, 'point', true),
    p1:         p($.lang[getLang()][521], true, 'point', true),
    team:       p($.lang[getLang()][522], true, 'team'),
    damping:    p($.lang[getLang()][523], true, 'number'),
    d0:       p($.lang[getLang()][524], true, 'ref'),
    d1:       p($.lang[getLang()][525], true, 'ref'),
    //d0:         p($.lang[getLang()][524], true, 'number'),
    //d1:         p($.lang[getLang()][525], true, 'number'),
    //length:     p($.lang[getLang()][526], true, 'length'),
    strength:   p($.lang[getLang()][527], true, 'strength')
};})(function(name, required, type, nodefault){
    return { innerText: name, required: required, type: type, def: !nodefault };
});

var type_properties = {
    vertexes: ['x', 'y', 'bCoef', 'cMask', 'cGroup', 'trait'],
    segments: ['v0', 'v1', 'bCoef', 'curve', 'curveF', 'bias', 'cMask', 'cGroup', 'vis', 'color', 'trait'],
    planes: ['normal', 'dist', 'bCoef', 'cMask', 'cGroup', 'trait'],
    discs: ['pos', 'speed', 'gravity', 'radius', 'invMass',  'damping', 'color', 'bCoef', 'cMask', 'cGroup', 'trait'], 
    goals: ['p0', 'p1', 'team'],
    joints: ['d0', 'd1', 'strength', 'color']
    //joints: ['d0', 'd1', 'length', 'strength', 'color']
};

// TODO: complete this table
var defaults = {
    discs: {
        radius: 10
    },
    players: {
        radius: 15
    }
};

// Maximums
var maximum_curve = 340;



//==== Program State

// the stadium json (with additional _data fields)
var stadium = {};
var oldTxtaraVal = {};

// user info when logged in
var user_info = false;

// session id
var session_id = 0;

// the canvas html element
var canvas;

// the currently active tool
var current_tool;

// the position from which to drag
var drag_start_pos;

// savepoints for undo and redo
var undo_savepoints = [];
var redo_savepoints = [];

// 파일 불러오기
var file = document.querySelector('#stadfile');

// Clipboard
var clipboard;

// center of rotation and scale
var transformation_center = [0,0];

// is the mouse clicked?
var mouse_left_down = false;
var mouse_dragging = false;

// total number of fully selected objects
var total_selected_by_type;
var total_selected_by_prop;

// dynamic settings
var settings = {
    preview: false
};

// additional elements to render over the stadium (used for debugging)
var debug_render = [];

// Functions that populate input fields when a new stadium is loaded
var field_setters = [];

// can leave without prompt
var can_leave = false;

// Triggers

triggers = {
    select: [],
    unselect: [],
    set_tool: [],
    reset_selection: []
};

// Property data
var property_data = {};
var property_dataLabel = {};

// cache of patterns
var bg_patterns = {};

// cached window width
var window_width = 800;

// cached canvas size info
var canvas_rect = [-150, -75, 150, 75];

// cached mouse position
var current_mouse_position = false;

// 거울 모드
var mirror_mode = false;
var mirror_directions = ['horizontal', 'vertical', 'across'];

// directions in which mirroring is disabled
var disabled_mirroring = {};

// 저장
var last_save_id = false;
var last_save_name = false;

// library
var library = {
    list: [],
    last: false,
    query: 'public',
    initialised: false
}

//===== Aliases

var pi = Math.PI;
var tau = Math.PI*2;
var abs = Math.abs;
var round = Math.round;
var max = Math.max;
var min = Math.min;
var cos = Math.cos;
var sin = Math.sin;



//==== Initilisation

$(function(){
    initLang();
    check_logged_in();

    $('#stadium_editor_link').click(function(){
        hide_box();
        return false;
    });

    $('#library_link').click(function(){
        show_box('library');
        if(!library.initialised){
            library_query();
            library.initialised = true;
        }
        return false;
    });

    $('#library_button_public').click(function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active');
            library.query = 'public';
            library_query();
        }
    });

    $('#library_button_saved').click(function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active');
            library.query = 'saved';
            library_query();
        }
    });

    $('#button_load').click(function(){
        load_file();
    });

    $('#button_library_edit').click(function(){
        library_edit();
    });

    $('#button_library_delete').click(function(){
        library_delete();
    });

    $('#login_link').click(function(){
        show_box('login');
        return false;
    });

    $('#register_link').click(function(){
        show_box('register');
        return false;
    });

    $('#logout_link').click(function(){
        logout();
        return false;
    });

    $('#button_login_login').click(function(){
        login();
    });

    $('#button_login_close').click(function(){
        hide_box();
    });

    $('#button_register_register').click(function(){
        register();
    });

    $('#button_register_close').click(function(){
        hide_box();
    });

    load_tile('grass');
    load_tile('hockey');

    $(window).bind('beforeunload', function(){
        if(!can_leave)
            return alert($.lang[getLang()][6]);
    });
    $(window).resize(function(){                    //  창 크기 조절
        setTimeout(() => resize(), 100);
    });

    reset_selection();

    canvas = document.getElementById('canvas');

    if(!canvas.getContext){
        alert('Unable to initialise canvas. Your browser may be too old.');
        return;
    }
    
    initialise_properties_css();
    populate_tab_properties();
    
    connect_field($('#input_name'), 'name');
    connect_field($('#prop_spawnDistance'), 'spawnDistance', parseFloat);
    connect_field($('#prop_width'), 'width', parseFloat);
    connect_field($('#prop_height'), 'height', parseFloat);
    connect_field($('#prop_maxViewWidth'), 'maxViewWidth', parseFloat);
    connect_field($('#prop_cameraWidth'), 'cameraWidth', parseFloat);
    connect_field($('#prop_cameraHeight'), 'cameraHeight', parseFloat);
    connect_field($('#prop_cameraFollow'), 'cameraFollow', parseCameraFollow);
    connect_field($('#prop_canBeStored'), 'canBeStored', parseCanBeStored);
    connect_field($('#prop_kickOffReset'), 'kickOffReset', parseKickOffReset);
    connect_field($('#prop_bg_type'), 'bg.type');
    connect_field($('#prop_bg_height'), 'bg.height', parseFloat);
    connect_field($('#prop_bg_width'), 'bg.width', parseFloat);
    connect_field($('#prop_bg_cornerRadius'), 'bg.cornerRadius', parseFloat);
    connect_field($('#prop_bg_kickOffRadius'), 'bg.kickOffRadius', parseFloat);
    connect_field($('#prop_bg_color'), 'bg.color', parseColor);
    connect_field($('#prop_pp_radius'), 'playerPhysics.radius', parseFloat);
    connect_field($('#prop_pp_bCoef'), 'playerPhysics.bCoef', parseFloat);
    connect_field($('#prop_pp_invMass'), 'playerPhysics.invMass', parseFloat);
    connect_field($('#prop_pp_damping'), 'playerPhysics.damping', parseFloat);
    connect_field($('#prop_pp_acceleration'), 'playerPhysics.acceleration', parseFloat);
    connect_field($('#prop_pp_gravity'), 'playerPhysics.gravity', parseVector);
    connect_field($('#prop_pp_kickingAcceleration'), 'playerPhysics.kickingAcceleration', parseFloat);
    connect_field($('#prop_pp_kickingDamping'), 'playerPhysics.kickingDamping', parseFloat);
    connect_field($('#prop_pp_kickStrength'), 'playerPhysics.kickStrength', parseFloat);
    connect_field($('#prop_pp_kickback'), 'playerPhysics.kickback', parseFloat);
    connect_field($('#prop_bp_radius'), 'ballPhysics.radius', parseFloat);
    connect_field($('#prop_bp_bCoef'), 'ballPhysics.bCoef', parseFloat);
    connect_field($('#prop_bp_invMass'), 'ballPhysics.invMass', parseFloat);
    connect_field($('#prop_bp_damping'), 'ballPhysics.damping', parseFloat);
    connect_field($('#prop_bp_gravity'), 'ballPhysics.gravity', parseVector);
    connect_field($('#prop_bp_color'), 'ballPhysics.color', parseColorExt);
    connect_field($('#prop_bp_cMask'), 'ballPhysics.cMask', parseMaskList);
    connect_field($('#prop_bp_cGroup'), 'ballPhysics.cGroup', parseMaskList);
    connect_field($('#prop_vis'), 'vis', parseVis);
    load(new_stadium());
    modified();

    set_tool(tool_select);

    $('#button_library_new').click(function(){
        load(new_stadium());
        hide_box();
        modified();
    });

    // 공통 응답: 예
    $("#button_yes").click(function(){
        switch(getIndexPop()){
            case 120:           // 텍스트 모드: 시각 모드
                hide_box("import");
                closePop('#layer_exit');
                break;
            case 121:           // 텍스트 모드: 모두 지우기
                $('#textarea_import').val('');
                closePop('#layer_exit');
                break;
        }
    });
    // 공통 응답: 아니오
    $("#button_no").click(function(){
        switch(getIndexPop()){
            case 120:           // 텍스트 모드: 시각 모드
                break;
            case 121:           // 텍스트 모드: 모두 지우기
                break;
        }
        closePop("#layer_exit");
    });

    // 언어 변경
    $("#button_lang").click(function(){
        //$('#table').hide();
        //$('#dw_lang').show();
        layer_popup($(this).attr('href'));
    });
    
    $("#button_lang_en").click(function(){
        closePop("#layer_lang");
        setLanguage("en");
    });
    $("#button_lang_ko").click(function(){
        closePop("#layer_lang");
        setLanguage("ko");
    });

    // 텍스트 모드
    $("#textarea_import").keyup(function() {
        /*
        var currentVal = $(this).val();
        if(currentVal != oldTxtaraVal)
            $("#button_import_cancel").addClass("btn_accnt");
        else 
            $("#button_import_cancel").removeClass("btn_accnt");
        */
    });

    $("#button_import").click(function(){
        $("#textarea_import").val(pprint(stadium));
        oldTxtaraVal = $("#textarea_import").val();
        show_box("import");
    });
    
    $("#button_import_close").click(function(){        //  시각 모드
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        var currentVal;
        try {
            //st = eval('[' + $('#textarea_import').val() + ']')[0];
            currentVal = $("#textarea_import").val();
        } catch (error) {
            currentVal = undefined;
        }
        //  저장 여부에 따라 팝업 출력
        if(oldTxtaraVal == currentVal)
            return hide_box("import");
        setContext(120);
        layer_popup("#layer_exit");
    });

    /*
    $("#button_import_cancel").click(function(){        //  시각 모드
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        var currentVal;
        try {
            //st = eval('[' + $('#textarea_import').val() + ']')[0];
            currentVal = $("#textarea_import").val();
        } catch (error) {
            currentVal = undefined;
        }
        //  저장 여부에 따라 팝업 출력
        if(oldTxtaraVal == currentVal)
            return hide_box("import");
        setContext(120);
        layer_popup("#layer_exit");
    });
    */

    $('#button_import_select_all').click(function(){    //  모두 선택
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        $('#textarea_import').select();
    });

    $('#button_import_clear').click(function(){         //  모두 지우기
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        setContext(121);
        layer_popup("#layer_exit");
    });

    $("#button_import_import").click(function(){        //  저장
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        var st;
        try {
            st = eval('[' + $('#textarea_import').val() + ']')[0];
        } catch (error) {
            st = undefined;
        }
        if(!st){
            alert("맵에 예기치 않은 오류가 발생했습니다.");
            return;
        }
        oldTxtaraVal = $("#textarea_import").val();
        //$("#button_import_cancel").removeClass("btn_accnt");
        load(st);
        modified();
        //hide_box();
    });

    $('#button_import_goto').click(function(){          //  좌표 이동
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        var pos = prompt($.lang[getLang()][122]); 
        if(pos)
            set_selection_range($('#textarea_import')[0], parseInt(pos, 10), parseInt(pos, 10)+10);
    });

    // 정보
    $('#button_about').click(function(){
        return alert($.lang[getLang()][1]);
    });
    
    
    $('#button_feedback').click(function(){
        switch(getLang()){
            case "ko":
                window.open("https://umhxbl.wixsite.com/storage/forum/pideubaeg");
                break;
            default:
                alert('contact djdft1456@gmail.com if you have something such as a bug or another problem.');
        }
    });

    $('#button_save').click(function(){
        save();
    });

    $('#button_download_text').click(function(){
        if($('#layer_exit').css('display') == 'block') return;          //  팝업이 이미 있으면 작동 불가 처리
        download(stadium);
    });
    $('#button_download').click(function(){
        download(stadium);
    });

    $('#button_open').click(function(){        
        //download(stadium);
    });

    // 도움말
    $('#button_help').click(function(){
        $("#button_help").addClass("active");
        show_box("help");
    });

    // 경기장 속성
    $('#button_properties').click(function(){
        $("#button_properties").addClass("active");
        show_box("properties");
        //toggle_properties();
    });

    // 설정
    $("#button_options").click(function(){
        $("#button_options").addClass("active");
        show_box("options");
        let maxLimit = 255;
        let types = [
            'segments', 'vertexes', 'discs', 'goals', 'planes'
        ];
        let showObjectInfo = function(type){
            let st_prop = stadium[type];
            let task_prop = document.getElementById("task" + '_' + type);
            task_prop.innerText = st_prop.length + '/' + maxLimit;
        }
        types.forEach(t => showObjectInfo(t));
    });
 
    //  최대화
    $('.btn_show').click(function(){
        let selectors = $(this).parents("div");
        let parents = selectors[selectors.length - 1];
        let btnHide = parents.getElementsByClassName('btn_hide')[0];
        if(btnHide.style.display == 'none') btnHide.style.display = 'block';
        this.style.display = 'none';
        $(parents.getElementsByTagName("div")[1]).toggle();
        switch(parents.id){
            case 'titlebar':        //  상단 헤드라인
                $('#input_name').toggle();
                break;
            case 'bottomboxes':     //  하단 작업표시줄
                $('#mousepos').toggle();
                $('#mouseposClone').toggle();
                break;
        }
        resize();                //  UI 조정
    });
    //  최소화
    $('.btn_hide').click(function(){
        let selectors = $(this).parents("div");
        let parents = selectors[selectors.length - 1];
        let btnShow = parents.getElementsByClassName('btn_show')[0];
        if(btnShow.style.display == 'none') btnShow.style.display = 'block';
        this.style.display = 'none';
        $(parents.getElementsByTagName("div")[1]).toggle();
        switch(parents.id){
            case 'titlebar':        //  상단 헤드라인
                $('#input_name').toggle();
                break;
            case 'bottomboxes':     //  하단 작업표시줄
                $('#mouseposClone').toggle();
                $('#mousepos').toggle();
                break;
        }
        resize();                //  UI 조정
    });

    $('#button_help_close').click(function(){
        $('#layer_lang')
        hide_box();
        $("#button_help").removeClass("active");
    });

    $('#button_properties_close').click(function(){
        hide_box("properties");
        $("#button_properties").removeClass("active");
    });

    $('#button_options_close').click(function(){
        if($('#layer_lang').css('display') == 'block') return;
        hide_box("options");
        $("#button_options").removeClass("active");
        //closePop('#button_options');
    });    

    add_tool(tool_select);
    add_tool(tool_segment);
    add_tool(tool_disc);
    add_tool(tool_vertex);
    add_tool(tool_plane);
    add_tool(tool_goal);
    add_tool(tool_rotate);
    add_tool(tool_scale);
    add_tool(tool_joint);

    $('#button_undo').click(function(){
        undo();
    });

    $('#button_redo').click(function(){
        redo();
    });

    $('#button_delete').click(function(){
        if(delete_selected(stadium))
            modified();
    });

    $('#button_select_all').click(function(){
        select_all();
    });


    $('#button_select_none').click(function(){
        select_all(function(){ return false; });
    });

    $('#button_inverse_selection').click(function(){
        select_all(function(shape){ return !selected(shape.object); });
    });

    $('#button_copy').click(function(){
        copy();
    });

    $('#button_paste').click(function(){
        paste();
        modified();
    });

    $('#button_cut').click(function(){
        cut();
        modified();
    });

    $('#button_duplicate').click(function(){
        duplicate();
        modified();
    });

    $('#button_mirror_mode').click(function(){
        mirror_mode = mirror_mode ? false : true;
        if(mirror_mode){
            $('#button_mirror_mode').addClass('active');
            reset_mirror_data(stadium);
        }else{
            $('#button_mirror_mode').removeClass('active');
            clear_mirror_data(stadium);
        }
    });

    $('#pref_preview').click(function(){
        $('#pref_preview').toggleClass('active');
        settings.preview = $('#pref_preview').hasClass('active');
        queue_render();
    });


    define_tab('properties');
    define_tab('advanced');
    define_tab('edit');

    $(canvas).mousedown(handle_down);
    $(canvas).mouseup(handle_up);
    $(canvas).mousemove(handle_move);
    $(document).bind('keydown', handle_key);

    resize();
    $(window).resize(resize);
});

function initLang(){
    let userLang = navigator.language;
    switch(userLang.toLowerCase()){
        case "ko":
        case "en":
            setLanguage(userLang);
            break;
        default:    setLanguage("en");
    }
}

function getLang(){
    if(currentLang == undefined){
        initLang();
    }
    return currentLang;
}

function getIndexPop(){
    let dialog = document.getElementById("dialog_context");
    for(let i = 0; i < Object.keys($.lang[getLang()]).length; i++)
        if(dialog.innerText == $.lang[getLang()][i]) return i;
    return false;
}

// Replace the current stadium with a new stadium
function load(st){
    stadium = st;

    if(!st.bg) st.bg = {};
    if(!st.vertexes) st.vertexes = {};
    if(!st.segments) st.segments = {};
    if(!st.discs) st.discs = {};
    if(!st.goals) st.goals = {};
    if(!st.planes) st.planes = {};
    //if(!st.joints) st.joints = {};
    if(!st.traits) st.traits = {};

    field_setters = $.grep(field_setters, function(f){ return f(); });

    reset_selection();

    for_all_shapes(st, function(shape){
        if(selected(shape.object)){
            trigger('select', shape);
        }
    });

    resize_canvas();

    // TODO: ui and stadium validation
    // validation: all required elems are there, warn on unrelated elems
    // no elems are out of bounds or invalid values
    // max 255 of each type
}

// handler for the window resize event
function resize(){
    var h = $(window).outerHeight();
    //let bottomArea = $('#bottomboxes').outerHeight(true) + $('#tab_sub').outerHeight();
    let header = $('#top_header').outerHeight(true);
    let canvasHeight = header + $('#titlebar').outerHeight(true) + $('#bottomboxes').outerHeight(true);
    $('#table').innerHeight(h - canvasHeight);
    //$('#table').height(h - 35);
    //$('#box').height(h - 126);    //  크기 조절
    var w = $(window).width();
    window_width = w;
    var cdp = $('#canvas_div_placeholder');
    var off = cdp.offset();
    var cd = $('#canvas_div');
    //cd.css(off);
    cd.css({'top' : header});
    w = cdp.width();
    cd.width(cdp.width());
    //h = cdp.outerHeight();
    //cd.height(h - canvasHeight - qtArea);
    cd.height(h - header);
    //alert("h(" + h + ") + cavasHeight(" + canvasHeight + ")== " + cd.height());
    resize_canvas();
}

// 맵 기본값
function new_stadium(){

    return {
        name: $.lang[getLang()][50],
        width: 420,
        height: 200,
        cameraWidth: 0,
        cameraHeight: 0,
        maxViewWidth: 0,
        cameraFollow: "ball",
        spawnDistance: 170,
        canBeStored: true,
        kickOffReset: "partial",
        bg: { "color" : "718C5A" },
        traits: {
            "ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball"] },
            "goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
            "goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball"] }, 
            "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO", "blueKO"], "cMask" : ["red", "blue"] }
        },

        vertexes: [],
        segments: [],
        goals: [],
        discs: [],
        planes: [],
        joints: [],

        redSpawnPoints: [],
        blueSpawnPoints: [],

        "playerPhysics" : {
            "radius" : 15,
            "bCoef" : 0.5,
            "invMass" : 0.5,
            "damping" : 0.96,
            "cGroup" : [ "red", "blue"],
            "acceleration" : 0.1,
            "gravity": [ 0, 0 ],
            "kickingAcceleration" : 0.07,
            "kickingDamping" : 0.96,
            "kickStrength" : 5,
            "kickback" : 0,
        },
    
        "ballPhysics" : {
            "radius" : 10,
            "bCoef" : 0.5,
            "cMask" : [ "all" ],
            "damping" : 0.99,
            "invMass" : 1,
            "gravity": [ 0, 0 ],
            "color" : "ffffff",
            "cGroup" : [ "ball"]
        }
    };
}

function show_box(name){
    $('#table').addClass('hidden');
    //$('#layer_objl').addClass('hidden');
    $('#box' + name).removeClass('hidden').siblings().addClass('hidden');
    $('#box').removeClass('hidden');
    $('#titlebar').hide();
    $('#tab_sub').hide();
    $('#bottomboxes').hide();
    if($('#mouseposClone')[0].style.display == 'none') $('#mousepos').hide();
}

function hide_box(name){
    $('#box').addClass('hidden');
    //$('#layer_objl').addClass('hidden');
    $('#table').removeClass('hidden');
    $('#titlebar').show();
    $('#tab_sub').show();
    $('#bottomboxes').show();
    if($('#mouseposClone')[0].style.display == 'none') $('#mousepos').show();
    resize();
}

$('#objl_segment_0').click(function(){
    select_shape(stadium, Shape('segments', stadium.segments[0], 0));
    queue_render();
});

function order_keys(parent, keys){
    var order = type_properties[parent];
    if(!order){
        return keys
    }
    var okeys = [];
    $.each(order, function(i, k){
        if($.inArray(k, keys) != -1){
            console.log('order', k);
            okeys.push(k);
        }
    });
    $.each(keys, function(i, k){
        if($.inArray(k, order) == -1){
            console.log('other', k);
            okeys.push(k);
        }
    });
    console.log(parent, order, keys, okeys);
    return okeys;
}

function pprint(j, l, tag, parent){
    if(!l) l = 0;
    if(j.substr){
        return quote(j);
    }else if(typeof j == 'number'){
        return j.toString();
    }else if(typeof j == 'boolean'){
        return j.toString();
    }else if(j instanceof Array){
        l++;
        var trait = j[0] ? j[0].trait : "";
        var ret = "[" + indent(l);
        var first = true;
        $.each(j, function(i, x){
            var d = "";
            let index = (parent == 'discs' ? 1 : 0) + i;
            //let index = i;
            if(x.trait != trait){
                d = indent(l);
                trait = x.trait;
            }
            ret += (first ? "" : "," + d + indent(l)) + (tag ? "/* " + index +" */ " : "") + pprint(x, l, false, parent);
            first = false;
        });
        return ret + indent(l-1) + "]";
    }else{
        l++;
        var ret = "{" + indent(l);
        var first = true;
        var keys = order_keys(parent, Object.keys(j));
        $.each(keys, function(i, k){
            var v = j[k];
            if(v !== undefined && k != '_data'){
                var i = k == 'bg' ? 2 : l;
                let hasType = k == 'vertexes' || k == 'discs';
                ret += (first ? "" : "," + indent(l)) + quote(k) + " : " + pprint(v, i, hasType && i < 10, k);
                first = false;
            }
        });
        return ret + indent(l - 1, true) + "}";
    }
    return "JSON ERROR";
}

function indent(l, b){
    return l === 0 ? newLine : l == 1 ? "" + newLine + "" + newLine + "\t" : l == 2 && !b ? "" + newLine + "\t\t" : l == 3 || b ? " " : "";
}


// copied from json2.js //

var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var meta = {'\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'};

function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' +
        string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
}

// end of json2.js code //

function hexToRgb(hex){
    if(!hex) return haxball['grass'].bg_color;
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let strToDual = (n) => parseInt(n, 16);
    return result ? ("rgb" + '(' + strToDual(result[1]) + ',' + strToDual(result[2]) + ',' + strToDual(result[3]) + ')') : null;
}


function center_canvas(pt){
    // TODO: this functions doesn't work when the div is hidden
    
    var w = $(canvas_div).width();
    var h = $(canvas_div).height();

    if(!pt)
        return [$('#canvas_div').scrollLeft()+w/2+canvas_rect[0],
                $('#canvas_div').scrollTop()+h/2+canvas_rect[1]];

    $('#canvas_div').scrollLeft(pt[0]-w/2-canvas_rect[0]).scrollTop(pt[1]-h/2-canvas_rect[1]);
}

function render(st){

    var transform;

    if(current_tool && current_tool.transform){
        transform = function(shape, draw){
            ctx.save();
            current_tool.transform(st, ctx, shape, draw);
            ctx.restore();
        };
    }else{
        transform = function(shape, draw){ draw(); };
    }

    var ctx = canvas.getContext('2d');

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, canvas_rect[2] - canvas_rect[0], canvas_rect[3] - canvas_rect[1]);

    ctx.translate(-canvas_rect[0], -canvas_rect[1]);
    
    if(settings.preview){
        ctx.beginPath();
        ctx.moveTo(-st.width, -st.height);
        ctx.lineTo(st.width, -st.height);
        ctx.lineTo(st.width, st.height);
        ctx.lineTo(-st.width, st.height);
        ctx.clip();
    }

    renderbg(st, ctx);

    if(!settings.preview) $.each(st.planes, function(i, plane){
        transform(Shape('planes', plane, i), function(){
            var ext = plane_extremes(st, plane);
            ctx.beginPath();
            ctx.moveTo(ext.a[0], ext.a[1]);
            ctx.lineTo(ext.b[0], ext.b[1]);
            if(selected(plane)){
                ctx.lineWidth = 3;
                ctx.strokeStyle = colors.selected;
                ctx.stroke();
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = colors.plane_thick;
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors.plane_thin;
            ctx.stroke();
        });
    });

    if(!settings.preview) $.each(st.vertexes, function(i, vertex){
        transform(Shape('vertexes', vertex, i), function(){
            vertex=complete(st, vertex);
            ctx.fillStyle = selected(vertex) ? colors.selected : colors.vertex;
            ctx.fillRect(vertex.x-3, vertex.y-3, 6, 6);
        });
    });

    $.each(st.segments, function(i, segment){
        transform(Shape('segments', segment, i), function(){
            segment = complete(st, segment);
            render_segment_arc(ctx, segment, segment_arc(st, segment));
        });
    });

    /*
    $.each(st.joints, function(i, joint){
        transform(Shape('joints', joint, i), function(){
            joint = complete(st, joint);
            render_joint_arc(ctx, joint, joint_arc(st, joint));
        });
    });
    */

    if(!settings.preview) $.each(st.goals, function(i, goal){
        transform(Shape('goals', goal, i), function(){
            goal = complete(st, goal);
            ctx.beginPath();
            ctx.moveTo(goal.p0[0], goal.p0[1]);
            ctx.lineTo(goal.p1[0], goal.p1[1]);
            if(selected(goal)){
                ctx.lineWidth = 4;
                ctx.strokeStyle = colors.selected;
                ctx.stroke();
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = colors[goal.team].thick;
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors[goal.team].thin;
            ctx.stroke();
        });
    });

    $.each(st.discs, function(i, disc){
        transform(Shape('discs', disc, i), function(){
            disc = complete(st, disc);
            ctx.beginPath();
            var radius = disc.radius !== undefined ? disc.radius : haxball.default_disc_radius;
            ctx.arc(disc.pos[0], disc.pos[1], radius, 0, Math.PI*2, true);
            if(selected(disc) && !settings.preview){
                ctx.lineWidth = 5;
                ctx.strokeStyle = colors.selected;
                ctx.stroke();
            }
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.lineWidth = 2;
            ctx.fillStyle = color_to_style(disc.color, haxball.disc_color, true);
            ctx.fill();
            ctx.stroke();
        });
    });

    $.each(debug_render, function(i, f){ f(ctx); });

    if(settings.preview){
        // TODO: use exact colors and sizes

        // 프리뷰 그리기
        ctx.beginPath();
        ctx.arc(0, 0, st.ballPhysics.radius, 0, Math.PI*2, true);
        //test_me = st.ballPhysics;
        ctx.fillStyle = hexToRgb(st.ballPhysics.color);
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        
        // 레드 그리기
        ctx.beginPath();
        ctx.arc(-st.spawnDistance, 0, st.playerPhysics.radius, 0, Math.PI*2, true);
        ctx.fillStyle = 'rgb(229,110,86)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // 블루 그리기
        ctx.beginPath();
        ctx.arc(st.spawnDistance, 0, st.playerPhysics.radius, 0, Math.PI*2, true);
        ctx.fillStyle = 'rgb(86,137,229)';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

    }

    if(!settings.preview && current_tool && current_tool.render){
        current_tool.render(ctx);
    }

}

function render_segment_arc(ctx, segment, arc){
    ctx.beginPath();
    if(arc.curve){
        ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
    }else{
        ctx.moveTo(arc.a[0], arc.a[1]);
        ctx.lineTo(arc.b[0], arc.b[1]);
    }

    if(segment.vis !== false){
        if(selected(segment) && !settings.preview){
            ctx.lineWidth = 5;
            ctx.strokeStyle = colors.selected;
            ctx.stroke();
        }
        ctx.lineWidth = 3;
        let strokeColor = color_to_style(segment.color, haxball.segment_color);
        ctx.strokeStyle = strokeColor == 'transparent' ? haxball.segment_color : strokeColor;
        ctx.stroke();
    }else if(!settings.preview){
        if(selected(segment)){
            ctx.lineWidth = 3;
            ctx.strokeStyle = colors.selected;
            ctx.stroke();
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.invisible_thick;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.invisible_thin;
        ctx.stroke();
    }
}

function render_joint_arc(ctx, joint, arc){
    ctx.beginPath();
    ctx.moveTo(arc.a[0], arc.a[1]);
    ctx.lineTo(arc.b[0], arc.b[1]);
    //test_me = arc;   //  버그
    if(!settings.preview){
        if(selected(joint)){
            ctx.lineWidth = 3;
            ctx.strokeStyle = colors.selected;
            ctx.stroke();
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.invisible_thick;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.invisible_thin;
        ctx.stroke();
    }
}
function renderbg(st, ctx){
    var bg = st.bg;
    ctx.save();

    switch(bg.type){
        case 'grass':
            let bgc = hexToRgb(bg.color);
            if(bgc != haxball['grass'].bg_color){
                ctx.fillStyle = bgc;
                ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
                break;
            }
        case 'hockey':
            ctx.fillStyle = haxball[bg.type].bg_color;      //  배경 색상(grass, hockey)
            ctx.fillRect(-st.width, -st.height,
                         2 * st.width, 2 * st.height);

            ctx.beginPath();
            
            ctx.moveTo(-bg.width + bg.cornerRadius, -bg.height);
            // TODO: this border doesn't render well in iceweasel
            ctx.arcTo(bg.width, -bg.height, bg.width, -bg.height + bg.cornerRadius, bg.cornerRadius);
            ctx.arcTo(bg.width, bg.height, bg.width - bg.cornerRadius, bg.height, bg.cornerRadius);
            ctx.arcTo(-bg.width, bg.height, -bg.width, bg.height - bg.cornerRadius, bg.cornerRadius);
            ctx.arcTo(-bg.width, -bg.height, -bg.width + bg.cornerRadius, -bg.height, bg.cornerRadius);

            ctx.save();
            ctx.clip();
            ctx.fillStyle = bg_patterns[bg.type];
            ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
            ctx.restore();

            ctx.moveTo(0, -bg.height);
            ctx.lineTo(0, -bg.kickOffRadius);
            ctx.moveTo(bg.kickOffRadius, 0);
            ctx.arc(0, 0, bg.kickOffRadius, 0, Math.PI*2, true);
            ctx.moveTo(0, bg.kickOffRadius);
            ctx.lineTo(0, bg.height);

            ctx.lineWidth = 3;
            ctx.strokeStyle = haxball[bg.type].border_color;
            ctx.stroke();
            break;
        default:
            ctx.fillStyle = hexToRgb(bg.color);
            ctx.fillRect(-st.width, -st.height, 2 * st.width, 2 * st.height);
    }

    ctx.restore();
}


function complete(st, o){
    if(o.trait){
        return $.extend({}, st.traits[o.trait], o);
    }
    return $.extend({}, o);
}

function complete_shape_object(st, shape){
    // TODO: replace all instances of complete(st, shape.object) with a call to this function
    var ret = {};
    if(defaults[shape.type]){
        $.extend(ret, defaults[shape.type]);
    }
    if(shape.object.trait){
        $.extend(ret, st.traits[shape.object.trait]);
    }
    $.extend(ret, shape.object);
    return ret;
}

function norm(v){
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function dist(a, b){
    return norm([a[0]-b[0], a[1]-b[1]]);
}

function normalise(v){
    var k = norm(v);
    
    var x = v[0] / k;
    var y = v[1] / k;
    
    return [x,y];
}

function handle_down(ev){
    $(document.activeElement).blur();
    if(ev.which != 1)
        return;
    mouse_left_down = true;
    mouse_dragging = false;
    var pt = translate_coords([ev.pageX, ev.pageY]);
    drag_start_pos = pt;
    current_tool.down(pt, ev);
    return false;
}

function translate_coords(p){
    var off = $(canvas).offset();
    var pt = [p[0] - off.left + canvas_rect[0],
              p[1] - off.top + canvas_rect[1]];
    return pt;
}


function handle_up(ev){
    var ret;
    if(ev.which != 1)
        return;
    mouse_left_down = false;
    var pt = translate_coords([ev.pageX, ev.pageY]);
    if(mouse_dragging){
        mouse_dragging = false;
        current_tool.end_drag(drag_start_pos, pt, ev);
    }else{
        current_tool.click(pt, ev);
    }
    drag_start_pos = false;
    return false;
}

function handle_key(ev){
    //console.log('key', ev.which);

    if(ev.ctrlKey){
        return;
    }else if($(ev.target).is('textarea')){
        return;
    }else if($(ev.target).is('input')){
        if(ev.which == 13){ // RET
            $(document.activeElement).blur();
            return false;
        }
        return;
    }

    switch(ev.which){
    case 90: // Z
    case 85:// U
        undo();
        return false;
    case 82: // R
        redo();
        return false;
    case 46: // DEL
        if(delete_selected(stadium))
            modified();
        return false;
    case 65: // A
        select_all();
        return false;
    case 67: // C
        copy();
        return false;
    case 88: // X
        cut();
        modified();
        return false;
    case 86: // V
        paste();
        modified();
        return false;
    case 68: // D
        duplicate();
        modified();
        return false;
    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
    case 53: // 5
    case 54: // 6
    case 55: // 7
    case 56: // 8
    case 57: // 9
        set_tool([tool_select, tool_rotate, tool_scale, tool_segment,
                  tool_vertex, tool_joint, tool_disc, tool_goal, tool_plane]
                 [ev.which - 49]);
        return false;
    default:
        return current_tool.key(ev.which, ev);
    }
}

function handle_move(ev){
    var div_mousepos = $('#mousepos');
    var pt = translate_coords([ev.pageX, ev.pageY]);
    current_mouse_position = pt;
    if(window_width < ev.pageX * 2){
        div_mousepos.removeClass('left').addClass('right');
    }else{
        div_mousepos.removeClass('right').addClass('left');
    }
    var update_pos = true;
    if(mouse_left_down){
        if(!mouse_dragging && dist(pt, drag_start_pos) >= minimum_drag_distance){
            mouse_dragging = true;
        }
        if(mouse_dragging &&
           current_tool.dragging &&
           current_tool.dragging(drag_start_pos, pt, ev) === false){
            update_pos = false;
        }
    }else{
        if(current_tool.moving && current_tool.moving(pt, ev) === false)
            update_pos = false;
    }
    if(update_pos){
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        $(mpObj).text(pt[0] + ', ' + pt[1]);
    }
}

var tool_select = {
    name: 'select',
    cursor: 'default',
    init: function(){
        this.drag_type = false;
    },
    down: function(pt, ev){
        var shape = under_point(stadium, pt);
        this.shape = shape;
        if(!shape){
            this.drag_type = 'select';
            if(!(ev.shiftKey || ev.ctrlKey)){
                clear_selection(stadium);
            }
        }else{
            if(shape.type == 'segments'){
                this.drag_type = 'segment';
            }else{
                this.drag_type = 'move';
            }
            this.keep_others = ev.shiftKey || ev.ctrlKey;
            if(!selected(shape.object)){
                this.shape_selected = false;
                if(!this.keep_others)
                    clear_selection(stadium);
                select_shape(stadium, shape);
            }else{
                this.shape_selected = true;
            }
        }
        queue_render();
    },
    click: function(pt, ev){
        if(this.shape){
            if(this.shape_selected){
                if(this.keep_others){
                    unselect_shape(stadium, this.shape);
                }else{
                    clear_selection(stadium);
                }
            }
        }
        update_savepoint();
    },
    end_drag: function(from, to, ev){
        this.transform = false;
        this.drag_type = false;
        var shape = this.shape;
        if(!shape){
            select_rect(stadium, from, to);
            update_savepoint();
        }else if(shape.type == 'segments'){
            curve_segment_to_point(stadium, shape.object, to);
            modified();
        }else{
            if(for_selected(stadium, move_obj, from, to)){
                update_mirrored_geometry_selected(stadium);
                resize_canvas();
                modified();
            }
        }
    },
    key: function(){},
    dragging: function(from, to, ev){
        this.drag_from = from;
        this.drag_to = to;

        this.transform = (
            this.drag_type == 'move' ? transform_drag_move :
                this.drag_type == 'segment' ? transform_drag_curve :
                false);
        queue_render();
        if(this.drag_type == 'select'){
            let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
            $(mpObj).text(Math.abs(from[0]-to[0])+' x '+Math.abs(from[1]-to[1]));
            return false;
        }else if(this.drag_type == 'move'){
            // bad idea
            //$('#mousepos').text('V '+(to[0]-from[0])+', '+(to[1]-from[1]));
            //return false;
        }else if(this.drag_type == 'segment'){
            return false;
        }
    },
    render: function(ctx){
        if(mouse_dragging && this.drag_type == 'select'){
            var a = this.drag_from;
            var b = this.drag_to;
            ctx.fillStyle = colors.selection_box.bgc;
            ctx.strokeStyle = colors.selection_box.bdr;
            //  x, y, w, h
            ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]);
            ctx.strokeRect(a[0] + 1, a[1] + 1, b[0] - a[0] - 2, b[1] - a[1] - 2);
        }
    }
};

function transform_drag_curve(st, ctx, shape, draw){
    if(!this.shape || shape.object != this.shape.object){
        draw();
        return;
    }

    var seg = complete(st, shape.object);
    var arc = segment_arc_to_point(st, seg, this.drag_to);

    let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
    $(mpObj).text(Math.round(arc.curve) + '°');

    render_segment_arc(ctx, seg, arc);
}

function transform_drag_move(st, ctx, shape, draw){
    if(shape_fully_selected(st, shape))
        ctx.translate(this.drag_to[0] - this.drag_from[0],
                      this.drag_to[1] - this.drag_from[1]);
    draw();
}

var tool_rotate = {
    name: 'rotate',
    cursor: 'default',
    init: function(){
        queue_render();
    },
    down: function(pt, ev){
        this.drag_from = pt;
    },
    click: function(pt, ev){
        transformation_center = pt;
        queue_render();
    },
    end_drag: function(from, to, ev){
        var cs = angle_cs_three(transformation_center, from, to);
         if(for_selected(stadium, rotate_obj, transformation_center, cs[0], cs[1])){
             update_mirrored_geometry_selected(stadium);
            resize_canvas();
            modified();
        }
    },
    key: function(){},
    render: render_transformation_center,
    dragging: function(from, to, ev){
        this.drag_to = to;
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        $(mpObj).text(round(three_point_angle(from, transformation_center, to)*180/pi)+'°');
        queue_render();
        return false;
    },
    transform: function(st, ctx, shape, draw){
        if(mouse_dragging && shape_fully_selected(st, shape)){
            var o = transformation_center;
            ctx.translate(o[0], o[1]);
            var cs = angle_cs_three(transformation_center, this.drag_from, this.drag_to);
            ctx.rotate(angle_to([0,0], cs));
            ctx.translate(-o[0], -o[1]);
        }
        draw();
    }
};

function angle_cs_three(o, from, to){
    var b = normalise(point_subtract(from, o));
    var a = normalise(point_subtract(to, o));
    var cos = a[0] * b[0] + a[1] * b[1];
    var sin = -a[0] * b[1] + a[1] * b[0];
    return [cos, sin];
}

function set_tool(t){
    var old_tool = current_tool;
    current_tool = t;
    $('#button_tool_'+t.name).siblings('button').removeClass('active');
    $('#button_tool_'+t.name).addClass('active');
    $(canvas).css('cursor', t.cursor);
    t.init();
    trigger('set_tool', t, old_tool);
    queue_render();
}

function unselect_shape(st, shape){
    shape_set_selected(shape, false);
    switch(shape.type){
        case 'segments':
            var s = shape.object;
            if(selected(st.vertexes[s.v0]) == 'segment')
                shape_set_selected(Shape('vertexes', st.vertexes[s.v0], s.v0), false);
            if(selected(st.vertexes[s.v1]) == 'segment')
                shape_set_selected(Shape('vertexes', st.vertexes[s.v1], s.v1), false);
            break;
        
        case 'joints':
            var s = shape.object;
            if(selected(st.discs[s.v0]) == 'joint')
                shape_set_selected(Shape('discs', st.discs[s.d0], s.d0), false);
            if(selected(st.discs[s.v1]) == 'joint')
                shape_set_selected(Shape('discs', st.discs[s.d1], s.d1), false);
            break;
        
    }
}

function select_shape(st, shape){
    //test_me = [st, shape.object];
    shape_set_selected(shape, true);
    switch(shape.type){
        case 'segments':
            var s = shape.object;

            //shape_set_selected(Shape('vertexes', stadium.vertexes[shape.object.v0], shape.object.v0), 'segment');

            if(!selected(st.vertexes[s.v0]))
                shape_set_selected(Shape('vertexes', st.vertexes[s.v0], s.v0), 'segment');
            if(!selected(st.vertexes[s.v1]))
                shape_set_selected(Shape('vertexes', st.vertexes[s.v1], s.v1), 'segment');
            break;
        
        case 'joints':
            var s = shape.object;
            if(!selected(st.discs[s.d0 - 1]))
                shape_set_selected(Shape('discs', st.discs[s.d0 - 1], s.d0 - 1), 'joint');
            if(!selected(st.discs[s.d1 - 1]))
                shape_set_selected(Shape('discs', st.discs[s.d1 - 1], s.d1 - 1), 'joint');
            break;
        
    }
}

function toggle_select_shape(st, shape){
    if(selected(shape.object)){
        unselect_shape(st, shape);
        return false;
    }else{
        select_shape(st, shape);
        return true;
    }
}

function data(obj, k, v){
    if(v === undefined){
        return obj._data ? obj._data[k] : undefined;
    }
    if(!obj._data)
        obj._data = {};
    obj._data[k] = v;
}

function clear_selection(st){
    var count = 0;
    for_all_shapes(st, function(shape){
        if(selected(shape.object)){
            shape_set_selected(shape,false);
            count ++;
        }
    });
    return count;
}

function under_point(st, pt, type){
    var obj;
    var index;

    // check objects in reverse order thet they were rendered
    // which is, at first, the same as the reverse order in which they were created

    if(!type || type == 'discs'){
        eachRev(st.discs, function(i, disc){
            var d = complete_shape_object(st, Shape('discs', disc, i));
            if(dist(d.pos, pt) - d.radius <= maximum_click_distance){
                obj = disc;
                index = i;
                return false;
            }
        });

        if(obj) return Shape('discs', obj, index);
    }

    if(!type || type == 'goals'){
        eachRev(st.goals, function(i, goal){
            var g = complete(st, goal);
            if(point_next_to_line(pt, g.p0, g.p1, maximum_click_distance)){
                obj = goal;
                index = i;
                return false;
            }
        });

        if(obj) return Shape('goals', obj, index);
    }

    if(!type || type == 'vertexes'){
        eachRev(st.vertexes, function(i, vertex){
            var v = complete(st, vertex);
            if(dist([v.x, v.y], pt) <= maximum_click_distance){
                obj = vertex;
                index = i;
                return false;
            }
        });

        if(obj) return Shape('vertexes', obj, index);
    }

    if(!type || type == 'segment'){
        eachRev(st.segments, function(i, segment){
            if(segment_contains(st, segment, pt, maximum_click_distance)){
                obj = segment;
                index = i;
                return false;
            }
        });

        if(obj) return Shape('segments', obj, index);
    }

    if(!type || type == 'planes'){
        eachRev(st.planes, function(i, plane){
            var ext = plane_extremes(st, plane);
            if(point_next_to_line(pt, ext.a, ext.b, maximum_click_distance)){
                obj = plane;
                index = i;
                return false;
            }
        });

        if(obj) return Shape('planes', obj, index);
    }

    /*
    if(!type || type == 'joint'){
        eachRev(st.joints, function(i, joint){
            if(joint_contains(st, joint, pt, maximum_click_distance)){
                obj = joint;
                index = i;
                return false;
            }
        });
        if(obj) return Shape('joints', obj, index);
    }
    */
    
}

function selected(obj){
    return obj._selected;
}

function shape_set_selected(shape, val){
    var sel = shape.object._selected;
    if(!sel  && val){
        trigger('select', shape);
    }else if(sel && !val){
        trigger('unselect', shape);
    }
    if(!val){
        val = undefined;
    }
    shape.object._selected = val;
}

function trigger(name,a,b){
    $.each(triggers[name], function(i, f){ f(a,b); });
}

function queue_render(){
    // if this function gets called too much, add a minimum delay between calls to render
    render(stadium);
}

function for_selected(st, f, a, b, c){
    var count = 0;
    for_all_shapes(st, function(shape){
        if(selected(shape.object)){
            f(st, shape, a, b, c);
            count ++;
        }
    });
    return count;
}

function for_all_shapes(st, types, f){
    if(!f){
        f = types;
        types = ['vertexes', 'segments', 'goals', 'discs', 'planes', 'joints'];
    }

    $.each(types, function(i, name){
        var group = st[name];
        if(group){
            $.each(group, function(i, obj){
                return f(Shape(name, obj, i));
            });
        }
    });
}

function select_rect(st, a, b){
    var count = 0;
    // Segments after vertexes
    for_all_shapes(st, ['vertexes', 'goals', 'discs', 'segments', 'joints'], function(shape){
        var obj = shape.object;
        var o = complete(st, obj);
        switch(shape.type){
        case 'vertexes':
            if(rectangle_contains(a, b, [o.x, o.y])){
                shape_set_selected(shape, true);
                count ++;
            }
            break;

        case 'goals':
            if(rectangle_contains(a, b, o.p0) &&
               rectangle_contains(a, b, o.p1)){
                shape_set_selected(shape, true);
                count ++;
            }                    
            break;

        case 'discs':
            if(rectangle_contains(a, b, o.pos) &&
               !near(o.pos[0], a[0], o.radius) &&
               !near(o.pos[0], b[0], o.radius) &&
               !near(o.pos[1], a[1], o.radius) &&
               !near(o.pos[1], b[1], o.radius)){
                shape_set_selected(shape, true);
                count ++;
            }
            break;

        case 'segments':
            if(selected(st.vertexes[o.v0]) && selected(st.vertexes[o.v1])){
                shape_set_selected(shape, true);
                count ++;
            }
            break;
        
        case 'joints':
            if(selected(st.discs[o.d0]) && selected(st.discs[o.d1])){
                shape_set_selected(shape, true);
                count ++;
            }
            break;
        }
    });

    // TODO: count is wrong. includes shapes that were already selected
    return count;
}

function move_obj(st, shape, from, to){
    var type = shape.type;
    var obj = shape.object;

    var o = complete(st, obj);
    
    var vd = point_subtract(to, from);

    if(type == 'vertexes'){
        obj.x = o.x + vd[0];
        obj.y = o.y + vd[1];
    }
    
    if(type == 'discs'){
        obj.pos = point_add(o.pos, vd);
    }
    
    if(type == 'goals'){
        obj.p0 = point_add(o.p0, vd);
        obj.p1 = point_add(o.p1, vd);
    }

    if(type == 'planes'){
        obj.dist += dot_product(vd, o.normal) / norm(o.normal);
    }
}

var tool_segment = {
    name: 'segment',
    cursor: 'default',
    init: function(){},
    click: function(){},
    end_drag: function(from, to, ev){
        var shape = add_segment(stadium, from, to);
        //test_me = shape;
        select_shape(stadium, shape);
        var v = segment_vertices(stadium, shape);
        select_shape(stadium, v[0]);
        select_shape(stadium, v[1]);
        modified();
    },
    key: function(){},
    down: function(pt, ev){
        this.drag_from = pt;
        this.curve = get_prop_val('curve', 0);
    },
    dragging: function(from, to, ev){
        this.drag_to = to;
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        $(mpObj).text(Math.round(dist(from,to))+'; '+Math.round(angle_to(from, to)/Math.PI*180)+'°');
        queue_render();
        return false;
    },
    render: function(ctx){
        if(mouse_dragging){
            ctx.lineWidth = 3;
            ctx.strokeStyle = color_to_style(get_prop_val('color', '000000'));
            var arc = calculate_arc(this.drag_from, this.drag_to, this.curve);
            ctx.beginPath();
            if(arc.radius){
                ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
            }else{
                ctx.moveTo(this.drag_from[0], this.drag_from[1]);
                ctx.lineTo(this.drag_to[0], this.drag_to[1]);
            }
            ctx.stroke(); 
        }
    }
};

function add_segment(st, from, to, no_mirror){
    var sa = under_point(st, from, 'vertexes');
    var sb = under_point(st, to, 'vertexes');

    var a = sa || add_vertex(st, from, true);
    var b = sb || add_vertex(st, to, true);

    var obj = {
        v0: a.index,
        v1: b.index
    };

    obj = $.extend({}, get_props_for_type('segments'), obj);

    st.segments.push(obj);
    
    var shape = Shape('segments', obj, st.segments.length - 1);

    if(mirror_mode && !no_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled[dir] && can_mirror_segment(from, to, dir, obj.curve)){
                var seg = add_segment(st, mirror_point(from, dir), mirror_point(to, dir), true);
                if(shape.object.curve && (dir == 'horizontal' || dir == 'vertical'))
                    seg.object.curve = -shape.object.curve;
                link_shapes(shape, seg, dir);
                var v = segment_vertices(st, seg);
                link_shapes(a, v[0], dir);
                link_shapes(b, v[1], dir);
            }
        });
    }
    
    return shape;
}
var tool_joint = {
    name: 'joint',
    cursor: 'default',
    init: function(){},
    click: function(){},
    end_drag: function(from, to, ev){
        var shape = add_joint(stadium, from, to);
        select_shape(stadium, shape);
        var d = joint_discs(stadium, shape);
        select_shape(stadium, d[0]);
        //test_me = d;
        select_shape(stadium, d[1]);
        modified();
    },
    key: function(){},
    down: function(pt, ev){
        this.drag_from = pt;
    },
    dragging: function(from, to, ev){
        this.drag_to = to;
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        $(mpObj).text(Math.round(dist(from,to))+'; '+Math.round(angle_to(from, to)/Math.PI*180)+'°');
        queue_render();
        return false;
    },
    render: function(ctx){
        if(mouse_dragging){
            ctx.lineWidth = 3;
            ctx.strokeStyle = color_to_style(get_prop_val('color', '000000')); 
            var arc = calculate_arc(this.drag_from, this.drag_to);
            ctx.beginPath();
            if(arc.radius){
                ctx.arc(arc.center[0], arc.center[1], arc.radius, arc.from, arc.to, false);
            }else{
                ctx.moveTo(this.drag_from[0], this.drag_from[1]);
                ctx.lineTo(this.drag_to[0], this.drag_to[1]);
            }
            ctx.stroke(); 
        }
    }
};

function add_joint(st, from, to, no_mirror){
    var ja = under_point(st, from, 'd0');
    var jb = under_point(st, to, 'd1');

    var a = ja || add_disc(stadium, from, 10);
    var b = jb || add_disc(stadium, to, 10);

    var obj = {
        d0: a.index + 1,    //  버그
        d1: b.index + 1,
        //length: null,
        strength: "rigid",
        color: "000000"
    };

    obj = $.extend({}, get_props_for_type('joints'), obj);

    st.joints.push(obj);
    
    var shape = Shape('joints', obj, st.joints.length - 1);

    if(mirror_mode && !no_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled[dir] && can_mirror_joint(from, to, dir, obj.curve)){
                var jnt = add_joint(st, mirror_point(from, dir), mirror_point(to, dir), true);
                link_shapes(shape, jnt, dir);
                var d = joint_discs(st, jnt);
                link_shapes(a, d[1], dir);
                link_shapes(b, d[2], dir);
            }
        });
    }
    return shape;
}


function can_mirror_segment(a, b, dir){
    var ret = true;
    if(sign(a[0]) * sign(b[0]) == -1){
        ret = ret && dir != 'horizontal' && dir != 'across'; 
    }
    if(sign(a[1]) * sign(b[1]) == -1){
        ret = ret && dir != 'vertical' && dir != 'across';
    }
    return ret;
}

function can_mirror_joint(a, b, dir){
    var ret = true;
    if(sign(a[0]) * sign(b[0]) == -1){
        ret = ret && dir != 'horizontal' && dir != 'across'; 
    }
    if(sign(a[1]) * sign(b[1]) == -1){
        ret = ret && dir != 'vertical' && dir != 'across';
    }
    return ret;
}

function add_vertex(st, pt, no_mirror){
    var n = st.vertexes.length;
    var obj = {
        x: pt[0],
        y: pt[1]
    };

    obj = $.extend({}, get_props_for_type('vertexes'), obj);

    st.vertexes.push(obj);
    var shape = Shape('vertexes', obj, st.vertexes.length - 1);

    if(mirror_mode && !no_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)){
                var ver = add_vertex(st, mirror_point(pt, dir), true);
                link_shapes(shape, ver, dir);
            }
        });
    }

    return shape;
}

function can_mirror_vertex(pt, dir){
    if(pt[0] == 0)
        return dir == 'vertical' && pt[1] != 0;
    if(pt[1] == 0)
        return dir == 'horizontal';
    return true;
}

var tool_disc = {
    name: 'disc',
    cursor: 'default',
    init: function(){},
    down: function(pt, ev){
        this.drag_from = pt;
    },
    click: function(pt){
        var shape = add_disc(stadium, pt);
        select_shape(stadium, shape);
        resize_canvas();
        modified();
    },
    end_drag: function(from, to, ev){
        var shape = add_disc(stadium, from, dist(from, to));
        select_shape(stadium, shape);
        modified();
    },
    key: function(){},
    dragging: function(from, to, ev){
        this.drag_to = to;
        queue_render();
    },
    render: function(ctx){
        if(mouse_dragging){
            ctx.fillStyle = color_to_style(get_prop_val('color', 'FFFFFF'));
            ctx.beginPath();
            ctx.arc(this.drag_from[0], this.drag_from[1],
                    dist(this.drag_from, this.drag_to),
                    0, Math.PI*2, false);
            ctx.fill();
        }
    }
};

function add_disc(st, pt, r, is_mirror){
    var obj = {
        pos: [pt[0], pt[1]],
        radius: r
    };

    obj = $.extend({}, get_props_for_type('discs'), obj);

    st.discs.push(obj);
    var shape = Shape('discs', obj, st.discs.length - 1);

    if(mirror_mode && !is_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)){
                var dis = add_disc(st, mirror_point(pt, dir), r, true);
                link_shapes(shape, dis, dir);
            }
        });
    }

    return shape;
}

function load_tile(name){
    var tile = new Image(128, 128);
    tile.onload = function(){
        var ctx = canvas.getContext('2d');
        bg_patterns[name] = ctx.createPattern(tile, 'repeat');
        queue_render();
    };
    tile.src = name+'tile.png';
}

function color_to_style(color, def, type){
    if(color == 'transparent') return color;    //  투명색
    if(!color) return def ? def : 'rgb(0,0,0)';
    if(color.substr) return '#' + color;
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
}

function segment_arc(st, segment){
    var seg = segment_points(st, segment);

    var arc = data(segment, 'arc');

    if(arc && arc.a[0] == seg.a[0] && arc.a[1] == seg.a[1] &&
       arc.b[0] == seg.b[0] && arc.b[1] ==seg.b[1] && arc.curve == segment.curve){
        return arc;
    }

    arc = {a: seg.a, b: seg.b, curve: segment.curve};

    var curve = segment.curve;

    $.extend(arc, calculate_arc(seg.a, seg.b, curve));
    
    data(segment, 'arc', arc);

    return arc;
}

function joint_arc(st, joint){
    var jnt = joint_points(st, joint);

    var arc = data(joint, 'arc');

    if(arc && (arc.a[0] == jnt.a[0]) && (arc.a[1] == jnt.a[1]) &&
       (arc.b[0] == jnt.b[0]) && (arc.b[1] == jnt.b[1])){
        return arc;
    }

    arc = {a: jnt.a, b: jnt.b};

    $.extend(arc, calculate_arc(jnt.a, jnt.b));
    
    data(joint, 'arc', arc);

    return arc;
}


function calculate_arc(a, b, curve){
    var arc = {};

    if(curve === 0)
        return arc;

    if(curve < 0){
        curve = -curve;
        var c = a;
        a = b;
        b = c;
    }

    var c = [b[0] - a[0], b[1] - a[1]];
    var d = [
        a[0] + c[0] / 2,
        a[1] + c[1] / 2
    ];
    var nc = norm(c);

    if(curve == 180){
        arc.radius = nc/2;
        arc.center = d;
        arc.from = angle_to(d, a);
        arc.to = angle_to(d, b);
        return arc;
    }

    // |a-b| / sin A = r / sin (90 - A/2)
    var angle = curve * Math.PI / 180;
    var spa2 = Math.sin(Math.PI/2 - angle/2);
    var radius = Math.abs(nc * spa2 / Math.sin(angle));
    
    
    var cp = normalise([c[1], -c[0]]);

    var l = Math.sqrt((nc*nc/4) + radius*radius - nc*radius*Math.cos(Math.PI/2 - angle/2));

    if(curve > 180)
        l = -l;

    arc.radius = radius;
    
    arc.center = [
        d[0] - cp[0] * l,
        d[1] - cp[1] * l
    ];

    arc.from = angle_to(arc.center, a);
    arc.to = angle_to(arc.center, b);
    
    return arc;
}

function angle_to(o, p){
    return Math.atan2(p[1]-o[1], p[0]-o[0]);
}

function between(a, b, c){
    return (a <= c && c <= b) || (b <= c && c <= a);
}

function point_next_to_line(pt, a, b, d){
    return distance_line_point(a, b, pt) <= d &&
        three_point_angle(a, pt, b) > Math.PI/2;
}

function segment_contains(st, segment, pt, d){
    s = complete(st, segment);
    if(!s.curve || s.curve === 0){
        var seg = segment_points(st, segment);
        return point_next_to_line(pt, seg.a, seg.b, d);
    }else{
        var arc = segment_arc(st, s);
        return distance_circle_point(arc.center, arc.radius, pt) <= d &&
            clockwise_between(arc.from, arc.to, angle_to(arc.center, pt)); 
    }
}

function joint_contains(st, joint, pt, d){
    s = complete(st, joint);
    if(!s.curve || s.curve === 0){
        var jnt = joint_points(st, joint);
        return point_next_to_line(pt, jnt.a, jnt.b, d);
    }else{
        var arc = joint_arc(st, s);
        return distance_circle_point(arc.center, arc.radius, pt) <= d &&
            clockwise_between(arc.from, arc.to, angle_to(arc.center, pt)); 
    }
}

function distance_line_point(a, b, p){
    return Math.abs(height_line_point(a, b, p));
}

function height_line_point(a, b, p){
    var d = dist(a, b);
    if(d === 0)
        return dist(a, p);
    return ((b[0]-a[0]) * (a[1]-p[1]) - (a[0]-p[0]) * (b[1]-a[1])) / d;
}

function distance_circle_point(c, r, p){
    return Math.abs(dist(c, p) - r);
}

function clockwise_between(a, b, c){
    // clockwise or anticlockwise??
    a = (a + Math.PI*2) % (Math.PI*2);
    b = (b + Math.PI*2) % (Math.PI*2);
    c = (c + Math.PI*2) % (Math.PI*2);
    return !((b <= c && c <= a) ||
             (c <= a && a <= b) || 
             (a <= b && b <= c));
}

function Shape(type, object, i){
    return {type: type, object: object, index: i};
}

function three_point_angle(a, o, b){
    var r = angle_to(o, a);
    var s = angle_to(o, b);
    var d = Math.abs(r - s);
    if(d > Math.PI)
        return Math.PI * 2 - d;
    return d;
}

function circumcenter(a, b, c){
    // http://en.wikipedia.org/wiki/Circumscribed_circle

    var d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));

    if(d === 0)
        return false;
    
    return [
        ((a[1] * a[1] + a[0] * a[0]) * (b[1] - c[1]) +
         (b[1] * b[1] + b[0] * b[0]) * (c[1] - a[1]) +
         (c[1] * c[1] + c[0] * c[0]) * (a[1] - b[1])) / d,
        ((a[1] * a[1] + a[0] * a[0]) * (c[0] - b[0]) +
         (b[1] * b[1] + b[0] * b[0]) * (a[0] - c[0]) +
         (c[1] * c[1] + c[0] * c[0]) * (b[0] - a[0])) / d
    ];
}

function segment_arc_to_point(st, segment, pt){
    var s = complete(st, segment);
    var arc = segment_arc(st, segment);
    var o = circumcenter(pt, arc.a, arc.b);
    var new_arc = { a: arc.a, b: arc.b };
    
    if(!o){
        new_arc.curve = 0;
        return new_arc;
    }

    var a = arc.a;
    var b = arc.b;
    var height = height_line_point(a, b, pt);

    new_arc.curve = curve_from_center(o, a, b, height);

    if(Math.abs(new_arc.curve) > maximum_curve){
        new_arc.curve = sign(new_arc.curve) * maximum_curve;
        $.extend(new_arc, calculate_arc(arc.a, arc.b, new_arc.curve));
        return new_arc;
    }

    
    new_arc.center = o;
    new_arc.radius = dist(o, pt);
    new_arc.from = angle_to(o, a);
    new_arc.to = angle_to(o, b);

    if(new_arc.curve < 0){
        var c = new_arc.from;
        new_arc.from = new_arc.to;
        new_arc.to = c;
    }

    return new_arc;
}

function curve_from_center(o, a, b, height){
    var angle = three_point_angle(a, o, b);

    var o_side = height_line_point(a, b, o) < 0;

    if(height < 0){
        if(o_side)
            angle = Math.PI*2 - angle;
        angle = -angle;
    }else if(!o_side){
        angle = Math.PI*2 - angle;
    }

    return angle / Math.PI * 180;
}

function curve_segment_to_point(st, segment, pt){
    var arc = segment_arc_to_point(st, segment, pt);

    segment.curve = arc.curve;

    if(mirror_mode){
        $.each(mirror_data(segment), function(dir, shape){
            if(dir == 'horizontal' || dir == 'vertical')
                shape.object.curve = -arc.curve;
            else
                shape.object.curve = arc.curve;
        });
    }
}

function plane_extremes(st, plane){
    var ext = data(plane, 'extremes');

    // TODO: complete the plane object

    if(ext && ext.normal[0] == plane.normal[0] && ext.normal[1] == plane.normal[1] && ext.dist == plane.dist &&
       list_equal(canvas_rect, ext.canvas_rect)){
        return ext;
    }
    ext = {normal: [plane.normal[0], plane.normal[1]], dist: plane.dist, canvas_rect: canvas_rect };

    var pts = plane_extremes_helper(st, ext.normal, ext.dist);

    ext.a = pts.a;
    ext.b = pts.b;

    data(plane, 'extremes', ext);
    return ext;
}

function plane_extremes_at_point(st, pt){
    return plane_extremes_helper(st, pt, norm(pt));
}

function plane_extremes_helper(st, normal, dist){
    var ext = {};
    
    dist = - dist;
    
    // ax + by = p

    if(normal[0] === 0 && normal[1] === 0){
        normal = [1, 0];
    }

    var n = normalise(normal);
    
    var r = canvas_rect;

    var p1 = [r[0], (-dist - n[0] * r[0]) / n[1]];
    var p2 = [r[2], (-dist - n[0] * r[2]) / n[1]];
    var p3 = [(-dist - n[1] * r[1]) / n[0], r[1]];
    var p4 = [(-dist - n[1] * r[3]) / n[0], r[3]];
    
    if(n[0] === 0){
        ext.a = p1;
        ext.b = p2;
    }else if(n[1] === 0){
        ext.a = p3;
        ext.b = p4;
    }else{
        var keep = [];
        if(between(r[1], r[3], p1[1])) keep.push(p1);
        if(between(r[1], r[3], p2[1])) keep.push(p2);
        if(between(r[0], r[2], p3[0])) keep.push(p3);
        if(between(r[0], r[2], p4[0])) keep.push(p4);
        if(keep.length != 2){
            ext.a = p1;
            ext.b = p3;
            if(p1 == p3)
                ext.b = p4;
        }else{
            ext.a = keep[0];
            ext.b = keep[1];
        }
    }

    return ext;
}

function segment_points(st, segment){
    var a = st.vertexes[segment.v0];
    var b = st.vertexes[segment.v1];
    return {
        a: [a.x, a.y],
        b: [b.x, b.y]
    };
}

function joint_points(st, joint){
    var a = st.discs[joint.d0];
    var b = st.discs[joint.d1];
    return {
        a: [a.x, a.y],
        b: [b.x, b.y]
    };
}

function rectangle_contains(a, b, pt){
    return between(a[0], b[0], pt[0]) &&
        between(a[1], b[1], pt[1]);
}

function near(a, b, d){
    return Math.abs(a - b) <= d;
}

function point_add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function point_subtract(a, b){
    return [a[0]-b[0], a[1]-b[1]];
}

function dot_product(a, b){
    return a[0]*b[0] + a[1]*b[1];
}

function update_savepoint(){
    if(undo_savepoints.length)
        undo_savepoints[0] = pprint(stadium);
    queue_render();
}

function savepoint(){
    undo_savepoints.unshift(pprint(stadium));
    undo_savepoints.splice(undo_levels);
    redo_savepoints = [];
}

function undo(){
    if(undo_savepoints.length <= 1)
        return false;
    redo_savepoints.unshift(undo_savepoints.shift());
    redo_savepoints.splice(undo_levels);

    load(eval('['+undo_savepoints[0]+']')[0]);
    modified(true);
    return true;
}

function redo(){
    if(redo_savepoints.length <= 0)
        return false;
    var state = redo_savepoints.shift();
    undo_savepoints.unshift(state);
    undo_savepoints.splice(undo_levels);
    load(eval('['+state+']')[0]);
    modified(true);
    return true;
}

function delete_selected(st){
    var vertex_del_log = [];
    var count = 0;
    // delete segments BEFORE vertices
    $.each(['segments', 'vertexes', 'goals', 'discs', 'planes', 'joints'], function(i, name){
        var group = st[name];
         if(group){
            st[name] = $.grep(group, function(obj, i){
                var del = selected(obj) === true; // possibly 'segment'
                if(name == 'segments'){
                    var a = st.vertexes[obj.v0];
                    var b = st.vertexes[obj.v1];
                    if(!del){
                        if(selected(a) === true || selected(b) === true){
                            del = true;
                        }
                    }
                    if(del){
                        if(selected(a) == 'segment'){
                            shape_set_selected(Shape('vertexes', a, obj.v0),false);
                        }
                        if(selected(b) == 'segment'){
                            shape_set_selected(Shape('vertexes', b, obj.v1),false);
                        }
                    }
                }
                if(del){
                    if(name == 'vertexes'){
                        vertex_del_log.push(i);
                    }
                    count ++;
                    obj._deleted = true;
                    return false;
                }
                return true;
            });
        }
    });
    fix_segments(st, vertex_del_log);
    resize_canvas();
    reset_selection();
    return count;
}

function fix_segments(st, vertex_del_log){
    if(vertex_del_log.length === 0){
        return;
    }
    var new_index = [];
    var diff = 0;
    var sz = st.vertexes.length + vertex_del_log.length;
    for(var i = 0; i <= sz; i++){
        if(i == vertex_del_log[0]){
            vertex_del_log.shift();
            diff ++;
            new_index.push(false);
        }else{
            new_index.push(i - diff);
        }
    }
    $.each(st.segments, function(i, segment){
        segment.v0 = new_index[segment.v0];
        segment.v1 = new_index[segment.v1];
    });
}

var tool_vertex = {
    name: 'vertex',
    cursor: 'default',
    init: function(){},
    click: function(pt){
        var shape = add_vertex(stadium, pt);
        select_shape(stadium, shape);
        modified();
    },
    end_drag: function(){},
    key: function(){},
    down: function(pt, ev){}
};

var tool_goal = {
    name: 'goal',
    cursor: 'default',
    init: function(){},
    click: function(){},
    end_drag: function(from, to, ev){
        var shape = add_goal(stadium, from, to);
        select_shape(stadium, shape);
        modified();
    },
    key: function(){},
    down: function(pt, ev){
        this.drag_from = pt;
    },
    dragging: function(from, to, ev){
        this.drag_to = to;
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        $(mpObj).text(Math.round(dist(from,to))+'; '+Math.round(angle_to(from, to)/Math.PI*180)+'°');
        queue_render();
        return false;
    },
    render: function(ctx){
        if(mouse_dragging){
            ctx.lineWidth = 1;
            if(this.drag_from[0] < 0 || get_prop_val('team', 'blue') == 'red'){
                ctx.strokeStyle = 'rgb(255,0,0)';
            }else{
                ctx.strokeStyle = 'rgb(0,0,255)';
            }
            ctx.beginPath();
            ctx.moveTo(this.drag_from[0], this.drag_from[1]);
            ctx.lineTo(this.drag_to[0], this.drag_to[1]);
            ctx.stroke();
        }
    }
};

var tool_plane = {
    name: 'plane',
    cursor: 'default',
    init: function(){},
    down: function(){},
    click: function(pt){
        // TODO: proper snapping
        snap_point_for_plane(pt);
        var shape = add_plane(stadium, pt);
        select_shape(stadium, shape);
        modified();
    },
    end_drag: function(){},
    key: function(){},
    dragging: function(from, to, ev){},
    render: function(ctx){
        var pt = this.mouse_pos;
        if(pt){
            // TODO: proper snapping
            snap_point_for_plane(pt);
            var ext = plane_extremes_at_point(stadium, pt);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgb(255,255,255)';
            ctx.beginPath();
            ctx.moveTo(ext.a[0], ext.a[1]);
            ctx.lineTo(ext.b[0], ext.b[1]);
            ctx.stroke();
        }
    },
    moving: function(pt, ev){
        this.mouse_pos = pt;
        let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
        test_me = mpObj;
        $(mpObj).text(pt[0] + ', ' + pt[1] + '; ' + Math.round(angle_to(pt, [0,0])/Math.PI*180)+'°');
        queue_render();
        return false;
    }
};

function snap_point_for_plane(pt){
    if(Math.abs(pt[0]) < 5){
        pt[0] = 0;
    }else if(Math.abs(pt[1]) < 5){
        pt[1] = 0;
    }
}

function add_goal(st, a, b, is_mirror){
    var obj = {
        p0: a,
        p1: b,
        team: a[0] > 0 ? 'blue' : 'red'
    };

    obj = $.extend({}, get_props_for_type('goals'), obj);

    st.goals.push(obj);
    var shape = Shape('goals', obj, st.goals.length - 1);

    if(mirror_mode && !is_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled(dir) && can_mirror_segment(a, b, dir)){
                var goa = add_goal(st, mirror_point(a, dir), mirror_point(b, dir), true);
                link_shapes(shape, goa, dir);
            }
        });
    }

    return shape;
}

function add_plane(st, pt, is_mirror){
    var obj;
    if(pt[0] === 0 && pt[1] === 0){
        obj.dist = 0;
        obj.normal = [1, 0];
    }else{
        obj = {
            dist: -dist([0,0], pt),
            normal: normalise([-pt[0], -pt[1]])
        };
    }

    obj = $.extend({}, get_props_for_type('planes'), obj);

    st.planes.push(obj);
    var shape = Shape('planes', obj, st.planes.length - 1);

    if(mirror_mode && !is_mirror){
        $.each(mirror_directions, function(i, dir){
            if(!mirroring_disabled(dir) && can_mirror_vertex(pt, dir)){
                var pla = add_plane(st, mirror_point(pt, dir), true);
                link_shapes(shape, pla, dir);
            }
        });
    }

    return shape;
}

function toggle_properties(){
    var prop = $('#stadium_properties');
    if(!prop.is(':visible')){
        $(canvas).hide();
        prop.show();
        $('#button_properties').addClass('active');
        $('#tab_sub').hide();
        $('#bottomboxes').hide();
    }else{
        prop.hide();
        $(canvas).show();
        $('#button_properties').removeClass('active');
        $('#bottomboxes').show();
        $('#tab_sub').show();
        queue_render();
    }
}

function connect_field(input, p, parse, unparse){
    input.change(function(){
        var val = input.val();
        if(parse){
            val = parse(val);
            input.val(val);
        }
        set_prop(stadium, p, val);
        resize_canvas();
        modified();
    });

    field_setters.push(function(){
        if(input.closest('body').length === 0)
            return false;
        var val = get_prop(stadium, p);
        if(unparse)
            val = unparse(val);
        input.val(val);

        return true;
    });
}

function set_prop(object, path, val){
    var list = path.split('.');
    while(list.length > 1){
        var step = list.shift();
        var next = object[step];
        if(next == undefined){
            next = {};
            object[step] = next;
        }
        object = next;
    }
    object[list.shift()] = val;
}

function get_prop(object, path){
    var list = path.split('.');
    while(list.length){
        if(object == undefined)
            return undefined;
        object = object[list.shift()];
    }
    return object;
}

function define_tab(name){
    var button = $('#button_tab_'+name);
    var tab = $('#tab_'+name);
    button.click(function(){
        button.siblings('button').removeClass('active');
        button.addClass('active');
        tab.siblings().hide();
        tab.show();
    });
}

function point_rotate(pt, center, cos, sin){
    var v = point_subtract(pt, center);
    return point_add(center, [
        v[0] * cos - v[1] * sin,
        v[0] * sin + v[1] * cos
    ]);
}

function rotate_obj(st, shape, center, cos, sin){
    var type = shape.type;
    var obj = shape.object;

    var o = complete(st, obj);
    
    if(type == 'vertexes'){
        var n = point_rotate([o.x, o.y], center, cos, sin);
        obj.x = n[0];
        obj.y = n[1];
    }
    
    if(type == 'discs'){
        obj.pos = point_rotate(o.pos, center, cos, sin);
    }
    
    if(type == 'goals'){
        obj.p0 = point_rotate(o.p0, center, cos, sin);
        obj.p1 = point_rotate(o.p1, center, cos, sin);
    }

    if(type == 'planes'){
        var no = normalise(o.normal);
        var nn = point_rotate(no, [0,0], cos, sin); 
        var pt = point_rotate([no[0]*o.dist, no[1]*o.dist], center, cos, sin);
        var d = projected_dist(nn, pt);
        // var d = dist([0,0], pt) * Math.sin(Math.PI/2 - three_point_angle([-nn[0], -nn[1]], [0,0], pt));
        obj.normal = nn;
        obj.dist = d;
    }

    if(type == 'joints'){
        var n = point_rotate([o.d0, o.d1], center, cos, sin);
        obj.d0 = n[0];
        obj.d1 = n[1];
    }
}

function update_mirrored_geometry_selected(st){
    var dm = {};
    if(mirror_mode){
        for_all_shapes(st, function(shape){
            if(!selected(shape.object)){
                return;
            }
            var obj = complete(st, shape.object);
            var dat = mirror_data(shape.object);
            $.each(dat, function(dir, sh2){
                if(!mirroring_disabled(dir)){
                    switch(sh2.type){
                    case 'vertexes':
                        var pt = mirror_point([obj.x, obj.y], dir);
                        sh2.object.x = pt[0];
                        sh2.object.y = pt[1];
                        break;
                    case 'discs':
                        sh2.object.pos = mirror_point(obj.pos, dir);
                        sh2.object.radius = obj.radius;
                        break;
                    case 'goals':
                        sh2.object.p0 = mirror_point(obj.p0, dir);
                        sh2.object.p1 = mirror_point(obj.p1, dir);
                        break;
                    case 'planes':
                        sh2.object.normal = mirror_point(obj.normal, dir);
                        sh2.object.dist = obj.dist;
                        break;
                    case 'joints':
                        break;
                    }
                }else{
                    if(selected(dat[dir].object)){
                        dm[dir] = (dm[dir] || 0) + 1;
                    }
                    $.each(dat, function(d1, sh1){
                        var dat1 = mirror_data(sh1.object);
                        if(dat1[dir]){
                            if(selected(sh1.object) && selected(dat1[dir].object)){
                                dm[dir] = (dm[dir] || 0) + 1;
                            }
                            delete dat1[dir];
                        }
                    });
                    delete dat[dir]; 
                }
            });
        });
    }
    $.each(dm, function(dir, count){
        disabled_mirroring[dir] -= count / 2;
    });
}

function projected_dist(normal, pt){
    var n = normalise(normal);
    return norm(pt) * Math.sin(Math.PI/2 - three_point_angle(n, [0,0], pt));
}

function height_plane_point(st, plane, pt){
    // TODO: there must a more efficient way to do this
    var ext = plane_extremes(st, plane);
    return height_line_point(ext.a, ext.b, pt);
}

function add_tool(tool){
    $('#button_tool_'+tool.name).click(function(){
        switch(tool.name){
            case "select":
                //$('#layer_objl').removeClass('hidden');
                break;
            case "rotate":
            case "scale":
            case "segment":
            case "vertex":
            case "joint":
            case "disc":
            case "goal":
            case "plane":
                //$('#layer_objl').addClass('hidden');
                break;
        }
        set_tool(tool);
    });
}

function select_all(test){
    if(!test)
        test = function(){ return true; };
    for_all_shapes(stadium, function(shape){
        shape_set_selected(shape, test(shape));
    });
    queue_render();
}

function sign(n){
    return n < 0 ? -1 : 1;
}

function resize_canvas(){
    // TODO: use scrollLeft and scrollTop to recenter the view
    var st = stadium;

    var rect;

    rect = [-st.width, -st.height, st.width, st.height];

    var consider = function(pt, r){
        var x = pt[0];
        var y = pt[1];
        if (x - r < rect[0]) rect[0] = x - r;
        if (y - r < rect[1]) rect[1] = y - r;
        if (x + r > rect[2]) rect[2] = x + r;
        if (y + r > rect[3]) rect[3] = y + r;
    };

    for_all_shapes(stadium, function(shape){
        var obj = shape.object;
        var o = complete(st, obj);
        switch(shape.type){
        case 'vertexes':
            consider([o.x, o.y], 0);
            break;
        case 'goals':
            consider(o.p0, 0);
            consider(o.p1, 0);
            break;
        case 'discs':
            consider(o.pos, o.radius);
            break;
        case 'planes':
            // TODO: find a better way to ensure that a plane is reachable
            var ext = plane_extremes(st, obj);
            consider(midpoint(ext.a, ext.b), 0);
            break;
        case 'joints':
            break;
        }
    });

    var cd = $('#canvas_div');
    //var canvas_div_size = [cd.innerWidth() - 20, cd.innerHeight() - 20];
    var canvas_div_size = [cd.innerWidth(), cd.innerHeight()];
    
    rect = [
        round(min(rect[0] - margin, -canvas_div_size[0]/2)),
        round(min(rect[1] - margin, -canvas_div_size[1]/2)),
        round(max(rect[2] + margin, canvas_div_size[0]/2)),
        round(max(rect[3] + margin, canvas_div_size[1]/2))
    ];

    canvas_rect = rect;
    var wh = { width: rect[2] - rect[0], height: rect[3] - rect[1]};
    $(canvas).attr(wh);
    $(canvas).css(wh);

    queue_render();
}

function midpoint(a, b){
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

var tool_scale = {
    name: 'scale',
    cursor: 'default',
    init: function(){
        queue_render();
    },
    down: function(pt, ev){
        this.drag_from = pt;
    },
    click: function(pt, ev){
        transformation_center = pt;
        queue_render();
    },
    end_drag: function(from, to, ev){
        var v = snap_for_scale(transformation_center, from, to);
        if(scale_selected(stadium, transformation_center, v)){
            resize_canvas();
            modified();
        }
    },
    key: function(){},
    render: render_transformation_center,
    dragging: function(from, to, ev){
        this.drag_to = to;
        queue_render();
        return false;
    },
    transform: function(st, ctx, shape, draw){
        if(mouse_dragging && shape_fully_selected(st, shape)){
            var o = transformation_center;
            ctx.translate(o[0], o[1]);
            var v = snap_for_scale(o, this.drag_from, this.drag_to);
            ctx.scale(v[0], v[1]);
            ctx.translate(-o[0], -o[1]);

            let mpObj = '#' + ($('#mouseposClone')[0].style.display != 'none' ? 'mouseposClone' : 'mousepos');
            $(mpObj).text(Math.round(v[0]*100) + '% x ' + Math.round(v[1]*100) + '%');
        }
        draw();
    }
};

function render_transformation_center(ctx){
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    ctx.arc(transformation_center[0], transformation_center[1], 2, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(transformation_center[0], transformation_center[1], 6, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.beginPath();
    ctx.arc(transformation_center[0], transformation_center[1], 4, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(transformation_center[0], transformation_center[1], 8, 0, Math.PI*2, true);
    ctx.stroke();
}

function snap_for_scale(o, from, to){
    var a = point_subtract(from, o);
    a = [a[0]||1, a[1]||1];
    var b = point_subtract(to, o);
    
    var v = [
        min(b[0]/a[0], 3),
        min(b[1]/a[1], 3)
    ];

    var k = (abs(v[0]) + abs(v[1])) / 2;

    /*
      if(abs(abs(b[0])-abs(a[0])) <= 5) v[0] = sign(b[0]) * sign(a[0]) * 1;
      if(abs(abs(b[1])-abs(a[1])) <= 5) v[1] = sign(b[1]) * sign(a[1]) * 1;

      if(abs(sin(three_point_angle(first_quadrant(from), first_quadrant(o), first_quadrant(to))))
      <= 10 / dist(o, to)){
      v[0] = sign(v[0]) * k;
      v[1] = sign(v[1]) * k;
      } */
    
    var angle = abs(abs(angle_to([0,0], b)) - pi/2);

    if(angle < pi/8){
        v[0] = sign(v[0]);
    }else if(angle > pi*3/8){
        v[1] = sign(v[1]);
    }else{
        v[0] = sign(v[0]) * k;
        v[1] = sign(v[1]) * k;        
    }

    return v;
}

function first_quadrant(pt){
    return [abs(pt[0]), abs(pt[1])];
}

function scale_selected(st, c, v){

    var count = 0;

    // scaling segemnts requires the original vertex value, so scale them first

    for_all_shapes(st, ['segments', 'vertexes', 'discs', 'goals', 'planes', 'joints'], function(shape){
        if(!selected(shape.object))
            return;

        count ++;

        var type = shape.type;
        var obj = shape.object;

        var o = complete(st, obj);

        var m = Math.sqrt(abs(v[0] * v[1]));

        if(type == 'vertexes'){
            var pt = point_scale([o.x, o.y], c, v);
            obj.x = pt[0];
            obj.y = pt[1];
        }

        else if(type == 'discs'){
            obj.pos = point_scale(o.pos, c, v);
            obj.radius = abs(m) * o.radius;
        }

        else if(type == 'goals'){
            obj.p0 = point_scale(o.p0, c, v);
            obj.p1 = point_scale(o.p1, c, v);
        }

        else if(type == 'planes'){
            var n = normalise(o.normal);
            var vi = [v[1], v[0]];
            obj.normal = normalise(point_scale(n, [0,0], vi));
            var pt = point_scale([n[0]*o.dist, n[1]*o.dist], c, v);
            obj.dist = projected_dist(obj.normal, pt);
        }

        else if(type == 'segments'){
            if(o.curve && v[0] != v[1]){
                var av = [abs(v[0]), abs(v[1])];
                var arc = segment_arc(st, o);
                var vi = [av[1], av[0]];
                var oac = point_subtract(arc.a, arc.center);
                //var obc = point_subtract(arc.b, arc.center);
                var ap = point_scale([-oac[1], oac[0]], [0,0], av);
                //var bp = point_scale([-obc[1], obc[0]], [0,0], av);
                var ac = [-ap[1], ap[0]];
                //var bc = [-bp[1], bp[0]];
                var a = point_scale(arc.a, c, av);
                var b = point_scale(arc.b, c, av);
                var m = midpoint(a, b);
                var ma = point_subtract(a, m);
                var u = [-ma[1], ma[0]];
                var centera = intersect_lines(m, point_add(m, u), a, point_add(a, ac));
                //var centerb = intersect_lines(m, point_add(m, u), b, point_add(b, bc));
                if(centera /* && centerb */){
                    var cua = curve_from_center(centera, a, b, o.curve);
                    //var cub = curve_from_center(centerb, a, b, o.curve)
                    //obj.curve = (cua + cub) / 2 * sign(v[0]*v[1]);
                    obj.curve = cua * sign(v[0]*v[1]);
                }
            }
        }
    });

    update_mirrored_geometry_selected(st);

    return count;
}

function intersect_lines(p1, p2, p3, p4){
    // http://en.wikipedia.org/wiki/Line-line_intersection
    var d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    var k = p1[0]*p2[1] - p1[1]*p2[0];
    var l = p3[0]*p4[1] - p3[1]*p4[0];
    return [
        (k * (p3[0] - p4[0]) - (p1[0] - p2[0]) * l) / d,
        (k * (p3[1] - p4[1]) - (p1[1] - p2[1]) * l) / d
    ];
}

function debug_show_point(pt, style){
    if(!style) style = 'rgb(255,0,0)';
    debug_render.push(function(ctx){
        ctx.fillStyle = style;
        ctx.fillRect(pt[0]-2, pt[1]-2, 4, 4);
    });
}

function midpoint(a, b){
    return [(a[0]+b[0])/2, (a[1]+b[1])/2];
}

function shape_fully_selected(st, shape){
    if(shape.type != 'segments')
        return selected(shape.object);
    else
        return (selected(st.vertexes[shape.object.v0]) &&
                selected(st.vertexes[shape.object.v1]));
}

function point_scale(pt, o, v){
    return [
        (pt[0] - o[0]) * v[0] + o[0],
        (pt[1] - o[1]) * v[1] + o[1]
    ];
}

function initialise_properties_css(){
    var rules = [];

    $.each(type_properties, function(type, props){
        $.each(props, function(i, prop){
            var opts = properties[prop];
            rules.push('.selected_'+type+'.selected_tool_other .prop_'+prop+' { display: block }');
            if(opts.def)
                rules.push('.selected_tool_'+type+' .prop_'+prop+'{ display: block }');
        });
    });

    $('<style type="text/css">' + rules.join(newLine) + '</style>').appendTo($('head'));
}

function populate_tab_properties(){
    var tp = $('#tab_properties');
    $.each(properties, function(prop, opts){
        var type = opts.type;
        if(type != 'ref'){
            var div = $('<div class="property prop_' + prop + '"></div>').appendTo(tp);
            var label = $('<label for="' + prop + '" class="prop">' +  properties[prop].innerText + '</label>').appendTo(div);
            var apply = function(){
                property_apply(prop, property_data[prop]);
            };
            switch(type){
                
                // TODO: number point color team trait bool

            case 'bool':/*
                var inp = $('<input type="checkbox" class="prop">').appendTo(div);
                property_data[prop] = inp;
                inp.change(apply);
                break;
                */
                /*
                <select class="prop" style="width: 104px;" id="prop_kickOffReset">
                  <option data-langNum="317", value="partial">Partial</option>
                  <option data-langNum="318", value="full">Full</option>
                </select>
                */
            case 'point':
            case 'number':
            case 'color':
            case 'team':
            case 'layers':
            case 'length':
            case 'strength':
            case 'trait':
                var inp = $('<input name="' + prop + '"' + 'id="' + prop + '"' + 'type="text" class="prop">').appendTo(div);
                property_dataLabel[prop] = label;
                property_data[prop] = inp;
                inp.change(apply);
            }
        }
    });    
}

function property_apply(prop, inp){
    val = get_prop_val(prop);
    if(val !== undefined){
        for_selected(stadium, function(st, shape){
            let hasValid = function(tp, pr, v){
                if(pr != 'color' || v != 'transparent') return true;
                return !(tp == 'segments' || tp == 'vertexes');
            }
            //  segments 또는 vertexese 투명색 적용 불가 처리
            shape.object[prop] = (hasValid(shape.type, prop, val) ? val : '000000');
            // TODO: mirror the property update
        });
        modified();
    }
}

function get_prop_val(prop, def){
    var inp = property_data[prop];
    var label = property_dataLabel[prop];
    if(!inp)
        return def;
    var type = properties[prop].type;
    var val = inp.val();
    switch(type){
    case 'point':
        var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)[,;] ?(-?[0-9]+(\.[0-9]+)?)$/);
        if(m) return [parseFloat(m[1]), parseFloat(m[3])];
        break;
    case 'number':
        var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)$/);
        if(m) return parseFloat(m[1]);
        break;
    case 'color':
        //var m = val.match(/^[A-Z0-9]{6}$/i);
        //if(m) return m[0];
        //test_me = def;
        var m = parseColorExt(val);
        if(m != '') return m;
        break;
    case 'team':
        var m = val.match(/^red|blue$/i);
        if(m) return m[0];
        break;
    case 'layers':
        var layers = val.split(/[,; ]+/);
        var good = true;
        $.each(layers, function(i, layer){
            if($.inArray(layer, ['ball', 'red', 'blue', 'wall', 'redKO', 'blueKO', 'all', 'kick', 'score', 'c0', 'c1', 'c2', 'c3']) == -1)
                good = false;
        });
        if(good) return layers;
        break;
    case 'length':
        var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)$/);
        if(m) return parseFloat(m[1]);
        break;
    case 'strength':
        if(val == 'rigid') return val[0];
        var m = val.match(/^(-?[0-9]+(\.[0-9]+)?)$/);
        if(m) return parseFloat(m[1]);
        break;
    case 'trait':
        if(stadium.traits[val])
            return val;
        break;
    case 'bool':
        var m = val.match(/^true|false$/i);
        if(m=='true') return true;
        if(m=='false') return false;
        break;
    }
    if(val !== '')
        setError(prop, true);
    return def;
}

function setError(prop, isShow){
    if(!prop) return;
    let propList = [property_data[prop], property_dataLabel[prop]];
    propList.forEach(e => isShow == true ? e.addClass('error') : e.removeClass('error'));
}

function set_prop_val(prop, val){
    var inp = property_data[prop];
    if(!inp) return;

    setError(prop, false);

    if(val === undefined){
        inp.val('');
        return;
    }

    var type = properties[prop].type;
    switch(type){
    case 'point':
        inp.val(val[0]+','+val[1]);
        break;
    case 'number':
    case 'team':
    case 'trait':
    case 'bool':
    case 'strength':
        inp.val(''+val);
        break;
    case 'color':
        //parseColorExt(val);
        if(val instanceof Array){
            inp.val(rgb_to_hex(val));
        }else{
            inp.val(val);
        }
        break;
    case 'layers':
        inp.val(val.join(','));
        break;
    case 'length':
        break;
    }
}

triggers.set_tool.push(function(tool, old_tool){
    var tp = $('#tab_properties');
    tp.removeClass(tool_class_name(old_tool));
    tp.addClass(tool_class_name(tool));
});

function tool_class_name(tool){
    if(!tool)
        return 'selected_tool_none';
    switch(tool.name){
        case 'segment': return 'selected_tool_segments';
        case 'vertex':  return 'selected_tool_vertexes';
        case 'plane':   return 'selected_tool_planes';
        case 'disc':    return 'selected_tool_discs';
        case 'goal':    return 'selected_tool_goals';
        case 'joint':   return 'selected_tool_joints';
        default:        return 'selected_tool_other';
    }
}

function get_props_for_type(type){
    // TODO: if the prop is the same as from the trait, don't return it
    var props = {};
    $.each(type_properties[type], function(i, prop){
        var opts = properties[prop];
        if(opts.def){
            var val = get_prop_val(prop);
            if(val !== undefined)
                props[prop] = val;
        }
    });
    return props;
}

function reset_selection(){
    trigger('reset_selection');
}

function add_props_from_shape(shape){
    var obj = complete(stadium, shape.object);

    total_selected_by_type[shape.type] = (total_selected_by_type[shape.type] || 0) + 1;

    $('#tab_properties').addClass('selected_' + shape.type);

    $.each(type_properties[shape.type], function(i, prop){
        var n = total_selected_by_prop[prop] || 0;
        total_selected_by_prop[prop] = n + 1;

        var val = obj[prop];
        if(n === 0){
            set_prop_val(prop, val);
        }else if(!equal(val, get_prop_val(prop))){
            set_prop_val(prop, undefined);
        }
    });
}

triggers.select.push(add_props_from_shape);


triggers.unselect.push(function(shape){
    var count = total_selected_by_type[shape.type] - 1;
    total_selected_by_type[shape.type] = count;
    if(count === 0){
        $('#tab_properties').removeClass('selected_' + shape.type);
    }
    $.each(type_properties[shape.type], function(i, prop){
        total_selected_by_prop[prop] -= 1;
    });
});

triggers.reset_selection.push(function(){
    total_selected_by_type = {};
    total_selected_by_prop = {};
});

function list_equal(a, b){
    if(a.length != b.length)
        return false;
    for(var i = 0; i < a.length; i++){
        if(!equal(a[i], b[i]))
            return false;
    }
    return true;
}

function equal(a, b){
    // TODO: other types. atm this is just used to compare numbers, strings and arrays
    if(a instanceof Array){
        return (b instanceof Array) && list_equal(a,b);
    }else{
        return a == b;
    }
}

function modified(do_not_save){
    if(!do_not_save)
        savepoint(stadium);
    update_props(stadium);
    $('#button_save').addClass('modified');
    queue_render();
}

function update_props(st){
    $('#tab_properties').attr('class', tool_class_name(current_tool));

    total_selected_by_type = {};
    total_selected_by_prop = {};   

    for_all_shapes(st, function(shape){
        if(selected(shape.object)){
            add_props_from_shape(shape);
        }
    });
}

function rgb_to_hex(rgb){
    return rgb[0].toString(16) +
        rgb[1].toString(16) +
        rgb[2].toString(16);
}

function copy(){
    clipboard = clone_selected(stadium);
}

function paste(){
    import_snippet(stadium, clipboard);
}

function cut(){
    copy();
    delete_selected(stadium);
}

function duplicate(){
    import_snippet(stadium, clone_selected(stadium));
}

function clone_selected(st){
    // TODO: also clone traits, and on pasting iif traits don't exist, create them with cloned properties
    var snip = {
        shapes: []
    };
    for_all_shapes(st, function(shape){
        if(selected(shape.object)){
            snip.shapes.push(shape_clone(shape));
            if(shape.type == 'segments'){
                var a = st.vertexes[shape.object.v0];
                if(!selected(a)){
                    snip.shapes.push(shape_clone(Shape('vertexes', a, shape.object.v0)));
                }
                var b = st.vertexes[shape.object.v1];
                if(!selected(b)){
                    snip.shapes.push(shape_clone(Shape('vertexes', b, shape.object.v1)));
                }
            }
        }
    });
    return snip;
}

function import_snippet(st, snip){
    if(!snip)
        return;
    clear_selection(st);
    var svl = st.vertexes.length;
    var newi = {};
    $.each(snip.shapes, function(i, shape){
        var index = st[shape.type].length;
        var copy = $.extend(true, {}, shape.object);
        if(shape.type == 'vertexes'){
            if(!(shape.index in newi)){
                newi[shape.index] = svl ++;
            }
            index = newi[shape.index];
        }else if (shape.type == 'segments'){
            var v0 = copy.v0;
            var v1 = copy.v1;

            if(!(v0 in newi))
                newi[v0] = svl ++;
            copy.v0 = newi[v0];
            
            if(!(v1 in newi))
                newi[v1] = svl ++;
            copy.v1 = newi[v1];
        }
        st[shape.type][index] = copy;
        shape_set_selected(Shape(shape.type, st[shape.type][index], index), true);
    });
}

function eachRev(l, f){
    var n = l.length;
    $.each(l.slice().reverse(), function(i, v){
        return f(n-i-1, v);
    });
}

function set_selection_range(el, start, end){

    /* https://github.com/furf/jquery-textselection/blob/master/Selection-1.0.js */
    
    var value, range;

    el.focus();

    if(end === undefined)
        end = start;

    if (typeof end === 'undefined') {
        end = start;
    }

    // Mozilla / Safari
    if (typeof el.selectionStart !== 'undefined') {

        el.setSelectionRange(start, end);

        // IE
    } else {

        value = el.value;
        range = el.createTextRange();
        end   -= start + value.slice(start + 1, end).split(newLine).length - 1;
        start -= value.slice(0, start).split(newLine).length - 1;
        range.move('character', start);
        range.moveEnd('character', end);
        range.select();

    }
}

function mirror_data(object){
    var dat = data(object, 'mirror');
    if(dat === undefined){
        dat = {};
        data(object, 'mirror', dat);
    }
    return dat;
}

function reset_mirror_data(st){
    // TODO: how to handle shapes at exactly the same position?

    clear_selection(st);

    var link_types = ['horizontal', 'vertical', 'across'];

    for_all_shapes(st, ['vertexes', 'segments', 'goals', 'discs', 'planes', 'joints'], function(sh1){
        if(!emptyp(mirror_data(sh1.object)))
            return;
        for_all_shapes(st, [sh1.type], function(sh2){
            if(!emptyp(mirror_data(sh2.object)))
                return;
            switch(sh1.type){
            case 'vertexes':
                var pt1 = [sh1.object.x, sh1.object.y];
                var pt2 = [sh2.object.x, sh2.object.y];
                $.each(link_types, function(i, type){
                    if(mirror_of(pt1, pt2, type)){
                        link_shapes(sh1, sh2, type);
                    }
                });
                break;

            case 'segments':
                var v0 = st.vertexes[sh1.object.v0];
                var v1 = st.vertexes[sh1.object.v1];
                var ma = mirror_data(st.vertexes[sh2.object.v0]);
                var mb = mirror_data(st.vertexes[sh2.object.v1]);
                $.each(link_types, function(i, type){
                    if(ma[type] == v0 && mb[type] == v1 &&
                       complete(st, sh1.object).curve == complete(st, sh2.object).curve){
                        link_shapes(sh1, sh2, type);
                    }else if(ma[type] == v1 && mb[type] == v0 &&
                             complete(st, sh1.object).curve == -complete(st, sh2.object).curve){
                        shape_switch_ends(sh1);
                        link_shapes(sh1, sh2, type);
                    }
                });
                break;

            case 'discs':
                if(sh1.object.radius == sh2.object.radius){
                    $.each(link_types, function(i, type){
                        if(mirror_of(sh1.object.pos, sh2.object.pos, type)){
                            link_shapes(sh1, sh2, type);
                        }
                    });
                }
                break;

            case 'goals':
                $.each(link_types, function(i, type){
                    if(mirror_of(sh1.object.p0, sh2.object.p0, type) &&
                       mirror_of(sh1.object.p1, sh2.object.p1, type)){ 
                        link_shapes(sh1, sh2, type);
                    }else if(mirror_of(sh1.object.p0, sh2.object.p1, type) &&
                             mirror_of(sh1.object.p1, sh2.object.p0, type)){ 
                        shape_switch_ends(sh1);
                        link_shapes(sh1, sh2, type);
                    }
                });
                break;

            case 'planes':
                $.each(link_types, function(i, type){
                    if(sh1.object.dist == sh2.object.dist &&
                       mirror_of(sh1.object.normal, sh2.object.normal, type)){
                        link_shapes(sh1, sh2, type);
                    }
                });
                break;

            case 'joints':
                var d0 = st.discs[sh1.object.d0];
                var d1 = st.discs[sh1.object.d1];
                var ma = mirror_data(st.discs[sh2.object.d0]);
                var mb = mirror_data(st.discs[sh2.object.d1]);
                $.each(link_types, function(i, type){
                    if(ma[type] == d0 && mb[type] == d1){
                        link_shapes(sh1, sh2, type);
                    }
                    else if(ma[type] == d1 && mb[type] == d0){
                        shape_switch_ends(sh1);
                        link_shapes(sh1, sh2, type);
                    }
                });
                break;
            }
        });
    });

    queue_render();
}

function mirror_of(pt1, pt2, type){
    return !equal(pt1, pt2) && equal(pt1, mirror_point(pt2, type));
}

function mirror_point(pt, type){
    switch(type){
    case 'horizontal':
        return [-pt[0], pt[1]];
    case 'vertical':
        return [pt[0], -pt[1]];
    case 'across':
        return [-pt[0], -pt[1]];
    }
}

function link_shapes(sh1, sh2, dir){
    if(sh1.object == sh2.object)
        return;
    var dat1 = mirror_data(sh1.object)
    var dat2 = {};
    var cancel = false;
    $.each(dat1, function(k, sh3){
        if(sh3.object == sh1.object || sh3.object == sh2.object)
            cancel = true;
    });
    if(cancel)
        return;
    $.each(dat1, function(k, sh3){
        dat2[compose_mirror_directions(dir, k)] = sh3;
        mirror_data(sh3.object)[compose_mirror_directions(dir, k)] = sh2;
    });
    dat1[dir] = sh2;
    dat2[dir] = sh1;
    data(sh2.object, 'mirror', dat2)
}

function emptyp(o){
    for(i in o){
        return false;
    }
    return true;
}

function shape_switch_ends(sh){
    switch(sh.type){
    case 'segments':
        var seg = sh.object;
        seg.curve = -seg.curve;
        var tmp = seg.v0;
        seg.v0 = seg.v1;
        seg.v1 = tmp;
        break;
        
    case 'joints':
        var jnt = sh.object;
        var tmp = jnt.d0;
        jnt.d0 = jnt.d1;
        jnt.d1 = tmp;
        break;
        
    case 'goals':
        var tmp = sh.object.p0;
        sh.object.p0 = sh.object.p1;
        sh.object.p1 = tmp;
        break;
    }
}

function clear_mirror_data(st){
    for_all_shapes(st, function(shape){
        data(shape.object, 'mirror', {});
    });
    disabled_mirroring = {};
}

triggers.select.push(function(sh1){
    //if mirror of shape is selected too, disable mirroring in that direction
    $.each(mirror_data(sh1.object), function(dir, sh2){
        if(selected(sh2.object)){
            disabled_mirroring[dir] = (disabled_mirroring[dir] || 0) + 1;
        }
    });
});

triggers.unselect.push(function(sh1){
    $.each(mirror_data(sh1.object), function(dir, sh2){
        if(selected(sh2.object)){
            disabled_mirroring[dir] -- ;
        }
    });
});

triggers.reset_selection.push(function(){
    disabled_mirroring = {};
});

function compose_mirror_directions(d1, d2){
    return {
        'horizontal vertical': 'across',
        'vertical horizontal': 'across',
        'across vertical': 'horizontal',
        'vertical across': 'horizontal',
        'across horizontal': 'vertical',
        'horizontal across': 'vertical'
    }[d1 + ' ' + d2];
}

function segment_vertices(st, seg){
    var v0 = seg.object.v0;
    var v1 = seg.object.v1;
    return [
        Shape('vertexes', st.vertexes[v0], v0),
        Shape('vertexes', st.vertexes[v1], v1)
    ];
}

function joint_discs(st, jnt){
    var d0 = jnt.object.d0;
    var d1 = jnt.object.d1;
    return [
        Shape('discs', st.discs[d0], d0),
        Shape('discs', st.discs[d1], d1)
    ];
}

function mirroring_disabled(dir){
    if(!mirror_mode)
        return true;
    if(disabled_mirroring['across'])
        return true;
    if(dir == 'across')
        return disabled_mirroring['across'] || disabled_mirroring['horizontal'] || disabled_mirroring['vertical'];
    if(disabled_mirroring[dir])
        return true;
    return false;
}

function shape_clone(shape){
    return Shape(shape.type, object_clone(shape.object), shape.index);
}

function object_clone(obj){
    var clone = {};
    $.each(obj, function(k, v){
        if(k != '_data'){
            if(v instanceof Array){
                clone[k] = $.extend([], v);
            }else if(typeof v == 'object'){
                clone[k] = $.extend({}, v);
            }else{
                clone[k] = v;
            }
        }
    });
    return clone;
}

function load_file(){           // 맵 불러오기
    var fileList = file.files ;
    
    // 읽기
    var reader = new FileReader();
    reader.readAsText(fileList [0]);

    //로드 한 후
    reader.onload = function  () {
        document.querySelector('#preview').textContent = reader.result ;
    }; 
}

function login(){
    var error = function(e){
        // TODO: log to server
        alert('Error during login. Please try again later. (' + e + ')');
    }
    var username = $('#login_name').val();
    $.ajax({
        type: 'POST',
        url: 'http://web.archive.org/web/20181129142757/http://haxpuck.com/action/login', 
        dataType: 'json',
        data: {
            name: username,
            password: $('#login_password').val(),
            sessionid: session_id
        },
        success: function(login){
            if(!login){
                error('empty response from server');
            }else if(login.success){
                set_logged_in(login.id, username);
                hide_box();
            }else{
                alert('unable to login: ' + login.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });
}

function register(){
    var error = function(e){
        // TODO: log to server
        alert('Error during registration. Please try again later. (' + e + ')');
    }
    $.ajax({
        type: 'POST',
        url: 'http://web.archive.org/web/20181129142757/http://haxpuck.com/action/register', 
        dataType: 'json',
        data: {
            name: $('#register_name').val(),
            password: $('#register_password').val(),
            email: $('#register_email').val(),
            sessionid: session_id
        },
        success: function(registration){
            if(!registration){
                error('empty response from server');
            }else if(registration.success){
                alert('Registration successful. Please open the link sent to your email to confirm your registration.');
                hide_box();
            }else{
                alert('unable to register: ' + registration.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });
}

function set_logged_in(id, name){
    user_info = {};
    user_info.id = id;
    user_info.name = name;
    $('body').addClass('logged-in').removeClass('logged-out');
}

function set_logged_out(){
    user_info = {};
    $('body').addClass('logged-out').removeClass('logged-in');
}

function logout(){
    $.ajax({type: 'POST', url: 'http://web.archive.org/web/20181129142757/http://haxpuck.com/action/logout', data: {sessionid: session_id}});
    set_logged_out();
}

function check_logged_in(){
    $.ajax({
        type: 'GET',
        url: 'http://web.archive.org/web/20181129142757/http://haxpuck.com/action/session', 
        dataType: 'jsonp',
        success: function(session){
            session_id = session.sessionid;
            if(session && session.username !== null && session.userid !== null){
                set_logged_in(session.userid, session.username);
            }
        },
    });
}

function save(success_continuation){
    var id = user_info.id;
    if(!id) return;

    if(!$('#button_save').hasClass('modified')){
        if(success_continuation)
            success_continuation(last_save_id);
        return;
    }

    var error = function(e){
        // TODO: log to server
        alert('Error during save. Please try again later. (' + e + ')');
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            userid: id,
            sessionid: session_id,
            name: stadium.name,
            stadium: pprint(stadium, 10),
            overwrite: last_save_name == stadium.name ? last_save_id : 0
        },
        success: function(result){
            if(!result){
                error('empty response from server');
            }else if(result.success){
                last_save_id = result.id;
                console.log('last_save_id', last_save_id);
                last_save_name = stadium.name;
                $('#button_save').removeClass('modified');
                if(success_continuation)
                    success_continuation(result.id);
            }else{
                alert('unable to save: ' + result.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });
}

function library_query(){
    $('#library_list').empty();
    var error = function(e){
        $('<tr></tr>').html(
            $('<td colspan="3"></td>').
                text('Error Loading Data: '+e)).
            appendTo($('#library_list'));
    }
    $.ajax({
        type: 'POST',
        url: 'http://web.archive.org/web/20181129142757/http://haxpuck.com/action/list_hbs',
        dataType: 'json',
        data: {
            sessionid: session_id,
            query: library.query
        },
        success: function(result){
            if(!result){
                error('empty response from server');
            }else if(result.success){
                library.list = result.list;
                library_update();
            }else{
                error('List Unavailable: ' + result.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });    
}

function library_update(){
    var tb = $('#library_list');
    $.each(library.list, function(i, info){
        $('<tr></tr>').
            append(
                $('<td></td>').html(info.time),
                $('<td></td>').text(info.username),
                $('<td></td>').text(info.name)
            ).appendTo(tb).data({id: info.id, userid: info.userid}).click(function(){
                $(this).addClass('active').siblings().removeClass('active');
                if(user_info && $(this).data('userid') == user_info.id){
                    $('#boxlibrary').addClass('owner');
                }else{
                    $('#boxlibrary').removeClass('owner');
                }
                return false;
            });
    });
}

function library_edit(){
    var sid = $('#library_list tr.active').data('id');
    if(!sid)
        return;
    
    var error = function(e){
        alert('Error while opening stadium: ' + e);
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            sessionid: session_id,
            id: sid
        },
        success: function(result){
            if(!result){
                error('empty response from server');
            }else if(result.success){
                load(result.stadium);
                hide_box();
                modified();
            }else{
                error(result.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });    
}

function library_delete(){
    var sid = $('#library_list tr.active').data('id');
    if(!sid)
        return;
    
    if(!confirm('Are you sure you want to delete this stadium?'))
        return;

    var error = function(e){
        alert('Error while deleting stadium: ' + e);
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {
            sessionid: session_id,
            id: sid
        },
        success: function(result){
            if(!result){
                error('empty response from server');
            }else if(result.success){
                $('#library_list tr.active').next().addClass('active');
                $('#library_list tr.active').eq(0).remove();
            }else{
                error(result.reason);
            }
        },
        error: function(x, e){
            error(e);
        }
    });    
}

function download(st){
    if(!st){ 
        alert($.lang[getLang()][7]);
        return;		//	데이터가 없는 경우
    }
    let hasOverflow = function(st){
        let types = [
            'segments', 'vertexes', 'discs', 'goals', 'planes', 'joints'
        ];
        let getAlertKeyword = function(st){
            let hasValidAmount = (prp) => prp == undefined ? true : prp.length <= 255;
            for(let i = 0; i < types.length; i++){
                let prop = st[types[i]];
                if(!hasValidAmount(prop)) return 33 + i;
            }
            return false;
        }
        let getOverflow = function(str){
            let getProp = function(type){
                let index = type - 33;
                if(index >= types.length) return [];
                return st[types[index]];
            }
            return getProp(str).length - 255;
        }
        let alertKeyword = getAlertKeyword(st);
        if(!alertKeyword) return false;
        if(alertKeyword > 0) alert($.lang[getLang()][8]
        +"\n" + $.lang[getLang()][123] + $.lang[getLang()][alertKeyword] + '(' + getOverflow(alertKeyword) + ')');
        return true;
    }
    if(hasOverflow(st)) return;
    let title = (st.name + ".hbs");
    const downloadURL = (data, name) => {
        const a = document.createElement('a')
        a.href = data
        a.download = name;
        document.body.appendChild(a)
        a.style.display = 'none'
        a.click()
        a.remove()
    }  
    const downloadBlob = (data, name, mimeType) => {
        const blob = new Blob([data], {
            type: mimeType
        })
        const url = window.URL.createObjectURL(blob)
        downloadURL(url, name);
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }
    //downloadBlob(fileData, fileName, "application/octet-stream");
    downloadBlob(pprint(st), title, "application/prs.hbs");
}

function parseColor(str){
    if(str.match('^[A-Fa-f0-9]{6}$')) return str;
    return '';
}

function parseColorExt(str){
    return str.match('transparent') ? str : parseColor(str);
}

function parseCameraFollow(str){
    if(str.match('ball') || str.match('player')) return str;
    return '';
}

function parseKickOffReset(str){
    if(str.match('partial') || str.match('full')) return str;
    return '';
}

function parseCanBeStored(){
    return parseBool(prop_canBeStored);
    //let res = str.match('true') ? true : str.match('false') ? false : '';
    //return res;
    //return str.match('true') ? true : str.match('false') ? false : '';
}
function parseVis(){ 
    return parseBool(prop_vis);
}

function parseBool(prop){ 
    return $(prop).prop("checked");
}

function parseVector(str){
    var list = str.split(',');
    let pos = [parseFloat(list[0]), parseFloat(list[1])];
    if(isNaN(pos[0]) == true || isNaN(pos[1]) == true)
        return [0, 0];
    return pos;
}

function parseMaskList(str){
    var list = str.split(',');
    var out = [];
    $.each(list, function(i, w){
        if($.inArray(w, ['ball', 'red', 'blue', 'wall', 'redKO', 'blueKO', 'all', 'kick', 'score', 'c0', 'c1', 'c2', 'c3']) != -1){
            out.push(w);
        }
    });
    return out;
}