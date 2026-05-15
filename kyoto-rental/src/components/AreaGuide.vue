<template>
	<section class="page-section" id="areas">
		<div class="s-header">
			<span class="s-num">01</span>
			<div>
				<div class="s-title">推薦租屋區域</div>
				<div class="s-sub">以地鐵＋巴士為主的通勤策略</div>
			</div>
		</div>

		<div class="alert alert-info" style="margin-bottom: 20px">
			京都芸術大学無地鐵直通。最近地鐵為北大路駅，之後需轉乘市巴士204系統約15分鐘；或可搭叡山電車至茶山・京都芸術大学駅步行10分。以下推薦區域皆考量此路線規劃。
		</div>

		<div class="region-grid">
			<div class="region-card" v-for="area in areas" :key="area.name">
				<div class="region-name">{{ area.name }}</div>
				<div class="region-route">{{ area.route }}</div>
				<div style="margin-bottom: 8px">
					<span
						class="badge"
						:class="tag.cls"
						v-for="tag in area.tags"
						:key="tag.label"
						style="margin-right: 4px"
					>
						{{ tag.label }}
					</span>
				</div>
				<div class="region-stats">
					<div class="region-stat">
						<strong>{{ area.rent }}</strong
						>家賃相場
					</div>
					<div class="region-stat">
						<strong>{{ area.time }}</strong
						>通學時間
					</div>
				</div>
				<div class="region-desc">{{ area.desc }}</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const areas = [
	{
		name: '北大路駅周辺',
		route: '地鐵烏丸線 → 巴士204 約15分',
		tags: [
			{ label: '地鐵可達', cls: 'b-ok' },
			{ label: '生活機能佳', cls: 'b-neu' },
		],
		rent: '4.5萬円',
		time: '20〜25分',
		desc: '北大路バスターミナル是最大公車樞紐。周邊有萬代書店、イオン、各類便利商店，生活機能最完整，是偏好純地鐵通勤者的首選起點。',
	},
	{
		name: '茶山・元田中周辺',
		route: '叡山電車 茶山駅 → 步行10分',
		tags: [
			{ label: '離校最近', cls: 'b-ok' },
			{ label: '安靜住宅街', cls: 'b-neu' },
		],
		rent: '4.6萬円',
		time: '10〜20分',
		desc: '離學校最近，步行或自行車皆可通學。白川通沿線有超市、藥妝，治安好，女性友善，是CP值最高的選擇。',
	},
	{
		name: '出町柳周辺',
		route: '京阪 → 叡山電車 約25分',
		tags: [
			{ label: '學生街氛圍', cls: 'b-info' },
			{ label: '飲食豐富', cls: 'b-neu' },
		],
		rent: '4.8萬円',
		time: '25〜30分',
		desc: '京大學生街，飲食選擇多，鴨川就在旁邊，生活品質高。往大阪也方便。比起茶山稍貴，但娛樂與生活便利性更強。',
	},
	{
		name: '北白川エリア',
		route: '市バス or 自転車 約10〜15分',
		tags: [
			{ label: '家賃最低', cls: 'b-ok' },
			{ label: '京都情緒濃', cls: 'b-neu' },
		],
		rent: '4.3萬円',
		time: '10〜15分',
		desc: '學校步行或自行車圈內，白川通沿線生活便利，一步之內是閑靜住宅街。家賃是周邊最實惠的區域。',
	},
];
</script>

<style scoped>
.region-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 12px;
	margin: 16px 0;
}
.region-card {
	background: #fff;
	border: 0.5px solid var(--border);
	border-radius: var(--radius-lg);
	padding: 16px;
}
.region-name {
	font-size: 13px;
	font-weight: 500;
	color: var(--ink);
	margin-bottom: 4px;
}
.region-route {
	font-size: 11px;
	color: var(--ink3);
	margin-bottom: 8px;
}
.region-stats {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-bottom: 10px;
}
.region-stat {
	font-size: 11px;
	color: var(--ink2);
}
.region-stat strong {
	display: block;
	font-size: 13px;
	font-family: 'DM Mono', monospace;
	color: var(--ink);
}
.region-desc {
	font-size: 11px;
	color: var(--ink3);
	line-height: 1.6;
}
</style>
