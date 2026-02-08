import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Product/Sale Model - Represents a single sale transaction
 */
public class Product {
    private int id;
    private String productName;
    private String category;
    private double saleAmount;
    private int quantity;
    private LocalDateTime saleDate;
    private String customerName;

    public Product(int id, String productName, String category, double saleAmount, 
                   int quantity, LocalDateTime saleDate, String customerName) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.saleAmount = saleAmount;
        this.quantity = quantity;
        this.saleDate = saleDate;
        this.customerName = customerName;
    }

    // Getters
    public int getId() { return id; }
    public String getProductName() { return productName; }
    public String getCategory() { return category; }
    public double getSaleAmount() { return saleAmount; }
    public int getQuantity() { return quantity; }
    public LocalDateTime getSaleDate() { return saleDate; }
    public String getCustomerName() { return customerName; }

    // Get month name from sale date
    public String getMonthName() {
        return saleDate.getMonth().toString();
    }

    // Get year from sale date
    public int getYear() {
        return saleDate.getYear();
    }

    // Get hour from sale date
    public int getHour() {
        return saleDate.getHour();
    }

    /**
     * Convert to file format: id,productName,category,saleAmount,quantity,saleDate,customerName
     */
    public String toFileString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return String.format("%d,%s,%s,%.2f,%d,%s,%s",
            id, productName, category, saleAmount, quantity, 
            saleDate.format(formatter), customerName);
    }

    /**
     * Parse from file format
     */
    public static Product fromFileString(String line) {
        try {
            String[] parts = line.split(",");
            if (parts.length >= 7) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                return new Product(
                    Integer.parseInt(parts[0]),
                    parts[1],
                    parts[2],
                    Double.parseDouble(parts[3]),
                    Integer.parseInt(parts[4]),
                    LocalDateTime.parse(parts[5], formatter),
                    parts[6]
                );
            }
        } catch (Exception e) {
            System.err.println("Error parsing product: " + line);
        }
        return null;
    }

    public String toJSON() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return String.format(
            "{\"id\":%d,\"productName\":\"%s\",\"category\":\"%s\",\"saleAmount\":%.2f," +
            "\"quantity\":%d,\"saleDate\":\"%s\",\"customerName\":\"%s\"}",
            id, productName, category, saleAmount, quantity, 
            saleDate.format(formatter), customerName
        );
    }
}