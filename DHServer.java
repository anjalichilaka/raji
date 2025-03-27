import java.net.*;
import java.io.*;

public class DHServer {
    public static void main(String[] args) {
        try {
            int port = 8088;
            int b = 3; // Server's Private Key
            double clientP, clientG, clientA, B, Bdash;
            
            // Establish the Server Socket
            ServerSocket serverSocket = new ServerSocket(port);
            System.out.println("Waiting for client on port " + port + "...");
            Socket server = serverSocket.accept();
            System.out.println("Connected to " + server.getRemoteSocketAddress());

            // Server's Private Key
            System.out.println("From Server : Private Key = " + b);

            // Accepting data from the client
            DataInputStream in = new DataInputStream(server.getInputStream());
            clientP = Double.parseDouble(in.readUTF()); // Accept P
            System.out.println("From Client : P = " + clientP);
            
            clientG = Double.parseDouble(in.readUTF()); // Accept G
            System.out.println("From Client : G = " + clientG);
            
            clientA = Double.parseDouble(in.readUTF()); // Accept A
            System.out.println("From Client : Public Key (A) = " + clientA);

            // Compute B = (G^b) % P
            B = (Math.pow(clientG, b)) % clientP;
            System.out.println("From Server : Public Key (B) = " + B);

            // Send B to Client
            DataOutputStream out = new DataOutputStream(server.getOutputStream());
            out.writeUTF(Double.toString(B));

            // Compute Shared Secret Key Bdash = (A^b) % P
            Bdash = (Math.pow(clientA, b)) % clientP;
            System.out.println("Secret Key to perform Symmetric Encryption = " + Bdash);

            // Close connections
            in.close();
            out.close();
            server.close();
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
