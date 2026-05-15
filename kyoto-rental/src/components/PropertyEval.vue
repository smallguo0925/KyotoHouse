<template>
	<section class="page-section" id="property-eval">
		<div class="s-header">
			<span class="s-num">11</span>
			<div>
				<div class="s-title">物件評估工具</div>
				<div class="s-sub">輸入物件資訊＋自訂條件，自動評分並列出優缺點</div>
			</div>
		</div>

		<div class="calc-grid">
			<!-- 基本費用 -->
			<div class="calc-group">
				<div class="calc-group-title">基本費用資訊</div>
				<div class="calc-row">
					<label>家賃</label>
					<input type="number" v-model.number="form.rent" step="500" />
					<span class="unit">円／月</span>
				</div>
				<div class="calc-row">
					<label>管理費・共益費</label>
					<input type="number" v-model.number="form.kanri" step="500" />
					<span class="unit">円／月</span>
				</div>
				<div class="calc-row">
					<label>敷金</label>
					<input type="number" v-model.number="form.shiki" step="0.5" min="0" max="3" />
					<span class="unit">個月</span>
				</div>
				<div class="calc-row">
					<label>礼金</label>
					<input type="number" v-model.number="form.rei" step="0.5" min="0" max="3" />
					<span class="unit">個月</span>
				</div>
				<div class="calc-row">
					<label>更新料</label>
					<select v-model.number="form.koshin">
						<option :value="0">なし（無更新料）</option>
						<option :value="1">あり（1個月）</option>
						<option :value="0.5">あり（0.5個月）</option>
					</select>
				</div>
			</div>

			<!-- 物件條件 -->
			<div class="calc-group">
				<div class="calc-group-title">物件條件</div>
				<div class="calc-row">
					<label>總面積</label>
					<input type="number" v-model.number="form.m2" step="0.5" />
					<span class="unit">m²</span>
				</div>
				<div class="calc-row">
					<label>臥室疊數</label>
					<input type="number" v-model.number="form.jo" step="0.1" />
					<span class="unit">帖（京間）</span>
				</div>
				<div class="calc-row">
					<label>屋齡</label>
					<input type="number" v-model.number="form.age" step="1" />
					<span class="unit">年</span>
				</div>
				<div class="calc-row">
					<label>樓層</label>
					<input type="number" v-model.number="form.floor" step="1" min="1" />
					<span class="unit">F</span>
				</div>
				<div class="calc-row">
					<label>朝向</label>
					<select v-model.number="form.dir">
						<option :value="4">南向（最佳）</option>
						<option :value="3">東向</option>
						<option :value="2">西向</option>
						<option :value="1">北向（最差）</option>
					</select>
				</div>
				<div class="calc-row">
					<label>瓦斯種類</label>
					<select v-model.number="form.gas">
						<option :value="2">都市ガス ✓</option>
						<option :value="0">プロパンガス</option>
						<option :value="1">オール電化</option>
					</select>
				</div>
				<div class="calc-row">
					<label>建築結構</label>
					<select v-model.number="form.struct">
						<option :value="3">RC（鋼筋混凝土）</option>
						<option :value="2">SRC</option>
						<option :value="1">木造 / 軽量鉄骨</option>
					</select>
				</div>
				<div class="calc-row">
					<label>所在區域</label>
					<select v-model.number="form.market">
						<option :value="45000">北大路周辺（相場 45,000円）</option>
						<option :value="46000">茶山・元田中（相場 46,000円）</option>
						<option :value="48000">出町柳周辺（相場 48,000円）</option>
						<option :value="43000">北白川エリア（相場 43,000円）</option>
						<option :value="0">その他 / 不明</option>
					</select>
				</div>
			</div>

			<!-- 設備條件 -->
			<div class="calc-group">
				<div class="calc-group-title">設備・環境條件</div>

				<!-- 分類 Tab -->
				<div class="equip-tabs">
					<button
						v-for="t in equipTabs"
						:key="t.key"
						class="equip-tab-btn"
						:class="{ active: equipTab === t.key }"
						@click="equipTab = t.key"
					>
						{{ t.label }}
					</button>
				</div>

				<!-- 預設條件 -->
				<div v-show="equipTab !== 'custom'">
					<label
						v-for="eq in currentEquipList"
						:key="eq.id"
						class="eq-item"
						:class="{ checked: eq.checked }"
						@click="eq.checked = !eq.checked"
					>
						<input type="checkbox" v-model="eq.checked" @click.stop />
						<div>
							<div class="eq-label">{{ eq.label }}</div>
							<div class="eq-score">+{{ eq.score }}分 · {{ eq.note }}</div>
						</div>
					</label>
				</div>

				<!-- 自訂條件 -->
				<div v-show="equipTab === 'custom'">
					<!-- 新增列 -->
					<div class="custom-add-row">
						<input
							v-model="newCondition.label"
							placeholder="條件名稱（如：垃圾代收、南向採光…）"
							class="custom-input"
							@keyup.enter="addCondition"
						/>
						<select v-model.number="newCondition.score" class="custom-select">
							<option :value="3">低（+3分）</option>
							<option :value="6">中（+6分）</option>
							<option :value="10">高（+10分）</option>
							<option :value="15">非常重要（+15分）</option>
						</select>
						<button class="custom-add-btn" @click="addCondition">新增</button>
					</div>

					<!-- 自訂條件列表 -->
					<div v-if="store.customConditions.length === 0" class="custom-empty">尚未新增任何自訂條件</div>
					<div v-else class="custom-tags">
						<div
							v-for="cond in store.customConditions"
							:key="cond.id"
							class="custom-tag"
							:class="{ checked: cond.checked }"
							@click="cond.checked = !cond.checked"
						>
							<input type="checkbox" v-model="cond.checked" @click.stop />
							<span>{{ cond.label }}</span>
							<span class="custom-tag-score">+{{ cond.score }}分</span>
							<span class="custom-tag-del" @click.stop="removeCondition(cond.id)" title="刪除">×</span>
						</div>
					</div>
				</div>

				<!-- 已勾選摘要 -->
				<div class="equip-summary-box">
					<div class="equip-summary-title">已勾選條件</div>
					<div v-if="checkedLabels.length === 0" style="font-size: 12px; color: var(--ink3)">— 尚未勾選</div>
					<div v-else class="equip-summary-tags">
						<span v-for="label in checkedLabels" :key="label" class="equip-summary-tag">{{ label }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 相場比較 -->
		<div v-if="form.market > 0" class="alert" :class="marketAlertClass" style="margin-bottom: 16px">
			{{ marketText }}
		</div>

		<!-- 評分結果 -->
		<div class="score-block">
			<div class="score-left">
				<div class="score-label-text">綜合評分</div>
				<div class="score-number" :style="{ color: scoreColor }">{{ totalScore }}</div>
				<div class="score-verdict" :style="{ color: scoreColor }">{{ scoreVerdict }}</div>
			</div>
			<div class="score-bars">
				<div class="score-bar-row" v-for="bar in scoreBars" :key="bar.label">
					<div class="score-bar-meta">
						<span>{{ bar.label }}</span>
						<span>{{ bar.val }}/{{ bar.max }}</span>
					</div>
					<div class="score-bar-bg">
						<div
							class="score-bar-fill"
							:style="{ width: (bar.val / bar.max) * 100 + '%', background: bar.color }"
						></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 台幣換算 -->
		<div class="result-strip" style="margin: 16px 0">
			<div class="r-item">
				<div class="r-label">月費合計（円）</div>
				<div class="r-val">¥{{ monthly.toLocaleString() }}</div>
			</div>
			<div class="r-item">
				<div class="r-label">月費合計（TWD）</div>
				<div class="r-val">{{ fmtTWD(monthly) }}</div>
			</div>
			<div class="r-item">
				<div class="r-label">初期費用估算（円）</div>
				<div class="r-val">¥{{ iniJPY.toLocaleString() }}</div>
			</div>
			<div class="r-item">
				<div class="r-label">初期費用估算（TWD）</div>
				<div class="r-val">{{ fmtTWD(iniJPY) }}</div>
			</div>
		</div>

		<!-- 優缺點 -->
		<div class="pros-cons-grid">
			<div class="card-white">
				<div class="pros-title">✓ 優點</div>
				<div v-if="pros.length === 0" class="no-items">— 無明顯優點</div>
				<div v-for="p in pros" :key="p" class="pro-item">✓ {{ p }}</div>
			</div>
			<div class="card-white">
				<div class="cons-title">✗ 缺點 / 注意</div>
				<div v-if="cons.length === 0" class="no-items">— 無明顯缺點</div>
				<div v-for="c in cons" :key="c" class="con-item">✗ {{ c }}</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useSettingsStore } from '../stores/settings.js';

const store = useSettingsStore();

// ── 表單狀態 ──
const form = reactive({
	rent: 45000,
	kanri: 3000,
	shiki: 1,
	rei: 1,
	koshin: 1,
	m2: 25.5,
	jo: 9.3,
	age: 15,
	floor: 3,
	dir: 2,
	gas: 2,
	struct: 1,
	market: 45000,
});

// ── 設備資料 ──
const equipData = reactive({
	basic: [
		{ id: 'aircon', label: '冷暖エアコン', score: 10, note: '京都冬天必備', checked: false },
		{ id: 'sep', label: '3点独立（浴廁分離）', score: 10, note: '舒適度大幅提升', checked: false },
		{ id: 'autolock', label: 'オートロック', score: 8, note: '門禁，安全性高', checked: false },
		{ id: 'inet', label: 'ネット無料', score: 8, note: '省月費與申請手續', checked: false },
		{ id: 'wash', label: '室内洗濯機置場', score: 5, note: '室内比室外方便', checked: false },
		{ id: 'furniture', label: '家具家電付き', score: 6, note: '省去購置費用', checked: false },
		{ id: 'doublewin', label: '二重窓・複層ガラス', score: 5, note: '隔熱隔音效果佳', checked: false },
		{ id: 'florheat', label: '床暖房', score: 4, note: '京都冬天的加分項', checked: false },
	],
	life: [
		{ id: 'garbage24', label: '24h ゴミ出し可', score: 8, note: '隨時可丟垃圾', checked: false },
		{ id: 'takuhai', label: '宅配ボックス', score: 5, note: '不在家也可收包裹', checked: false },
		{ id: 'bike', label: '駐輪場あり', score: 5, note: '腳踏車停放空間', checked: false },
		{ id: 'supermarket', label: '徒歩10分内スーパー', score: 6, note: '生活便利度關鍵', checked: false },
		{ id: 'laundry', label: 'コインランドリー近く', score: 3, note: '附近有投幣洗衣店', checked: false },
		{ id: 'postbox', label: 'メールボックス', score: 2, note: '每戶獨立信箱', checked: false },
	],
	safety: [
		{ id: 'camera', label: '防犯カメラ', score: 5, note: '大樓監視攝影機', checked: false },
		{ id: '2fup', label: '2F以上', score: 5, note: '1樓安全性低且濕氣重', checked: false },
		{ id: 'newquake', label: '新耐震基準（1981年後）', score: 6, note: '較安全的建築標準', checked: false },
		{ id: 'interphone', label: 'モニター付きインターホン', score: 4, note: '可看到門口訪客', checked: false },
		{ id: 'quiet', label: '閑静な住宅街', score: 4, note: '噪音少，適合學習', checked: false },
		{ id: 'brightroad', label: '夜道が明るい', score: 3, note: '夜間回家路線安全', checked: false },
	],
	special: [
		{ id: 'gaijin', label: '外国人可（明示）', score: 10, note: '明確標示接受外國人', checked: false },
		{ id: 'hoshounin', label: '保証人不要', score: 6, note: '對外國人友善', checked: false },
		{ id: 'reikon0', label: '礼金なし', score: 6, note: '省初期費用', checked: false },
		{ id: 'short', label: '短期契約可', score: 4, note: '可簽6個月等短期', checked: false },
		{ id: 'pet', label: 'ペット可', score: 5, note: '可養寵物', checked: false },
		{ id: 'instrument', label: '楽器相談可', score: 5, note: '可使用樂器', checked: false },
	],
});

const equipTabs = [
	{ key: 'basic', label: '基本設備' },
	{ key: 'life', label: '生活便利' },
	{ key: 'safety', label: '安全・環境' },
	{ key: 'special', label: '特殊需求' },
	{ key: 'custom', label: '自訂條件 ＋' },
];
const equipTab = ref('basic');

const currentEquipList = computed(() => {
	if (equipTab.value === 'custom') return [];
	return equipData[equipTab.value] || [];
});

// ── 自訂條件 ──
const newCondition = reactive({ label: '', score: 6 });

function addCondition() {
	const label = newCondition.label.trim();
	if (!label) return;
	store.customConditions.push({
		id: 'custom-' + Date.now(),
		label,
		score: newCondition.score,
		checked: false,
	});
	newCondition.label = '';
	newCondition.score = 6;
}

function removeCondition(id) {
	const idx = store.customConditions.findIndex((c) => c.id === id);
	if (idx !== -1) store.customConditions.splice(idx, 1);
}

// ── 已勾選摘要 ──
const checkedLabels = computed(() => {
	const preset = Object.values(equipData)
		.flat()
		.filter((e) => e.checked)
		.map((e) => e.label);
	const custom = store.customConditions.filter((c) => c.checked).map((c) => c.label + '（自訂）');
	return [...preset, ...custom];
});

// ── 評分計算 ──
const equipScore = computed(() => {
	const preset = Object.values(equipData)
		.flat()
		.filter((e) => e.checked)
		.reduce((s, e) => s + e.score, 0);
	const custom = store.customConditions.filter((c) => c.checked).reduce((s, c) => s + c.score, 0);
	return preset + custom;
});

const yoM2 = computed(() => form.jo * 1.82);

const costScore = computed(() => {
	if (form.market === 0) return 15;
	const diff = form.rent + form.kanri - form.market;
	if (diff <= -3000) return 30;
	if (diff <= 0) return 25;
	if (diff <= 3000) return 18;
	if (diff <= 6000) return 10;
	return 3;
});

const spaceScore = computed(() => (yoM2.value < 12 ? 4 : yoM2.value < 16 ? 10 : yoM2.value < 20 ? 16 : 20));

const equipFinal = computed(() => Math.min(30, Math.round((equipScore.value * 30) / 120)));

const buildScore = computed(() => {
	let s = 0;
	s += form.dir === 4 ? 5 : form.dir === 3 ? 4 : form.dir === 2 ? 2 : 0;
	s += form.floor >= 2 ? 3 : 0;
	s += form.age <= 10 ? 4 : form.age <= 20 ? 3 : form.age <= 30 ? 1 : 0;
	s += form.struct === 3 ? 3 : form.struct === 2 ? 2 : 1;
	return s;
});

const gasScore = computed(() => (form.gas === 2 ? 10 : form.gas === 1 ? 7 : 2));

const totalScore = computed(
	() => costScore.value + spaceScore.value + equipFinal.value + buildScore.value + gasScore.value
);

const scoreVerdict = computed(() => {
	const s = totalScore.value;
	return s >= 80 ? '非常推薦' : s >= 65 ? '值得考慮' : s >= 50 ? '普通' : s >= 35 ? '需謹慎' : '不建議';
});

const scoreColor = computed(() => {
	const s = totalScore.value;
	return s >= 80 ? '#1a6b5a' : s >= 65 ? '#2980b9' : s >= 50 ? '#e67e22' : '#c62828';
});

const scoreBars = computed(() => [
	{ label: '費用合理性', val: costScore.value, max: 30, color: barColor(costScore.value / 30) },
	{ label: '空間舒適度', val: spaceScore.value, max: 20, color: barColor(spaceScore.value / 20) },
	{ label: '設備充實度', val: equipFinal.value, max: 30, color: barColor(equipFinal.value / 30) },
	{ label: '建築條件', val: buildScore.value, max: 15, color: barColor(buildScore.value / 15) },
	{ label: '瓦斯種類', val: gasScore.value, max: 10, color: barColor(gasScore.value / 10) },
]);

const barColor = (ratio) => (ratio >= 0.7 ? '#1a6b5a' : ratio >= 0.45 ? '#e67e22' : '#c62828');

// ── 相場比較 ──
const marketDiff = computed(() => form.rent + form.kanri - form.market);

const marketAlertClass = computed(() => {
	if (form.market === 0) return '';
	return marketDiff.value <= 0 ? 'alert-ok' : marketDiff.value <= 3000 ? 'alert-warn' : 'alert-danger';
});

const marketText = computed(() => {
	const d = marketDiff.value;
	if (d <= -3000) return `比周邊相場便宜 ¥${Math.abs(d).toLocaleString()}，非常划算`;
	if (d <= 0) return `與周邊相場相近（差 ¥${Math.abs(d).toLocaleString()}），合理範圍`;
	if (d <= 3000) return `比周邊相場貴 ¥${d.toLocaleString()}，稍高但可接受（確認設備是否值得）`;
	return `比周邊相場貴 ¥${d.toLocaleString()}，明顯偏高，建議再找其他物件`;
});

// ── 台幣換算 ──
const monthly = computed(() => form.rent + form.kanri);
const iniJPY = computed(() => Math.round((form.shiki + form.rei + 1.5) * form.rent + 30000));
const fmtTWD = (jpy) => 'NT$' + Math.round(jpy * store.twdRate).toLocaleString();

// ── 優缺點 ──
const allEquip = computed(() => Object.values(equipData).flat());

const pros = computed(() => {
	const list = [];
	if (form.market > 0 && marketDiff.value <= -3000)
		list.push(`比周邊相場便宜 ¥${Math.abs(marketDiff.value).toLocaleString()}，CP值高`);
	else if (form.market > 0 && marketDiff.value <= 0) list.push('費用與周邊相場相近，合理');
	if (form.rei === 0) list.push('無礼金，省下初期費用');
	if (form.koshin === 0) list.push('無更新料，長期居住省錢');
	if (yoM2.value >= 18) list.push(`臥室 ${yoM2.value.toFixed(1)}m²，空間寬裕`);
	if (form.gas === 2) list.push('都市ガス，瓦斯費用合理');
	if (form.gas === 1) list.push('全電化，無瓦斯費（夜間電費優惠）');
	if (form.struct === 3) list.push('RC構造，隔音佳');
	if (form.age <= 10) list.push(`屋齡 ${form.age} 年，建築新，設備較齊全`);
	if (form.floor >= 3) list.push(`${form.floor} 樓，採光通風較好`);
	if (form.dir === 4) list.push('南向，日照充足，冬天較暖');
	allEquip.value.filter((e) => e.checked).forEach((e) => list.push(e.label + ' あり'));
	store.customConditions.filter((c) => c.checked).forEach((c) => list.push(c.label + '（自訂條件符合）'));
	return list;
});

const cons = computed(() => {
	const list = [];
	if (form.market > 0 && marketDiff.value > 3000)
		list.push(`租金明顯高於相場 ¥${marketDiff.value.toLocaleString()}，建議比較其他物件`);
	else if (form.market > 0 && marketDiff.value > 0)
		list.push(`租金稍高於相場 ¥${marketDiff.value.toLocaleString()}，確認設備是否值得`);
	if (form.rei >= 2) list.push(`礼金 ${form.rei} 個月，初期費用負擔重`);
	if (form.koshin > 0) list.push(`有更新料（每2年需付 ${form.koshin} 個月家賃）`);
	if (yoM2.value < 14) list.push(`臥室僅 ${yoM2.value.toFixed(1)}m²，空間非常有限`);
	else if (yoM2.value < 16) list.push(`臥室 ${yoM2.value.toFixed(1)}m²，普通，家具選擇受限`);
	if (form.gas === 0) list.push('プロパンガス，瓦斯費約都市ガス 2 倍');
	if (form.struct === 1) list.push('木造 / 軽量鉄骨，隔音較差，需注意鄰居噪音');
	if (form.age > 30) list.push(`屋齡 ${form.age} 年，較老舊，隔熱・設備可能較差`);
	if (form.floor === 1) list.push('1樓，濕氣較重且安全性低');
	if (form.dir === 1) list.push('北向，採光最差，冬天較陰冷');
	// 重要設備未勾選
	const important = allEquip.value.filter((e) => e.score >= 8 && !e.checked);
	important.forEach((e) => list.push(`未確認：${e.label}（重要度高）`));
	// 自訂條件未勾選
	store.customConditions
		.filter((c) => !c.checked && c.score >= 10)
		.forEach((c) => list.push(`未符合自訂條件：${c.label}`));
	return list;
});
</script>

<style scoped>
/* 設備 Tab */
.equip-tabs {
	display: flex;
	gap: 0;
	border-bottom: 0.5px solid var(--border);
	margin-bottom: 12px;
	overflow-x: auto;
}
.equip-tabs::-webkit-scrollbar {
	display: none;
}
.equip-tab-btn {
	font-size: 11px;
	color: var(--ink3);
	background: none;
	border: none;
	padding: 6px 10px;
	border-bottom: 2px solid transparent;
	cursor: pointer;
	white-space: nowrap;
	font-family: 'Noto Sans TC', sans-serif;
	transition:
		color 0.15s,
		border-color 0.15s;
}
.equip-tab-btn.active {
	color: var(--ink);
	border-color: var(--accent);
}

/* 設備項目 */
.eq-item {
	display: flex;
	align-items: flex-start;
	gap: 7px;
	padding: 7px 9px;
	border-radius: var(--radius);
	border: 0.5px solid var(--border2);
	background: #fff;
	cursor: pointer;
	transition:
		border-color 0.15s,
		background 0.15s;
	margin-bottom: 5px;
}
.eq-item:hover {
	border-color: var(--border);
	background: var(--paper2);
}
.eq-item.checked {
	border-color: var(--teal);
	background: var(--teal-lt);
}
.eq-item input {
	margin-top: 2px;
	accent-color: var(--teal);
	flex-shrink: 0;
}
.eq-label {
	font-size: 12px;
	color: var(--ink2);
}
.eq-score {
	font-size: 10px;
	color: var(--ink3);
}

/* 自訂條件 */
.custom-add-row {
	display: flex;
	gap: 6px;
	align-items: center;
	flex-wrap: wrap;
	padding: 10px 12px;
	background: var(--paper2);
	border-radius: var(--radius);
	border: 0.5px dashed var(--border);
	margin-bottom: 12px;
}
.custom-input {
	flex: 1;
	min-width: 140px;
	font-size: 12px;
	font-family: 'Noto Sans TC', sans-serif;
	background: #fff;
	border: 0.5px solid var(--border);
	border-radius: var(--radius);
	padding: 6px 10px;
	color: var(--ink);
}
.custom-input:focus {
	outline: none;
	border-color: var(--accent);
}
.custom-select {
	font-size: 12px;
	font-family: 'Noto Sans TC', sans-serif;
	background: #fff;
	border: 0.5px solid var(--border);
	border-radius: var(--radius);
	padding: 6px 8px;
	color: var(--ink);
}
.custom-add-btn {
	font-size: 12px;
	font-family: 'Noto Sans TC', sans-serif;
	background: var(--ink);
	color: var(--paper);
	border: none;
	border-radius: var(--radius);
	padding: 6px 16px;
	cursor: pointer;
	transition: opacity 0.15s;
}
.custom-add-btn:hover {
	opacity: 0.8;
}
.custom-empty {
	font-size: 12px;
	color: var(--ink3);
	text-align: center;
	padding: 20px 0;
}
.custom-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
}
.custom-tag {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 5px 10px;
	border-radius: 20px;
	font-size: 12px;
	border: 0.5px solid var(--border);
	background: #fff;
	cursor: pointer;
	transition:
		background 0.15s,
		border-color 0.15s;
	user-select: none;
}
.custom-tag.checked {
	background: var(--teal-lt);
	border-color: var(--teal);
	color: var(--teal);
}
.custom-tag input {
	accent-color: var(--teal);
	pointer-events: none;
}
.custom-tag-score {
	font-size: 10px;
	color: var(--ink3);
}
.custom-tag-del {
	font-size: 14px;
	color: var(--ink3);
	cursor: pointer;
	line-height: 1;
	padding: 0 2px;
	transition: color 0.15s;
}
.custom-tag-del:hover {
	color: var(--accent);
}

/* 已勾選摘要 */
.equip-summary-box {
	margin-top: 10px;
	padding: 10px 12px;
	background: var(--paper2);
	border-radius: var(--radius);
	border: 0.5px solid var(--border);
}
.equip-summary-title {
	font-size: 11px;
	color: var(--ink3);
	margin-bottom: 6px;
}
.equip-summary-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
}
.equip-summary-tag {
	display: inline-block;
	background: var(--teal-lt);
	color: var(--teal);
	border: 0.5px solid var(--teal);
	border-radius: 3px;
	padding: 1px 7px;
	font-size: 11px;
}

/* 評分區塊 */
.score-block {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 24px;
	align-items: center;
	background: var(--ink);
	border-radius: var(--radius-lg);
	padding: 20px 24px;
	margin-bottom: 16px;
}
.score-left {
	text-align: center;
}
.score-label-text {
	font-size: 11px;
	color: rgba(247, 244, 239, 0.5);
	letter-spacing: 0.06em;
	margin-bottom: 4px;
}
.score-number {
	font-family: 'DM Mono', monospace;
	font-size: 56px;
	line-height: 1;
	transition: color 0.3s;
}
.score-verdict {
	font-size: 12px;
	color: rgba(247, 244, 239, 0.6);
	margin-top: 4px;
}
.score-bars {
	display: grid;
	gap: 8px;
}
.score-bar-row {
}
.score-bar-meta {
	display: flex;
	justify-content: space-between;
	font-size: 11px;
	color: rgba(247, 244, 239, 0.55);
	margin-bottom: 3px;
}
.score-bar-bg {
	background: rgba(255, 255, 255, 0.1);
	border-radius: 3px;
	height: 5px;
}
.score-bar-fill {
	height: 5px;
	border-radius: 3px;
	transition: width 0.4s;
}

/* 優缺點 */
.pros-cons-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
}
.pros-title {
	font-size: 12px;
	font-weight: 500;
	color: var(--teal);
	margin-bottom: 10px;
	padding-bottom: 6px;
	border-bottom: 0.5px solid var(--border);
}
.cons-title {
	font-size: 12px;
	font-weight: 500;
	color: var(--accent);
	margin-bottom: 10px;
	padding-bottom: 6px;
	border-bottom: 0.5px solid var(--border);
}
.pro-item,
.con-item {
	font-size: 12px;
	color: var(--ink2);
	padding: 4px 0;
	border-bottom: 0.5px solid var(--border2);
	line-height: 1.5;
}
.no-items {
	font-size: 12px;
	color: var(--ink3);
}

@media (max-width: 600px) {
	.score-block {
		grid-template-columns: 1fr;
	}
	.pros-cons-grid {
		grid-template-columns: 1fr;
	}
}
</style>
