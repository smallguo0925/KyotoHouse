<template>
	<section class="page-section" id="utility">
		<div class="s-header">
			<span class="s-num">05</span>
			<div>
				<div class="s-title">水電瓦斯費用詳解</div>
				<div class="s-sub">看屋時必須確認的光熱費關鍵項目</div>
			</div>
		</div>

		<div class="util-highlight">
			⚠️ 瓦斯種類是最常被忽略的陷阱：プロパンガス（丙烷）費用約是都市ガス的
			<strong>1.5〜2 倍</strong>，一年差距可達 3 萬円以上。看屋時務必確認！
		</div>

		<table style="margin-top: 16px">
			<thead>
				<tr>
					<th>費用項目</th>
					<th>一人月均</th>
					<th>看屋時注意</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in utilRows" :key="row.item">
					<td>
						<strong>{{ row.item }}</strong
						><br />
						<span style="font-size: 11px; color: var(--ink3)">{{ row.sub }}</span>
					</td>
					<td v-html="row.amount"></td>
					<td v-html="row.note"></td>
				</tr>
			</tbody>
		</table>

		<div style="margin-top: 24px; font-size: 13px; font-weight: 500; color: var(--ink2); margin-bottom: 12px">
			租屋平台關鍵標示速查
		</div>
		<table>
			<thead>
				<tr>
					<th>平台標示</th>
					<th>意思</th>
					<th>評價</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in platformRows" :key="row.label">
					<td>{{ row.label }}</td>
					<td>{{ row.meaning }}</td>
					<td>
						<span class="badge" :class="row.cls">{{ row.eval }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup>
const utilRows = [
	{
		item: '電費',
		sub: '関西電力管轄',
		amount: '2,000–5,000円<br><span style="font-size:11px;color:var(--ink3)">夏冬月份偏高</span>',
		note: '確認 <span class="badge b-info">アンペア数</span>（安培數）。1K 通常 20–30A，舊屋僅 15A，電熱水器＋電暖器同時開容易跳電',
	},
	{
		item: '瓦斯費',
		sub: '都市ガス vs プロパン',
		amount: '都市ガス：1,500–3,000円<br><span style="font-size:11px;color:#c62828">プロパン：3,000–6,000円</span>',
		note: '<span class="badge b-danger">プロパンは約2倍</span> 舊式アパート多為丙烷瓦斯。租屋平台可篩選「都市ガス」',
	},
	{
		item: '水道費',
		sub: '通常2個月一次計費',
		amount: '1,000–2,000円/月<br><span style="font-size:11px;color:var(--ink3)">（兩月合計 2,000–4,000円）</span>',
		note: '部分物件 <span class="badge b-ok">水道込み</span>（含在管理費），不需另付',
	},
	{
		item: '暖房費（冬季特別）',
		sub: '京都 11月〜3月',
		amount: '額外增加 3,000–8,000円<br><span style="font-size:11px;color:var(--ink3)">視暖氣設備而定</span>',
		note: '京都冬天濕冷，暖氣是必需。確認有無 <span class="badge b-info">冷暖兩用エアコン</span>',
	},
	{
		item: '網路費',
		sub: '',
		amount: '自申請：2,000–5,000円<br>含網路物件：0円',
		note: '<span class="badge b-ok">インターネット無料</span> 省月費且免等待（自申請需1–3週＋初裝費約1–2萬円）',
	},
	{
		item: 'NHK 受信料',
		sub: '',
		amount: '約 1,300円/月',
		note: '有電視則強制繳納，無電視可拒絕。留學生部分可申請減免',
	},
];

const platformRows = [
	{ label: '都市ガス', meaning: '城市管道瓦斯', cls: 'b-ok', eval: '費用低，優先選擇' },
	{ label: 'プロパン / LPガス', meaning: '丙烷桶裝瓦斯', cls: 'b-danger', eval: '費用約2倍，注意' },
	{ label: 'オール電化', meaning: '全電化（無瓦斯）', cls: 'b-info', eval: '電費略高但無瓦斯費' },
	{ label: '水道込み', meaning: '水費含在管理費內', cls: 'b-ok', eval: '省錢省手續' },
	{ label: 'インターネット無料', meaning: '含網路費', cls: 'b-ok', eval: '省月費且免申請等待' },
	{ label: '管理費 〇〇円', meaning: '每月管理費', cls: 'b-warn', eval: '必須加入每月支出計算！' },
	{ label: '礼金なし / 敷金なし', meaning: '無押金 / 無謝禮金', cls: 'b-ok', eval: '可省初期費用' },
];
</script>

<style scoped>
.util-highlight {
	background: var(--gold-lt);
	border: 0.5px solid #d4a500;
	border-radius: var(--radius);
	padding: 8px 12px;
	margin: 8px 0;
	font-size: 12px;
	color: #5d4200;
}
</style>
