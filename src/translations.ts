export type Language = 'en' | 'zh';

export interface Translations {
  common: {
    back: string;
    next: string;
    previous: string;
    question: string;
    of: string;
    getRecommendation: string;
    print: string;
    order: string;
    preview: string;
    edit: string;
    skip: string;
    continue: string;
    confirm: string;
    cancel: string;
    addToCart: string;
    cart: string;
    viewCart: string;
    continueShopping: string;
    checkout: string;
    remove: string;
    quantity: string;
    total: string;
  };
  landing: {
    title: string;
    subtitle: string;
    tea: string;
    teaDesc: string;
    coffee: string;
    coffeeDesc: string;
    snack: string;
    snackDesc: string;
    footer: string;
  };
  questions: {
    energyLevel: string;
    sleepQuality: string;
    goal: string;
    caffeineSensitive: string;
    flavorPreference: string;
    tasteProfile: string;
    caffeineLevel: string;
    milkPreference: string;
    sweetnessLevel: string;
    acidityTolerance: string;
    mood: string;
    dietType: string;
    function: string;
    flavor: string;
  };
  recommendation: {
    title: string;
    subtitle: string;
    category: string;
    getAnother: string;
    printAndAdd: string;
  };
  biscuit: {
    shape: string;
    shapeSelect: string;
    round: string;
    rectangle: string;
    printWhat: string;
    text: string;
    textDesc: string;
    drawing: string;
    drawingDesc: string;
    addText: string;
    fontStyle: string;
    elegant: string;
    bold: string;
    script: string;
    minimal: string;
    decorative: string;
    printText: string;
    addIcons: string;
    addIconsDesc: string;
    yesIcons: string;
    noSkip: string;
    generatingIcons: string;
    yourBiscuit: string;
    readyToPrint: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      back: '← Back',
      next: 'Next',
      previous: 'Previous',
      question: 'Question',
      of: 'of',
      getRecommendation: 'Get Recommendation',
      print: '🖨️',
      order: 'Order',
      preview: 'Preview',
      edit: 'Edit',
      skip: 'Skip',
      continue: 'Continue',
      confirm: 'Confirm',
      cancel: 'Cancel',
      addToCart: 'Add to Cart',
      cart: 'Shopping Cart',
      viewCart: 'View Cart',
      continueShopping: 'Continue Shopping',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      quantity: 'Quantity',
      total: 'Total',
    },
    landing: {
      title: 'AI Cafe Lab',
      subtitle: 'Personalized Beverages & Nutrition',
      tea: 'Tea Therapy',
      teaDesc: 'Wellness blends tailored to you',
      coffee: 'Smart Coffee',
      coffeeDesc: 'AI-crafted espresso recipes',
      snack: 'Printed Snacks',
      snackDesc: '3D-printed functional treats',
      footer: 'AI Cafe Lab • Personalized Beverages & Nutrition',
    },
    questions: {
      energyLevel: 'How is your energy?',
      sleepQuality: 'How did you sleep?',
      goal: 'What is your goal?',
      caffeineSensitive: 'Caffeine sensitive?',
      flavorPreference: 'Flavor preference?',
      tasteProfile: 'Taste profile?',
      caffeineLevel: 'Caffeine level?',
      milkPreference: 'Milk preference?',
      sweetnessLevel: 'Sweetness level?',
      acidityTolerance: 'Acidity tolerance?',
      mood: 'Current mood?',
      dietType: 'Diet type?',
      function: 'What function?',
      flavor: 'Flavor?',
    },
    recommendation: {
      title: 'Your Selection',
      subtitle: 'Perfect for you',
      category: 'Category',
      getAnother: 'Get Another',
      printAndAdd: 'Print & Add',
    },
    biscuit: {
      shape: 'Choose Shape',
      shapeSelect: 'Select biscuit shape',
      round: 'Round',
      rectangle: 'Rectangle',
      printWhat: 'What to Print?',
      text: 'Text',
      textDesc: 'Add beautiful text',
      drawing: 'Drawing',
      drawingDesc: 'Draw custom designs',
      addText: 'Add Text',
      fontStyle: 'Font Style',
      elegant: 'Elegant',
      bold: 'Bold',
      script: 'Script',
      minimal: 'Minimal',
      decorative: 'Decorative',
      printText: 'Print This Text',
      addIcons: 'Add Decorative Icons?',
      addIconsDesc: 'Enhance with AI icons',
      yesIcons: 'Yes, Add Icons',
      noSkip: 'No, Skip',
      generatingIcons: 'Generating Icons',
      yourBiscuit: 'Your Biscuit',
      readyToPrint: 'Ready to Print',
    },
  },
  zh: {
    common: {
      back: '← 返回',
      next: '下一步',
      previous: '上一步',
      question: '問題',
      of: '共',
      getRecommendation: '獲取推薦',
      print: '🖨️',
      order: '訂購',
      preview: '預覽',
      edit: '編輯',
      skip: '跳過',
      continue: '繼續',
      confirm: '確認',
      cancel: '取消',
      addToCart: '加入購物車',
      cart: '購物車',
      viewCart: '查看購物車',
      continueShopping: '繼續購物',
      checkout: '結帳',
      remove: '移除',
      quantity: '數量',
      total: '總計',
    },
    landing: {
      title: 'AI 茶咖啡實驗室',
      subtitle: '個人化飲品與營養',
      tea: '茶療養生',
      teaDesc: '為您量身訂製的養生茶飲',
      coffee: '智慧咖啡',
      coffeeDesc: 'AI 精心設計的義式咖啡',
      snack: '3D 列印點心',
      snackDesc: '功能性 3D 列印餅乾',
      footer: 'AI 茶咖啡實驗室 • 個人化飲品與營養',
    },
    questions: {
      energyLevel: '您的精力如何？',
      sleepQuality: '您睡眠如何？',
      goal: '您的目標是什麼？',
      caffeineSensitive: '對咖啡因敏感？',
      flavorPreference: '風味偏好？',
      tasteProfile: '味道偏好？',
      caffeineLevel: '咖啡因強度？',
      milkPreference: '奶類偏好？',
      sweetnessLevel: '甜度偏好？',
      acidityTolerance: '酸度接受度？',
      mood: '目前心情？',
      dietType: '飲食類型？',
      function: '功能需求？',
      flavor: '風味？',
    },
    recommendation: {
      title: '您的選擇',
      subtitle: '為您量身訂製',
      category: '類別',
      getAnother: '重新選擇',
      printAndAdd: '列印並添加',
    },
    biscuit: {
      shape: '選擇形狀',
      shapeSelect: '選擇餅乾形狀',
      round: '圓形',
      rectangle: '長方形',
      printWhat: '列印什麼？',
      text: '文字',
      textDesc: '添加美麗的文字',
      drawing: '圖案',
      drawingDesc: '繪製自訂設計',
      addText: '添加文字',
      fontStyle: '字體風格',
      elegant: '優雅',
      bold: '粗體',
      script: '筆劃',
      minimal: '極簡',
      decorative: '裝飾',
      printText: '列印文字',
      addIcons: '添加裝飾圖標？',
      addIconsDesc: '以 AI 圖標增強',
      yesIcons: '是的，添加圖標',
      noSkip: '否，跳過',
      generatingIcons: '生成圖標中',
      yourBiscuit: '您的餅乾',
      readyToPrint: '準備列印',
    },
  },
};
