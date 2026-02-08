import java.io.*;
import java.util.*;

/**
 * Database - File-based data persistence
 * Handles user credentials and sales data storage
 */
public class Database {
    private static final String USERS_FILE = "data/users.txt";
    private static final String SALES_FILE_PREFIX = "data/sales_";
    
    /**
     * Initialize database files if they don't exist
     */
    public static void initialize() {
        File dataDir = new File("data");
        if (!dataDir.exists()) {
            dataDir.mkdirs();
        }
        
        File usersFile = new File(USERS_FILE);
        if (!usersFile.exists()) {
            try {
                usersFile.createNewFile();
            } catch (IOException e) {
                System.err.println("Error creating users file: " + e.getMessage());
            }
        }
    }

    /**
     * Save user to database
     */
    public static boolean saveUser(User user) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(USERS_FILE, true))) {
            writer.write(user.toFileString());
            writer.newLine();
            return true;
        } catch (IOException e) {
            System.err.println("Error saving user: " + e.getMessage());
            return false;
        }
    }

    /**
     * Get user by username
     */
    public static User getUser(String username) {
        try (BufferedReader reader = new BufferedReader(new FileReader(USERS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                User user = User.fromFileString(line);
                if (user != null && user.getUsername().equals(username)) {
                    return user;
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading users: " + e.getMessage());
        }
        return null;
    }

    /**
     * Check if username exists
     */
    public static boolean userExists(String username) {
        return getUser(username) != null;
    }

    /**
     * Save product/sale for a user
     */
    public static boolean saveSale(String username, Product product) {
        String filename = SALES_FILE_PREFIX + username + ".txt";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            writer.write(product.toFileString());
            writer.newLine();
            return true;
        } catch (IOException e) {
            System.err.println("Error saving sale: " + e.getMessage());
            return false;
        }
    }

    /**
     * Get all sales for a user
     */
    public static List<Product> getUserSales(String username) {
        List<Product> sales = new ArrayList<>();
        String filename = SALES_FILE_PREFIX + username + ".txt";
        
        File file = new File(filename);
        if (!file.exists()) {
            return sales; // Return empty list if no sales yet
        }
        
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                Product product = Product.fromFileString(line);
                if (product != null) {
                    sales.add(product);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading sales: " + e.getMessage());
        }
        
        return sales;
    }

    /**
     * Get next sale ID for a user
     */
    public static int getNextSaleId(String username) {
        List<Product> sales = getUserSales(username);
        if (sales.isEmpty()) {
            return 1;
        }
        return sales.stream().mapToInt(Product::getId).max().orElse(0) + 1;
    }

    /**
     * Delete a sale by ID
     */
    public static boolean deleteSale(String username, int saleId) {
        List<Product> sales = getUserSales(username);
        sales.removeIf(p -> p.getId() == saleId);
        
        // Rewrite file
        String filename = SALES_FILE_PREFIX + username + ".txt";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (Product product : sales) {
                writer.write(product.toFileString());
                writer.newLine();
            }
            return true;
        } catch (IOException e) {
            System.err.println("Error deleting sale: " + e.getMessage());
            return false;
        }
    }
}