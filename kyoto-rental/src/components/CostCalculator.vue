<template>
	<section class="page-section" id="cost-calc">
		<div class="s-header">
			<span class="s-num">04</span>
			<div>
				<div class="s-title">每月生活費試算</div>
				<div class="s-sub">輸入各項費用，計算每月總支出與預算餘裕</div>
			</div>
		</div>

		<div class="calc-grid">
			<div class="calc-group" v-for="group in groups" :key="group.title">
				<div class="calc-group-title">{{ group.title }}</div>
				<div class="calc-row" v-for="field in group.fields" :key="field.key">
					<label>{{ field.label }}</label>
					<input type="number" v-model.number="store.cost[field.key]" :step="field.step" />
					<span class="unit">{{ field.unit }}</span>
				</div>
			</div>
		</div>

		<div class="result-strip">
			<div class="r-item">
				<div class="r-label">住居費合計</div>
				<div class="r-val">{{ housing.toLocaleString() }}円</div>
			</div>
			<div class="r-item">
				<div class="r-label">光熱水費</div>
				<div class="r-val">{{ util.toLocaleString() }}円</div>
			</div>
			<div class="r-item">
				<div class="r-label">每月總支出</div>
				<div class="r-val">{{ total.toLocaleString() }}円</div>
			</div>
			<div class="r-item">
				<div class="r-label">剩餘 / 超支</div>
				<div class="r-val" :style="{ color: remain >= 0 ? 'var(--paper)' : '#f97171' }">
					{{ remain >= 0 ? '+' : '' }}{{ remain.toLocaleString() }}円
				</div>
				<div class="r-sub">
					{{ remain >= 0 ? '尚有餘裕' : '超出 ' + Math.abs(remain).toLocaleString() + '円' }}
				</div>
			</div>
		</div>

		<div class="alert" :class="warnClass">{{ warnText }}</div>

		<div class="prog-row" v-for="cat in cats" :key="cat.l">
			<div class="prog-label">
				<span>{{ cat.l }}</span>
				<span>{{ cat.v.toLocaleString() }}円 ({{ pct(cat.v) }}%)</span>
			</div>
			<div class="prog-bg">
				<div class="prog-fill" :style="{ width: pct(cat.v) + '%', background: barColor(pct(cat.v)) }"></div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { useSettingsStore } from '../stores/settings.js';

const store = useSettingsStore();
const c = computed(() => store.cost);

const groups = [
	{
		title: '住居費',
		fields: [
			{ key: 'rent', label: '家賃（房租）', step: 500, unit: '円' },
			{ key: 'kanri', label: '管理費・共益費', step: 500, unit: '円' },
		],
	},
	{
		title: '光熱水費',
		fields: [
			{ key: 'denki', label: '電費', step: 100, unit: '円' },
			{ key: 'gas', label: '瓦斯費', step: 100, unit: '円（全電化=0）' },
			{ key: 'water', label: '水道費', step: 100, unit: '円' },
		],
	},
	{
		title: '通信費',
		fields: [
			{ key: 'net', label: '網路費', step: 100, unit: '円（含網路=0）' },
			{ key: 'phone', label: '手機費', step: 100, unit: '円' },
		],
	},
	{
		title: '語言學校費用',
		fields: [
			{ key: 'school', label: '學費月均', step: 1000, unit: '円' },
			{ key: 'transit', label: '交通費（通學）', step: 100, unit: '円' },
		],
	},
	{
		title: '日常生活費',
		fields: [
			{ key: 'food', label: '飲食費', step: 1000, unit: '円' },
			{ key: 'misc', label: '日用品・雜費', step: 500, unit: '円' },
			{ key: 'ent', label: '娛樂・外食', step: 500, unit: '円' },
		],
	},
	{
		title: '預算設定',
		fields: [{ key: 'budget', label: '每月可用預算', step: 5000, unit: '円' }],
	},
];

const housing = computed(() => c.value.rent + c.value.kanri);
const util = computed(() => c.value.denki + c.value.gas + c.value.water);
const comm = computed(() => c.value.net + c.value.phone);
const edu = computed(() => c.value.school + c.value.transit);
const life = computed(() => c.value.food + c.value.misc + c.value.ent);
const total = computed(() => housing.value + util.value + comm.value + edu.value + life.value);
const remain = computed(() => c.value.budget - total.value);

const rentRatio = computed(() => Math.round((housing.value / (c.value.budget || 1)) * 100));
const warnClass = computed(() =>
	rentRatio.value > 35 ? 'alert-danger' : rentRatio.value > 28 ? 'alert-warn' : 'alert-ok'
);
const warnText = computed(() => {
	if (rentRatio.value > 35) return `住居費佔預算 ${rentRatio.value}%，過高（建議30%以內）。`;
	if (rentRatio.value > 28) return `住居費佔預算 ${rentRatio.value}%，稍高但尚可。飲食與娛樂費需控制。`;
	return `住居費佔預算 ${rentRatio.value}%，比例健康，生活費有充足餘裕。`;
});

const cats = computed(() => [
	{ l: '住居費', v: housing.value },
	{ l: '光熱水費', v: util.value },
	{ l: '通信費', v: comm.value },
	{ l: '學費・交通', v: edu.value },
	{ l: '飲食・生活', v: life.value },
]);

const pct = (v) => Math.min(100, Math.round((v / (c.value.budget || 1)) * 100));
const barColor = (p) => (p > 35 ? '#c0392b' : p > 25 ? '#e67e22' : '#1a6b5a');
</script>
