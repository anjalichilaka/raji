import java.util.*;

public class OneTimePad {
    public static void main(String args[]) {
        Scanner scn = new Scanner(System.in);

        System.out.println("Enter plaintext:");
        String plaintext = scn.nextLine();

        System.out.println("Enter key (same length or longer than plaintext):");
        String key = scn.nextLine();

        if (key.length() < plaintext.length()) {
            System.out.println("Error: Key length must be at least as long as the plaintext.");
            scn.close();
            return;
        }

        OneTimePadCipherImplementation otp = new OneTimePadCipherImplementation();
        String ciphertext = otp.Encrypt(plaintext, key);

        System.out.println("\nEncrypted text: " + ciphertext);
        System.out.println("Decrypted text: " + otp.Decrypt(ciphertext, key));

        scn.close();
    }
}

class Msg {
    private static final char[] all = "abcdefghijklmnopqrstuvwxyz".toCharArray();

    // Find the index of a given character (returns -1 for non-alphabetic characters)
    int Ipos(char c) {
        for (int i = 0; i < 26; i++) {
            if (all[i] == c) return i;
        }
        return -1; // If not found (e.g., space or special character)
    }

    // Get character at a given index
    char Cpos(int c) {
        return all[c % 26];  // Ensures index stays in valid range
    }
}

class OneTimePadCipherImplementation {
    // Encryption method
    String Encrypt(String plaintext, String key) {
        plaintext = plaintext.toLowerCase();
        key = key.toLowerCase();

        Msg m1 = new Msg();
        StringBuilder cipher = new StringBuilder();

        int j = 0;
        for (int i = 0; i < plaintext.length(); i++) {
            char plainChar = plaintext.charAt(i);

            if (Character.isLetter(plainChar)) { // Encrypt only letters
                int pt = m1.Ipos(plainChar);
                int k = m1.Ipos(key.charAt(j));
                int ct = (pt + k) % 26;

                cipher.append(m1.Cpos(ct));
                j++; // Move to next key character
                if (j == key.length()) j = 0;
            } else {
                cipher.append(plainChar); // Retain spaces and special characters
            }
        }

        return cipher.toString();
    }

    // Decryption method
    String Decrypt(String ciphertext, String key) {
        key = key.toLowerCase();

        Msg m1 = new Msg();
        StringBuilder plaintext = new StringBuilder();

        int j = 0;
        for (int i = 0; i < ciphertext.length(); i++) {
            char cipherChar = ciphertext.charAt(i);

            if (Character.isLetter(cipherChar)) { // Decrypt only letters
                int ct = m1.Ipos(cipherChar);
                int k = m1.Ipos(key.charAt(j));
                int pt = (ct - k + 26) % 26;

                plaintext.append(m1.Cpos(pt));
                j++; // Move to next key character
                if (j == key.length()) j = 0;
            } else {
                plaintext.append(cipherChar); // Retain spaces and special characters
            }
        }

        return plaintext.toString();
    }
}
