// ==UserScript==
// @name         Toggle Trello Board Card Details
// @version      0.1
// @description  Show/hide Trello card icons by hitting tilde (`) or clicking "Toggle Details" button
// @author       Zac Fowler <zdfowler@gmail.com>
// @namespace    https://trello.com
// @include      https://trello.com/b/*
// @grant        none
// Heavily adapted from https://greasyfork.org/scripts/6777-trello-minimize-lists/code/Trello%20-%20minimize%20lists.user.js
// ==/UserScript==


var TrelloToggleButton = (function() {
    'use strict';

    var _board_header_selector     = '.board-header-btns.mod-left';
    var _board_header_btn_class    = 'board-header-btn';
    var _trello_hideable_classes   = ['.card-label','.badges','.list-card-members','.list-card-cover'];
    var _key_to_bind               = 192; // tilde (`)
	var _button_label              = 'Toggle Details';

    var toggleTrigger;

    var createToggleButton = function(buttonLabel) {
        toggleTrigger = document.createElement('a');
        toggleTrigger.appendChild(document.createTextNode(buttonLabel));
        toggleTrigger.setAttribute('href','#');
        toggleTrigger.classList.add(_board_header_btn_class);
        toggleTrigger.setAttribute('style', 'padding-left: 3px; padding-right: 3px;');
        toggleTrigger.addEventListener('click', function(ev){
            toggleItemsCallback(ev);
        });

        var menuButtonsContainer = document.querySelector(_board_header_selector);
        menuButtonsContainer.appendChild(toggleTrigger);
    };

    var toggleItemsCallback = function(ev){
        document.querySelectorAll(_trello_hideable_classes).forEach(function(i,x) {
            i.style.display = i.style.display == 'none' ? 'block' : 'none';
        });
        return;
    };

    var registerKeyBinding = function(key) {
        document.onkeydown = function(e) {
            e = e || window.event;
            switch(e.which || e.keyCode) {
                case key:
                    toggleItemsCallback(e);
                    break;
                default:return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        };
    };

    createToggleButton(_button_label);
    registerKeyBinding(_key_to_bind);
})();

