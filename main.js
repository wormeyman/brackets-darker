define(function (require, exports, module) {

    var AppInit = brackets.getModule("utils/AppInit"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager");

    var THEME_NAME = "base16-dark";
    var THEME_CLASS = "cm-s-" + THEME_NAME;

    function applyDark() {
        var promise;
        promise = ExtensionUtils.loadStyleSheet(module, "darker.css");
        promise.then(function () {
            EditorManager.resizeEditor();
        });
        return promise;
    }
    
    function applyTheme() {
        var promise;
        if (CodeMirror.defaults.theme && CodeMirror.defaults.theme !== "default") {
            return null;
        }        
        promise = ExtensionUtils.loadStyleSheet(module, THEME_NAME + ".css");
        promise.then(function () {
            $("#editor-holder .CodeMirror").addClass(THEME_CLASS);
            CodeMirror.defaults.theme = THEME_NAME;
        });
        return promise;
    }

    AppInit.appReady(function () {
        applyDark().then(applyTheme);
    });
});
