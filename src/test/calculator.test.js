import { describe, it, expect } from 'vitest';
import add from '../calculator'; // import the add function

describe('String Calculator', () => {
  it('should return 0 for an empty string', () => {
    expect(add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(add('1')).toBe(1);
  });

  it('should return the sum for two numbers', () => {
    expect(add('1,2')).toBe(3);
  });

  it('should return the sum for multiple numbers', () => {
    expect(add('1,2,3')).toBe(6);
  });

  it('should handle newlines between numbers', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  it('should support different delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  it('should throw an error when there are negative numbers', () => {
    expect(() => add('1,-2')).toThrowError('negatives not allowed -2');
  });

  it('should handle multiple negative numbers', () => {
    expect(() => add('1,-2,-3')).toThrowError('negatives not allowed -2, -3');
  });

  it('should ignore numbers greater than 1000', () => {
    expect(add('2,1001,4')).toBe(6); // 1001 is ignored
  });
  it('should handle custom delimiters of any length', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });
});
