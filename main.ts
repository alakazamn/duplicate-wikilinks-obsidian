import { strict } from 'assert'
import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import { MarkdownView, TFile } from 'obsidian'

export default class DuplicateWikilinks extends Plugin {
	onload() {
		console.log('Loading dedup plugin...')

		this.addCommand({
			id: "dedup-wikilinks",
			name: "Delete duplicate wikilinks from a page",
			checkCallback: (checking: boolean) => {
				const currentView = this.app.workspace.getActiveViewOfType(MarkdownView)

				if ((currentView == null) || (currentView.getMode() !== 'source'))  {
					return false
				}

				if (!checking) {
					this.toggleLink()
				}

				return true
			},
			hotkeys: [{
				modifiers: ["Mod", "Shift"],
				key: "D"
			}]
		})

	}

	onunload() {
		console.log('Unloading dedup plugin')
	}

	toggleLink() {
		const currentView = this.app.workspace.getActiveViewOfType(MarkdownView)
		const editor = currentView.editor

		var source = editor.getDoc().getValue()
	
		const regexHasExtension = /^([^\\]*)\.(\w+)$/

		const regexWiki = /\[\[([^\]]+)\]\]/
		const regexParenthesis = /\((.*?)\)/
		const regexWikiGlobal = /\[\[([^\]]*)\]\]/g
		
		let wikiMatches = source.matchAll(regexWikiGlobal)
		
		let linked : string[] = []

		var index = 0;
		var move = 0;
		for(const matchArr of wikiMatches) {
			let index = matchArr.index
			let match = matchArr.shift()
			let text = matchArr.shift();
			if(!linked.contains(match)) {
				linked.push(match)
				continue;
			}

			let start = index
			let end = start+match.length;
			start -= move;
			end -= move;
			source = source.substring(0, start) + text + source.substring(end)
			index++;
			move += match.length;
			move -= text.length
		}
		editor.setValue(source) 
	}
}
