// Shared reactive state for icon styling
// Options: 'fa-thin' (lightweight) or 'fa-duotone' (two-tone filled)

export const iconState = $state({ style: 'fa-thin' as 'fa-thin' | 'fa-duotone' });

export function toggleIconStyle() {
	iconState.style = iconState.style === 'fa-thin' ? 'fa-duotone' : 'fa-thin';
}

export function getIconClass(iconName: string): string {
	return `${iconState.style} ${iconName}`;
}
