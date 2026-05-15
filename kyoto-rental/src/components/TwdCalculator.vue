<template>
	<section class="page-section" id="twd-calc">
		<div class="s-header">
			<span class="s-num">10</span>
			<div>
				<div class="s-title">台幣換算對照表</div>
				<div class="s-sub">輸入匯率，將所有費用同步換算為台幣</div>
			</div>
		</div>

		<!-- 匯率輸入 -->
		<div class="calc-grid" style="grid-template-columns: 1fr">
			<div class="calc-group">
				<div class="calc-group-title">匯率設定</div>
				<div class="calc-row">
					<label>1 日圓 ＝</label>
					<input type="number" v-model.number="store.twdRate" step="0.001" min="0.1" max="1" />
					<span class="unit">台幣（TWD）</span>
					<span class="rate-hint">※ 請輸入當前匯率，預設 0.22</span>
				</div>
			</div>
		</div>

		<!-- 常見費用換算表 -->
		<div class="twd-section-title">常見費用台幣對照</div>
		<table>
			<thead>
				<tr>
					<th>費用項目</th>
					<th>日圓（円）</th>
					<th>台幣（TWD）</th>
					<th>說明</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in twdItems" :key="item.label">
					<td>{{ item.label }}</td>
					<td style="font-family: 'DM Mono', monospace">
						{{ item.lo.toLocaleString() }}〜{{ item.hi.toLocaleString() }}
					</td>
					<td style="font-family: 'DM Mono', monospace; color: var(--teal)">
						{{ fmtTWD(item.lo) }}〜{{ fmtTWD(item.hi) }}
					</td>
					<td style="color: var(--ink3)">{{ item.note }}</td>
				</tr>
			</tbody>
		</table>

		<!-- 生活費同步 -->
		<div class="twd-section-title" style="margin-top: 28px">
			與生活費計算機同步結果
			<span class="twd-hint">↑ 請先在第04節填寫生活費數字</span>
		</div>
		<div class="result-strip">
			<div class="r-item">
				<div class="r-label">住居費</div>
				<div class="r-val">{{ fmtTWD(housing) }}</div>
				<div class="r-sub">TWD／月</div>
			</div>
			<div class="r-item">
				<div class="r-label">光熱水費</div>
				<div class="r-val">{{ fmtTWD(util) }}</div>
				<div class="r-sub">TWD／月</div>
			</div>
			<div class="r-item">
				<div class="r-label">學費・交通</div>
				<div class="r-val">{{ fmtTWD(edu) }}</div>
				<div class="r-sub">TWD／月</div>
			</div>
			<div class="r-item">
				<div class="r-label">飲食・生活</div>
				<div class="r-val">{{ fmtTWD(life) }}</div>
				<div class="r-sub">TWD／月</div>
			</div>
			<div class="r-item">
				<div class="r-label">每月總支出</div>
				<div class="r-val">{{ fmtTWD(total) }}</div>
				<div class="r-sub">TWD／月</div>
			</div>
			<div class="r-item">
				<div class="r-label">每年總支出</div>
				<div class="r-val">{{ fmtTWD(total * 12) }}</div>
				<div class="r-sub">TWD／年</div>
			</div>
		</div>

		<!-- 初期費用台幣試算 -->
		<div class="twd-section-title" style="margin-top: 28px">搬入初期費用台幣試算</div>
		<div class="calc-grid" style="grid-template-columns: 1fr">
			<div class="calc-group">
				<div class="calc-group-title">輸入月租金</div>
				<div class="calc-row">
					<label>家賃</label>
					<input type="number" v-model.number="iniRent" step="500" />
					<span class="unit">円／月</span>
				</div>
			</div>
		</div>
		<div class="result-strip" style="grid-template-columns: repeat(3, 1fr)">
			<div class="r-item">
				<div class="r-label">最低（×4）</div>
				<div class="r-val">{{ fmtTWD(iniRent * 4) }}</div>
				<div class="r-sub">敷1礼0</div>
			</div>
			<div class="r-item">
				<div class="r-label">一般（×5）</div>
				<div class="r-val">{{ fmtTWD(iniRent * 5) }}</div>
				<div class="r-sub">敷1礼1</div>
			</div>
			<div class="r-item">
				<div class="r-label">最高（×6）</div>
				<div class="r-val">{{ fmtTWD(iniRent * 6) }}</div>
				<div class="r-sub">敷2礼2</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSettingsStore } from '../stores/settings.js';

const store = useSettingsStore();
const iniRent = ref(45000);

const fmtTWD = (jpy) => 'NT$' + Math.round(jpy * store.twdRate).toLocaleString();

const c = computed(() => store.cost);
const housing = computed(() => c.value.rent + c.value.kanri);
const util = computed(() => c.value.denki + c.value.gas + c.value.water);
const edu = computed(() => c.value.school + c.value.transit);
const life = computed(() => c.value.food + c.value.misc + c.value.ent + c.value.net + c.value.phone);
const total = computed(() => housing.value + util.value + edu.value + life.value);

const twdItems = [
	{ label: '家賃（月租，相場4.3〜4.8萬円）', lo: 43000, hi: 48000, note: '依區域不同' },
	{ label: '管理費・共益費', lo: 2000, hi: 5000, note: '每月固定' },
	{ label: '敷金（押金，1個月）', lo: 43000, hi: 48000, note: '退租時返還' },
	{ label: '礼金（謝禮金，1個月）', lo: 43000, hi: 48000, note: '不退還' },
	{ label: '仲介手数料', lo: 21500, hi: 48000, note: '0.5〜1個月' },
	{ label: '保証会社費（初年）', lo: 21500, hi: 48000, note: '每年續約約1萬円' },
	{ label: '火災保険（2年）', lo: 15000, hi: 20000, note: '強制加入' },
	{ label: '電費（月）', lo: 2000, hi: 5000, note: '夏冬偏高' },
	{ label: '瓦斯費・都市ガス（月）', lo: 1500, hi: 3000, note: '管道瓦斯' },
	{ label: '瓦斯費・プロパン（月）', lo: 3000, hi: 6000, note: '丙烷約2倍' },
	{ label: '水道費（月均）', lo: 1000, hi: 2000, note: '2個月一次計費' },
	{ label: '語言學校學費（月均）', lo: 55000, hi: 70000, note: '依學校而異' },
	{ label: '飲食費（月）', lo: 20000, hi: 30000, note: '自炊為主' },
	{ label: '交通費・通學（月）', lo: 3000, hi: 6000, note: '地鐵＋巴士' },
];
</script>

<style scoped>
.twd-section-title {
	font-size: 13px;
	font-weight: 500;
	color: var(--ink2);
	margin-bottom: 12px;
}
.twd-hint {
	font-size: 11px;
	font-weight: 400;
	color: var(--ink3);
	margin-left: 8px;
}
.rate-hint {
	font-size: 11px;
	color: var(--ink3);
	margin-left: 8px;
}
</style>
