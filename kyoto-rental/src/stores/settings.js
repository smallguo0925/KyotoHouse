import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
	// 匯率
	const twdRate = ref(0.22);

	// 生活費（跨元件共用）
	const cost = ref({
		rent: 45000,
		kanri: 3000,
		denki: 3500,
		gas: 2500,
		water: 1500,
		net: 3000,
		phone: 2000,
		school: 60000,
		transit: 5000,
		food: 25000,
		misc: 5000,
		ent: 8000,
		budget: 200000,
	});

	// 物件評估自訂條件（localStorage 持久化）
	const customConditions = ref(JSON.parse(localStorage.getItem('rental-custom-conditions') || '[]'));
	watch(
		customConditions,
		(val) => {
			localStorage.setItem('rental-custom-conditions', JSON.stringify(val));
		},
		{ deep: true }
	);

	return { twdRate, cost, customConditions };
});
