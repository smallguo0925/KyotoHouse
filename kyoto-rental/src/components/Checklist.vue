<template>
	<section class="page-section" id="checklist">
		<div class="s-header">
			<span class="s-num">06</span>
			<div>
				<div class="s-title">看屋確認清單</div>
				<div class="s-sub">勾選已確認的項目，追蹤看屋進度</div>
			</div>
		</div>

		<div style="font-size: 11px; color: var(--ink3); margin-bottom: 8px">
			已確認 {{ checkedCount }} / {{ totalCount }} 項
		</div>
		<div style="background: var(--paper3); border-radius: 4px; height: 4px; margin-bottom: 20px; overflow: hidden">
			<div
				style="height: 4px; background: var(--teal); border-radius: 4px; transition: width 0.3s"
				:style="{ width: progress + '%' }"
			></div>
		</div>
		<div class="checkSectionBox">
			<div class="check-section" v-for="sec in checkData" :key="sec.cat">
				<div class="check-section-title">{{ sec.cat }}</div>
				<div class="check-item" v-for="item in sec.items" :key="item.t" @click="toggle(item)">
					<input type="checkbox" :checked="item.checked" @change="toggle(item)" @click.stop />
					<div class="check-item-content">
						<div class="c-title">{{ item.t }}</div>
						<div class="c-note">{{ item.n }}</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.check-checkSectionBox {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 24px;
}
</style>

<script setup>
import { ref, computed } from 'vue';

const checkData = ref([
	{
		cat: '基本條件',
		items: [
			{ t: '確認「外国人可」', n: '未標示先詢問仲介，避免看完後才拒絕', checked: false },
			{ t: '確認瓦斯種類（都市ガス vs プロパン）', n: '丙烷費用約2倍，租屋平台可篩選', checked: false },
			{ t: '確認家賃＋管理費合計', n: '管理費容易被忽略，是每月固定支出', checked: false },
			{ t: '確認敷金・礼金・更新料', n: '確認退租時敷金返還條件', checked: false },
			{ t: '確認契約期間與中途解約條件', n: '解約違約金通常1〜2個月家賃', checked: false },
		],
	},
	{
		cat: '房間狀況',
		items: [
			{ t: '日照方向（南向最佳）', n: '現場確認光線，避免北向陰暗房', checked: false },
			{ t: '採光・窗戶數量', n: '角部屋有兩面窗，採光通風最好', checked: false },
			{ t: '隔熱・冬季保暖', n: '京都冬天濕冷，確認雙層玻璃或隔熱材', checked: false },
			{ t: '收納空間（押入・クローゼット）', n: '確認深度與容量，建議2帖以上', checked: false },
			{ t: '網路設備確認', n: '「インターネット無料」省費省手續', checked: false },
			{ t: '冷暖兩用エアコン有無', n: '確認是否冷暖兩用，京都冬天暖氣是必需', checked: false },
		],
	},
	{
		cat: '浴室・廚房',
		items: [
			{ t: '確認3點獨立（セパレート）vs 3點一體（ユニット）', n: '3點獨立明顯更舒適', checked: false },
			{ t: '瓦斯 vs 電磁爐廚房', n: '瓦斯火力強，IH清潔方便', checked: false },
			{ t: '熱水器類型・追焚き有無', n: '「追焚き」可二次加熱浴缸水', checked: false },
			{ t: '室内洗濯機置場確認', n: '室内比室外方便且安靜', checked: false },
		],
	},
	{
		cat: '設備・安全',
		items: [
			{ t: 'オートロック（門禁）有無', n: '安全性高，女性優先考慮', checked: false },
			{ t: '宅配ボックス有無', n: '不在家自動收包裹，網購族重要', checked: false },
			{ t: '安培數（アンペア数）確認', n: '1K建議20〜30A', checked: false },
			{ t: '樓層（建議2F以上）', n: '1樓濕氣重、安全性低', checked: false },
		],
	},
	{
		cat: '周邊環境',
		items: [
			{ t: '垃圾場位置與使用規則確認', n: '各區分類不同，違規會被投訴', checked: false },
			{ t: '噪音源調查', n: '建議早晚各去一次', checked: false },
			{ t: '腳踏車停放空間', n: '確認大樓有無免費停車位', checked: false },
			{ t: '超市・便利商店距離', n: '步行10分鐘內有超市最理想', checked: false },
		],
	},
	{
		cat: '合約・入住手續',
		items: [
			{ t: '入住當天拍照記錄所有損傷', n: '傳給房東留存，退租時糾紛幾乎都因此而起', checked: false },
			{ t: '水電瓦斯開通申請', n: '搬入前需各自申請；瓦斯需預約「開栓」', checked: false },
			{ t: '14天內至區役所辦理住民票', n: '是法律義務', checked: false },
			{ t: '火災保険加入', n: '通常強制加入', checked: false },
		],
	},
]);

const totalCount = computed(() => checkData.value.flatMap((s) => s.items).length);
const checkedCount = computed(() => checkData.value.flatMap((s) => s.items).filter((i) => i.checked).length);
const progress = computed(() => Math.round((checkedCount.value / totalCount.value) * 100));

const toggle = (item) => {
	item.checked = !item.checked;
};
</script>
