'use strict';

var obsidian = require('obsidian');

class DuplicateWikilinks extends obsidian.Plugin {
    onload() {
        console.log('Loading dedup plugin...');
        this.addCommand({
            id: "dedup-wikilinks",
            name: "Delete duplicate wikilinks from a page",
            checkCallback: (checking) => {
                const currentView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if ((currentView == null) || (currentView.getMode() !== 'source')) {
                    return false;
                }
                if (!checking) {
                    this.toggleLink();
                }
                return true;
            },
            hotkeys: [{
                    modifiers: ["Mod", "Shift"],
                    key: "D"
                }]
        });
    }
    onunload() {
        console.log('Unloading dedup plugin');
    }
    toggleLink() {
        const currentView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        const editor = currentView.editor;
        var source = editor.getDoc().getValue();
        const regexWikiGlobal = /\[\[([^\]]*)\]\]/g;
        let wikiMatches = source.matchAll(regexWikiGlobal);
        let linked = [];
        var move = 0;
        for (const matchArr of wikiMatches) {
            let index = matchArr.index;
            let match = matchArr.shift();
            let text = matchArr.shift();
            if (!linked.contains(match)) {
                linked.push(match);
                continue;
            }
            let start = index;
            let end = start + match.length;
            start -= move;
            end -= move;
            source = source.substring(0, start) + text + source.substring(end);
            index++;
            move += match.length;
            move -= text.length;
        }
        editor.setValue(source);
    }
}

module.exports = DuplicateWikilinks;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHJpY3QgfSBmcm9tICdhc3NlcnQnXHJcbmltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nXHJcbmltcG9ydCB7IE1hcmtkb3duVmlldywgVEZpbGUgfSBmcm9tICdvYnNpZGlhbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1cGxpY2F0ZVdpa2lsaW5rcyBleHRlbmRzIFBsdWdpbiB7XHJcblx0b25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ0xvYWRpbmcgZGVkdXAgcGx1Z2luLi4uJylcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJkZWR1cC13aWtpbGlua3NcIixcclxuXHRcdFx0bmFtZTogXCJEZWxldGUgZHVwbGljYXRlIHdpa2lsaW5rcyBmcm9tIGEgcGFnZVwiLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHtcclxuXHRcdFx0XHRjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldylcclxuXHJcblx0XHRcdFx0aWYgKChjdXJyZW50VmlldyA9PSBudWxsKSB8fCAoY3VycmVudFZpZXcuZ2V0TW9kZSgpICE9PSAnc291cmNlJykpICB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdHRoaXMudG9nZ2xlTGluaygpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRob3RrZXlzOiBbe1xyXG5cdFx0XHRcdG1vZGlmaWVyczogW1wiTW9kXCIsIFwiU2hpZnRcIl0sXHJcblx0XHRcdFx0a2V5OiBcIkRcIlxyXG5cdFx0XHR9XVxyXG5cdFx0fSlcclxuXHJcblx0fVxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdVbmxvYWRpbmcgZGVkdXAgcGx1Z2luJylcclxuXHR9XHJcblxyXG5cdHRvZ2dsZUxpbmsoKSB7XHJcblx0XHRjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldylcclxuXHRcdGNvbnN0IGVkaXRvciA9IGN1cnJlbnRWaWV3LmVkaXRvclxyXG5cclxuXHRcdHZhciBzb3VyY2UgPSBlZGl0b3IuZ2V0RG9jKCkuZ2V0VmFsdWUoKVxyXG5cdFxyXG5cdFx0Y29uc3QgcmVnZXhIYXNFeHRlbnNpb24gPSAvXihbXlxcXFxdKilcXC4oXFx3KykkL1xyXG5cclxuXHRcdGNvbnN0IHJlZ2V4V2lraSA9IC9cXFtcXFsoW15cXF1dKylcXF1cXF0vXHJcblx0XHRjb25zdCByZWdleFBhcmVudGhlc2lzID0gL1xcKCguKj8pXFwpL1xyXG5cdFx0Y29uc3QgcmVnZXhXaWtpR2xvYmFsID0gL1xcW1xcWyhbXlxcXV0qKVxcXVxcXS9nXHJcblx0XHRcclxuXHRcdGxldCB3aWtpTWF0Y2hlcyA9IHNvdXJjZS5tYXRjaEFsbChyZWdleFdpa2lHbG9iYWwpXHJcblx0XHRcclxuXHRcdGxldCBsaW5rZWQgOiBzdHJpbmdbXSA9IFtdXHJcblxyXG5cdFx0dmFyIGluZGV4ID0gMDtcclxuXHRcdHZhciBtb3ZlID0gMDtcclxuXHRcdGZvcihjb25zdCBtYXRjaEFyciBvZiB3aWtpTWF0Y2hlcykge1xyXG5cdFx0XHRsZXQgaW5kZXggPSBtYXRjaEFyci5pbmRleFxyXG5cdFx0XHRsZXQgbWF0Y2ggPSBtYXRjaEFyci5zaGlmdCgpXHJcblx0XHRcdGxldCB0ZXh0ID0gbWF0Y2hBcnIuc2hpZnQoKTtcclxuXHRcdFx0aWYoIWxpbmtlZC5jb250YWlucyhtYXRjaCkpIHtcclxuXHRcdFx0XHRsaW5rZWQucHVzaChtYXRjaClcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHN0YXJ0ID0gaW5kZXhcclxuXHRcdFx0bGV0IGVuZCA9IHN0YXJ0K21hdGNoLmxlbmd0aDtcclxuXHRcdFx0c3RhcnQgLT0gbW92ZTtcclxuXHRcdFx0ZW5kIC09IG1vdmU7XHJcblx0XHRcdHNvdXJjZSA9IHNvdXJjZS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgdGV4dCArIHNvdXJjZS5zdWJzdHJpbmcoZW5kKVxyXG5cdFx0XHRpbmRleCsrO1xyXG5cdFx0XHRtb3ZlICs9IG1hdGNoLmxlbmd0aDtcclxuXHRcdFx0bW92ZSAtPSB0ZXh0Lmxlbmd0aFxyXG5cdFx0fVxyXG5cdFx0ZWRpdG9yLnNldFZhbHVlKHNvdXJjZSkgXHJcblx0fVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQbHVnaW4iLCJNYXJrZG93blZpZXciXSwibWFwcGluZ3MiOiI7Ozs7QUFJcUIsTUFBQSxrQkFBbUIsU0FBUUEsZUFBTSxDQUFBO0lBQ3JELE1BQU0sR0FBQTtBQUNMLFFBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBRXRDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDZixZQUFBLEVBQUUsRUFBRSxpQkFBaUI7QUFDckIsWUFBQSxJQUFJLEVBQUUsd0NBQXdDO0FBQzlDLFlBQUEsYUFBYSxFQUFFLENBQUMsUUFBaUIsS0FBSTtBQUNwQyxnQkFBQSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQ0MscUJBQVksQ0FBQyxDQUFBO0FBRXhFLGdCQUFBLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQUMsRUFBRztBQUNuRSxvQkFBQSxPQUFPLEtBQUssQ0FBQTtBQUNaLGlCQUFBO2dCQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0FBQ2pCLGlCQUFBO0FBRUQsZ0JBQUEsT0FBTyxJQUFJLENBQUE7YUFDWDtBQUNELFlBQUEsT0FBTyxFQUFFLENBQUM7QUFDVCxvQkFBQSxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO0FBQzNCLG9CQUFBLEdBQUcsRUFBRSxHQUFHO2lCQUNSLENBQUM7QUFDRixTQUFBLENBQUMsQ0FBQTtLQUVGO0lBRUQsUUFBUSxHQUFBO0FBQ1AsUUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7S0FDckM7SUFFRCxVQUFVLEdBQUE7QUFDVCxRQUFBLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDQSxxQkFBWSxDQUFDLENBQUE7QUFDeEUsUUFBQSxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFBO1FBRWpDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQU12QyxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQTtRQUUzQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRWxELElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQTtRQUcxQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFBLEtBQUksTUFBTSxRQUFRLElBQUksV0FBVyxFQUFFO0FBQ2xDLFlBQUEsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTtBQUMxQixZQUFBLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUM1QixZQUFBLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUM1QixZQUFBLElBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNCLGdCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2xCLFNBQVM7QUFDVCxhQUFBO1lBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2pCLFlBQUEsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDN0IsS0FBSyxJQUFJLElBQUksQ0FBQztZQUNkLEdBQUcsSUFBSSxJQUFJLENBQUM7QUFDWixZQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNsRSxZQUFBLEtBQUssRUFBRSxDQUFDO0FBQ1IsWUFBQSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNyQixZQUFBLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFBO0FBQ25CLFNBQUE7QUFDRCxRQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDdkI7QUFDRDs7OzsifQ==
