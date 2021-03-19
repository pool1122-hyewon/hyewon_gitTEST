$(function(){

    $('header').load('inc.html header article', init);
    $('footer').load('inc.html footer');

    function init(){
            
        $('nav a').on('click',function(){
            localStorage.pageNum = $(this).index();
        });
        $('nav a').eq(localStorage.pageNum).css({color:'gray'})
        
        $('nav #log').on('click',function(){        
            $('.login').css('display','flex');
        });
    }
    $('.login').on({
        'mousewheel':function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        'click':function(e){
            if(e.target.className != 'login') return;
            $(this).hide();
        }
    })
    $('input[type=submit]').on('click',dataCheck);
            function dataCheck(e){
                e.preventDefault();

                var $id = $('input[name=id]');
                var $passward = $('input[name=passward]');

                var regName = /^[a-zA-z0-9]{4,12}$/;
                var regEmail = /^[a-zA-z0-9]{4,12}$/;

                if($id.val() == '' || regName.test($id.val()) ){
                    alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!")
                    $id.focus();
                    return false;
                }
                if($passward.val() == '' || regEmail.test($passward.val()) ){
                    alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!")
                    $passward.focus();
                    return false; 
                }
            }

    $(window).on('scroll',function(e){
        var scrTop = $(this).scrollTop()

        if(scrTop > 1){
          $('article').addClass('active');
        }else{
            $('article').removeClass('active');
        }
    });


    var delta, loop, num=0,pos=[];

    for(var i=1;i<6;i++){
        pos.push($(".spot0"+i+"").offset().top);
    }
    console.log(pos);
    $(window).on('mousewheel DOMMouseScroll',function(e){
        delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        
        clearTimeout(loop);
        loop = setTimeout(function(){
            if(delta<0){
                //down
                if(num != 4) num++;
            }else{
                //up
                if(num > 0)num--;
            }
            
            $('.all').animate({marginTop:-pos[num]});
            
        },250);
    });

    

    
})
