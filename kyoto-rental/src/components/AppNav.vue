<template>
	<nav>
		<div class="nav-logo">京都租屋指南</div>
		<div class="nav-links">
			<a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
		</div>
	</nav>
</template>

<script setup>
const links = [
	{ href: '#areas', label: '選區域' },
	{ href: '#madori', label: '間取り' },
	{ href: '#room-calc', label: '坪數計算' },
	{ href: '#cost-calc', label: '生活費' },
	{ href: '#twd-calc', label: '台幣換算' },
	{ href: '#utility', label: '水電瓦斯' },
	{ href: '#checklist', label: '看屋清單' },
	{ href: '#initial-cost', label: '初期費用' },
	{ href: '#tips', label: '注意事項' },
	{ href: '#property-eval', label: '物件評估' },
];
</script>

<style scoped>
nav {
	position: sticky;
	top: 0;
	z-index: 100;
	background: rgba(247, 244, 239, 0.95);
	backdrop-filter: blur(8px);
	border-bottom: 0.5px solid var(--border);
	padding: 0 24px;
	display: flex;
	align-items: center;
	height: 52px;
	overflow-x: auto;
}
nav::-webkit-scrollbar {
	display: none;
}
.nav-logo {
	font-family: 'Noto Serif TC', serif;
	font-size: 13px;
	font-weight: 600;
	color: var(--accent);
	white-space: nowrap;
	margin-right: 24px;
	flex-shrink: 0;
}
.nav-links {
	display: flex;
	flex-shrink: 0;
}
.nav-links a {
	font-size: 12px;
	color: var(--ink3);
	text-decoration: none;
	padding: 0 12px;
	height: 52px;
	display: flex;
	align-items: center;
	border-bottom: 2px solid transparent;
	white-space: nowrap;
	transition:
		color 0.2s,
		border-color 0.2s;
}
.nav-links a:hover {
	color: var(--ink);
	border-color: var(--accent);
}
</style>
