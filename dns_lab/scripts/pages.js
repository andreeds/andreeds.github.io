'use strict';

export function getPage(pageName) {
    var pages = {
        "help": ["help_1", "help_2", "help_3", "help_4", "help_5", "help_6"],
        "credits": ["credits", "about"],
    }
    return pages[pageName];
}