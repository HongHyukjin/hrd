import React from 'react';
import $ from 'jquery';


export default function IntroMainComponent() {

    const [state,setState] = React.useState({
        count : 1
    });

    // 판매가격, 정가 콤마형식 함수
    const commaPrice=(price)=>{
        let value = price.toString();
        //     300  
        // 383,000  
        const regExp = /(^\d+)(\d{3})/g;  // (그룹1)(그룹2)
        // console.log('정가 가져오기 = ' , price );
        // console.log('정가.toString  = ' , value );
        // 가져온 데이터값은 숫자이다 그래서 파란색으로 콘솔로그에 표시
        // 정규표현식 반드시 문자열만 처리가능하다.
        // 문자열형식으로 변환 시키기

        // 반복문 처리 모두처리
        // 리턴문으로 결과값 돌려준다.
        while( regExp.test(value) ){
            return  value.replace(regExp, '$1,$2');
        }        
    }

    // 섹션1 컴포넌트 메인 슬라이드
    React.useEffect(() => {

        const $slideContainer = $('#section1 .slide-container');
        const $slideWrap      = $('#section1 .slide-wrap');
        const $slide          = $('#section1 .slide');
        const $slidea          = $('#section1 .slide a');
        const $leftArrowBtn = $('#section1 .left-arrow-btn');
        const $rightArrowBtn = $('#section1 .right-arrow-btn');
        const $currentNumber = $('#section1 .current-number');
        const $totalNumber = $('#section1 .total-number');

        let cnt = 0;
        let n = $slide.length - 2;
        let setId = 0;
        

        // 1. 메인슬라이드함수
        function mainSlide(){
            $slideWrap.stop().animate({left:`${-100*cnt}%`}, 600, function(){
                if(cnt >= n){cnt=0}
                if(cnt < 0){cnt=n-1}
                $slideWrap.stop().animate({left:`${-100*cnt}%`}, 0)
            });
        }

        // 2. 다음카운트함수
        function nextCount(){
            cnt++;
            setState({
                ...state,
                count : (cnt+1>23)?1:(cnt+1===0?n:cnt+1)
            })
            // slidePageEvent();
            mainSlide();
        }

        // 2. 이전카운트함수
        function prevCount(){
            cnt--;
            setState({
                ...state,
                count : (cnt+1>23)?1:(cnt+1===0?n:cnt+1)
            })
            // slidePageEvent();
            mainSlide();
        }

        // 3. 자동타이머함수
        function autoTimer(){
            clearInterval(setId);
            setId = setInterval(nextCount, 2000);
            // 타이머 setId 변수 모든 값들은 브라우저 저장소에서 관리한다.
            // 저장소 key = ""
            const key = 'SETID_SEC1_SLIDE';
            sessionStorage.setItem(key, setId);
        }
        autoTimer();
        $slideContainer.on({
            mouseenter(){
                clearInterval(setId);
                $rightArrowBtn.stop().fadeIn(1000);
                $leftArrowBtn.stop().fadeIn(1000);
            },
            mouseleave(){
                autoTimer();
                $rightArrowBtn.stop().fadeOut(1000);
                $leftArrowBtn.stop().fadeOut(1000);
            }
        })

        // 5. 슬라이드 페이지 번호
        function slidePageEvent(){
            $currentNumber.html((cnt+1>23)?1:(cnt+1===0?n:cnt+1));
            $totalNumber.html(n);
        }

        // 6. 다음 화살버튼 클릭이벤트
        $rightArrowBtn.on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        })

        // 6. 이전 화살버튼 클릭이벤트
        $leftArrowBtn.on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        })

        $slidea.on({
            click(e){
                e.preventDefault();
            }
        })

    },[]);

    // 섹션2 슬라이드
    React.useEffect(() => {

        const $slideContainer = $('#section2 .slide-container');
        const $slideWrap = $('#section2 .slide-wrap');
        const $slide = $('#section2 .slide');
        const $leftArrowBtn = $('#section2 .left-arrow-btn');
        const $rightArrowBtn = $('#section2 .right-arrow-btn');

        let cnt = 0;
        let n = ($slide.length-16)/4;

        // 1. 메인슬라이드 함수
        function mainSlide(){
            console.log(cnt);
            $slideWrap.stop().animate({left : `${-100 * cnt}%`}, 600, function(){
                if(cnt >= n){cnt = 0;}
                if(cnt < 0){cnt = n-1;}
                $slideWrap.stop().animate({left : `${-100 * cnt}%`}, 0);
            })
        }

        // 2. 다음카운트함수
        function nextCount(){
            cnt++;
            mainSlide();
        }

        function prevCount(){
            cnt--;
            mainSlide();
        }

        // 3. 다음화살버튼 클릭이벤트
        $rightArrowBtn.on({
            click(e){
                e.preventDefault();
                nextCount();
            }
        })

        $leftArrowBtn.on({
            click(e){
                e.preventDefault();
                prevCount();
            }
        })
    }, []);

    // 섹션3
    // 24시간 일일특가
    React.useEffect(() => {
        let setId = 0;

        function saleTimer(){
            // 1. 타임세일 시작 시점
            let start = new Date('2023-04-27 17:50:00');
            // 2. 현재시간 
            let now = new Date();
            // 3. 시간 + 24 일일특가 시간 세팅 세터함수
            start.setHours(start.getHours() + 24);
            // 4. 남은시간 = 타임시작시간 - 현재시간
            let end = start - now;
            // 5. 남은시간 === 0 타임종료
            //    현재시간 >= 셋팅시간 종료
            //    모두 초기화 일 : 시 : 분 : 초


            let eD = Math.floor(end/(60*60*24*1000));   //일
            let eH = Math.floor(end/(60*60*1000))%24; //시
            let eM = Math.floor(end/(60*1000))%60;    //분
            let eS = Math.floor(end/(1000))%60;       //초

            // 현재시간 >= 타임세일
            if(now >= start){
                clearInterval(setId);
                eD = 0;
                eH = 0;
                eM = 0;
                eS = 0;
                $('#section3 .hours').text(eH<10?`0${eH}`:eH);
                $('#section3 .minutes').text(eM<10?`0${eM}`:eM);
                $('#section3 .seconds').text(eS<10?`0${eS}`:eS);
            }
            else{
                $('#section3 .hours').text(eH<10?`0${eH}`:eH);
                $('#section3 .minutes').text(eM<10?`0${eM}`:eM);
                $('#section3 .seconds').text(eS<10?`0${eS}`:eS);
            }

        }
        setId = setInterval(saleTimer, 1000);

    }, [])

    return (
        <main id='main' className='sub-page intro'>
            
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title  hide">
                            <h2>마켓컬리 메인 슬라이드</h2>
                        </div>
                        <div className="content">
                            <div className="slide-container">
                                <div className="slide-view">
                                    <ul className="slide-wrap">
                                        {/* li.slide$@0*23>a[href=!#]>img[src=./images/intro/intro_main_slide$$@1.jpg] */}
                                        <li className="slide slide22"><a href="!#"><img src="./images/intro/intro_main_slide23.jpg" alt="" /></a></li>
                                        <li className="slide slide0" ><a href="!#"><img src="./images/intro/intro_main_slide01.jpg" alt="" /></a></li>
                                        <li className="slide slide1" ><a href="!#"><img src="./images/intro/intro_main_slide02.jpg" alt="" /></a></li>
                                        <li className="slide slide2" ><a href="!#"><img src="./images/intro/intro_main_slide03.jpg" alt="" /></a></li>
                                        <li className="slide slide3" ><a href="!#"><img src="./images/intro/intro_main_slide04.jpg" alt="" /></a></li>
                                        <li className="slide slide4" ><a href="!#"><img src="./images/intro/intro_main_slide05.jpg" alt="" /></a></li>
                                        <li className="slide slide5" ><a href="!#"><img src="./images/intro/intro_main_slide06.jpg" alt="" /></a></li>
                                        <li className="slide slide6" ><a href="!#"><img src="./images/intro/intro_main_slide07.jpg" alt="" /></a></li>
                                        <li className="slide slide7" ><a href="!#"><img src="./images/intro/intro_main_slide08.jpg" alt="" /></a></li>
                                        <li className="slide slide8" ><a href="!#"><img src="./images/intro/intro_main_slide09.jpg" alt="" /></a></li>
                                        <li className="slide slide9" ><a href="!#"><img src="./images/intro/intro_main_slide10.jpg" alt="" /></a></li>
                                        <li className="slide slide10"><a href="!#"><img src="./images/intro/intro_main_slide11.jpg" alt="" /></a></li>
                                        <li className="slide slide11"><a href="!#"><img src="./images/intro/intro_main_slide12.jpg" alt="" /></a></li>
                                        <li className="slide slide12"><a href="!#"><img src="./images/intro/intro_main_slide13.jpg" alt="" /></a></li>
                                        <li className="slide slide13"><a href="!#"><img src="./images/intro/intro_main_slide14.jpg" alt="" /></a></li>
                                        <li className="slide slide14"><a href="!#"><img src="./images/intro/intro_main_slide15.jpg" alt="" /></a></li>
                                        <li className="slide slide15"><a href="!#"><img src="./images/intro/intro_main_slide16.jpg" alt="" /></a></li>
                                        <li className="slide slide16"><a href="!#"><img src="./images/intro/intro_main_slide17.jpg" alt="" /></a></li>
                                        <li className="slide slide17"><a href="!#"><img src="./images/intro/intro_main_slide18.jpg" alt="" /></a></li>
                                        <li className="slide slide18"><a href="!#"><img src="./images/intro/intro_main_slide19.jpg" alt="" /></a></li>
                                        <li className="slide slide19"><a href="!#"><img src="./images/intro/intro_main_slide20.jpg" alt="" /></a></li>
                                        <li className="slide slide20"><a href="!#"><img src="./images/intro/intro_main_slide21.jpg" alt="" /></a></li>
                                        <li className="slide slide21"><a href="!#"><img src="./images/intro/intro_main_slide22.jpg" alt="" /></a></li>
                                        <li className="slide slide22"><a href="!#"><img src="./images/intro/intro_main_slide23.jpg" alt="" /></a></li>
                                        <li className="slide slide0"><a href="!#"><img src="./images/intro/intro_main_slide01.jpg" alt="" /></a></li>                                        
                                    </ul>
                                </div>
                                <a href="!#" className='left-arrow-btn'><img src="./images/intro/icon_right_arrow_gray.svg" alt="" /></a>
                                <a href="!#" className='right-arrow-btn'><img src="./images/intro/icon_right_arrow_gray.svg" alt="" /></a>

                                <span className='page-count-box'>
                                    <em className='current-number'>{state.count}</em>
                                    <i>/</i>
                                    <em className='total-number'>{23}</em>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="sectionTopBanner">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            섹션탑배너
                        </div>
                        <div className="content">
                            <a href="!#">
                                <img src="./images/intro/e1493ecc-2aa4-4f48-aaa9-41ad2093dec7.jpg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>이 상품 어때요?</h2>
                        </div>
                        <div className="content">
                            <div className="slide-container">
                                <div className="slide-view">
                                    <ul className="slide-wrap">
                                        <li className="slide slide12">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide13.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide13">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide14.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide14">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide15.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide15">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide16.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide16">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide17.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide17">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide18.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide18">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide19.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide19">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide20.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>

                                        <li className="slide slide0">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide1.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide1">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide2.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide3.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide3">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide4.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide4">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide5.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide5">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide6.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide6">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide7.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide7">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide8.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide8">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide9.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide9">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide10.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide10">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide11.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide11">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide12.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide12">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide13.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide13">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide14.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide14">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide15.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide15">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide16.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide16">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide17.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide17">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide18.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide18">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide19.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide19">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide20.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide0">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide1.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide1">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide2.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide2">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide3.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide3">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide4.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide4">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide5.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide5">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide6.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide6">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide7.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="slide slide7">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide8.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[풀무원]</strong> <em>로스팅 돈코츠라멘 (4개입)</em></li>                                                        
                                                            <li>5,450</li>
                                                            <li>후기</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                        </li>                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="!#" className='left-arrow-btn'><img src="./images/intro/icon_left_arrow_white.svg" alt="" /></a>
                <a href="!#" className='right-arrow-btn'><img src="./images/intro/icon_left_arrow_white.svg" alt="" /></a>
            </section>
            <section id="section3">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <div className="left">
                                <ul>
                                    <li>
                                        <h2>일일특가</h2>
                                    </li>
                                    <li>
                                        <h3>24시간 한정 특가</h3>
                                    </li>
                                    <li>
                                        <span><img src="./images/intro/icon_timer.svg" alt="" /></span>
                                        <span className='hours'></span>
                                        <span>:</span>
                                        <span className='minutes'></span>
                                        <span>:</span>
                                        <span className='seconds'></span>
                                    </li>
                                    <li>
                                        <p>망설이면 늦어요!</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="right">
                                <ul>
                                    <li className="slide slide0">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide1.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                    </li>
                                    <li className="slide slide1">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide2.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                    </li>
                                    <li className="slide slide2">
                                            <div className="col-gap">
                                                <a href="!#">
                                                    <div className="img-box">
                                                        <img src='./images/intro/sec2_slide3.jpg' alt="" />
                                                        <span>
                                                            <img src="./images/sub1/icon_cart.svg" alt="" />
                                                        </span>
                                                    </div>
                                                    <div className="tex-box">
                                                        <ul>                                                        
                                                            <li><strong>[하남핫푸드]</strong> <em>낙지 볶음 350g (냉동) </em></li>
                                                            <li>{}</li>
                                                            <li><span className='rate-price'>{0.18===0?``:`${Math.round(0.18*100)}%`}</span>{0.18 > 0 && (<span className='panme-price'>{commaPrice(42900*(1-0.18))}</span>) }</li>
                                                            <li>{ 0.18===0? <span className='panme-price'>{commaPrice(42900)}</span> : <s>{commaPrice(42900)}</s> }</li>
                                                            <li>{}</li>
                                                        </ul> 
                                                    </div>
                                                </a>
                                            </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section4">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section5">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section6">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section7">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section8">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section9">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
            <section id="section10">
                <div className="container">
                    <div className="gap">
                        <div className="title"></div>
                        <div className="content"></div>
                    </div>
                </div>
            </section>
        </main>
    );
};

