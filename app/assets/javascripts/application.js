// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require materialize
//= require jquery.ui.widget
//= require z.jquery.fileupload
//= require_tree .

$(document).ready(function () {
$(function() {
  $('.directUpload').find("input:file").each(function(i, elem) {
    var fileInput    = $(elem);
    var form         = $(fileInput.parents('form:first'));
    var submitButton = form.find('input[type="submit"]');
    var progressBar  = $("<div class='bar'></div>");
    var barContainer = $("<div class='progress'></div>").append(progressBar);
    fileInput.after(barContainer);
    fileInput.fileupload({
      fileInput:       fileInput,
      url:             form.data('url'),
      type:            'POST',
      autoUpload:       true,
      formData:         form.data('form-data'),
      paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
      dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
      replaceFileInput: false,
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        progressBar.css('width', progress + '%')
      },
      start: function (e) {
        submitButton.prop('disabled', true);

        progressBar.
          css('background', 'green').
          css('display', 'block').
          css('width', '0%').
          text("Loading...");
      },
      done: function(e, data) {
        submitButton.prop('disabled', false);
        progressBar.text("Uploading done");

        // extract key and generate URL from response
        var key   = $(data.jqXHR.responseXML).find("Key").text();
        var code  = $(data.jqXHR.responseXML);
        var url   = '//' + form.data('host') + '/' + key;

        // create hidden field

        var file_info = $("<input />", { type:'hidden', name: 'aws_url', value:  url});
        
        $('form').children().append(file_info);
      },
      fail: function(e, data) {
        submitButton.prop('disabled', false);

        progressBar.
          css("background", "red").
          text("Failed");
      }
    });
  });
});
});

$(document).ready(function () {
    Dropzone.autoDiscover = false;
    $(".drop").dropzone({
        url: $(".searchResults").data("query"),
        addRemoveLinks: true,
        success: function (file, response) {
            var imgName = response;
            file.previewElement.classList.add("dz-success");
            console.log("Successfully uploaded :" + imgName);
            $.get(root_path);
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        }
    });
})

//To show modals on account settings page
$(function(){
  $('.change-username-trigger').click(function(){
    $('#change-username').show();
  });
  
  $('.change-email-trigger').click(function(){
    $('#change-email').show();
  });
  
  $('.file-upload-trigger').click(function(){
    $('#file-upload').show();
  });

  $('.share-repo-trigger').click(function(){
    $('#share-repo').show();
    var link = '/repos/' + $('.selected-repo-item #rid').text();
    var shareLink = $('.selected-repo-item #rroot').text() + 'downloads?code=' + $('.selected-repo-item #rcode').text();
    $('#share-repo form').attr('action', link);
    $('#share-repo #share_link').val(shareLink);
  });
  
  $('.modal-close').click(function(){
    $('.modal').hide();
  });
  
  $('.submit-new-email').on('click', function( event ){
    var newEmail = $('#email').val();
    var newEmailConfirm = $('#email_confirm').val();
    if (newEmail + newEmailConfirm == "") {
      $('.new-email-check p').text('Email cannot be empty!!!');
      event.preventDefault();
    } else {
      if (newEmail != newEmailConfirm) {
        $('.new-email-check p').text('Check email spelling!');
        event.preventDefault();
      } else {
        $('.new-email-check p').text('');
      }
    }
  });

  $('td').click(function(){
    $('.repo-context-menu').show();
    console.log('clicked on td...');
  });

  $('td').hover(function(){
    $(this).parent().toggleClass('highlight-repo-item')
  });

  $('td').click(function(){
    $('tr').removeClass('selected-repo-item');
    $(this).parent().addClass('selected-repo-item');
    var link = $('.selected-repo-item #rurl').text();
    $('#context-menu-download').attr('href', link);
  });

});

$(".dropdown-button").dropdown();
