// // // import React from 'react';
// // // import { 
// // //   View, 
// // //   Text, 
// // //   Image, 
// // //   TouchableOpacity, 
// // //   StyleSheet } from 'react-native';

// // // import { useDispatch, useSelector } from 'react-redux';
// // // import {
// // //   incrementItem,
// // //   decrementItem,
// // //   selectCartQuantityForProduct,
// // // } from '../../redux/slices/cartSlice'

// // // const ProductGridItem = ({ product }) => {
// // //   const dispatch = useDispatch();
// // //   const quantity = useSelector(selectCartQuantityForProduct(product.id));

// // //   return (
// // //     <View style={styles.card}>
// // //       <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

// // //       <Text style={styles.title} numberOfLines={2}>
// // //         {product.title}
// // //       </Text>

// // //       <Text style={styles.price}>${product.price.toFixed(2)}</Text>

// // //       {quantity === 0 ? (
// // //         <TouchableOpacity
// // //           style={styles.addButton}
// // //           onPress={() => dispatch(incrementItem(product))}
// // //         >
// // //           <Text style={styles.addButtonText}>Add to Cart</Text>
// // //         </TouchableOpacity>
// // //       ) : (
// // //         <View style={styles.counterRow}>
// // //           <TouchableOpacity
// // //             style={styles.counterButton}
// // //             onPress={() => dispatch(decrementItem(product.id))}
// // //           >
// // //             <Text style={styles.counterButtonText}>-</Text>
// // //           </TouchableOpacity>

// // //           <Text style={styles.counterValue}>{quantity}</Text>

// // //           <TouchableOpacity
// // //             style={styles.counterButton}
// // //             onPress={() => dispatch(incrementItem(product))}
// // //           >
// // //             <Text style={styles.counterButtonText}>+</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       )}
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   card: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //     borderRadius: 10,
// // //     padding: 10,
// // //     margin: 6,
// // //     alignItems: 'center',
// // //     elevation: 2,
// // //     shadowColor: '#000',
// // //     shadowOpacity: 0.08,
// // //     shadowRadius: 4,
// // //     shadowOffset: { width: 0, height: 2 },
// // //   },
// // //   image: {
// // //     width: '100%',
// // //     height: 110,
// // //     marginBottom: 8,
// // //   },
// // //   title: {
// // //     fontSize: 13,
// // //     fontWeight: '500',
// // //     textAlign: 'center',
// // //     height: 34,
// // //   },
// // //   price: {
// // //     fontSize: 14,
// // //     fontWeight: '700',
// // //     color: '#1a7a3c',
// // //     marginVertical: 6,
// // //   },
// // //   addButton: {
// // //     backgroundColor: '#2563eb',
// // //     paddingVertical: 8,
// // //     paddingHorizontal: 14,
// // //     borderRadius: 6,
// // //     width: '100%',
// // //   },
// // //   addButtonText: {
// // //     color: '#fff',
// // //     textAlign: 'center',
// // //     fontWeight: '600',
// // //     fontSize: 12,
// // //   },
// // //   counterRow: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'space-between',
// // //     width: '100%',
// // //     backgroundColor: '#eef2ff',
// // //     borderRadius: 6,
// // //     paddingHorizontal: 4,
// // //   },
// // //   counterButton: {
// // //     width: 30,
// // //     height: 30,
// // //     borderRadius: 15,
// // //     backgroundColor: '#2563eb',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   counterButtonText: {
// // //     color: '#fff',
// // //     fontSize: 18,
// // //     fontWeight: '700',
// // //     lineHeight: 18,
// // //   },
// // //   counterValue: {
// // //     fontSize: 15,
// // //     fontWeight: '700',
// // //   },
// // // });

// // // export default ProductGridItem;


// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   incrementItem,
//   decrementItem,
//   selectCartQuantityForProduct,
// } from '../../redux/slices/cartSlice';

// import { selectIsDarkMode } from '../../redux/slices/themeSlice';
// import { getColors } from '../../theme/colors';

// const ProductGridItem = ({ product }) => {
//   const dispatch = useDispatch();
//   const quantity = useSelector(selectCartQuantityForProduct(product.id));
//   const isDarkMode = useSelector(selectIsDarkMode);
//   const colors = getColors(isDarkMode);

//   return (
//     <View style={[styles.card, { backgroundColor: colors.surface }]}>
//       <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

//       <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
//         {product.title}
//       </Text>

//       <Text style={[styles.price, { color: colors.accent }]}>${product.price.toFixed(2)}</Text>

//       {quantity === 0 ? (
//         <TouchableOpacity
//           style={[styles.addButton, { backgroundColor: colors.primary }]}
//           onPress={() => dispatch(incrementItem(product))}
//         >
//           <Text style={styles.addButtonText}>Add to Cart</Text>
//         </TouchableOpacity>
//       ) : (
//         <View style={[styles.counterRow, { backgroundColor: colors.inputBackground }]}>
//           <TouchableOpacity
//             style={[styles.counterButton, { backgroundColor: colors.primary }]}
//             onPress={() => dispatch(decrementItem(product.id))}
//           >
//             <Text style={styles.counterButtonText}>-</Text>
//           </TouchableOpacity>

//           <Text style={[styles.counterValue, { color: colors.text }]}>{quantity}</Text>

//           <TouchableOpacity
//             style={[styles.counterButton, { backgroundColor: colors.primary }]}
//             onPress={() => dispatch(incrementItem(product))}
//           >
//             <Text style={styles.counterButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     borderRadius: 10,
//     padding: 10,
//     margin: 6,
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   image: {
//     width: '100%',
//     height: 110,
//     marginBottom: 8,
//   },
//   title: {
//    fontSize: 13,
//    fontWeight: '500',
//    textAlign: 'center',
//    lineHeight: 18,
//    minHeight: 36,
//    maxHeight: 36,   
//   },
//   price: {
//     fontSize: 14,
//     fontWeight: '700',
//     marginVertical: 6,
//   },
//   addButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 6,
//     width: '100%',
//   },
//   addButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   counterRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     borderRadius: 6,
//     paddingHorizontal: 4,
//   },
//   counterButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   counterButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '700',
//     lineHeight: 18,
//   },
//   counterValue: {
//     fontSize: 15,
//     fontWeight: '700',
//   },
// });

// export default ProductGridItem;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementItem,
  decrementItem,
  selectCartQuantityForProduct,
} from '../../redux/slices/cartSlice';

import { selectIsDarkMode } from '../../redux/slices/themeSlice';
import { selectLanguage } from '../../redux/slices/languageSlice';
import { getColors } from '../../theme/colors';
import { getStringMap, formatCurrencyValue } from '../../i18n';

const ProductGridItem = ({ product }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(selectCartQuantityForProduct(product.id));
  const isDarkMode = useSelector(selectIsDarkMode);
  const locale = useSelector(selectLanguage);
  const colors = getColors(isDarkMode);
  const strings = getStringMap(locale);

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>

      {/* CONTENT */}
      <View style={styles.content}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.title}
        </Text>

        <Text style={[styles.price, { color: colors.accent }]}>
          {formatCurrencyValue(product.price, locale)}
        </Text>
      </View>


      {/* BUTTON / COUNTER */}
      {quantity === 0 ? (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => dispatch(incrementItem(product))}
        >
          <Text style={styles.addButtonText}>{strings.addToCart}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.counterRow, { backgroundColor: colors.inputBackground }]}>
          <TouchableOpacity
            style={[styles.counterButton, { backgroundColor: colors.primary }]}
            onPress={() => dispatch(decrementItem(product.id))}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.counterValue, { color: colors.text }]}>
            {quantity}
          </Text>

          <TouchableOpacity
            style={[styles.counterButton, { backgroundColor: colors.primary }]}
            onPress={() => dispatch(incrementItem(product))}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',          // ✅ FIX: proper 2-column layout
    margin: 6,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  content: {
    flexGrow: 1,               // ✅ FIX: allows vertical expansion
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: '100%',
    height: 110,
    marginBottom: 8,
  },

  title: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 4,
    flexShrink: 1,             // ✅ FIX: prevents cropping
  },

  price: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 6,
  },

  addButton: {
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    marginTop: 8,              // ✅ FIX: prevents bottom clipping
  },

  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },

  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 4,
    marginTop: 8,
  },

  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18,
  },

  counterValue: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ProductGridItem;
