<template>
	<section class="page-section" id="tips">
		<div class="s-header">
			<span class="s-num">08</span>
			<div>
				<div class="s-title">租屋注意事項</div>
				<div class="s-sub">外國人留學生常踩的坑與實用建議</div>
			</div>
		</div>

		<div class="tabs">
			<button
				v-for="tab in tabs"
				:key="tab.key"
				class="tab-btn"
				:class="{ active: activeTab === tab.key }"
				@click="activeTab = tab.key"
			>
				{{ tab.label }}
			</button>
		</div>

		<!-- 外國人注意 -->
		<div v-show="activeTab === 'gaijin'">
			<div style="display: grid; gap: 10px">
				<div class="alert alert-warn">
					部分房東拒租外國人。搜尋時開啟「<strong>外国人可</strong>」篩選，未標示請先詢問，避免看完才被拒絕。
				</div>
				<div class="alert alert-info">
					語言學校通常可協助尋屋或擔保，入學前先詢問學校是否有提供住宿介紹或合作不動産。
				</div>
				<table>
					<thead>
						<tr>
							<th>項目</th>
							<th>說明</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row in gaijinRows" :key="row.item">
							<td>{{ row.item }}</td>
							<td v-html="row.note"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- 合約細節 -->
		<div v-show="activeTab === 'contract'">
			<table>
				<thead>
					<tr>
						<th>條款項目</th>
						<th>需確認內容</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in contractRows" :key="row.item">
						<td>{{ row.item }}</td>
						<td>{{ row.note }}</td>
					</tr>
				</tbody>
			</table>
			<div class="alert alert-warn" style="margin-top: 12px">
				入住當天用手機拍下牆壁、地板、天花板所有現有損傷，傳給房東或存證，退租時的糾紛幾乎都因此而起。
			</div>
		</div>

		<!-- 入住後生活 -->
		<div v-show="activeTab === 'life'">
			<table>
				<thead>
					<tr>
						<th>生活事項</th>
						<th>說明</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in lifeRows" :key="row.item">
						<td>{{ row.item }}</td>
						<td>{{ row.note }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- 找屋策略 -->
		<div v-show="activeTab === 'search'">
			<table>
				<thead>
					<tr>
						<th>策略</th>
						<th>說明</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in searchRows" :key="row.item">
						<td>{{ row.item }}</td>
						<td>{{ row.note }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('gaijin');
const tabs = [
	{ key: 'gaijin', label: '外國人注意' },
	{ key: 'contract', label: '合約細節' },
	{ key: 'life', label: '入住後生活' },
	{ key: 'search', label: '找屋策略' },
];

const gaijinRows = [
	{
		item: '保証人問題',
		note: '外國人難找日本人保証人，改用 <span class="badge b-info">保証会社</span>（費用約月租0.5〜1個月）',
	},
	{ item: '在留資格', note: '留學簽證（留学ビザ）是必要條件，需提供護照、在留カード' },
	{ item: '在籍証明書', note: '語言學校提供的就學證明，申請房屋必備文件' },
	{ item: '収入証明', note: '父母存款証明書（英文或日文）或保証人収入証明' },
	{ item: '住民票登録', note: '入住後14天內至<strong>區役所</strong>辦理轉入手續，是法律義務' },
	{ item: '友善物件類型', note: '學校宿舍、Share House（Sakura House等）、UR都市機構（政府物件，無需保証人）' },
];

const contractRows = [
	{ item: '契約期間', note: '通常2年，中途解約需提前1〜2個月通知，並支付違約金（通常1〜2個月家賃）' },
	{ item: '更新料', note: '部分物件每2年需支付「更新料」約1個月家賃，入住前務必確認有無' },
	{
		item: '原狀回復義務',
		note: '退租時需還原至入住狀態。確認責任範圍（牆壁、地板、清潔等），入住當天拍照留存所有損傷',
	},
	{ item: '禁止事項', note: '禁養寵物、禁轉租、禁樂器、禁釘釘子（部分）。有特殊需求請確認「楽器相談可」' },
	{ item: '合約語言', note: '全為日文，建議請學校老師或日語能力強的人協助確認，尤其注意解約條件與賠償條款' },
	{ item: '鍵の返却', note: '退租時鑰匙全數歸還；若遺失需自費換鎖（1〜2萬円）' },
];

const lifeRows = [
	{ item: '垃圾分類', note: '京都市各區分類規則嚴格，確認垃圾場位置與可丟時段。違規會被鄰居投訴' },
	{ item: '噪音規範', note: '晚間10點後需保持安靜，日本鄰居對此非常敏感' },
	{ item: '水電申請', note: '搬入前需自行申請開通電力、瓦斯（要預約開栓）、水道' },
	{ item: '腳踏車', note: '學校周邊騎腳踏車非常方便，確認大樓有無免費停車位，勿亂停（違規會被拖吊）' },
	{ item: '來客規定', note: '部分物件限制訪客過夜，確認合約規定' },
	{ item: '冬季保暖', note: '京都冬天（12〜2月）濕冷，日照短。優先選擇南向、有冷暖兩用エアコン的物件' },
];

const searchRows = [
	{ item: '主要找屋平台', note: "SUUMO、HOME'S、athome、UR（政府物件）、Sakura House（外國人友善Share House）" },
	{ item: '最佳搜尋時間', note: '避開2〜3月旺季，10月入學反而物件多、條件好談。建議提前2〜3個月開始搜尋' },
	{
		item: '篩選關鍵字',
		note: '「外国人可」「都市ガス」「インターネット無料」「エアコン付き」「南向き」「オートロック」',
	},
	{ item: '同物件多平台', note: '同一物件通常在多個平台刊登，看上了直接聯絡仲介即可，不必每個都詢問' },
	{ item: '現場確認時間', note: '建議早晨（日照方向）和傍晚（噪音）各去一次，比只看白天準確' },
	{ item: '語言學校協助', note: '大多數語言學校都有住宿介紹服務，可先詢問，有時還有合作優惠或擔保協助' },
];
</script>
