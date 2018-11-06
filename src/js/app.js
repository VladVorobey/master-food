import $ from 'jquery';
import slick from 'slick-carousel';
import fancybox from '@fancyapps/fancybox';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';


$(document).ready(function() {
  //---- PRELOADER ----
  $(window).on('load', function() {
    $('.preloader').delay(1000).fadeOut('slow');
  });
  //---- NAV-HAMBURGER ----
  $('.navigation__button, .navigation ul li a').click(function() {
    $('.navigation').toggleClass('active'),
    $('.navigation__button').toggleClass('active');
  });
  //---- TABS ----
  $('.tabs__wrap').hide();
  $('.tabs__wrap:nth-child(2)').show();
  $('.tabs ul a:nth-child(2)').addClass('active');

  $('.tabs ul a').click(function(event) {
    event.preventDefault();
    $('.tabs ul a').removeClass('active');
    $(this).addClass('active');
    $('.tabs__wrap').hide();

    var selectTab = $(this).attr('href');
    $(selectTab).fadeIn();
  });
  //---- TRASTED ----
  $('.trasted-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
  //---- GALLERY ----
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    adaptiveHeight: true
  });
  //---- REVIEWS ----
  $('.single-item').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: '60px',
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: false,
          adaptiveHeight: true,
          arrows: false
        }
      }
    ]
  });
  //---- ANCHOR ----
  $('.navigation ul li a').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 2000);
    }
  });
  //---- MASK+ VALIDATION ----
  $('input[type="tel"]').mask('+7 (000) 000-00-00');
  jQuery.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: 'Введите Ваше имя',
        tel: 'Введите Ваш телефон',
        email: 'Введите Ваш E-mail',
        date: 'Выберите удобную дату',
      },
      submitHandler: function(form) {
        var t = $('.form-' + index).serialize();
        ajaxSend('.form-' + index, t);
      }
    });
    $('.modal').popup({
      transition: 'all 0.3s',
      outline: true, // optional
      focusdelay: 400, // optional
      vertical: 'top', //optional
      onclose: function() {
        $(this).find('label.error').remove();
      }
    });
  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }
});
//---- MAP ----


