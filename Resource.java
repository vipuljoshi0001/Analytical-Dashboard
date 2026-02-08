import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Resource - REST API Controller
 */
public class Resource {

    /**
     * Handle user registration
     */
    public HttpHandler registerHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> params = parseFormData(body);
                
                String response = AuthService.register(
                    params.get("username"),
                    params.get("password"),
                    params.get("fullName"),
                    params.get("businessName")
                );
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    /**
     * Handle user login
     */
    public HttpHandler loginHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> params = parseFormData(body);
                
                String response = AuthService.login(
                    params.get("username"),
                    params.get("password")
                );
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    /**
     * Add new sale
     */
    public HttpHandler addSaleHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> params = parseFormData(body);
                
                String username = params.get("username");
                int saleId = Database.getNextSaleId(username);
                
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                LocalDateTime saleDate;
                try {
                    saleDate = LocalDateTime.parse(params.get("saleDate"), formatter);
                } catch (Exception e) {
                    saleDate = LocalDateTime.now();
                }
                
                Product product = new Product(
                    saleId,
                    params.get("productName"),
                    params.get("category"),
                    Double.parseDouble(params.get("saleAmount")),
                    Integer.parseInt(params.get("quantity")),
                    saleDate,
                    params.get("customerName")
                );
                
                boolean success = Database.saveSale(username, product);
                
                String response = success ? 
                    "{\"success\":true,\"message\":\"Sale added successfully\"}" :
                    "{\"success\":false,\"message\":\"Failed to add sale\"}";
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    /**
     * Get user's sales data
     */
    public HttpHandler getSalesHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("GET".equals(exchange.getRequestMethod())) {
                String query = exchange.getRequestURI().getQuery();
                Map<String, String> params = parseQueryString(query);
                String username = params.get("username");
                
                List<Product> sales = Database.getUserSales(username);
                String response = salesToJSON(sales);
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    /**
     * Get analytics for user
     */
    public HttpHandler getAnalyticsHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("GET".equals(exchange.getRequestMethod())) {
                String query = exchange.getRequestURI().getQuery();
                Map<String, String> params = parseQueryString(query);
                String username = params.get("username");
                
                List<Product> sales = Database.getUserSales(username);
                SalesAnalytics analytics = new SalesAnalytics(sales);
                String response = analytics.getAnalyticsJSON();
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    /**
     * Delete a sale
     */
    public HttpHandler deleteSaleHandler() {
        return exchange -> {
            setCORS(exchange);
            
            if ("POST".equals(exchange.getRequestMethod())) {
                String body = readRequestBody(exchange);
                Map<String, String> params = parseFormData(body);
                
                String username = params.get("username");
                int saleId = Integer.parseInt(params.get("saleId"));
                
                boolean success = Database.deleteSale(username, saleId);
                
                String response = success ?
                    "{\"success\":true,\"message\":\"Sale deleted successfully\"}" :
                    "{\"success\":false,\"message\":\"Failed to delete sale\"}";
                
                sendResponse(exchange, 200, response);
            } else {
                sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
            }
        };
    }

    // Helper methods
    private void setCORS(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }

    private String readRequestBody(HttpExchange exchange) throws IOException {
        InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            body.append(line);
        }
        return body.toString();
    }

    private Map<String, String> parseFormData(String formData) {
        Map<String, String> params = new HashMap<>();
        if (formData == null || formData.isEmpty()) return params;
        
        String[] pairs = formData.split("&");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=", 2);
            if (keyValue.length == 2) {
                try {
                    params.put(
                        URLDecoder.decode(keyValue[0], "UTF-8"),
                        URLDecoder.decode(keyValue[1], "UTF-8")
                    );
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return params;
    }

    private Map<String, String> parseQueryString(String query) {
        return parseFormData(query);
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private String salesToJSON(List<Product> sales) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < sales.size(); i++) {
            json.append(sales.get(i).toJSON());
            if (i < sales.size() - 1) json.append(",");
        }
        json.append("]");
        return json.toString();
    }
}