define(function (require, exports, module) {

    "use strict";

    var AppInit = brackets.getModule("utils/AppInit"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        ThemeManager = brackets.getModule("view/ThemeManager"),
        ExtensionManager = brackets.getModule("extensibility/ExtensionManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        WorkspaceManager = brackets.getModule("view/WorkspaceManager");

    var THEMES = {
        'base16-3024-dark'              : 'Base16 3024',
        'base16-atelierdune-dark'       : 'Base16 Atelier Dune',
        'base16-atelierforest-dark'     : 'Base16 Atelier Forest',
        'base16-default-dark'           : 'Base16 Default',
        'base16-monokai-dark'           : 'Base16 Monokai',
        'base16-railscasts-dark'        : 'Base16 Railscasts',
        'base16-solarized-dark'         : 'Base16 Solarized',
        'base16-tomorrow-dark'          : 'Base16 Tomorrow',
        'base16-twilight-dark'          : 'Base16 Twilight'
    };

    AppInit.appReady(function () {
        var name, meta;
        for (name in THEMES) {
            meta = {
                name: name,
                title: THEMES[name],
                theme: {
                    file: "themes/" + name + ".css",
                    dark: true
                }
            };
            ThemeManager.loadFile(ExtensionUtils.getModulePath(module, meta.theme.file), meta);
        }
        ExtensionUtils.loadStyleSheet(module, "darker.css").then(function () {
            WorkspaceManager.recomputeLayout();
        });
    });
});
