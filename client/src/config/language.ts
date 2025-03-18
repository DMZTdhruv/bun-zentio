import { LangaugeSchema } from "~/schema/language";
export const languages: Record<number, LangaugeSchema> = {
  0: {
    content: 'print("Hello, World!")',
    mode: "python",
  },
  1: {
    content: 'console.log("Hello, World!");',
    mode: "typescript",
  },
  2: {
    content: `#include <iostream>
using namespace std;
int main() { 
  cout << "Hello, World!" << endl; 
  return 0; 
}`,
    mode: "c_cpp",
  },
  3: {
    content: 'print("Hello, World!")',
    mode: "lua",
  },
  4: {
    content: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
    mode: "java",
  },
};
