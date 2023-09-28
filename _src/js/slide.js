let sliderCheck = document.querySelector(".js-slider");
    if (sliderCheck !== null) {
    let container = {
    };
    let slider = document.querySelectorAll(".js-slider");
    Array.from(slider);
    window.addEventListener("DOMContentLoaded", () => {
    sliderFlow(slider);
    resizeFnction(slider);
    
    });
    }
    
    //flow
    function sliderFlow(slider) {
        slider.forEach((v, i) => {
            containerKeyCreate(v, i);
            sliderScrollHint(v, i);
            imgFlow(v, i);
            sliderImgHeightWidth(v, i);
            if (mqMin768.matches) {
                sliderDotSet(v, i);
                sliderArrowSet(v, i);
            }
            browserCheck(v, i);
        });
    }
    function containerKeyCreate(v, i) {
        container[`num${i}`] = {};
        container[`num${i}`].count = 0;
        container[`num${i}`].safariCount = 0;
        container[`num${i}`].slider = v;
        container.windowWidth = window.innerWidth;
    }
    
    function imgFlow(ele, i) {
        let sliderImg = ele.querySelectorAll("img");
        container[`num${i}`].img = sliderImg;
        for (var n = 0; n <= sliderImg.length - 1; n++) {
            if (n === 0) {
                sliderScrollHintWatcher(ele, i);
            } else if (n !== 0 && userAgent.indexOf('chrome') != -1 && mqMax767.matches) {
                sliderImg[n].classList.add("media-chrome-margin-left");
            } else {
                mediaImgSpan(ele, sliderImg[n], i, n);
            }
        }
    }
    
    function browserCheck(v, i) {
        if (userAgent.indexOf('chrome') != -1 && mqMin768.matches) {
            v.style.height = `${container[`num${i}`].height}px`;
        } else if (userAgent.indexOf('chrome') != -1 && mqMax767.matches) {
            v.classList.add("slider-media-chrome");
        } else if (userAgent.indexOf('safari') != -1) {
            safariRect(v, v, i);
        }
    }
    
    function safariRect(ele, element, i) {
        window.addEventListener("scroll", () => {
            if (sliderImgRectGet(ele, i).height >= 1 && container[`num${i}`].safariCount !== 1) {
                sliderImgHeightWidth(ele, i);
                element.style.height = `${container[`num${i}`].height}px`;
                if (mqMin768.matches && container[`num${i}`].img.length > 2) {
                    focusSideLeft(container[`num${i}`].img[container[`num${i}`].dotLength], i);
                    focusSideRight(container[`num${i}`].img[1], i);
                }
            }
        })
    }
    
    
    //dot
    function sliderDotSet(ele, i) {
        let dotWrap = document.createElement("div");
        dotWrap.classList.add("dot-wrap");
        ele.lastElementChild.after(dotWrap);
    
        for (var n = 0; n <= container[`num${i}`].img.length - 1; n++) {
            let dot = document.createElement("div");
            dot.classList.add("dot");
            dotWrap.appendChild(dot);
            dotClickEvent(dot, i, n, container[`num${i}`].img);
            if (n === 0) {
                focusTrue(container[`num${i}`].img[n], dot);
            } else {
                focusFalse(container[`num${i}`].img[n], dot);
            }
        }
        container[`num${i}`].dot = ele.querySelectorAll(".dot");
        container[`num${i}`].dotLength = container[`num${i}`].img.length - 1;
        if (mqMin768.matches && container[`num${i}`].img.length > 2) {
            focusSideLeft(container[`num${i}`].img[container[`num${i}`].dotLength], i);
            focusSideRight(container[`num${i}`].img[1], i);
        }
    
        function dotClickEvent(ele, i, n, sliderImg) {
            ele.addEventListener("click", () => {
                focusReset(sliderImg);
                setTimeout(() => {
                    focusFalse(sliderImg[container[`num${i}`].count], container[`num${i}`].dot[container[`num${i}`].count]);
                    container[`num${i}`].count = n;
                    focusTrue(sliderImg[container[`num${i}`].count], ele);
                    if (sliderImg.length > 2) {
                           focusSideReferee(sliderImg, i);
                    }
                }, 100);
            })
        }
    }
    
    
    //arrow
    function sliderArrowSet(ele, i) {
        let arrowLeft = document.createElement("div");
        let arrowRight = document.createElement("div");
        arrowLeft.classList.add("slider-arrow-left");
        arrowRight.classList.add("slider-arrow-right");
        ele.firstElementChild.before(arrowRight);
        ele.firstElementChild.before(arrowLeft);
        container[`num${i}`].arrowLeft = arrowLeft;
        container[`num${i}`].arrowRight = arrowRight;
        arrowClickEvent(arrowLeft, container[`num${i}`].img, i, -1);
        arrowClickEvent(arrowRight, container[`num${i}`].img, i, +1);
    
        function arrowClickEvent(arrow, sliderImg, i, calc) {
            arrow.addEventListener("click", () => {
                Array.from(sliderImg);
                sliderImg.forEach((va, index) => {
                    va.style.transition = "";
                });
                let focusElement = ele.querySelector(".slider-focus");
                container[`num${i}`].count += calc;
                container[`num${i}`].safariCount = 1;
    
                if (container[`num${i}`].count < 0) {
                    container[`num${i}`].count = container[`num${i}`].dotLength;
                    if (container[`num${i}`].img.length <= 2) {
                        focusReset(sliderImg);
                        setTimeout(() => {
                            focusFalse(focusElement, container[`num${i}`].dot[0]);
                            focusTrue(sliderImg[container[`num${i}`].dotLength], container[`num${i}`].dot[container[`num${i}`].dotLength]);
                        }, 100);
                    } else if (container[`num${i}`].img.length > 2) {
                        focusFalse(focusElement, container[`num${i}`].dot[0]);
                        focusTrue(sliderImg[container[`num${i}`].dotLength], container[`num${i}`].dot[container[`num${i}`].dotLength]);
                        focusSideLeft(sliderImg[container[`num${i}`].dotLength - 1], i);
                        focusSideRight(focusElement, i);
                    }
    
                } else if (container[`num${i}`].count > container[`num${i}`].dotLength) {
                    container[`num${i}`].count = 0;
                    if (container[`num${i}`].img.length <= 2) {
                        focusReset(sliderImg);
                        setTimeout(() => {
                            focusFalse(focusElement, container[`num${i}`].dot[container[`num${i}`].dotLength]);
                            focusTrue(sliderImg[0], container[`num${i}`].dot[0]);
                        }, 100);
                    } else if (container[`num${i}`].img.length > 2) {
                        focusFalse(focusElement, container[`num${i}`].dot[container[`num${i}`].dotLength]);
                        focusTrue(sliderImg[0], container[`num${i}`].dot[0]);
                        focusSideLeft(focusElement, i);
                        focusSideRight(sliderImg[1], i);
                    }
    
                } else {
                    if (container[`num${i}`].img.length <= 2) {
                        focusReset(sliderImg);
                        setTimeout(() => {
                            focusFalse(focusElement, container[`num${i}`].dot[container[`num${i}`].count - calc]);
                            focusTrue(sliderImg[container[`num${i}`].count], container[`num${i}`].dot[container[`num${i}`].count]);
                        }, 100);
                    } else if (container[`num${i}`].img.length > 2) {
                        focusFalse(focusElement, container[`num${i}`].dot[container[`num${i}`].count - calc]);
                        focusTrue(sliderImg[container[`num${i}`].count], container[`num${i}`].dot[container[`num${i}`].count]);
                        focusSideReferee(sliderImg, i);
                    }
                }
            })
        }
    }
    
    
    function sliderImgRectGet(ele, i) {
        let sliderRect = container[`num${i}`].img[0].getBoundingClientRect();
        return sliderRect;
    }
    function sliderImgHeightWidth(ele, i) {
        container[`num${i}`].height = sliderImgRectGet(ele, i).height;
        container[`num${i}`].width = sliderImgRectGet(ele, i).width;
    }
    
    
    
    function focusTrue(ele, dot) {
        ele.classList.add("slider-focus");
        ele.style.opacity = "1";
        ele.style.transform = `translateX(0px)`;
        ele.style.transition = `.4s ease-out`;
        ele.style.zIndex = "9";
        dot.style.backgroundColor = "white";
    }
    function focusFalse(ele, dot) {
        ele.classList.remove("slider-focus");
        //ele.style.opacity = "0";
        ele.style.transform = "";
        ele.style.transition = ".4s ease-out";
        ele.style.zIndex = "1";
        dot.style.backgroundColor = "black";
    }
    function focusReset(sliderImg) {
        sliderImg.forEach((value, index) => {
            value.style.opacity = "0";
            value.style.transition = "0s";
            value.style.transform = "translateX(0px)";
            value.style.zIndex = "1";
    
        });
    }
    function focusSideRight(ele, i) {
        ele.style.transform = `translateX(${container[`num${i}`].width}px)`;
        ele.style.zIndex = "8";
    }
    function focusSideLeft(ele, i) {
        try {
            ele.style.transform = `translateX(-${container[`num${i}`].width}px)`;
            ele.style.zIndex = "8";
        } catch (error) {
            return;
        }
    }
    function focusSideReferee(sliderImg, i) {
        if (container[`num${i}`].count === 0) {
            focusSideLeft(sliderImg[container[`num${i}`].dotLength], i);
            focusSideRight(sliderImg[1], i);
        } else if (container[`num${i}`].count === container[`num${i}`].dotLength) {
            focusSideLeft(sliderImg[container[`num${i}`].dotLength - 1], i);
            focusSideRight(sliderImg[0], i);
        } else {
            focusSideLeft(sliderImg[container[`num${i}`].count - 1], i);
            focusSideRight(sliderImg[container[`num${i}`].count + 1], i);
        }
    }
    
    //media
    function sliderScrollHint(ele, i) {
        let scrollHintElement = document.createElement("div");
        scrollHintElement.classList.add("slider-scroll-hint");
        scrollHintElement.textContent = "Scroll";
        container[`num${i}`].scrollHintElement = scrollHintElement;
        ele.appendChild(scrollHintElement);
    }
    function sliderScrollHintWatcher(ele, i) {
        if (mqMax767.matches) {
            ele.addEventListener("scroll", () => {
                ele.value !== undefined ?
                ele.value : ele.value = sliderImgRectGet(ele, i).x;
                ele.value >= sliderImgRectGet(ele, i).x ?
                container[`num${i}`].scrollHintElement.style.opacity = "0" : container[`num${i}`].scrollHintElement.style.opacity = "1";
            })
        }
    }
    function mediaImgSpan(ele, img, i, n) {
        if (mqMax767.matches) {
            let sliderRect = ele.getBoundingClientRect();
            container[`num${i}`].sliderRect = sliderRect;
            img.style.width = `${sliderRect.width}px`;
            img.style.right = `-${(sliderRect.width * n) + (10 * n)}px`;
        }
    }
    
    
    
    function resizeFnction(slider) {
        window.addEventListener("resize", () => {
            if (container.windowWidth !== window.innerWidth) {
                setTimeout(() => {
                    resizeFn(slider);
                }, 1000);
            }
        });
        function resizeFn(slider) {
            slider.forEach((v, i) => {
                for (var n = 0; n < container[`num${i}`].img.length; n++) {
                    container[`num${i}`].img[n].style.height = "";
                }
                v.style.height = "";
                sliderImgHeightWidth(v, i);
                v.style.height = `${container[`num${i}`].height}px`;
                if (true) {
    
                }
                for (var n = 0; n < container[`num${i}`].img.length; n++) {
                    container[`num${i}`].img[n].style.width = "";
                    container[`num${i}`].img[n].style.right = "";
                    if (mqMax767.matches) {
                        container[`num${i}`].img[n].style.transform = "";
                    } else {
                        container[`num${i}`].img[n].style.opacity = "";
                    }
                    if (mqMin768.matches && container[`num${i}`].dot === undefined) {
                        sliderDotSet(v, i);
                        sliderArrowSet(v, i);
                    }
                    if (n !== 0) {
                        mediaImgSpan(v, container[`num${i}`].img[n], i, n);
                    }
                }
            });
        }
    }