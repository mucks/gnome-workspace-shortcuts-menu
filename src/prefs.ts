import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


const getKeybinding = (key: string): string | null => {
    const schemaId = "org.gnome.desktop.wm.keybindings";
    const settings = new Gio.Settings({ schemaId: schemaId });
    return settings.get_string(key);
}

const getSwitchToWorkspaceKeybinding = (workspaceNum: number): string | null => {
    return getKeybinding(`switch-to-workspace-${workspaceNum}`);
}

const getMoveWindowToWorkspaceKeybinding = (workspaceNum: number): string | null => {
    return getKeybinding(`move-to-workspace-${workspaceNum}`);
}

export default class GnomeRectanglePreferences extends ExtensionPreferences {
    _settings?: Gio.Settings

    fillPreferencesWindow(window: Adw.PreferencesWindow) {
        this._settings = this.getSettings();


        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });


        const switchToWorkspaceGroup = new Adw.PreferencesGroup({
            title: _('Switch to workspace'),
            description: _('Configure switch to workspace shortcuts'),
        });

        for (let i = 0; i < 10; i++) {
            const workspaceNum = i + 1;

            const row = new Adw.ActionRow({ title: `Switch to Workspace ${workspaceNum}` })
            const controller = new Gtk.EventControllerKey();
            controller.connect("key-pressed", (event, keyVal, keyCode, state) => {
                console.log(event)
                console.log(keyVal);
                console.log(keyCode);
                console.log(state);
            })

            const keyBinding = getSwitchToWorkspaceKeybinding(workspaceNum);

            row.add_suffix(new Gtk.Text({ text: keyBinding ? keyBinding : "", editable: false, focusable: false }))

            row.add_controller(controller);

            switchToWorkspaceGroup.add(row);

        }

        page.add(switchToWorkspaceGroup);




        const moveWindowToWorkspaceGroup = new Adw.PreferencesGroup({
            title: _('Move window to workspace'),
            description: _('Configure move window to workspace shortcuts'),
        });

        page.add(moveWindowToWorkspaceGroup);




        window.add(page)
    }
}