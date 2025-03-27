import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

class DesEncrypter {
    private Cipher ecipher;
    private Cipher dcipher;

    // Constructor to initialize Cipher for encryption and decryption
    DesEncrypter(SecretKey key) throws Exception {
        ecipher = Cipher.getInstance("DES");
        dcipher = Cipher.getInstance("DES");

        ecipher.init(Cipher.ENCRYPT_MODE, key);
        dcipher.init(Cipher.DECRYPT_MODE, key);
    }

    // Encrypt method
    public String encrypt(String str) throws Exception {
        byte[] utf8 = str.getBytes("UTF8"); // Convert string to bytes
        byte[] enc = ecipher.doFinal(utf8); // Encrypt
        return Base64.getEncoder().encodeToString(enc); // Encode to Base64
    }

    // Decrypt method
    public String decrypt(String str) throws Exception {
        byte[] dec = Base64.getDecoder().decode(str); // Decode from Base64
        byte[] utf8 = dcipher.doFinal(dec); // Decrypt
        return new String(utf8, "UTF8"); // Convert bytes to string
    }
}

public class DES {
    public static void main(String[] args) throws Exception {
        SecretKey key = KeyGenerator.getInstance("DES").generateKey(); // Generate secret key
        DesEncrypter encrypter = new DesEncrypter(key);

        String plaintext = "Don't tell anybody!";
        String encrypted = encrypter.encrypt(plaintext);
        System.out.println("Encrypted Text: " + encrypted);

        String decrypted = encrypter.decrypt(encrypted);
        System.out.println("Decrypted Text: " + decrypted);
    }
}
