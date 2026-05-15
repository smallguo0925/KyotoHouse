<template>
	<section class="page-section" id="initial-cost">
		<div class="s-header">
			<span class="s-num">07</span>
			<div>
				<div class="s-title">初期費用一覽</div>
				<div class="s-sub">搬入前需準備的一次性費用計算</div>
			</div>
		</div>

		<div class="calc-grid" style="grid-template-columns: 1fr">
			<div class="calc-group">
				<div class="calc-group-title">輸入月租金，自動試算初期費用範圍</div>
				<div class="calc-row">
					<label>每月家賃</label>
					<input type="number" v-model.number="rent" step="500" />
					<span class="unit">円/月</span>
				</div>
			</div>
		</div>

		<div class="result-strip" style="grid-template-columns: repeat(3, 1fr)">
			<div class="r-item">
				<div class="r-label">初期費用最低（×4）</div>
				<div class="r-val">{{ (rent * 4).toLocaleString() }}円</div>
			</div>
			<div class="r-item">
				<div class="r-label">初期費用一般（×5）</div>
				<div class="r-val">{{ (rent * 5).toLocaleString() }}円</div>
			</div>
			<div class="r-item">
				<div class="r-label">初期費用最高（×6）</div>
				<div class="r-val">{{ (rent * 6).toLocaleString() }}円</div>
			</div>
		</div>

		<table style="margin-top: 16px">
			<thead>
				<tr>
					<th>費用項目</th>
					<th>金額目安</th>
					<th>說明</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in rows" :key="row.item">
					<td>{{ row.item }}</td>
					<td>{{ row.amount }}</td>
					<td>{{ row.note }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const rent = ref(45000);

const rows = [
	{ item: '敷金（押金）', amount: '家賃 1〜2 個月', note: '退租時扣除損耗後返還' },
	{ item: '礼金（謝禮金）', amount: '0〜2 個月', note: '不退還，近年零礼金物件增多' },
	{ item: '仲介手数料', amount: '0.5〜1 個月＋稅', note: '法律上限1個月' },
	{ item: '保証会社費用', amount: '初年 0.5〜1 個月', note: '每年續約約1萬円' },
	{ item: '火災保険', amount: '約 1.5〜2 萬円/2年', note: '強制加入' },
	{ item: '鍵交換費', amount: '約 1.5〜2 萬円', note: '可嘗試交涉' },
	{ item: '室内消毒費', amount: '約 1〜2 萬円', note: '可嘗試拒絕協商' },
	{ item: '合計（約）', amount: '家賃 4〜6 個月分', note: '以4.5萬円計，約需備18〜27萬円' },
];
</script>
