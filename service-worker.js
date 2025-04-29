/* jshint esversion: 8 */
/* global chrome */

(() => {
	'use strict';

	// '1': "Bookmarks bar" folder
	// '2': "Other bookmarks" folder
	// Must be a string.
	const targetFolder = '1';

	const debounceDelay = 100;
	const extensionIconFlashDuration = 1500;

	const defaultIcon = {
		'16': 'images/icon_16.png',
		'32': 'images/icon_32.png',
		'48': 'images/icon_48.png',
		'128': 'images/icon_128.png'
	};

	const activeIcon = {
		'16': 'images/active_icon_16.png',
		'32': 'images/active_icon_32.png',
		'48': 'images/active_icon_48.png',
		'128': 'images/active_icon_128.png'
	};

	let temporarilyDisableOnCreatedListener = false;

	function generateRandomUrl() {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let url = 'https://';
		for (let i = 0; i < 16; ++i) {
			url += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		url += '.com/';
		return url;
	}

	function debounce(func, delay) {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	async function createAndDeleteTemporaryBookmark() {
		temporarilyDisableOnCreatedListener = true;

		const bookmark = await chrome.bookmarks.create({
			parentId: targetFolder,
			title: 'Temporary Bookmark',
			url: generateRandomUrl()
		});

		temporarilyDisableOnCreatedListener = false;

		await chrome.bookmarks.remove(bookmark.id);

		flashExtensionIcon();
	}

	async function flashExtensionIcon() {
		await chrome.action.setIcon({path: activeIcon});

		await new Promise(resolve => setTimeout(resolve, extensionIconFlashDuration));

		await chrome.action.setIcon({path: defaultIcon});
	}

	/*
	 * We need to debounce because many created/moved events can happen in bursts, for example:
	 * - Bookmarks import
	 * - Move several bookmarks
	 */
	const debouncedCreateAndDeleteTemporaryBookmark = debounce(createAndDeleteTemporaryBookmark, debounceDelay);

	// Event listener for bookmark/folder creations
	chrome.bookmarks.onCreated.addListener((id, bookmark) => {
		if (temporarilyDisableOnCreatedListener) {
			return;
		}
		if (bookmark.parentId !== targetFolder) {
			debouncedCreateAndDeleteTemporaryBookmark();
		}
	});

	// Event listener for bookmark/folder moves
	chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
		if (moveInfo.parentId !== targetFolder) {
			debouncedCreateAndDeleteTemporaryBookmark();
		}
	});

})();
