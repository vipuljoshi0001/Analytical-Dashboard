import java.util.*;
import java.util.stream.Collectors;

/**
 * SalesAnalytics - Generates insights from sales data
 */
public class SalesAnalytics {
    private List<Product> sales;

    public SalesAnalytics(List<Product> sales) {
        this.sales = sales;
    }

    /**
     * Get top selling products by quantity
     */
    public Map<String, Integer> getTopSellingProducts(int limit) {
        Map<String, Integer> productSales = new HashMap<>();
        
        for (Product sale : sales) {
            productSales.merge(sale.getProductName(), sale.getQuantity(), Integer::sum);
        }
        
        return productSales.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(limit)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
    }

    /**
     * Get least selling products
     */
    public Map<String, Integer> getLeastSellingProducts(int limit) {
        Map<String, Integer> productSales = new HashMap<>();
        
        for (Product sale : sales) {
            productSales.merge(sale.getProductName(), sale.getQuantity(), Integer::sum);
        }
        
        return productSales.entrySet().stream()
            .sorted(Map.Entry.comparingByValue())
            .limit(limit)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
    }

    /**
     * Get sales by month
     */
    public Map<String, Double> getSalesByMonth() {
        Map<String, Double> monthlySales = new HashMap<>();
        
        for (Product sale : sales) {
            String monthYear = sale.getMonthName() + " " + sale.getYear();
            monthlySales.merge(monthYear, sale.getSaleAmount(), Double::sum);
        }
        
        return monthlySales;
    }

    /**
     * Get month with maximum sales
     */
    public String getMaxSaleMonth() {
        Map<String, Double> monthlySales = getSalesByMonth();
        
        return monthlySales.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse("N/A");
    }

    /**
     * Get sales by hour of day (peak sales time)
     */
    public Map<Integer, Double> getSalesByHour() {
        Map<Integer, Double> hourlySales = new HashMap<>();
        
        for (Product sale : sales) {
            hourlySales.merge(sale.getHour(), sale.getSaleAmount(), Double::sum);
        }
        
        return hourlySales;
    }

    /**
     * Get peak sales hour
     */
    public int getPeakSalesHour() {
        Map<Integer, Double> hourlySales = getSalesByHour();
        
        return hourlySales.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse(0);
    }

    /**
     * Get maximum single sale amount
     */
    public double getMaxSaleAmount() {
        return sales.stream()
            .mapToDouble(Product::getSaleAmount)
            .max()
            .orElse(0.0);
    }

    /**
     * Get product with maximum sale amount
     */
    public String getMaxSaleProduct() {
        return sales.stream()
            .max(Comparator.comparingDouble(Product::getSaleAmount))
            .map(Product::getProductName)
            .orElse("N/A");
    }

    /**
     * Get total revenue
     */
    public double getTotalRevenue() {
        return sales.stream()
            .mapToDouble(Product::getSaleAmount)
            .sum();
    }

    /**
     * Get sales by category
     */
    public Map<String, Double> getSalesByCategory() {
        Map<String, Double> categorySales = new HashMap<>();
        
        for (Product sale : sales) {
            categorySales.merge(sale.getCategory(), sale.getSaleAmount(), Double::sum);
        }
        
        return categorySales;
    }

    /**
     * Generate complete analytics JSON
     */
    public String getAnalyticsJSON() {
        StringBuilder json = new StringBuilder();
        json.append("{");
        
        // Summary metrics
        json.append("\"summary\":{");
        json.append("\"totalRevenue\":").append(String.format("%.2f", getTotalRevenue())).append(",");
        json.append("\"totalSales\":").append(sales.size()).append(",");
        json.append("\"maxSaleAmount\":").append(String.format("%.2f", getMaxSaleAmount())).append(",");
        json.append("\"maxSaleProduct\":\"").append(getMaxSaleProduct()).append("\",");
        json.append("\"maxSaleMonth\":\"").append(getMaxSaleMonth()).append("\",");
        json.append("\"peakSalesHour\":").append(getPeakSalesHour());
        json.append("},");
        
        // Top selling products
        json.append("\"topProducts\":").append(mapToJSON(getTopSellingProducts(5))).append(",");
        
        // Least selling products
        json.append("\"leastProducts\":").append(mapToJSON(getLeastSellingProducts(5))).append(",");
        
        // Monthly sales
        json.append("\"monthlySales\":").append(mapToJSONDouble(getSalesByMonth())).append(",");
        
        // Category sales
        json.append("\"categorySales\":").append(mapToJSONDouble(getSalesByCategory())).append(",");
        
        // Hourly sales
        json.append("\"hourlySales\":").append(mapToJSONIntDouble(getSalesByHour()));
        
        json.append("}");
        return json.toString();
    }

    private String mapToJSON(Map<String, Integer> map) {
        StringBuilder json = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            if (!first) json.append(",");
            first = false;
            json.append("\"").append(entry.getKey()).append("\":").append(entry.getValue());
        }
        json.append("}");
        return json.toString();
    }

    private String mapToJSONDouble(Map<String, Double> map) {
        StringBuilder json = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<String, Double> entry : map.entrySet()) {
            if (!first) json.append(",");
            first = false;
            json.append("\"").append(entry.getKey()).append("\":").append(String.format("%.2f", entry.getValue()));
        }
        json.append("}");
        return json.toString();
    }

    private String mapToJSONIntDouble(Map<Integer, Double> map) {
        StringBuilder json = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<Integer, Double> entry : map.entrySet()) {
            if (!first) json.append(",");
            first = false;
            json.append("\"").append(entry.getKey()).append("\":").append(String.format("%.2f", entry.getValue()));
        }
        json.append("}");
        return json.toString();
    }
}