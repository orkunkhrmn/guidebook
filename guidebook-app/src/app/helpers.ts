import * as $ from "jquery";

export class Helpers {
    static bodyClass(strClass) {
       
        $("body").removeAttr('class');
        $("body").attr('class', '');

        $('body').attr('class', strClass);
    }
}