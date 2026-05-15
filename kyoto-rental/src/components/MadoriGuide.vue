<template>
	<section class="page-section" id="madori">
		<div class="s-header">
			<span class="s-num">02</span>
			<div>
				<div class="s-title">間取り（平面圖）縮寫一覽</div>
				<div class="s-sub">看懂租屋網站上的房型代號</div>
			</div>
		</div>

		<div class="madori-grid">
			<div class="madori-card" v-for="item in madoriItems" :key="item.label">
				<div class="madori-label">{{ item.label }}</div>
				<div class="madori-name">{{ item.name }}</div>
				<div class="madori-note">{{ item.note }}</div>
			</div>
		</div>

		<div class="alert alert-warn" style="margin-top: 16px">
			納戸（S）因無採光窗，不符合建築基準法「居室」定義，冬冷夏熱、通風差，不建議長期當臥室使用。
		</div>

		<div style="margin-top: 28px">
			<div style="font-size: 13px; font-weight: 500; color: var(--ink2); margin-bottom: 12px">
				其他常見縮寫 / 術語
			</div>
			<table>
				<thead>
					<tr>
						<th>縮寫</th>
						<th>全稱</th>
						<th>說明</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in termRows" :key="row.abbr">
						<td>
							<code>{{ row.abbr }}</code>
						</td>
						<td>{{ row.full }}</td>
						<td>{{ row.note }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script setup>
const madoriItems = [
	{ label: 'R', name: 'Room（一間房）', note: '無隔間，廚房直接在同一空間內，最小最便宜' },
	{ label: '1K', name: '1房 ＋ Kitchen', note: '廚房與臥室有門隔開，廚房約 4.5 帖以下，最常見的單身房型' },
	{ label: '1DK', name: '1房 ＋ Dining Kitchen', note: '廚房空間可放餐桌，約 4.5〜8 帖，生活感提升明顯' },
	{ label: '1LDK', name: '1房 ＋ Living DK', note: '有獨立客廳，舒適度高但租金也較高，適合長期居住' },
	{ label: '2K/2DK', name: '2房型', note: '兩間獨立臥室，適合分租或需要書房的人' },
	{ label: 'S（納戸）', name: 'Service Room', note: '無對外窗，法規不算居室；可作收納或書房，但不宜長期睡覺' },
	{ label: 'W.I.C', name: 'Walk-in Closet', note: '步入式大型衣帽間，通常見於較高端物件' },
	{ label: 'UB', name: 'Unit Bath', note: '浴廁一體（3点ユニット），較老式，使用體驗較差' },
];

const termRows = [
	{ abbr: '築〇年', full: '屋齡', note: '「築10年」= 屋齡10年。1981年以前為舊耐震基準，不建議' },
	{ abbr: '木造', full: '木造建築', note: '隔音差，費用低，老式アパート常見' },
	{ abbr: 'RC', full: '鋼筋混凝土', note: '隔音佳，較新，相對舒適' },
	{ abbr: '角部屋', full: '角落房', note: '大樓末端，兩面有窗，採光通風最好' },
	{ abbr: '南向', full: '朝南', note: '日照最長，冬暖夏涼；東向次之；北向最差' },
	{ abbr: 'ペット可', full: '可養寵物', note: '未標示則預設不可' },
	{ abbr: '楽器相談', full: '樂器可協商', note: '大多物件禁止，有需要請確認' },
	{ abbr: '礼金なし', full: '無礼金', note: '可省初期費用，確認有無其他名目補收' },
	{ abbr: '即入居可', full: '可立即入住', note: '物件已空置，可快速完成手續' },
	{ abbr: '追焚き', full: '浴缸二次加熱', note: '可重新加熱已涼的浴缸水，是加分設備' },
	{ abbr: '宅配ボックス', full: '包裹收件箱', note: '不在家也可自動收包裹，網購族重要' },
];
</script>

<style scoped>
.madori-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
	gap: 8px;
}
.madori-card {
	background: #fff;
	border: 0.5px solid var(--border);
	border-radius: var(--radius-lg);
	padding: 14px;
}
.madori-label {
	font-family: 'DM Mono', monospace;
	font-size: 20px;
	font-weight: 500;
	color: var(--accent);
	margin-bottom: 3px;
}
.madori-name {
	font-size: 11px;
	color: var(--ink2);
	font-weight: 500;
	margin-bottom: 4px;
}
.madori-note {
	font-size: 11px;
	color: var(--ink3);
	line-height: 1.5;
}
code {
	font-family: 'DM Mono', monospace;
	font-size: 12px;
}
</style>
