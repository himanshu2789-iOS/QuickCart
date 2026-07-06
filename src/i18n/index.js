import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

export const LANGUAGE_STORAGE_KEY = 'APP_LANGUAGE';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    menuHome: 'Home',
    menuSettings: 'Settings',
    menuOrderHistory: 'Order History',
    all: 'All',
    changeLanguage: 'Change Language',
    english: 'English',
    arabic: 'Arabic',
    guest: 'Guest',
    logout: 'Logout',
    logoutPrompt: 'Are you sure you want to logout?',
    cancel: 'Cancel',
    login: 'Login',
    loginSubtitle: 'Sign in to continue',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter username',
    enterPassword: 'Enter password',
    loginButton: 'Login',
    loginHint: 'Test credentials are pre-filled (provided by storeapi.com).',
    or: 'OR',
    googleSignIn: 'Sign in with Google',
    googleError: 'Google Sign-In failed',
    products: 'Products',
    loadingProducts: 'Loading products...',
    retry: 'Retry',
    noProducts: 'No products found.',
    cart: 'My Basket',
    browseProducts: 'Browse Products',
    back: 'Back',
    emptyCart: 'Your cart is empty',
    subtotal: 'Subtotal',
    total: 'Total',
    continueToCheckout: 'Continue to Checkout',
    checkout: 'Checkout',
    cardNumber: 'Card Number',
    cardHolderName: 'Card Holder Name',
    expiry: 'Expiry',
    cvv: 'CVV',
    amountToPay: 'Amount to Pay',
    payment: 'Payment',
    orderSuccessful: 'Order Successful!',
    paymentCompleted: 'Your payment of',
    paymentCompletedSuffix: 'was completed.',
    thanks: 'Thanks for shopping with us.',
    continueShopping: 'Continue Shopping',
    settings: 'Settings',
    loggedInAs: 'Logged in as',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    themeToggleHint: "Toggle to switch the whole app's theme",
    orderDate: 'Order Date',
    items: 'Items',
    noOrders: 'No Orders Found',
    delivered: 'Delivered',
    shipped: 'Shipped',
    processing: 'Processing',
    addToCart: 'Add to Cart',
    categoryElectronics: 'Electronics',
    categoryJewelery: 'Jewelery',
    categoryMenClothing: "Men's Clothing",
    categoryWomenClothing: "Women's Clothing",
  },
  ar: {
    menuHome: 'الرئيسية',
    menuSettings: 'الإعدادات',
    menuOrderHistory: 'سجل الطلبات',
    all: 'الكل',
    changeLanguage: 'تغيير اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    guest: 'ضيف',
    logout: 'تسجيل الخروج',
    logoutPrompt: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    cancel: 'إلغاء',
    login: 'تسجيل الدخول',
    loginSubtitle: 'سجل الدخول للمتابعة',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    enterUsername: 'أدخل اسم المستخدم',
    enterPassword: 'أدخل كلمة المرور',
    loginButton: 'تسجيل الدخول',
    loginHint: 'تمت تعبئة بيانات الاختبار مسبقًا (مقدمة من storeapi.com).',
    or: 'أو',
    googleSignIn: 'الدخول باستخدام Google',
    googleError: 'فشل تسجيل الدخول عبر Google',
    products: 'المنتجات',
    loadingProducts: 'جارٍ تحميل المنتجات...',
    retry: 'إعادة المحاولة',
    noProducts: 'لم يتم العثور على منتجات.',
    cart: 'سلة التسوق',
    browseProducts: 'تصفح المنتجات',
    back: 'رجوع',
    emptyCart: 'سلة التسوق فارغة',
    subtotal: 'الإجمالي الفرعي',
    total: 'الإجمالي',
    continueToCheckout: 'متابعة إلى الدفع',
    checkout: 'الدفع',
    cardNumber: 'رقم البطاقة',
    cardHolderName: 'اسم حامل البطاقة',
    expiry: 'تاريخ الانتهاء',
    cvv: 'CVV',
    amountToPay: 'المبلغ المطلوب',
    payment: 'دفع',
    orderSuccessful: 'تم الطلب بنجاح!',
    paymentCompleted: 'تم إكمال دفعتك بقيمة',
    paymentCompletedSuffix: '.',
    thanks: 'شكرًا لك على التسوق معنا.',
    continueShopping: 'متابعة التسوق',
    settings: 'الإعدادات',
    loggedInAs: 'تم تسجيل الدخول باسم',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    themeToggleHint: 'بدّل لتغيير سمة التطبيق بالكامل',
    orderDate: 'تاريخ الطلب',
    items: 'العناصر',
    noOrders: 'لا توجد طلبات',
    delivered: 'تم التوصيل',
    shipped: 'تم الشحن',
    processing: 'قيد المعالجة',
    addToCart: 'أضف إلى السلة',
    categoryElectronics: 'إلكترونيات',
    categoryJewelery: 'مجوهرات',
    categoryMenClothing: 'ملابس رجالية',
    categoryWomenClothing: 'ملابس نسائية',
  },
};

export const getStringMap = (locale = DEFAULT_LANGUAGE) => translations[locale] || translations[DEFAULT_LANGUAGE];
export const getLanguageDirection = (locale = DEFAULT_LANGUAGE) => (locale === 'ar' ? 'rtl' : 'ltr');

export const formatCurrencyValue = (value, locale = DEFAULT_LANGUAGE) => {
  const amount = Number(value) || 0;
  if (locale === 'ar') {
    const arabicPrice = amount * 25.5;
    return `د.إ ${arabicPrice.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const applyLanguagePreference = async (locale) => {
  const normalizedLocale = locale === 'ar' ? 'ar' : 'en';
  const isRTL = normalizedLocale === 'ar';
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLocale);
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(isRTL);
  return normalizedLocale;
};

export const getStoredLanguagePreference = async () => {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === 'ar' ? 'ar' : 'en';
};
