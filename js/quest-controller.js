'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-new-game').click(onRestartGame);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  var currQuest = getCurrQuest();
  $('.quest h2').text(currQuest.txt);
  var imgUrl = currQuest.imgUrl;
  if (imgUrl && imgUrl.length) renderQuestImg(imgUrl);
}

function renderQuestImg(imgUrl) {
  $('.quest img').attr('src', imgUrl);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    $('.bubble-img').attr('src', `img/layout/bubble_${res}.png`);
    $('.bubble-img').show();
    if (res === 'yes') {
      $('.quest .btn').hide();
      $('.new-game').show();
    } else {
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  var newImgUrl = $('#add-img').val();
  addGuess(newQuest, newGuess, newImgUrl, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.quest').hide();
  $('.quest .btn').show();
  $('.new-game').hide();
  $('.new-quest').hide();
  $('.game-start').show();
  $('.quest img').attr('src', '');
  $('.bubble-img').hide();
  gLastRes = null;
  resetCurrQuest();
}
