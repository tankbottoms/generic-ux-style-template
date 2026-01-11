<script lang="ts">
	import { iconState } from '$lib/stores.svelte';

	function icon(): string {
		return iconState.style === 'fa-thin' ? 'fat' : 'fad';
	}

	// Track copied state for feedback
	let copiedIcon = $state<string | null>(null);

	// Track active style filter
	let activeStyle = $state('fat');

	// Track search query
	let searchQuery = $state('');

	// Track expanded categories
	let expandedCategories = $state<Record<string, boolean>>({
		interface: true,
		navigation: true,
		status: true,
		communication: true,
		data: true,
		users: true,
		shapes: true,
		business: true,
		technology: true,
		media: true
	});

	function toggleCategory(id: string) {
		expandedCategories[id] = !expandedCategories[id];
	}

	async function copyToClipboard(iconName: string) {
		const fullClass = `${activeStyle} ${iconName}`;
		try {
			await navigator.clipboard.writeText(fullClass);
			copiedIcon = iconName;
			setTimeout(() => {
				copiedIcon = null;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	// Icon categories with commonly used icons
	const iconCategories = [
		{
			id: 'interface',
			name: 'Interface',
			description: 'Buttons, actions, and UI elements',
			icons: [
				{ name: 'fa-house', desc: 'Home' },
				{ name: 'fa-gear', desc: 'Settings' },
				{ name: 'fa-sliders', desc: 'Controls' },
				{ name: 'fa-bars', desc: 'Menu' },
				{ name: 'fa-ellipsis', desc: 'More options' },
				{ name: 'fa-ellipsis-vertical', desc: 'More vertical' },
				{ name: 'fa-xmark', desc: 'Close' },
				{ name: 'fa-check', desc: 'Confirm' },
				{ name: 'fa-plus', desc: 'Add' },
				{ name: 'fa-minus', desc: 'Remove' },
				{ name: 'fa-magnifying-glass', desc: 'Search' },
				{ name: 'fa-filter', desc: 'Filter' },
				{ name: 'fa-sort', desc: 'Sort' },
				{ name: 'fa-grip', desc: 'Drag handle' },
				{ name: 'fa-expand', desc: 'Expand' },
				{ name: 'fa-compress', desc: 'Compress' },
				{ name: 'fa-eye', desc: 'View' },
				{ name: 'fa-eye-slash', desc: 'Hide' },
				{ name: 'fa-pen', desc: 'Edit' },
				{ name: 'fa-trash', desc: 'Delete' },
				{ name: 'fa-copy', desc: 'Copy' },
				{ name: 'fa-paste', desc: 'Paste' },
				{ name: 'fa-download', desc: 'Download' },
				{ name: 'fa-upload', desc: 'Upload' },
				{ name: 'fa-share', desc: 'Share' },
				{ name: 'fa-bookmark', desc: 'Bookmark' },
				{ name: 'fa-heart', desc: 'Favorite' },
				{ name: 'fa-star', desc: 'Star' },
				{ name: 'fa-thumbs-up', desc: 'Like' },
				{ name: 'fa-thumbs-down', desc: 'Dislike' },
				{ name: 'fa-print', desc: 'Print' },
				{ name: 'fa-link', desc: 'Link' }
			]
		},
		{
			id: 'navigation',
			name: 'Navigation',
			description: 'Arrows, directions, and movement',
			icons: [
				{ name: 'fa-arrow-left', desc: 'Left' },
				{ name: 'fa-arrow-right', desc: 'Right' },
				{ name: 'fa-arrow-up', desc: 'Up' },
				{ name: 'fa-arrow-down', desc: 'Down' },
				{ name: 'fa-chevron-left', desc: 'Chevron left' },
				{ name: 'fa-chevron-right', desc: 'Chevron right' },
				{ name: 'fa-chevron-up', desc: 'Chevron up' },
				{ name: 'fa-chevron-down', desc: 'Chevron down' },
				{ name: 'fa-angles-left', desc: 'First' },
				{ name: 'fa-angles-right', desc: 'Last' },
				{ name: 'fa-angles-up', desc: 'To top' },
				{ name: 'fa-angles-down', desc: 'To bottom' },
				{ name: 'fa-caret-up', desc: 'Caret up' },
				{ name: 'fa-caret-down', desc: 'Caret down' },
				{ name: 'fa-arrow-up-right-from-square', desc: 'External link' },
				{ name: 'fa-arrow-rotate-right', desc: 'Refresh' },
				{ name: 'fa-rotate', desc: 'Rotate' },
				{ name: 'fa-up-down-left-right', desc: 'Move' },
				{ name: 'fa-location-dot', desc: 'Location' },
				{ name: 'fa-map-pin', desc: 'Pin' }
			]
		},
		{
			id: 'status',
			name: 'Status & Alerts',
			description: 'Indicators, warnings, and states',
			icons: [
				{ name: 'fa-circle-check', desc: 'Success' },
				{ name: 'fa-circle-xmark', desc: 'Error' },
				{ name: 'fa-circle-info', desc: 'Info' },
				{ name: 'fa-circle-question', desc: 'Help' },
				{ name: 'fa-circle-exclamation', desc: 'Alert' },
				{ name: 'fa-triangle-exclamation', desc: 'Warning' },
				{ name: 'fa-bell', desc: 'Notification' },
				{ name: 'fa-bell-slash', desc: 'Muted' },
				{ name: 'fa-spinner', desc: 'Loading' },
				{ name: 'fa-hourglass', desc: 'Pending' },
				{ name: 'fa-clock', desc: 'Time' },
				{ name: 'fa-calendar', desc: 'Date' },
				{ name: 'fa-calendar-check', desc: 'Scheduled' },
				{ name: 'fa-badge-check', desc: 'Verified' },
				{ name: 'fa-shield-check', desc: 'Secure' },
				{ name: 'fa-lock', desc: 'Locked' },
				{ name: 'fa-lock-open', desc: 'Unlocked' },
				{ name: 'fa-ban', desc: 'Blocked' },
				{ name: 'fa-flag', desc: 'Flag' },
				{ name: 'fa-bolt', desc: 'Active' }
			]
		},
		{
			id: 'communication',
			name: 'Communication',
			description: 'Messages, email, and social',
			icons: [
				{ name: 'fa-envelope', desc: 'Email' },
				{ name: 'fa-envelope-open', desc: 'Read mail' },
				{ name: 'fa-message', desc: 'Message' },
				{ name: 'fa-comment', desc: 'Comment' },
				{ name: 'fa-comments', desc: 'Chat' },
				{ name: 'fa-phone', desc: 'Phone' },
				{ name: 'fa-video', desc: 'Video call' },
				{ name: 'fa-at', desc: 'Mention' },
				{ name: 'fa-hashtag', desc: 'Hashtag' },
				{ name: 'fa-paper-plane', desc: 'Send' },
				{ name: 'fa-inbox', desc: 'Inbox' },
				{ name: 'fa-reply', desc: 'Reply' },
				{ name: 'fa-forward', desc: 'Forward' },
				{ name: 'fa-globe', desc: 'Web' },
				{ name: 'fa-rss', desc: 'Feed' },
				{ name: 'fa-bullhorn', desc: 'Announce' }
			]
		},
		{
			id: 'data',
			name: 'Data & Files',
			description: 'Documents, charts, and storage',
			icons: [
				{ name: 'fa-file', desc: 'File' },
				{ name: 'fa-file-lines', desc: 'Document' },
				{ name: 'fa-file-pdf', desc: 'PDF' },
				{ name: 'fa-file-csv', desc: 'CSV' },
				{ name: 'fa-file-code', desc: 'Code file' },
				{ name: 'fa-file-image', desc: 'Image file' },
				{ name: 'fa-folder', desc: 'Folder' },
				{ name: 'fa-folder-open', desc: 'Open folder' },
				{ name: 'fa-database', desc: 'Database' },
				{ name: 'fa-table', desc: 'Table' },
				{ name: 'fa-chart-bar', desc: 'Bar chart' },
				{ name: 'fa-chart-line', desc: 'Line chart' },
				{ name: 'fa-chart-pie', desc: 'Pie chart' },
				{ name: 'fa-chart-simple', desc: 'Simple chart' },
				{ name: 'fa-list', desc: 'List' },
				{ name: 'fa-list-check', desc: 'Checklist' },
				{ name: 'fa-grid-2', desc: 'Grid' },
				{ name: 'fa-clipboard', desc: 'Clipboard' },
				{ name: 'fa-archive', desc: 'Archive' },
				{ name: 'fa-box', desc: 'Box' }
			]
		},
		{
			id: 'users',
			name: 'Users & People',
			description: 'Profiles, teams, and access',
			icons: [
				{ name: 'fa-user', desc: 'User' },
				{ name: 'fa-users', desc: 'Users' },
				{ name: 'fa-user-plus', desc: 'Add user' },
				{ name: 'fa-user-minus', desc: 'Remove user' },
				{ name: 'fa-user-check', desc: 'Verified user' },
				{ name: 'fa-user-gear', desc: 'User settings' },
				{ name: 'fa-user-shield', desc: 'Admin' },
				{ name: 'fa-circle-user', desc: 'Avatar' },
				{ name: 'fa-id-card', desc: 'ID card' },
				{ name: 'fa-address-book', desc: 'Contacts' },
				{ name: 'fa-people-group', desc: 'Team' },
				{ name: 'fa-user-tie', desc: 'Business user' },
				{ name: 'fa-key', desc: 'Access key' },
				{ name: 'fa-fingerprint', desc: 'Biometric' },
				{ name: 'fa-right-to-bracket', desc: 'Login' },
				{ name: 'fa-right-from-bracket', desc: 'Logout' }
			]
		},
		{
			id: 'shapes',
			name: 'Shapes & Symbols',
			description: 'Geometric shapes and abstract icons',
			icons: [
				{ name: 'fa-circle', desc: 'Circle' },
				{ name: 'fa-square', desc: 'Square' },
				{ name: 'fa-diamond', desc: 'Diamond' },
				{ name: 'fa-triangle', desc: 'Triangle' },
				{ name: 'fa-hexagon', desc: 'Hexagon' },
				{ name: 'fa-star', desc: 'Star' },
				{ name: 'fa-sparkles', desc: 'Sparkles' },
				{ name: 'fa-asterisk', desc: 'Asterisk' },
				{ name: 'fa-infinity', desc: 'Infinity' },
				{ name: 'fa-icons', desc: 'Icons' },
				{ name: 'fa-cube', desc: 'Cube' },
				{ name: 'fa-cubes', desc: 'Cubes' },
				{ name: 'fa-layer-group', desc: 'Layers' },
				{ name: 'fa-sitemap', desc: 'Sitemap' },
				{ name: 'fa-diagram-project', desc: 'Diagram' },
				{ name: 'fa-network-wired', desc: 'Network' }
			]
		},
		{
			id: 'business',
			name: 'Business & Finance',
			description: 'Money, commerce, and corporate',
			icons: [
				{ name: 'fa-building', desc: 'Building' },
				{ name: 'fa-briefcase', desc: 'Briefcase' },
				{ name: 'fa-dollar-sign', desc: 'Dollar' },
				{ name: 'fa-credit-card', desc: 'Card' },
				{ name: 'fa-wallet', desc: 'Wallet' },
				{ name: 'fa-money-bill', desc: 'Cash' },
				{ name: 'fa-coins', desc: 'Coins' },
				{ name: 'fa-receipt', desc: 'Receipt' },
				{ name: 'fa-scale-balanced', desc: 'Legal' },
				{ name: 'fa-handshake', desc: 'Partnership' },
				{ name: 'fa-chart-line-up', desc: 'Growth' },
				{ name: 'fa-arrow-trend-up', desc: 'Trending up' },
				{ name: 'fa-arrow-trend-down', desc: 'Trending down' },
				{ name: 'fa-certificate', desc: 'Certificate' },
				{ name: 'fa-award', desc: 'Award' },
				{ name: 'fa-trophy', desc: 'Trophy' }
			]
		},
		{
			id: 'technology',
			name: 'Technology',
			description: 'Devices, code, and development',
			icons: [
				{ name: 'fa-desktop', desc: 'Desktop' },
				{ name: 'fa-laptop', desc: 'Laptop' },
				{ name: 'fa-mobile', desc: 'Mobile' },
				{ name: 'fa-tablet', desc: 'Tablet' },
				{ name: 'fa-server', desc: 'Server' },
				{ name: 'fa-cloud', desc: 'Cloud' },
				{ name: 'fa-code', desc: 'Code' },
				{ name: 'fa-terminal', desc: 'Terminal' },
				{ name: 'fa-bug', desc: 'Bug' },
				{ name: 'fa-wrench', desc: 'Tool' },
				{ name: 'fa-screwdriver-wrench', desc: 'Settings' },
				{ name: 'fa-plug', desc: 'Plugin' },
				{ name: 'fa-microchip', desc: 'Chip' },
				{ name: 'fa-memory', desc: 'Memory' },
				{ name: 'fa-hard-drive', desc: 'Storage' },
				{ name: 'fa-wifi', desc: 'WiFi' },
				{ name: 'fa-signal', desc: 'Signal' },
				{ name: 'fa-rocket', desc: 'Deploy' },
				{ name: 'fa-code-branch', desc: 'Branch' },
				{ name: 'fa-code-merge', desc: 'Merge' }
			]
		},
		{
			id: 'media',
			name: 'Media & Content',
			description: 'Images, video, and creative',
			icons: [
				{ name: 'fa-image', desc: 'Image' },
				{ name: 'fa-images', desc: 'Gallery' },
				{ name: 'fa-camera', desc: 'Camera' },
				{ name: 'fa-video', desc: 'Video' },
				{ name: 'fa-film', desc: 'Film' },
				{ name: 'fa-play', desc: 'Play' },
				{ name: 'fa-pause', desc: 'Pause' },
				{ name: 'fa-stop', desc: 'Stop' },
				{ name: 'fa-volume-high', desc: 'Volume' },
				{ name: 'fa-volume-xmark', desc: 'Mute' },
				{ name: 'fa-music', desc: 'Music' },
				{ name: 'fa-palette', desc: 'Design' },
				{ name: 'fa-paintbrush', desc: 'Paint' },
				{ name: 'fa-font', desc: 'Typography' },
				{ name: 'fa-text-size', desc: 'Text size' },
				{ name: 'fa-crop', desc: 'Crop' }
			]
		}
	];

	// Filter icons based on search
	function getFilteredCategories() {
		if (!searchQuery.trim()) return iconCategories;

		const query = searchQuery.toLowerCase();
		return iconCategories.map(cat => ({
			...cat,
			icons: cat.icons.filter(
				icon => icon.name.toLowerCase().includes(query) || icon.desc.toLowerCase().includes(query)
			)
		})).filter(cat => cat.icons.length > 0);
	}

	$effect(() => {
		// Keep filtered categories reactive
		getFilteredCategories();
	});
</script>

<svelte:head>
	<title>Icon Reference - UX Specification</title>
</svelte:head>

<a href="/" class="back-link">
	<i class="{icon()} fa-arrow-left"></i> Back to UX Spec
</a>

<h1><i class="{icon()} fa-icons"></i> Icon Reference</h1>

<div class="description-box">
	<p>
		Complete reference of available Font Awesome Pro 6 icons organized by category.
		Click the copy button to copy the full class name to your clipboard.
	</p>
</div>

<div class="controls-row">
	<div class="search-box">
		<i class="{icon()} fa-magnifying-glass search-icon"></i>
		<input
			type="text"
			placeholder="Search icons..."
			bind:value={searchQuery}
			class="search-input"
		/>
		{#if searchQuery}
			<button class="clear-search" onclick={() => searchQuery = ''} aria-label="Clear search">
				<i class="{icon()} fa-xmark"></i>
			</button>
		{/if}
	</div>

	<div class="style-selector">
		<span class="text-muted">Style:</span>
		<button
			class="style-btn"
			class:active={activeStyle === 'fat'}
			onclick={() => activeStyle = 'fat'}
		>
			<i class="fat fa-circle"></i> Thin
		</button>
		<button
			class="style-btn"
			class:active={activeStyle === 'fal'}
			onclick={() => activeStyle = 'fal'}
		>
			<i class="fal fa-circle"></i> Light
		</button>
		<button
			class="style-btn"
			class:active={activeStyle === 'far'}
			onclick={() => activeStyle = 'far'}
		>
			<i class="far fa-circle"></i> Regular
		</button>
		<button
			class="style-btn"
			class:active={activeStyle === 'fas'}
			onclick={() => activeStyle = 'fas'}
		>
			<i class="fas fa-circle"></i> Solid
		</button>
		<button
			class="style-btn"
			class:active={activeStyle === 'fad'}
			onclick={() => activeStyle = 'fad'}
		>
			<i class="fad fa-circle"></i> Duotone
		</button>
	</div>
</div>

{#each getFilteredCategories() as category}
	<section class="icon-category">
		<button class="category-header" onclick={() => toggleCategory(category.id)}>
			<div class="category-title">
				<h2>{category.name}</h2>
				<span class="icon-count">{category.icons.length} icons</span>
			</div>
			<i class="{icon()} {expandedCategories[category.id] ? 'fa-chevron-up' : 'fa-chevron-down'} category-toggle"></i>
		</button>

		{#if expandedCategories[category.id]}
			<p class="category-desc">{category.description}</p>
			<div class="icons-grid">
				{#each category.icons as iconItem}
					<div class="icon-card" class:copied={copiedIcon === iconItem.name}>
						<div class="icon-preview">
							<i class="{activeStyle} {iconItem.name}"></i>
						</div>
						<div class="icon-info">
							<span class="icon-name">{iconItem.name}</span>
							<span class="icon-desc">{iconItem.desc}</span>
						</div>
						<button
							class="copy-btn"
							onclick={() => copyToClipboard(iconItem.name)}
							title="Copy class name"
						>
							{#if copiedIcon === iconItem.name}
								<i class="fas fa-check"></i>
							{:else}
								<i class="{icon()} fa-copy"></i>
							{/if}
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</section>
{/each}

{#if getFilteredCategories().length === 0}
	<div class="no-results">
		<i class="{icon()} fa-face-frown" style="font-size: 2rem; margin-bottom: 1rem;"></i>
		<p>No icons found matching "{searchQuery}"</p>
		<button class="button" onclick={() => searchQuery = ''}>Clear search</button>
	</div>
{/if}

<style>
	.description-box {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.controls-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.5rem;
		align-items: center;
	}

	.search-box {
		position: relative;
		flex: 1;
		min-width: 200px;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem 2.25rem 0.5rem 2.25rem;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		color: var(--color-text);
		transition: border-color 0.15s ease;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-border-dark);
	}

	.clear-search {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		padding: 0.25rem;
	}

	.clear-search:hover {
		color: var(--color-text);
	}

	.style-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.style-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.6rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.style-btn:hover {
		border-color: var(--color-border-dark);
		color: var(--color-text);
	}

	.style-btn.active {
		border-color: var(--color-border-dark);
		background: var(--color-border-dark);
		color: var(--color-bg);
	}

	.icon-category {
		margin-bottom: 1rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
	}

	.category-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s ease;
	}

	.category-header:hover {
		background: var(--color-hover-bg);
	}

	.category-title {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.category-title h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.icon-count {
		font-size: 0.7rem;
		color: var(--color-text-muted);
		padding: 0.15rem 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 3px;
	}

	.category-toggle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.category-desc {
		margin: 0;
		padding: 0 1rem 0.75rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.icons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 0.5rem;
		padding: 0 1rem 1rem;
	}

	.icon-card {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 1px solid transparent;
		background: var(--color-bg);
		transition: border-color 0.15s ease, box-shadow 0.15s ease;
	}

	.icon-card:hover {
		border-color: var(--color-border);
	}

	.icon-card.copied {
		border-color: var(--color-accent-green);
		background: rgba(46, 125, 50, 0.05);
	}

	.icon-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		font-size: 1.25rem;
		color: var(--color-text);
		flex-shrink: 0;
	}

	.icon-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		overflow: hidden;
	}

	.icon-name {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.icon-desc {
		font-size: 0.6rem;
		color: var(--color-text-muted);
	}

	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: none;
		background: none;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: color 0.15s ease;
		flex-shrink: 0;
	}

	.copy-btn:hover {
		color: var(--color-link);
	}

	.icon-card.copied .copy-btn {
		color: var(--color-accent-green);
	}

	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		text-align: center;
		color: var(--color-text-muted);
	}

	@media (max-width: 768px) {
		.controls-row {
			flex-direction: column;
			align-items: stretch;
		}

		.search-box {
			max-width: none;
		}

		.style-selector {
			justify-content: flex-start;
		}

		.icons-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		}
	}

	@media (max-width: 480px) {
		.icons-grid {
			grid-template-columns: 1fr 1fr;
		}

		.icon-name {
			font-size: 0.6rem;
		}
	}
</style>
