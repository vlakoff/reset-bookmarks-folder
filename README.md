# Reset to "Bookmarks Bar" Folder - Chrome Extension

## Overview

Chrome typically remembers the last folder used when adding bookmarks, which can sometimes lead to disorganization. This extension ensures that after a bookmark or folder is added or moved, the default destination for future bookmarks is reset to the **"Bookmarks Bar"** folder.

With this extension, users no longer have to manually select the bookmarks bar every time—making bookmarking faster and more consistent.

## Features

- Automatically resets the default bookmark folder to **"Bookmarks Bar"** after changes.
- Supports bookmark creations and folder movements.
- Provides a subtle visual cue through icon flashing when triggered _(only if the extension icon is pinned in the toolbar)_.
- Lightweight and efficient.

## Installation Guide (Manual)

Since this extension is **not available on the Chrome Web Store**, you’ll need to install it manually using Chrome's Developer Mode.

### Steps to Install:

1. **Download** the extension files from this repository.
2. **Unzip** the files to a convenient location on your computer.
3. Open **Google Chrome** and navigate to `chrome://extensions/`.
4. Enable **Developer Mode** (toggle in the top-right corner).
5. Click on **"Load unpacked"** and select the folder where the extension files are stored.
6. The extension should now appear in your list, ready to use!

## How It Works

Once installed, the extension will:

- Monitor bookmark additions and moves.
- If a bookmark is created outside the "Bookmarks Bar", it will briefly create and remove a temporary bookmark, ensuring Chrome resets to the correct default folder.
- Flash the extension icon _(visible only if pinned in the toolbar)_ to visually confirm that the reset action occurred.

## License

This project is licensed under the **GNU General Public License v3 (GPLv3)**.

Under this license:

- You are free to use, modify, and distribute the extension.
- Any modifications or derivative works **must also be licensed under GPLv3**.
- You **must provide access to the source code** if you distribute a modified version.

For full details, see the [GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.en.html).
