import java.net.*;
import java.io.*;

public class DHClient {
    public static void main(String[] args) {
        try {
            String serverName = "localhost";
            int port = 8088;

            int p = 23; // Prime Number
            int g = 9;  // Generator
            int a = 4;  // Client's Private Key
            double A, serverB, Adash;

            // Establish connection to the server
            System.out.println("Connecting to " + serverName + " on port " + port + "...");
            Socket client = new Socket(serverName, port);
            System.out.println("Connected to " + client.getRemoteSocketAddress());

            // Send p, g to Server
            DataOutputStream out = new DataOutputStream(client.getOutputStream());
            out.writeUTF(Integer.toString(p));
            out.writeUTF(Integer.toString(g));

            // Compute A = (G^a) % P
            A = (Math.pow(g, a)) % p;
            System.out.println("From Client : Public Key (A) = " + A);
            out.writeUTF(Double.toString(A));

            // Receive B from Server
            DataInputStream in = new DataInputStream(client.getInputStream());
            serverB = Double.parseDouble(in.readUTF());
            System.out.println("From Server : Public Key (B) = " + serverB);

            // Compute Shared Secret Key Adash = (B^a) % P
            Adash = (Math.pow(serverB, a)) % p;
            System.out.println("Secret Key to perform Symmetric Encryption = " + Adash);

            // Close connections
            in.close();
            out.close();
            client.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
