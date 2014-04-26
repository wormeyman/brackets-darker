define(function (require, exports, module) {

    "use strict";

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

    var SETTINGS_KEY = "brackets-darker";
    var DEFAULT_THEME = "base16-default-dark";

    var Menus = brackets.getModule("command/Menus"),
        CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        CommandManager = brackets.getModule("command/CommandManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager");

    var commands = [];

    function getSettings() {
        var theme = PreferencesManager.get(SETTINGS_KEY + '.theme') || DEFAULT_THEME;
        return {
            theme: theme
        };
    }

    function setSettings(settings) {
        var all = settings || {},
            key, value;

        for (key in all) {
            value = all[key];
            key = SETTINGS_KEY + "." + key;
            PreferencesManager.set(key, value);
        }
    }

    function applyTheme(id, name) {

        var editor = $("#editor-holder .CodeMirror"),
            promise = ExtensionUtils.loadStyleSheet(module, "themes/" + name + ".css");

        promise.then(function () {

            editor.addClass("cm-s-" + name);
            editor.addClass('cm-s-dark');
            CodeMirror.defaults.theme = name;

            commands.forEach(function (cid) {
                CommandManager.get(cid).setChecked(false);
            });

            var command = CommandManager.get(id);
            if (command) {
                command.setChecked(true);
            }

            setSettings({
                theme: name
            });
        });
    }

    function handler(id, name) {

        return function () {
            return applyTheme(id, name);
        };
    }

    function addCommand(menu, name) {
        var id = "darker." + name;
        var title = THEMES[name] || name;
        var command = CommandManager.register(title, id, handler(id, name));

        menu.addMenuItem(id);
        commands.push(id);

        return command;
    }

    function init() {

        var menu = Menus.addMenu("Themes", "darkerthemes", Menus.BEFORE, Menus.AppMenuBar.HELP_MENU),
            settings = getSettings(),
            name, command;

        for (name in THEMES) {
            command = addCommand(menu, name);
            if (settings.theme === name) {
                command.execute();
            }
        }
    }

    return {
        init: init
    }
});
