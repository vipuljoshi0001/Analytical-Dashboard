import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * User Model - Represents authenticated user
 */
public class User {
    private String username;
    private String passwordHash;
    private String fullName;
    private String businessName;

    public User(String username, String password, String fullName, String businessName) {
        this.username = username;
        this.passwordHash = hashPassword(password);
        this.fullName = fullName;
        this.businessName = businessName;
    }

    // Constructor for loading from database
    public User(String username, String passwordHash, String fullName, String businessName, boolean isHashed) {
        this.username = username;
        this.passwordHash = isHashed ? passwordHash : hashPassword(passwordHash);
        this.fullName = fullName;
        this.businessName = businessName;
    }

    /**
     * Hash password using SHA-256
     */
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return password; // Fallback (not secure, just for demo)
        }
    }

    /**
     * Verify password
     */
    public boolean verifyPassword(String password) {
        return this.passwordHash.equals(hashPassword(password));
    }

    // Getters
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public String getFullName() { return fullName; }
    public String getBusinessName() { return businessName; }

    /**
     * Convert to file format: username|passwordHash|fullName|businessName
     */
    public String toFileString() {
        return String.format("%s|%s|%s|%s", username, passwordHash, fullName, businessName);
    }

    /**
     * Parse from file format
     */
    public static User fromFileString(String line) {
        String[] parts = line.split("\\|");
        if (parts.length >= 4) {
            return new User(parts[0], parts[1], parts[2], parts[3], true);
        }
        return null;
    }

    public String toJSON() {
        return String.format(
            "{\"username\":\"%s\",\"fullName\":\"%s\",\"businessName\":\"%s\"}",
            username, fullName, businessName
        );
    }
}