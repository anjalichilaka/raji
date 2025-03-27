import java.math.BigInteger;
import java.security.SecureRandom;

public class RSADemo {
    private static final BigInteger ONE = BigInteger.ONE;
    private static final SecureRandom random = new SecureRandom();

    private BigInteger privateKey;
    private BigInteger publicKey;
    private BigInteger modulus;

    // Constructor to generate RSA keys
    public RSADemo(int N) {
        BigInteger p = BigInteger.probablePrime(N / 2, random);
        BigInteger q = BigInteger.probablePrime(N / 2, random);
        BigInteger phi = (p.subtract(ONE)).multiply(q.subtract(ONE));

        System.out.println("Prime p = " + p);
        System.out.println("Prime q = " + q);

        modulus = p.multiply(q);
        System.out.println("Modulus (n) = " + modulus);
        System.out.println("Euler's Totient (phi) = " + phi);

        publicKey = new BigInteger("6"); // Common value: 2^16 + 1

        // Check if publicKey is coprime with phi, if not regenerate
        while (!phi.gcd(publicKey).equals(ONE)) {
            publicKey = BigInteger.probablePrime(N / 2, random);
        }

        privateKey = publicKey.modInverse(phi);
    }

    // Encrypt message
    public BigInteger encrypt(BigInteger message) {
        return message.modPow(publicKey, modulus);
    }

    // Decrypt message
    public BigInteger decrypt(BigInteger encrypted) {
        return encrypted.modPow(privateKey, modulus);
    }

    @Override
    public String toString() {
        return "Public Key = " + publicKey + "\n" +
               "Private Key = " + privateKey + "\n" +
               "Modulus (n) = " + modulus;
    }

    public static void main(String[] args) {
        try {
            if (args.length < 1) {
                System.out.println("Usage: java RSADemo <bit_size>");
                return;
            }

            int N = Integer.parseInt(args[0]);
            if (N < 512) {  // Ensure reasonable key size
                System.out.println("Key size should be at least 512 bits for security.");
                return;
            }

            RSADemo key = new RSADemo(N);
            System.out.println(key);

            // Example message (ensure it's less than the modulus)
            BigInteger message = new BigInteger("8");

            // Encrypt and decrypt the message
            BigInteger encrypted = key.encrypt(message);
            BigInteger decrypted = key.decrypt(encrypted);

            System.out.println("Original Message = " + message);
            System.out.println("Encrypted Message = " + encrypted);
            System.out.println("Decrypted Message = " + decrypted);
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
