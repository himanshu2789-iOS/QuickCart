import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { fetchProducts, fetchCategories } from '../../redux/slices/productSlice';
import { selectCartTotalCount } from '../../redux/slices/cartSlice';
import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import ProductGridItem from '../../components/ProductGridItem';
import { getStringMap } from '../../i18n';

const ALL = 'All';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, status, error, categories } = useSelector((state) => state.products);
  const cartCount = useSelector(selectCartTotalCount);
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  const [selectedCategory, setSelectedCategory] = useState(ALL);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryList = useMemo(() => [ALL, ...categories], [categories]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === ALL) return items;
    return items.filter((p) => p.category === selectedCategory);
  }, [items, selectedCategory]);

  const CATEGORY_LABELS = {
    electronics: strings.categoryElectronics,
    jewelery: strings.categoryJewelery,
    "men's clothing": strings.categoryMenClothing,
    "women's clothing": strings.categoryWomenClothing,
    "mens clothing": strings.categoryMenClothing,
    "womens clothing": strings.categoryWomenClothing,
  };

  const formatLabel = (cat) => {
    if (cat === ALL) return strings.all;
    const normalized = cat.toLowerCase().trim();
    return CATEGORY_LABELS[normalized] || cat.replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const openDrawer = () => {
    const parentNavigation = navigation.getParent();
    const drawerNavigation =
      parentNavigation?.openDrawer ? parentNavigation : parentNavigation?.getParent();
    if (drawerNavigation?.openDrawer) {
      drawerNavigation.openDrawer();
      return;
    }
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (status === 'loading') {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.subtext }]}>
          {strings.loadingProducts}
        </Text>
      </SafeAreaView>
    );
  }

  if (status === 'failed') {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>Error: {error}</Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(fetchProducts());
            dispatch(fetchCategories());
          }}
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.retryText}>{strings.retry}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={[styles.menuIcon, { color: colors.text }]}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{strings.products}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.danger }]}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Category Selector ── */}
      <View style={[styles.categoryWrapper, { borderBottomColor: colors.subtext + '22' }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.categoryContent}
        >
          {categoryList.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
                style={[
                  styles.categoryChip,
                  isActive
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                    : { backgroundColor: 'transparent', borderColor: colors.subtext + '55' },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: isActive ? '#fff' : colors.subtext },
                  ]}
                >
                  {formatLabel(cat)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Product Grid ── */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={selectedCategory}
        renderItem={({ item }) => <ProductGridItem product={item} />}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.subtext }]}>
              {strings.noProducts}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10 },
  errorText: { marginBottom: 10 },
  retryButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  retryText: { color: '#fff', fontWeight: '600' },

  // Header — reduced paddingVertical to shrink height
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,       // ← reduced from 12 to 6
    elevation: 3,
  },
  menuButton: { padding: 4 },
  menuIcon: { fontSize: 20 },               // ← slightly smaller icon
  headerTitle: { fontSize: 18, fontWeight: '700' },  // ← slightly smaller title
  cartButton: { position: 'relative', padding: 4 },
  cartIcon: { fontSize: 22 },               // ← slightly smaller cart icon
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // Category selector — outer View owns the border and height
  categoryWrapper: {
    borderBottomWidth: 0.5,
    height: 60,               // ← explicit fixed height, chips have room to breathe
    justifyContent: 'center',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  categoryChip: {
    height: 38,               // ← explicit chip height
    marginRight: 8,
    paddingHorizontal: 18,
    borderRadius: 19,
    borderWidth: 1.5,
    justifyContent: 'center', // ← vertically centres text inside fixed height chip
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    includeFontPadding: false,
  },

  // Grid
  columnWrapper: { justifyContent: 'space-between' },
  listContent: { padding: 8, paddingBottom: 30 },

  // Empty state
  empty: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 15 },
});

export default ProductListScreen;