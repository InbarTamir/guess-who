'use strict';
const STORAGE_QUESTS_KEY = 'questsDB';
const IMG_FOLDER_PATH = 'img/characters/'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_QUESTS_KEY);
    if (!gQuestsTree) {
        gQuestsTree = _createQuest('Male?');
        gQuestsTree.yes = _createQuest('Gandhi', IMG_FOLDER_PATH + 'gandhi.jpg');
        gQuestsTree.no = _createQuest('Rita', IMG_FOLDER_PATH + 'rita.jpg');
        _saveQuests(gQuestsTree);
    }
    gPrevQuest = null;
    gCurrQuest = gQuestsTree;
}

function _createQuest(txt, imgUrl = '') {
    return {
        txt,
        imgUrl, 
        yes: null,
        no: null
    };
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, newImgUrl, lastRes) {
    gPrevQuest[lastRes] = _createQuest(newQuestTxt);
    gPrevQuest[lastRes].yes = _createQuest(newGuessTxt, newImgUrl);
    gPrevQuest[lastRes].no = gCurrQuest;
    _saveQuests(gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function resetCurrQuest() {
    gCurrQuest = gQuestsTree;
}

function _saveQuests(questsTree) {
    saveToStorage(STORAGE_QUESTS_KEY, questsTree);
}