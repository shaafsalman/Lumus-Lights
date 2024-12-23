import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useRecoilValue } from "recoil";
import { productsState } from '../../../Store/store';
import { useTheme } from "../../../contexts/themeContext";

export default function StockCard() {
  const { colors } = useTheme();
  const products = useRecoilValue(productsState).allProducts;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const categoryCount = {};

    // Loop over each product
    products.forEach((product) => {
      const categoryName = product.category_name || "Uncategorized";
      let totalSold = 0;

      product.skus.forEach((sku) => {
        totalSold += sku.sold || 0;
      });

      if (!categoryCount[categoryName]) {
        categoryCount[categoryName] = 0;
      }
      categoryCount[categoryName] += totalSold; 
    });

    const formattedData = Object.entries(categoryCount).map(
      ([name, count], index) => ({
        value: count,
        color: colors[`chartColor${index % 10}`] || colors.accent,
        legendFontColor: colors.primary,
        legendFontSize: 14,
        focused: index === 0, 
      })
    );

    setCategoryData(formattedData); // Update the state with formatted data
  }, [products, colors]);

  const styles = {
    container: {
      backgroundColor: colors.secondary,
      borderRadius: colors.borderRadius,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontFamily: "CustomFont",
      color: colors.primary,
      marginBottom: 16,
    },
    chartWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    pieChart: {
      borderRadius: colors.borderRadius,
    },
    totalText: {
      marginTop: 16,
      fontSize: 18,
      fontFamily: "CustomFont",
      color: colors.primary,
    },
  };

  // Calculate total items sold across all categories
  const totalItems = categoryData.reduce((sum, category) => sum + category.value, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Distribution</Text>
      <View style={styles.chartWrapper}>
        <PieChart
          data={categoryData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={40}
          innerCircleColor={colors.card}
          chartConfig={{
            color: () => colors.accent,
            backgroundColor: colors.card,
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.card,
          }}
          style={styles.pieChart}
          absolute
          centerLabelComponent={() => {
            const focusedCategory = categoryData.find((data) => data.focused);
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
                  {focusedCategory ? focusedCategory.value : 0}%
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {focusedCategory ? focusedCategory.name : "Category"}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <Text style={styles.totalText}>Total Products Sold: {totalItems}</Text>
    </View>
  );
}
