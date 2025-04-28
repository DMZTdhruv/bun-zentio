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
  5: {
    content: 'puts "Hello, World!"',
    mode: "ruby",
  },
  6: {
    content: `fn main() {
  println!("Hello, World!");
}`,
    mode: "rust",
  },
  7: {
    content: `package main
import "fmt"
func main() {
  fmt.Println("Hello, World!")
}`,
    mode: "golang",
  },
  8: {
    content: `(display "Hello, World!") (newline)`,
    mode: "scheme",
  },
  9: {
    content: `(println "Hello, World!")`,
    mode: "clojure",
  },
  10: {
    content: `main = putStrLn "Hello, World!"`,
    mode: "haskell",
  },
  11: {
    content: `object Main extends App {
  println("Hello, World!")
}`,
    mode: "scala",
  },
  12: {
    content: `PROGRAM Hello;
BEGIN
  WriteLn('Hello, World!');
END.`,
    mode: "pascal",
  },
  13: {
    content: `fun main() {
  println("Hello, World!")
}`,
    mode: "kotlin",
  },
  14: {
    content: `BEGIN {
  print "Hello, World!\\n"
}`,
    mode: "awk",
  },
};
