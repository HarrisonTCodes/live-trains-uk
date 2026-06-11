type SnakeToKebabcase<T extends string> = T extends `${infer Left}_${infer Right}`
  ? `${Left}-${SnakeToKebabcase<Right>}`
  : T;
