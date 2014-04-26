define(function (require, exports, module) {

    var AppInit = brackets.getModule("utils/AppInit"),
        CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager");

    var DEFAULT_THEME = "base16-default-dark";
    
    function getSettings() {
        return {
            theme: DEFAULT_THEME
        };
    }

    AppInit.appReady(function () {

        var editor = $("#editor-holder .CodeMirror"),
            promise = ExtensionUtils.loadStyleSheet(module, "darker.css"),
            settings = getSettings();

        promise.then(function () {
            EditorManager.resizeEditor();
        });

        if (CodeMirror.defaults.theme && CodeMirror.defaults.theme !== "default") {
            return null;
        }

        promise = promise.then(function () {
            return ExtensionUtils.loadStyleSheet(module, "themes/" + settings.theme + ".css");
        });

        promise.then(function () {
            editor.addClass("cm-s-" + settings.theme);
            CodeMirror.defaults.theme = settings.theme;
        });

        return promise;
    });
});
