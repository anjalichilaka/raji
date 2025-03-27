import java.security.*;
import java.util.Scanner;

public class CreatingDigitalSignature {
    public static void main(String args[]) {
        try {
            // Accepting text from user
            Scanner sc = new Scanner(System.in);
            System.out.println("Enter some text:");
            String msg = sc.nextLine();
            sc.close(); // ✅ Removed unnecessary '5'

            // Creating KeyPair generator object
            KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("DSA");

            // Initializing the key pair generator
            keyPairGen.initialize(2048);

            // Generate the pair of keys
            KeyPair pair = keyPairGen.generateKeyPair();

            // Getting the private and public keys
            PrivateKey privKey = pair.getPrivate();
            PublicKey pubKey = pair.getPublic();

            System.out.println("Private Key: " + privKey);
            System.out.println("Public Key: " + pubKey);

            // Creating a Signature object
            Signature sign = Signature.getInstance("SHA256withDSA");

            // Initialize the signature for signing
            sign.initSign(privKey);

            // Convert user input message into bytes
            byte[] bytes = msg.getBytes();

            // Adding data to the signature
            sign.update(bytes);

            // Generating the digital signature
            byte[] signature = sign.sign();

            // Printing Signature to console
            System.out.println("Generated Digital Signature:");
            for (byte b : signature) {
                System.out.printf("%02X ", b);
            }
            System.out.println();

            // Verifying the signature
            sign.initVerify(pubKey);
            sign.update(bytes);

            if (sign.verify(signature)) {
                System.out.println("✅ Signature Verified Successfully");
            } else {
                System.out.println("❌ Signature Verification Failed");
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
