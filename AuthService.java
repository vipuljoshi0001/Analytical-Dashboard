/**
 * AuthService - Handles user authentication
 */
public class AuthService {
    
    /**
     * Register new user
     */
    public static String register(String username, String password, String fullName, String businessName) {
        // Validate inputs
        if (username == null || username.trim().isEmpty()) {
            return "{\"success\":false,\"message\":\"Username is required\"}";
        }
        if (password == null || password.length() < 6) {
            return "{\"success\":false,\"message\":\"Password must be at least 6 characters\"}";
        }
        if (fullName == null || fullName.trim().isEmpty()) {
            return "{\"success\":false,\"message\":\"Full name is required\"}";
        }
        
        // Check if user already exists
        if (Database.userExists(username)) {
            return "{\"success\":false,\"message\":\"Username already exists\"}";
        }
        
        // Create and save user
        User user = new User(username, password, fullName, businessName);
        if (Database.saveUser(user)) {
            return String.format("{\"success\":true,\"message\":\"Registration successful\",\"user\":%s}", user.toJSON());
        } else {
            return "{\"success\":false,\"message\":\"Registration failed\"}";
        }
    }

    /**
     * Login user
     */
    public static String login(String username, String password) {
        // Validate inputs
        if (username == null || username.trim().isEmpty()) {
            return "{\"success\":false,\"message\":\"Username is required\"}";
        }
        if (password == null || password.isEmpty()) {
            return "{\"success\":false,\"message\":\"Password is required\"}";
        }
        
        // Get user from database
        User user = Database.getUser(username);
        if (user == null) {
            return "{\"success\":false,\"message\":\"Invalid username or password\"}";
        }
        
        // Verify password
        if (user.verifyPassword(password)) {
            return String.format("{\"success\":true,\"message\":\"Login successful\",\"user\":%s}", user.toJSON());
        } else {
            return "{\"success\":false,\"message\":\"Invalid username or password\"}";
        }
    }
}