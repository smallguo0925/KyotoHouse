<template>
	<div class="hero">
		<div class="hero-inner">
			<div class="hero-tag">語言學校留學生專用 · 京都芸術大学</div>
			<h1>京都<em>租屋</em>完整指南</h1>
			<p>從選擇區域、看懂平面圖、計算坪數，到每月生活費試算與看屋確認清單——一站搞定所有租屋前的準備。</p>
			<div class="hero-meta">
				<div v-for="item in metaItems" :key="item.label" class="hero-meta-item">
					<strong>{{ item.label }}</strong
					>{{ item.value }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const metaItems = [
	{ label: '學校位置', value: '左京區北白川瓜生山' },
	{ label: '最近地鐵站', value: '北大路駅（烏丸線）' },
	{ label: '推薦路線', value: '地鐵＋市バス / 叡山電車' },
	{ label: '家賃相場', value: '4.0〜5.5 萬円/月' },
];
</script>

<style scoped>
.hero {
	background: var(--ink);
	color: var(--paper);
	padding: 72px 24px 64px;
	position: relative;
	overflow: hidden;
}
.hero::before {
	content: '';
	position: absolute;
	inset: 0;
	background: repeating-linear-gradient(
		45deg,
		transparent,
		transparent 40px,
		rgba(255, 255, 255, 0.015) 40px,
		rgba(255, 255, 255, 0.015) 41px
	);
}
.hero-inner {
	max-width: 800px;
	margin: 0 auto;
	position: relative;
}
.hero-tag {
	display: inline-block;
	font-size: 11px;
	font-family: 'DM Mono', monospace;
	color: var(--accent2);
	letter-spacing: 0.12em;
	border: 0.5px solid var(--accent2);
	padding: 3px 10px;
	border-radius: 3px;
	margin-bottom: 20px;
}
h1 {
	font-family: 'Noto Serif TC', serif;
	font-size: clamp(26px, 5vw, 44px);
	font-weight: 600;
	line-height: 1.25;
	margin-bottom: 16px;
}
h1 em {
	color: var(--accent2);
	font-style: normal;
}
p {
	color: rgba(247, 244, 239, 0.65);
	font-size: 14px;
	max-width: 520px;
	line-height: 1.8;
}
.hero-meta {
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
	margin-top: 32px;
	padding-top: 24px;
	border-top: 0.5px solid rgba(255, 255, 255, 0.1);
}
.hero-meta-item {
	font-size: 12px;
	color: rgba(247, 244, 239, 0.5);
}
.hero-meta-item strong {
	display: block;
	font-size: 13px;
	color: var(--paper);
	font-weight: 500;
	margin-bottom: 2px;
}
</style>
