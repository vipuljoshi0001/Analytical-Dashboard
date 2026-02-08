import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;

/**
 * Main - Application entry point
 */
public class Main {
    private static final int PORT = 8080;

    public static void main(String[] args) {
        try {
            // Initialize database
            Database.initialize();
            
            // Create HTTP server
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
            
            // Initialize resource controller
            Resource resource = new Resource();
            
            // Register API endpoints
            server.createContext("/api/register", resource.registerHandler());
            server.createContext("/api/login", resource.loginHandler());
            server.createContext("/api/add-sale", resource.addSaleHandler());
            server.createContext("/api/sales", resource.getSalesHandler());
            server.createContext("/api/analytics", resource.getAnalyticsHandler());
            server.createContext("/api/delete-sale", resource.deleteSaleHandler());
            
            // Set executor
            server.setExecutor(null);
            
            // Start server
            server.start();
            
            System.out.println("═══════════════════════════════════════════════");
            System.out.println("  Sales Analytics Dashboard - Backend Server");
            System.out.println("═══════════════════════════════════════════════");
            System.out.println("Server started successfully on port " + PORT);
            System.out.println("\nAvailable API Endpoints:");
            System.out.println("  • POST http://localhost:" + PORT + "/api/register");
            System.out.println("  • POST http://localhost:" + PORT + "/api/login");
            System.out.println("  • POST http://localhost:" + PORT + "/api/add-sale");
            System.out.println("  • GET  http://localhost:" + PORT + "/api/sales?username=<username>");
            System.out.println("  • GET  http://localhost:" + PORT + "/api/analytics?username=<username>");
            System.out.println("  • POST http://localhost:" + PORT + "/api/delete-sale");
            System.out.println("\nServer is running... Press Ctrl+C to stop.");
            System.out.println("═══════════════════════════════════════════════\n");
            
        } catch (IOException e) {
            System.err.println("Failed to start server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}