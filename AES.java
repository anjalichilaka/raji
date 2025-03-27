import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

class AesEncrypter {
    private Cipher ecipher;
    private Cipher dcipher;

    // Constructor to initialize AES Cipher
    AesEncrypter(SecretKey key) throws Exception {
        ecipher = Cipher.getInstance("AES");
        dcipher = Cipher.getInstance("AES");

        ecipher.init(Cipher.ENCRYPT_MODE, key);
        dcipher.init(Cipher.DECRYPT_MODE, key);
    }

    // Encrypt method
    public String encrypt(String str) throws Exception {
        byte[] utf8 = str.getBytes("UTF-8"); // Convert string to UTF-8 bytes
        byte[] enc = ecipher.doFinal(utf8);  // Encrypt
        return Base64.getEncoder().encodeToString(enc); // Convert to Base64
    }

    // Decrypt method
    public String decrypt(String str) throws Exception {
        byte[] dec = Base64.getDecoder().decode(str); // Decode from Base64
        byte[] utf8 = dcipher.doFinal(dec); // Decrypt
        return new String(utf8, "UTF-8"); // Convert bytes to string
    }
}

public class AES {
    public static void main(String[] args) throws Exception {
        SecretKey key = KeyGenerator.getInstance("AES").generateKey(); // Generate AES key
        AesEncrypter encrypter = new AesEncrypter(key);

        String plaintext = "Don't tell anybody!";
        String encrypted = encrypter.encrypt(plaintext);
        System.out.println("Encrypted Text: " + encrypted);

        String decrypted = encrypter.decrypt(encrypted);
        System.out.println("Decrypted Text: " + decrypted);
    }
}
