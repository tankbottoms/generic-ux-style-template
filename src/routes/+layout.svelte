<script lang="ts">
	import '../app.css';
	import { iconState, toggleIconStyle } from '$lib/stores.svelte';

	let { children } = $props();

	let theme = $state('light');

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	// Get the current icon class prefix based on icon state
	function getIconPrefix(): string {
		return iconState.style === 'fa-thin' ? 'fat' : 'fad';
	}
</script>

<svelte:head>
	<title>UX Specification</title>
	<meta name="description" content="UX Design System Specification" />
</svelte:head>

<div class="container">
	<div class="page-wrapper">
		<header>
			<a href="/" class="site-title">UX Specification</a>
			<nav class="nav">
				<button class="icon-toggle" onclick={toggleIconStyle} aria-label="Toggle icon style" title={iconState.style === 'fa-thin' ? 'Switch to duotone icons' : 'Switch to thin icons'}>
					<i class="{getIconPrefix()} fa-sparkles"></i>
					<span class="toggle-label">{iconState.style === 'fa-thin' ? 'Thin' : 'Duo'}</span>
				</button>
				<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
					<i class="{getIconPrefix()} {theme === 'light' ? 'fa-moon' : 'fa-sun'}"></i>
				</button>
			</nav>
		</header>

		<main>
			{@render children()}
		</main>

		<footer>
			<div class="footer-content">
				<span>UX Design System Specification</span>
				<span>|</span>
				<span>Neo-Brutalist Design</span>
				<span>|</span>
				<span>v3.0</span>
			</div>
		</footer>
	</div>
</div>

<style>
	/* Icon toggle button styling */
	.icon-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		padding: 0.35rem 0.75rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg-secondary);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all 0.15s ease;
		border-radius: 3px;
	}

	.icon-toggle:hover {
		border-color: var(--color-border-dark);
		color: var(--color-text);
		box-shadow: 1px 1px 0px var(--color-shadow);
	}

	.icon-toggle i {
		font-size: 1rem;
	}

	.toggle-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
	}
</style>
