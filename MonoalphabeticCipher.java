import java.util.Scanner;

public class MonoalphabeticCipher {
    public static char p[] = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
            'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
    public static char ch[] = { 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O',
            'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M' };
    static String str;

    public static String doEncryption(String s) {
        char c[] = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char currentChar = s.charAt(i);
            boolean found = false;
            for (int j = 0; j < 26; j++) {
                if (p[j] == currentChar) {
                    c[i] = ch[j];
                    found = true;
                    break;
                }
            }
            // Preserve non-alphabetic characters
            if (!found) {
                c[i] = currentChar;
            }
        }
        return new String(c);
    }

    public static String doDecryption(String s) {
        char p1[] = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char currentChar = s.charAt(i);
            boolean found = false;
            for (int j = 0; j < 26; j++) {
                if (ch[j] == currentChar) {
                    p1[i] = p[j];
                    found = true;
                    break;
                }
            }
            // Preserve non-alphabetic characters
            if (!found) {
                p1[i] = currentChar;
            }
        }
        return new String(p1);
    }

    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the message: ");
        str = sc.nextLine(); // Use nextLine to handle spaces in input
        String en = doEncryption(str.toLowerCase());
        System.out.println("Encrypted message: " + en);
        System.out.println("Decrypted message: " + doDecryption(en));
        sc.close();
    }
}
