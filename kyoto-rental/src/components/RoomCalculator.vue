<template>
	<section class="page-section" id="room-calc">
		<div class="s-header">
			<span class="s-num">03</span>
			<div>
				<div class="s-title">坪數換算 ＆ 房間大小評估</div>
				<div class="s-sub">輸入平面圖數字，自動計算實際可居住面積</div>
			</div>
		</div>

		<div class="alert alert-info" style="margin-bottom: 20px">
			<strong>如何讀懂「洋9.3帖 ＋ 總面積25.5m²」</strong><br />
			平面圖標示的帖數只是「有名稱的房間」面積，總面積扣掉這些後的差值就是廁所、浴室、走廊等你住不到的部分。
		</div>

		<div class="tabs">
			<button
				v-for="(tab, i) in tabs"
				:key="tab.key"
				class="tab-btn"
				:class="{ active: activeTab === tab.key }"
				@click="activeTab = tab.key"
			>
				{{ tab.label }}
			</button>
		</div>

		<!-- 單位換算 -->
		<div v-show="activeTab === 'convert'">
			<div class="calc-grid" style="grid-template-columns: 1fr">
				<div class="calc-group">
					<div class="calc-group-title">輸入面積</div>
					<div class="calc-row">
						<label>面積數值</label>
						<input type="number" v-model.number="cv.val" step="0.5" />
						<select v-model="cv.unit">
							<option value="m2">m²</option>
							<option value="jo">疊 / 帖</option>
							<option value="tsubo">坪</option>
						</select>
					</div>
					<div class="calc-row">
						<label>疊數標準</label>
						<select v-model.number="cv.joM2">
							<option :value="1.82">京間（京都，1帖=1.82m²）</option>
							<option :value="1.653">江戸間（關東，1帖=1.653m²）</option>
						</select>
					</div>
				</div>
			</div>
			<div
				style="
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
					gap: 10px;
					margin: 16px 0;
				"
			>
				<div class="area-card">
					<div class="a-label">m²</div>
					<div class="a-val">{{ cvM2.toFixed(1) }} m²</div>
				</div>
				<div class="area-card">
					<div class="a-label">疊 / 帖</div>
					<div class="a-val">{{ cvJo.toFixed(1) }} 帖</div>
				</div>
				<div class="area-card">
					<div class="a-label">坪</div>
					<div class="a-val">{{ cvTsubo.toFixed(1) }} 坪</div>
				</div>
				<div class="area-card">
					<div class="a-label">整體感受</div>
					<div class="a-val" style="font-size: 14px; font-family: 'Noto Sans TC', sans-serif">
						{{ cvFeel }}
					</div>
				</div>
			</div>
		</div>

		<!-- 平面圖試算 -->
		<div v-show="activeTab === 'plan'">
			<div class="calc-grid">
				<div class="calc-group">
					<div class="calc-group-title">物件基本資訊</div>
					<div class="calc-row">
						<label>總專有面積</label><input type="number" v-model.number="pl.total" step="0.5" /><span
							class="unit"
							>m²</span
						>
					</div>
					<div class="calc-row">
						<label>疊數標準</label>
						<select v-model.number="pl.joM2">
							<option :value="1.82">京間（推薦）</option>
							<option :value="1.653">江戸間</option>
						</select>
					</div>
				</div>
				<div class="calc-group">
					<div class="calc-group-title">各房間帖數</div>
					<div class="calc-row">
						<label>洋室 / 臥室</label><input type="number" v-model.number="pl.yo" step="0.1" /><span
							class="unit"
							>帖</span
						>
					</div>
					<div class="calc-row">
						<label>廚房 K/DK</label><input type="number" v-model.number="pl.k" step="0.1" /><span
							class="unit"
							>帖（ワンルームは0）</span
						>
					</div>
					<div class="calc-row">
						<label>收納 / 押入</label><input type="number" v-model.number="pl.cl" step="0.1" /><span
							class="unit"
							>帖</span
						>
					</div>
				</div>
			</div>
			<div
				style="
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
					gap: 10px;
					margin: 16px 0;
				"
			>
				<div class="area-card">
					<div class="a-label">臥室實際面積</div>
					<div class="a-val">{{ plYoM2.toFixed(1) }} m²</div>
					<div class="a-sub">{{ pl.yo }}帖 × {{ pl.joM2 }}m²</div>
				</div>
				<div class="area-card">
					<div class="a-label">非居住空間</div>
					<div class="a-val">{{ plNonLiv.toFixed(1) }} m²</div>
					<div class="a-sub">廁所・走廊・牆壁</div>
				</div>
				<div class="area-card">
					<div class="a-label">居住面積比</div>
					<div class="a-val">{{ plRatio }}%</div>
					<div class="a-sub">建議 60% 以上</div>
				</div>
				<div class="area-card">
					<div class="a-label">舒適度</div>
					<div
						class="a-val"
						:style="{ fontSize: '14px', fontFamily: 'Noto Sans TC,sans-serif', color: plComfortColor }"
					>
						{{ plComfort }}
					</div>
				</div>
			</div>
			<div class="alert" :class="plWarnClass">{{ plWarnText }}</div>
		</div>

		<!-- 舒適度參考 -->
		<div v-show="activeTab === 'comfort'">
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px">
				<div
					v-for="item in comfortItems"
					:key="item.type"
					style="
						background: var(--paper2);
						border: 0.5px solid var(--border);
						border-radius: var(--radius-lg);
						padding: 14px;
					"
				>
					<div style="font-size: 13px; font-weight: 500; margin-bottom: 2px">{{ item.type }}</div>
					<div style="font-size: 11px; color: var(--ink3); margin-bottom: 8px">{{ item.m2 }}</div>
					<div style="background: var(--paper3); border-radius: 3px; height: 5px; margin-bottom: 6px">
						<div
							style="height: 5px; border-radius: 3px"
							:style="{ width: item.pct + '%', background: item.color }"
						></div>
					</div>
					<div style="font-size: 11px; color: var(--ink2); line-height: 1.5">{{ item.desc }}</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('convert');
const tabs = [
	{ key: 'convert', label: '單位換算' },
	{ key: 'plan', label: '平面圖試算' },
	{ key: 'comfort', label: '房型舒適度' },
];

// 換算
const cv = ref({ val: 25.5, unit: 'm2', joM2: 1.82 });
const cvM2 = computed(() =>
	cv.value.unit === 'm2' ? cv.value.val : cv.value.unit === 'jo' ? cv.value.val * cv.value.joM2 : cv.value.val * 3.306
);
const cvJo = computed(() => cvM2.value / cv.value.joM2);
const cvTsubo = computed(() => cvM2.value / 3.306);
const cvFeel = computed(() => {
	const m = cvM2.value;
	return m < 15
		? '非常狹小'
		: m < 20
			? '小巧套房'
			: m < 26
				? '標準套房'
				: m < 32
					? '舒適單人'
					: m < 42
						? '寬裕1DK'
						: '1LDK以上';
});

// 平面圖
const pl = ref({ total: 25.5, joM2: 1.82, yo: 9.3, k: 0, cl: 1.5 });
const plYoM2 = computed(() => pl.value.yo * pl.value.joM2);
const plNonLiv = computed(() => Math.max(0, pl.value.total - (pl.value.yo + pl.value.k + pl.value.cl) * pl.value.joM2));
const plRatio = computed(() => (pl.value.total > 0 ? Math.round((plYoM2.value / pl.value.total) * 100) : 0));
const plComfort = computed(() =>
	plYoM2.value < 12 ? '非常狹小' : plYoM2.value < 16 ? '普通' : plYoM2.value < 20 ? '舒適' : '寬裕'
);
const plComfortColor = computed(() =>
	plYoM2.value < 12 ? '#c62828' : plYoM2.value < 16 ? '#856404' : plYoM2.value < 20 ? '#0a5e38' : '#0a3471'
);
const plWarnClass = computed(() =>
	plYoM2.value < 12 ? 'alert-danger' : plYoM2.value < 16 ? 'alert-warn' : 'alert-ok'
);
const plWarnText = computed(() => {
	const m = plYoM2.value.toFixed(1);
	if (plYoM2.value < 12) return `臥室僅 ${m}m²，非常狹小。`;
	if (plYoM2.value < 16) return `臥室 ${m}m²，普通。床＋書桌可放，衣櫃空間有限。`;
	return `臥室 ${m}m²，舒適。可放床、書桌、衣櫃，日常生活不受限。`;
});

const comfortItems = [
	{
		type: 'ワンルーム / 1K 狹小',
		m2: '15–20 m²（約4.5–6坪）',
		pct: 30,
		color: '#e74c3c',
		desc: '僅能放床＋小書桌，空間非常受限',
	},
	{ type: '1K 標準', m2: '20–26 m²（約6–8坪）', pct: 52, color: '#e67e22', desc: '語言學校生常見選擇，稍微緊湊' },
	{
		type: '1K 寬裕型',
		m2: '26–32 m²（約8–10坪）',
		pct: 70,
		color: '#27ae60',
		desc: '床＋書桌＋小沙發可放，推薦目標',
	},
	{ type: '1DK', m2: '30–40 m²（約9–12坪）', pct: 82, color: '#1a6b5a', desc: '廚房與臥室分離，舒適感大幅提升' },
	{ type: '1LDK', m2: '40m²以上（12坪以上）', pct: 96, color: '#2980b9', desc: '有獨立客廳，適合長期定居' },
];
</script>
