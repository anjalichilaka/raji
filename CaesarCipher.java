import java.util.*;

class CaesarCipher {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int shift, i, n;
        String str, str1 = "";

        // Input plaintext
        System.out.println("Enter the Plain Text:");
        str = sc.nextLine();
        str = str.toLowerCase();
        n = str.length();
        char ch1[] = str.toCharArray();
        char ch4;

        // Input shift value
        System.out.println("Enter the value by which each letter of the string is to be shifted:");
        shift = sc.nextInt();

        // Encrypt the text
        System.out.println();
        System.out.println("Encrypted text is:");
        for (i = 0; i < n; i++) {
            if (Character.isLetter(ch1[i])) {
                ch4 = (char) (((ch1[i] - 'a' + shift) % 26) + 'a');
                str1 = str1 + ch4;
            } else {
                str1 = str1 + ch1[i]; // Preserve non-letter characters
            }
        }
        System.out.println(str1);
        System.out.println("Cipher Text: " + str1);

        // Decrypt the text
        n = str1.length();
        char ch2[] = str1.toCharArray();
        char ch3;
        System.out.println();
        System.out.println("Possible Plain text is:");

        // Iterate through all keys for decryption
        for (int key = 0; key < 26; key++) {
            String decryptedText = ""; // Reset decryptedText for each key
            for (i = 0; i < n; i++) {
                if (Character.isLetter(ch2[i])) {
                    ch3 = (char) (((ch2[i] - 'a' - key + 26) % 26) + 'a');
                    decryptedText = decryptedText + ch3;
                } else {
                    decryptedText = decryptedText + ch2[i]; // Preserve non-letter characters
                }
            }
            System.out.println("For Key " + key + ": " + decryptedText);
        }

        sc.close();
    }
}
