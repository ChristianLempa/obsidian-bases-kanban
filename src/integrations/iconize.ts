// Thin adapter for the Iconize plugin's runtime API.
//
// - Plugin home:  https://github.com/FlorianWoelki/obsidian-iconize
// - API source:   https://github.com/FlorianWoelki/obsidian-iconize/blob/main/src/lib/api.ts
// - Docs:         https://florianwoelki.github.io/obsidian-iconize/ (API section is a stub at time of writing)
//
// Iconize's display name is "Iconize" but its manifest id remains the legacy
// `obsidian-icon-folder`. `app.plugins` is Obsidian's internal plugin registry
// and is not part of the public `obsidian.d.ts` — the module augmentation below
// is the only place that type-level access leaks into the codebase.

import type { App } from 'obsidian';

const ICONIZE_PLUGIN_ID = 'obsidian-icon-folder';

export interface IconizeApi {
	getIconNameByPath(path: string): string | undefined;
	setIconForNode(iconName: string, node: HTMLElement, color?: string): void;
}

declare module 'obsidian' {
	interface App {
		plugins?: {
			plugins?: Record<string, { api?: IconizeApi } | undefined>;
		};
	}
}

export function resolveIconizeApi(app: App): IconizeApi | null {
	return app.plugins?.plugins?.[ICONIZE_PLUGIN_ID]?.api ?? null;
}
