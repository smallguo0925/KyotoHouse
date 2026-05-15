<script setup>
import AppNav from './components/AppNav.vue';
import HeroSection from './components/HeroSection.vue';
import AreaGuide from './components/AreaGuide.vue';
import MadoriGuide from './components/MadoriGuide.vue';
import RoomCalculator from './components/RoomCalculator.vue';
import CostCalculator from './components/CostCalculator.vue';
import UtilityGuide from './components/UtilityGuide.vue';
import Checklist from './components/Checklist.vue';
import InitialCost from './components/InitialCost.vue';
import TipsGuide from './components/TipsGuide.vue';
import TwdCalculator from './components/TwdCalculator.vue';
import PropertyEval from './components/PropertyEval.vue';
</script>

<template>
	<AppNav />
	<HeroSection />
	<div class="container">
		<AreaGuide />
		<MadoriGuide />
		<RoomCalculator />
		<CostCalculator />
		<UtilityGuide />
		<Checklist />
		<InitialCost />
		<TipsGuide />
		<TwdCalculator />
		<PropertyEval />
	</div>
	<footer>
		<strong>京都芸術大学・語言學校留學生租屋完整指南</strong><br />
		<span>資料僅供參考，家賃相場與費用可能隨時間變動，實際申請前請以最新物件資訊為準</span>
	</footer>
</template>
